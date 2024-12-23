
import { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() => {
    try {
      const res = await axios.post(BASE_URL+"/login", {
        email, password
      },
    {withCredentials: true});
    dispatch(addUser(res.data));
    navigate("/users/feed");

    } catch(err) {
      setError(err?.response?.data || err.data || "something went wrong");
    }
  }

  const handleSignUp = async() => {
    
    try {

      const res = await axios.post(BASE_URL+ "/signup", {
        firstName, lastName, email, password
      }, {withCredentials: true});

      dispatch(addUser(res.data.data));
      navigate("/profile");

    }catch (err) {
      setError(err?.response?.data || "something went wrong");
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className="card bg-neutral w-96 shadow-2xl justify-center">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
    
     {!isLoginForm && (
      <>
      <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">First Name: </span>
      </div>
      <input type="text" placeholder="Type here"
      value={firstName}
       className="input input-bordered w-full max-w-xs" 
       onChange={(e) => setFirstName(e.target.value)} />
    </label>
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Last Name: </span>
      </div>
      <input type="text" placeholder="Type here" 
      value={lastName}
      className="input input-bordered w-full max-w-xs"
      onChange={(e) => setLastName(e.target.value)} />
    </label>
    </>
     )}

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">EmailId: </span>
  </div>
  <input type="text" placeholder="Type here"
  value={email}
   className="input input-bordered w-full max-w-xs" 
   onChange={(e) => setEmailId(e.target.value)} />
</label>

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Password: </span>
  </div>
  <input type="text" placeholder="Type here"
  value={password}
   className="input input-bordered w-full max-w-xs" 
   onChange={(e) => setPassword(e.target.value)} />
</label>

<p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center my-2">
      <button className="btn btn-primary" onClick={ isLoginForm? handleLogin : handleSignUp}>
        {isLoginForm? "Login" : "Sign Up"}
      </button>
    </div>
    <p className='m-auto cursor-pointer' onClick={() => setIsLoginForm((value) => !value)}>{isLoginForm? "New User? Sign Up Here" : "Existing User Login Here"}</p>
  </div>
</div>
    </div>
  )
};

export default Login