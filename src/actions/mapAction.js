import axios from 'axios'

export const loadLocation = ({name}) => {
  return (dispatch) => {
      return new Promise(function(resolve, reject){
        if(name === "" || name === undefined) {
          reject()
        }
        axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&key=AIzaSyBClQ0-3LBYGgTE4Z5O_eWustSoikQ9HFQ`)
        .then(function (response) {
          if(response.data.status == "ZERO_RESULTS"){
            reject("ZERO_RESULTS")
          } else {
              resolve(response.data.results[0].geometry.location)
          }
        })
        .catch(function (error) {
          console.log(error);
          reject()
        });
      })
  }
}
