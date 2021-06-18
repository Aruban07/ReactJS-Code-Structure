import axios from 'axios';
import * as Cookie from './Cookie';
import * as Config from './Config';

const baseUrl = `${Config.API_BASE_URL}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

function checkResponse(reponse) {
  const errorCode = (reponse.errorCode) ? reponse.errorCode : null;
  if (errorCode === 'UNAUTH') {
    Cookie.erase('app_token');
  }
  return reponse;
}

async function GET(params) {
  const { name, queryString } = params;
  const q = (queryString) ? `?${queryString}` : '';
  try {
    axios.defaults.headers.common.Authorization = Cookie.get('app_token');
    return await axios({
      method: 'get',
      url: `${baseUrl}/${name}${q}`,
    }).then((response) => checkResponse(response.data));
  } catch (error) {
    return error;
  }
}

async function POST(params) {
  const { name, queryString, payload } = params;
  const q = (queryString) ? `?${queryString}` : '?';
  try {
    axios.defaults.headers.common.Authorization = Cookie.get('app_token');
    return await axios({
      method: 'post',
      url: `${baseUrl}/${name}${q}`,
      data: payload,
    }).then((response) => checkResponse(response.data));
  } catch (error) {
    return error;
  }
}

async function PUT(params) {
  const { name, queryString, payload } = params;
  const q = (queryString) ? `?${queryString}` : '';
  try {
    axios.defaults.headers.common.Authorization = Cookie.get('app_token');
    return await axios({
      method: 'put',
      url: `${baseUrl}/${name}${q}`,
      data: payload,
    }).then((response) => checkResponse(response.data));
  } catch (error) {
    return error;
  }
}

async function DELETE(params) {
  const { name, queryString, payload } = params;
  const q = (queryString) ? `?${queryString}` : '';
  try {
    axios.defaults.headers.common.Authorization = Cookie.get('app_token');
    return await axios({
      method: 'delete',
      url: `${baseUrl}/${name}${q}`,
      data: payload,
    }).then((response) => checkResponse(response.data));
  } catch (error) {
    return error;
  }
}

export default {
  GET,
  POST,
  PUT,
  DELETE,
};
