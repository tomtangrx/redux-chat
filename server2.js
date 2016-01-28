var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config2')
var http = require('http');

var app = new (require('express'))();
// all environments
app.set('port', process.env.PORT || 3030);

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.get("/css/chatapp.css", function(req, res) {
  res.sendFile(__dirname + '/css/chatapp.css')
})
app.use(function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

/*
var server = app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
*/

var messages = [
  {
    id: 'm_1',
    threadID: 't_1',
    threadName: 'Jing and Bill',
    authorName: 'Bill',
    text: 'Hey Jing, want to give a Flux talk at ForwardJS?',
    timestamp: Date.now() - 99999
  }
  ,
  {
    id: 'm_2',
    threadID: 't_1',
    threadName: 'Jing and Bill',
    authorName: 'Bill',
    text: 'Seems like a pretty cool conference.',
    timestamp: Date.now() - 89999
  },
  {
    id: 'm_3',
    threadID: 't_1',
    threadName: 'Jing and Bill',
    authorName: 'Jing',
    text: 'Sounds good.  Will they be serving dessert?',
    timestamp: Date.now() - 79999
  }
  /*,
  {
    id: 'm_4',
    threadID: 't_2',
    threadName: 'Dave and Bill',
    authorName: 'Bill',
    text: 'Hey Dave, want to get a beer after the conference?',
    timestamp: Date.now() - 69999
  },
  {
    id: 'm_5',
    threadID: 't_2',
    threadName: 'Dave and Bill',
    authorName: 'Dave',
    text: 'Totally!  Meet you at the hotel bar.',
    timestamp: Date.now() - 59999
  },
  {
    id: 'm_6',
    threadID: 't_3',
    threadName: 'Functional Heads',
    authorName: 'Bill',
    text: 'Hey Brian, are you going to be talking about functional stuff?',
    timestamp: Date.now() - 49999
  },
  {
    id: 'm_7',
    threadID: 't_3',
    threadName: 'Bill and Brian',
    authorName: 'Brian',
    text: 'At ForwardJS?  Yeah, of course.  See you there!',
    timestamp: Date.now() - 39999
  }*/
];

var threadNameMap = (function () {
  var map = {};
  messages.forEach(function(){
  	 map[this.threadID] = this.threadName;
  });
 // messages.forEach(({threadID, threadName}) => {
   
 // });
  return map;
})();

/**
 * start Primus
 */
var server = http.createServer(app);
var rtg = require('url').parse(process.env.REDISTOGO_URL || 'redis://localhost:6379');
var redis = require('redis').createClient(rtg.port, rtg.hostname);
var Primus = require('primus')
  , primus = new Primus(server, {
  transformer: 'websockets',
  redis: redis
});


primus.use('emit', require('primus-emit'));
primus.use('metroplex', require('metroplex'));
primus.use('omega-supreme', require('omega-supreme'));

function refreshData(){
	primus.metroplex.servers(function (err, servers) {
		console.log('other servers: %d', servers.length, servers);
		servers.forEach(function (server) {
		  primus.forward(server, {
		    emit: ['allMsg', messages]
		  }, function (err, data) {
         console.log.apply(console, [].slice.apply(arguments));
      });
		});
	});

	primus.forEach(function (spark) {
  		spark.emit('allMsg', messages);
  	});
}

// listen on incoming connection
primus.on('connection', function(spark) {
  console.log('connection id', spark.id);
  spark.on('data', function received(data) {
    console.log(spark.id, 'received message:', data);
    spark.write(data+' aaa ');
  });
  spark.on('getAll',function (){
	this.emit('allMsg', messages);
  });
  spark.on('sendMsg', function custom(message) {

	  var timestamp = Date.now();
	  var id = 'm_' + timestamp;
	  var threadID = message.threadID;

	  var createdMessage = {
	    id,
	    threadID,
	    threadName: threadNameMap[threadID],
	    authorName: message.authorName,
	    text: message.text,
	    timestamp
	  };

	  messages.push(createdMessage);

	  refreshData();
      //this.emit('foo', 'bar');
  
  });
  //var req = spark.request;
  //console.log(req.session.username);
});


/*
 primus.on('disconnection', function (spark) {
	console.log('disconnection id', spark.id);
// the spark that disconnected
});
*/
// start the server
server.listen(app.get('port'), function(error){
  if (error) {
    console.error(error)
  } else {
    console.log('Express server listening on port ' + app.get('port'));
  } 
});