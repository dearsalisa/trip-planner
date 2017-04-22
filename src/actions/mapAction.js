import axios from 'axios'

export const loadLocation = ({name}) => {
  return (dispatch) => {
    if(name != "" && name !== undefined) {
      axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&key=AIzaSyBClQ0-3LBYGgTE4Z5O_eWustSoikQ9HFQ`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
