import axios from 'axios';

const BASE_URI = 'http://localhost:5000';

const client = axios.create({
 baseURL: BASE_URI,
 json: true
});

class APIClient {

 getSentiment(tweet) {
   return this.perform('get', '/', tweet);
 }

 async perform (method, resource, data) {
   return client({
     method,
     url: resource,
     data,
     headers: {}
   }).then(resp => {
     return resp.data ? resp.data : [];
   })
 }
}

export default APIClient;