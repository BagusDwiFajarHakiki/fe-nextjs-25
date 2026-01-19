import callAPI from './index';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api';

export async function setSignUp(data: any) {
  const url = `${ROOT_API}/${API_VERSION}/register`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function setLogin(data: any) {
  const url = `${ROOT_API}/${API_VERSION}/login`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function setLogout() {
  const url = `${ROOT_API}/${API_VERSION}/logout`;

  return callAPI({
    url,
    method: 'POST',
    token: true,
  });
}

export async function getMe() {
  const url = `${ROOT_API}/${API_VERSION}/me`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}
