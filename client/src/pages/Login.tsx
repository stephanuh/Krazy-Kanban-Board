import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSubmissionStatus("");
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
      setSubmissionStatus( 'error');
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label >Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <button type='submit'>Login</button>
        {submissionStatus === 'error' && (
          <div className='text-error'>Failed to login</div>
        )}
      </form>
    </div>
    
  )
};

export default Login;



// import { useState, FormEvent, ChangeEvent } from "react";
// import Auth from '../utils/auth';
// import { login } from "../api/authAPI";

// const Login = () => {
//   const [loginData, setLoginData] = useState({
//     username: "",
//     password: "",
//   });

//   const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setSubmissionStatus(null);
//     setLoginData({
//       ...loginData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const data = await login(loginData);
//       Auth.login(data.token);
//     } catch (err: any) {
//       console.error('Failed to login', err);
//       setSubmissionStatus(err.message || 'Invalid credentials');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='container'>
//       <form className='form' onSubmit={handleSubmit}>
//         <h1>Login</h1>
//         <label>Username</label>
//         <input 
//           type='text'
//           name='username'
//           value={loginData.username}
//           onChange={handleChange}
//         />
//         <label>Password</label>
//         <input 
//           type='password'
//           name='password'
//           value={loginData.password}
//           onChange={handleChange}
//         />
//         <button type='submit' disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//         {submissionStatus && <div className='text-error'>{submissionStatus}</div>}
//       </form>
//     </div>
//   );
// };

// export default Login;
