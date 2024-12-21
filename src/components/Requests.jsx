import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";



const Requests = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests)


    const fetchRequests = async() => {
        try {
            const res = await axios.get(BASE_URL+ "/user/requests/received" , {withCredentials: true});
            console.log(res.data);

            dispatch(addRequest(res?.data?.data));
        } catch(err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if(!requests) return;

    if(requests.length === 0) return <h1 className="text-center text-red-500 my-4">No requests found</h1>;

    const requestReview = async(status, _id) => {
        try{
            const res = await axios.post(BASE_URL+"/request/review/"+status +"/"+ _id, {}, {withCredentials: true});
            console.log(res)
            dispatch(removeRequest(_id));

        }catch(err) {
            console.log(err.message)
        }
    }

  return (
    <div className="my-5">
        <h1 className="font-bold text-2xl text-center">Requests</h1>
        {requests.map((eachRequest, index) => {
            const {firstName, lastName, photoUrl, age, gender, about} = eachRequest.fromUserId;
            return (
                <div key = {index} className=" flex justify-between items-center  bg-neutral w-1/2 shadow-xl rounded-xl border-opacity-0 m-auto my-4 p-4">
                    
                    <div className="flex justify-start card mx-2">
                        <img
                        className="w-20 h-20 rounded-full object-fill"
                        src = {photoUrl}
                        alt="photo" />
                    </div>
                    <div className="">
                        <h1 className="font-bold">{firstName + " " + lastName}</h1>
                        {age && gender && <p>{gender + ", " + age}</p>}
                        <p>{about}</p>
                    </div>
                    <div>
                        <button className="btn btn-primary m-2" onClick = {() => requestReview("accepted", eachRequest._id)}>Accept</button>
                        <button className="btn btn-secondary m-2" onClick={() => requestReview("rejected", eachRequest._id)}>Reject</button>
                    </div>
            </div>
            )
        })}
        
  </div>
  )
}

export default Requests;