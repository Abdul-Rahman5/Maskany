
import Navbar from "../../../Components/Dashboard/NavBar";
import "../../Auth/AuthStyle.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import userImg from "../../../Assets/Images/images.jpg";
// import userImg from "../../../Assets/Images/images.jpg";
import Cookie from "cookie-universal";
export default function UserSettings() {
const [UserData, setUserData] = useState({})
const [messageError, setmessageError] = useState('')
const [messageSuccess, setMessageSuccess] = useState('')
const [ImageList, setImageList] = useState('')

    // Cookies
    const cookie = Cookie();
    const token = cookie.get("solom");
// dispaly user Data
async function getUser() {
  if (cookie.get("solom")!=null) {
    
    
 let {data}= await  axios
      .get("http://66.45.248.247:8000/auth/user/update/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      setUserData(data)

    }

}
useEffect(() => {
  getUser();
 }, [])
 
//Update user Data send to backend
async function handelUpdate(values) {
  const formData = new FormData();
formData.append('username', values.username);
formData.append('email', values.email);
formData.append('phoneNumber', values.phoneNumber);
formData.append('location', values.location);
if (ImageList) {
  formData.append('image',ImageList);
  
}
  if (cookie.get("solom")!=null) {
  
    console.log(formData);
  let {data}= await  axios
  .put("http://66.45.248.247:8000/auth/user/update/",formData, {
    headers: {
      Authorization: `Token ${token}`,
    },
  }) .catch((errr) => {
    setmessageError(
      `${errr.response.data.email} `
    );
  });
  if (data.email!=null) {
    setMessageSuccess("تم تعديل البيانات بنجاح");
  }
}


}



let formik=useFormik({
  initialValues:{
    username:'',
    email:"",
    phoneNumber:'',
    location:"",
    image:"",
  },onSubmit:handelUpdate
});



function handleClick(event) {
  setImageList(event.target.files[0]); // logs the button element that was clicked
}



  return <>
  
    <Navbar className="bg-body"/>
  <div className="bg-light ">
    <div className="item">

      <form className="p-5" onSubmit={formik.handleSubmit}>
        <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
        {messageSuccess.length>0? <div className="alert alert-success mt-2 ">{messageSuccess} </div>:null}

        <h4 className="lead ">تعديل البيانات</h4>
      <div className="image  text-center w-75">
{UserData?.image==null?<img className="w-25 rounded-circle " src={userImg} alt="User" />
:<img className="w-25 rounded-circle " src={UserData.image} alt="User" />}

       <br />
      </div>


      <label className="my-3" htmlFor="formFile">صورة المستخدم</label>
      <div className="userImage  text-start ">

        <input onChange={handleClick} className="form-control shadow-sm text-start" name="image" type="file" id="formFile"/>
      </div>

      <label  className="my-3" htmlFor="email" >  البريد الإلكتروني</label>
        <input onChange={formik.handleChange} value={formik.values.email} name="email" id="email" placeholder={UserData.email} className="form-control shadow-sm text-start" type="email" />
      {messageError.length>0? <div className=" text-danger mt-2 "> الايميل مستخدم سابقاً , حاول بأيميل اخر </div>:null} 

        <label  className="my-3" htmlFor="location">  الموقع  </label>
        <input onChange={formik.handleChange} value={formik.values.location} name="location" id="location" placeholder={UserData.location}  className="form-control mb-5 shadow-sm text-start" type="text" />

        <label  className="my-3 mt-3" htmlFor="phone"> رقم هاتفك </label>
        <input onChange={formik.handleChange} value={formik.values.phoneNumber} name="phoneNumber" id="phone" placeholder={UserData.phoneNumber} className="form-control shadow-sm text-start" type="text" />
        


        <label  className="my-3" htmlFor="username"> اسمك بالكامل </label>
        <input onChange={formik.handleChange} value={formik.values.username} name="username" id="username" placeholder={UserData.username} className="form-control shadow-sm text-start" type="text" />

        <div className="button my-4 text-center">

        <button className=" formBtnStyle px-5 text-center">تعديل الان</button>
        </div>
      
        </div>
        <div className="col-md-3"></div>




        </div>



      </form>
    </div>
   
  </div>
  </>
}
