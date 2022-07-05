import axios from 'axios';
import qs from 'qs';

export default {
  name: "Auth Propeller",
  version: "0.0.5",
  key: "auth-propeller",
  description: "",
  props: {
    authorization: {
      type: 'string',
      label: 'Authorization',
    },

  },
  type: "action",
  methods: {},
  async run({ $ }) {
    var data = qs.stringify({
      'grant_type': 'client_credentials' 
    });
    var config = {
      method: 'post',
      url: 'https://api.helice.cloud/oauth2/token',
      headers: { 
        'Authorization': 'Basic ' + this.authorization, 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    return await axios(config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
  },
};
