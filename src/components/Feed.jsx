import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed)

  const userFeed = async() => {
    if(feed) return;

    try{
      const res = await axios.get(BASE_URL + "/users/feed", {withCredentials: true});
      //console.log(res.data);
      dispatch(addFeed(res.data));
    } catch(err) {
      console.error(err);
    }
  }
  
  useEffect(() => {

    userFeed()

  }, []);

  if(!feed) return;
 
if(feed.length === 0) return <h1 className="text-center font-bold">No new users found</h1>;

  return (
    
    feed && (<div className='flex justify-center my-5'>
      <UserCard user = {feed[0]} />
    </div>)
  )
}

export default Feed