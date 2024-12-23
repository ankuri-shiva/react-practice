import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";


const UserCard = ({user}) => {
    

    const {firstName, lastName, gender, photoUrl, age, about } = user

    const dispatch = useDispatch()

    const handleSendRequst = async(status, userId) => {
      try{
        await axios.post(BASE_URL+ "/request/send/" + status + "/" + userId, {}, {withCredentials: true});
       
        dispatch(removeUserFromFeed(user._id))

  
      } catch(err) {
        console.error(err.message)
      }
  
    };

  return (
    
  <div className="card bg-neutral w-96 shadow-xl">
  <figure>
    <img
      src = {photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{ firstName + " " + lastName}</h2>
    { gender && age && (<p>{ gender + ", " + age}</p>)}
    <p>{ about}</p>
    <div className="card-actions justify-center my-4">
    <button className="btn btn-primary" onClick={() => handleSendRequst("ignored", user._id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={() => handleSendRequst("interested", user._id)}>Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
