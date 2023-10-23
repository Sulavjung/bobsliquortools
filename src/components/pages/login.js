/* import React, { useEffect } from 'react';
import { auth, googleProvider } from '../../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import { user } from '../../middleware/isLoggedIn';

function Login() {
	let navigate = useNavigate();
  const {isLoggedIn} = user();

  console.log(isLoggedIn);


  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='d-flex justify-content-center align-item-center h-screen'>
      <div className="btn bg-dark text-light" onClick={loginWithGoogle}>
        Sign In With Google
      </div>
    </div>
  );
}

export default Login;
 */