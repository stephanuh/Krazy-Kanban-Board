import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {// TODO: make a POST request to the login route
try{
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${errorData.message}`);
  }
  const data = await response.json();
  return data;
} catch (err) {
  console.error('Failed to login', err);
  return Promise.reject('Cannot fetch user data');
}
};



export { login };
