import * as firebase from 'firebase'

export const uploadImage = ({file}) => {
  return (dispatch) => {
    return new Promise(function(resolve, reject){

      var fb = firebase.storage().ref('tripImage/'+file.name)

      var metadata = {
        contentType: file.type,
      };

      var uploadTask = fb.put(file, metadata)

      uploadTask.on('state_changed',

      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },

      function(error){
        reject("UPLOAD_ERROR")
      },

      function() {
        console.log(uploadTask.snapshot.downloadURL)
        resolve(uploadTask.snapshot.downloadURL)
      })

    })
  }
}
