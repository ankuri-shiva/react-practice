import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";



const Navbar = () => {

  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() => {
    try{
      await axios.post(BASE_URL+ "/logout", {}, {
        withCredentials: true
      });
      dispatch(removeUser())
      return navigate("/login");

    } catch(err){
      console.error(err);
    }
  }

  return (
    
    <div className="navbar bg-neutral">
      {!user && (<h1 className="text-xl">Dev Tinder</h1>)} 
  {user && (
    <>
     <div className="flex-1">
    <Link to ="/users/feed" className="btn btn-ghost text-xl">Dev Tinder</Link>
  </div>
    <div className="flex-none gap-2">
    <div>welcome, {user.firstName}</div>
    <div className="dropdown dropdown-end mx-4">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
          </Link>
        </li>
        <li>
          <Link to = "/user/connections">Connections</Link>
          </li>
          <li>
          <Link to = "/user/requests/received">Requests</Link>
          </li>
        <li ><a  onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
  </>)}
</div>
  )
}

export default Navbar