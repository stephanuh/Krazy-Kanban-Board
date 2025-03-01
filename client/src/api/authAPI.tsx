import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {// TODO: make a POST request to the login route
try {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });
 
  if (!response.ok){
    throw new Error('User information not retrieved, check network tab');
  }
  const data = await response.json();
  return data;

} catch (err) {
  console.error('Failed to login', err);
  return Promise.reject('Cannot fetch user information');
}
};

export { login };
