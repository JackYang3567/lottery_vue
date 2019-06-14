
/**
 * Created at 2019-06-10
 * Author: Jack
 */

const axios = require('axios');
const {PREFIX} = require('../../config.json.js')
const API_LIST = `/${PREFIX}/Home/home/getChat`

export default {
   
     getChats (cb) {
      // axios是response.data里才是数据
     return axios.get(`${API_LIST}`)
      .then(function (res) {
        // handle success
        if(res.status==200){
          setTimeout(() => cb(res.data), 10)
        } 
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });     
    }
}
  

 