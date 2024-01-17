import React, { useEffect, useState } from 'react'
import './EditProfile.css'
import { useDispatch , useSelector } from 'react-redux';
import { toast } from 'react-hot-toast'
import { clearErrors, updateProfile } from '../../../redux/actions/userAction';
import { updateProfileReset } from '../../../redux/reducers/userReducer';
import MetaData from '../../Layout/MetaData';

const EditProfile = () => {
  
  const { error, isUpdated, user, loading } = useSelector((state)=>state.user);

  const [name , setName] = useState(user.name);
  const [semester , setSemester] = useState(user.semester);
  const [department , setDepartment] = useState(user.department);
  const [year , setYear] = useState(user.year);
  const [institute , setInstitute] = useState(user.institute);

  const dispatch = useDispatch();


  const updateHandler = () => {
    
    const formData = new FormData();

    formData.append("name",name);
    formData.append("semester",semester);
    formData.append("department",department);
    formData.append("year",year);
    formData.append("institute",institute);

    dispatch(updateProfile(formData));

  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
    
    if(isUpdated){
      toast.success("Updated");
      dispatch(updateProfileReset());
    }
  },[dispatch,isUpdated,error,user])

  return (
    <div className='edit-profile'>
      <MetaData title="EDIT PROFILE" />
      <div>
      <label>Name</label>
      <div>
          <input type='text' value={name} placeholder='Enter Your Name' onChange={(e)=>(setName(e.target.value))}/>
          <button onClick={updateHandler}>{loading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
      <div>
      <label>Department</label>
      <div>
          <input type='text' value={department} placeholder='Enter Your Department' onChange={(e)=>(setDepartment(e.target.value))}/>
          <button onClick={updateHandler}>{loading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
      <div>
      <label>Semester</label>
      <div>
          <input type='text' value={semester} placeholder='Enter Your Current Semester' onChange={(e)=>(setSemester(e.target.value))}/>
          <button onClick={updateHandler}>{loading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
      <div>
      <label>Year of Passing</label>
      <div>
          <input type='text' value={year} placeholder='Enter Your Passing Year' onChange={(e)=>(setYear(e.target.value))}/>
          <button onClick={updateHandler}>{loading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
      <div>
      <label>Institute</label>
      <div>
          <input type='text' value={institute} placeholder='Enter Your Institute' onChange={(e)=>(setInstitute(e.target.value))}/>
          <button onClick={updateHandler}>{loading ? <div className='button-loader'></div> : "Update"}</button>
      </div>
      </div>
    </div>
  )
}

export default EditProfile