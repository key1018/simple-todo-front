import { API_BASE_URL } from '../api-config';

export function call(api, method, request) {
  let options = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    url: API_BASE_URL + api,
    method: method,
    credentials: 'include', // 쿠키 및 인증 정보 포함
  };

  // 토큰이 있는 경우 Authorization 헤더에 추가
  let token = localStorage.getItem('ACCESS_TOKEN');
  if (token) {
    options.headers.append('Authorization', 'Bearer ' + token);
  }

  if (request) {
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options)
    .then((response) => {
      if (response.ok) {
        console.log('http 200');
        return response.json();
      } else if (response.status === 403) {
        console.log('http 403');
        window.location.href = '/login'; // redirect
        return Promise.reject(new Error('Redirecting to login'));
      } else {
        console.log('http unknown', response.status);
        return Promise.reject(response);
      }
    })
    .catch((error) => {
      console.log('url:', options.url, 'options:', options);
      console.log('http error');
      console.log(error);
    });
}
