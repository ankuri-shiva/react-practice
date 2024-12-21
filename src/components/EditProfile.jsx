import { useState } from "react"
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const EditProfile = ({user}) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);

    const dispatch = useDispatch();
    const saveProfile = async () => {

        try{
            const res = await axios.patch(BASE_URL + "/profile/edit", 
                {
                    firstName,
                    lastName,
                    age,
                    gender,
                    about,
                    photoUrl
                },
                {withCredentials: true}
            );
            dispatch(addUser(res?.data?.data));
            if(error !== "") setError("");
            //if(error) setError("");
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 3000);

        } catch(err) {
          //console.log(err)
            setError(err.response.data);
        }
    }

  return (
    <>
    <div className="flex justify-center">
    <div className='flex items-center justify-center h-screen mx-10'>
    <div className="card bg-neutral w-96 shadow-2xl justify-center">
<div className="card-body">
  <h2 className="card-title justify-center">Edit Profile</h2>
  <label className="form-control w-full max-w-xs">
<div className="label">
  <span className="label-text">First Name </span>
</div>
<input type="text" placeholder="Type here"
value={firstName}
 className="input input-bordered w-full max-w-xs" 
 onChange={(e) => setFirstName(e.target.value)} />
</label>
<label className="form-control w-full max-w-xs">
<div className="label">
  <span className="label-text">Last Name </span>
</div>
<input type="text" placeholder="Type here" 
value={lastName}
className="input input-bordered w-full max-w-xs"
onChange={(e) => setLastName(e.target.value)} />
</label>
<label className="form-control w-full max-w-xs">
<div className="label">
  <span className="label-text">Age </span>
</div>
<input type="text" placeholder="Type here" 
value={age}
className="input input-bordered w-full max-w-xs"
onChange={(e) => setAge(e.target.value)} />
</label>
{/* 
<label className="form-control w-full max-w-xs">Gender</label>
<div className="label">
  <span className="label-text">Gender </span>
</div> */}

<label htmlFor="gender">Gender</label>
<select className="w-full max-w-xs bg-gray-800 rounded-xl p-4 label-text"
 id="gender" value={gender} onChange={(e) => setGender(e.target.value)} >
  <option value= "male" >male</option>
  <option value= "female" >female</option>
  <option value= "others" >others</option>
</select>


{/* <input type="text" placeholder="Type here" 
value={gender}
className="input input-bordered w-full max-w-xs"
onChange={(e) => setGender(e.target.value)} /> */}

<label className="form-control w-full max-w-xs">
<div className="label">
  <span className="label-text">Photo URL </span>
</div>
<input type="text" placeholder="Type here" 
value={photoUrl}
className="input input-bordered w-full max-w-xs"
onChange={(e) => setPhotoUrl(e.target.value)} />
</label>
<label className="form-control w-full max-w-xs">
<div className="label">
  <span className="label-text">About </span>
</div>
<textarea type="text" placeholder="Type here" 
value={about}
className="input input-bordered w-full max-w-xs"
onChange={(e) => setAbout(e.target.value)} />
</label>
{error !== "" && <p className="text-red-600">{error}</p>}
  <div className="card-actions justify-center my-2">
    <button className="btn btn-primary" onClick={saveProfile} >Save Profile</button>
  </div>
</div>
</div>
  </div>
  <UserCard user = {{firstName, lastName, age, gender, about, photoUrl}} />
  </div>
  {showToast && (<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>profile updated successfully.</span>
  </div>
</div>)}
  </>
  )
}

export default EditProfile