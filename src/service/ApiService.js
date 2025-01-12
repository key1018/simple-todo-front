import { API_BASE_URL } from '../api-config';

export function call(api, method, request) {
  // let options = {
  //   headers: new Headers({
  //     'Content-Type': 'application/json',
  //   }),
  //   url: API_BASE_URL + api,
  //   method: method,
  //   credentials: 'include', // 쿠키 및 인증 정보 포함
  // };

  let headers = new Headers({
    'Content-Type': 'application/json',
  });

  // 로컬 스토리지에서 ACCESS TOKEN 가져오기
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  if (accessToken && accessToken != null) {
    headers.append('Authorization', 'Bearer ' + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
    credentials: 'include', // 쿠키 및 인증 정보 포함
  };

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

export function signin(userDTO) {
  return call('/auth/signin', 'POST', userDTO).then((response) => {
    // console.log('response : ', response);
    // alert('로그인 토큰 : ' + response.token);
    if (response.token) {
      // 로컬 스토리지에 토큰 저장
      // localStorage.setItem('ACCESS_TOKEN', response.token);
      // localStorage에 저장 시도
      try {
        localStorage.setItem('ACCESS_TOKEN', response.token);
        console.log('Token stored in localStorage');
      } catch (error) {
        console.error('localStorage Error:', error);
        alert(
          '로컬 스토리지에 접근할 수 없습니다. 브라우저 설정을 확인하세요.'
        );
        return; // 에러 발생 시 리다이렉트를 막음
      }
      // token이 존재하는 경우 Todo 화면으로 리다이렉트
      window.location.href = '/todo';
    }
  });
}

// 로그아웃
export function signout() {
  localStorage.setItem('ACCESS_TOKEN', null);
  window.location.href = '/login';
}
