import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser, signOutAsync } from '../AuthSlice';
import { Navigate } from 'react-router-dom';


export default function LogOut() {
  const dispatch = useDispatch();
  const user =useSelector(selectLoggedInUser) 
  useEffect(()=>{
    dispatch(signOutAsync())
  })


  return (
    <div>
    {!user && <Navigate to='/login'></Navigate>}
    </div>
  );
}
