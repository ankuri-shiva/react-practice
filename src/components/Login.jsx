
import { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() => {
    try {
      const res = await axios.post(BASE_URL+"/login", {
        email, password
      },
    {withCredentials: true});
    dispatch(addUser(res.data));
    navigate("/feed");

    } catch(err) {
      console.error(err.message);
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className="card bg-neutral w-96 shadow-2xl justify-center">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">EMAILID: </span>
  </div>
  <input type="text" placeholder="Type here"
  value={email}
   className="input input-bordered w-full max-w-xs" 
   onChange={(e) => setEmailId(e.target.value)} />
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">PASSWORD: </span>
  </div>
  <input type="text" placeholder="Type here" 
  value={password}
  className="input input-bordered w-full max-w-xs"
  onChange={(e) => setPassword(e.target.value)} />
</label>
    <div className="card-actions justify-center my-2">
      <button className="btn btn-primary" onClick={handleLogin}>LOGIN</button>
    </div>
  </div>
</div>
    </div>
  )
};

export default Login