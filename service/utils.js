/**
 * Created by 18LUOHAN on 16/3/2.
 */
import "whatwg-fetch";
let API_URL = 'http://localhost:3000';

export function uploadFile(url,file,params){
  let data = new FormData();
  data.append('userPhoto', file/*{uri: fileURL, name: 'image.jpg', type: 'image/jpg'}*/);
  if(params){
      for(var key of Object.keys(params)){
          let value = params[key];
          if (value instanceof Date) {
              data.append(key, value.toISOString())
          } else {
              data.append(key, String(value))
          }
      }
  }

  const config = {
      method: 'POST',
      /*headers: {
          //'Accept': 'application/json',
          //'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
          //'Content-Language': React.NativeModules.RNI18n.locale,
      },*/
      body: data,
  }
  let uploadUrl = url;
  if(url.length >7 && url.substring(0,6) !='http://'){
      if(url[0] !='/'){
          url = '/' + url;
      }
      uploadUrl = API_URL + url;
  }
  return fetch(uploadUrl, config);
};
export function uploadFileXHR(url,file,params){

    let data = new FormData();
    data.append('userPhoto', file/*{uri: fileURL, name: 'image.jpg', type: 'image/jpg'}*/);
    if(params){
        for(var key of Object.keys(params)){
            let value = params[key];
            if (value instanceof Date) {
                data.append(key, value.toISOString())
            } else {
                data.append(key, String(value))
            }
        }
    }

    const config = {
        method: 'POST',
        /*headers: {
            //'Accept': 'application/json',
            //'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
            //'Content-Language': React.NativeModules.RNI18n.locale,
        },*/
        body: data,
    }
    let uploadUrl = url;
    if(url.length >7 && url.substring(0,6) !='http://'){
        if(url[0] !='/'){
            url = '/' + url;
        }
        uploadUrl = API_URL + url;
    }
    //return fetch(uploadUrl, config);



    var xhr = new XMLHttpRequest();
    xhr.open('POST', uploadUrl);
    xhr.onload = () => {
    console.log('开始上传');
    //this.setState({isUploading: false});
    if (xhr.status !== 200) {
     console.log(
     'Upload failed',
     'Expected HTTP 200 OK response, got ' + xhr.status
     );
     return;
    }
    if (!xhr.responseText) {
     console.log(
     'Upload failed',
     'No response payload.'
     );
     return;
    }
    var index = xhr.responseText.indexOf(API_URL);
    console.log(xhr.responseText);
    if (index === -1) {
     console.log(
     'Upload failed',
     'Invalid response payload.'
     );
     return;
    }
    var url = xhr.responseText.slice(index).split('\n')[0];
    console.log('Upload successful: ' + url);
    };
    //var formdata = new FormData();
    //formdata.append(param.name, param.value)
    let formData = new FormData();

    //if (fileURL) {
    formData.append('userPhoto', file/* {uri: filePath, name: 'image.jpg', type: 'image/jpg'}*/)
    //}
    formData.append('filename', '上传文件')
    if (xhr.upload) {
    xhr.upload.onprogress = (event) => {
    console.log('upload onprogress', event);
    if (event.lengthComputable) {
     console.log(event.loaded / event.total);
     //this.setState({uploadProgress: event.loaded / event.total});
    }
    };
    }
    xhr.send(formData);
    console.log('完成');
    // this.setState({isUploading: true});

}
