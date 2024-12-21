import axios from "axios"
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {

    const dispatch = useDispatch()
    const connections = useSelector((store) => store.connections);

    
    

    const fetchConnections = async() => {
        try{
            const res = await axios.get(BASE_URL+"/user/connections", {withCredentials: true});
            console.log(res?.data)
            dispatch(addConnections(res?.data));

    
        } catch(err) {
            console.log(err.message)
        }
    };

    useEffect(() => {
        fetchConnections()
    }, []);

    //if(!connections) return;

    //if(connections.length === 0 ) return <h1>No connections found</h1>;

  return (
    connections && (
    <div className="my-5">
        <h1 className="font-bold text-2xl text-center">Connections</h1>
        {connections.map((eachConnection, index) => {
            const {firstName, lastName, photoUrl, age, gender, about} = eachConnection;
            return (
                <div key = {index} className=" flex  bg-neutral w-1/2 shadow-xl rounded-xl border-opacity-0 m-auto my-4 p-4">
                    
                    <div className="flex justify-start card mx-2">
                        <img
                        className="w-20 h-20 rounded-full"
                        src = {photoUrl}
                        alt="photo" />
                    </div>
                    <div className="">
                        <h1 className="font-bold">{firstName + " " + lastName}</h1>
                        {age && gender && <p>{gender + ", " + age}</p>}
                        <p>{about}</p>
                    </div>
            </div>
            )
        })}
  </div>
  ))
}

export default Connections
