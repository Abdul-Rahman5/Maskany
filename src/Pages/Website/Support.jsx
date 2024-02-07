import React from "react";
import Navbar from "../../Components/Dashboard/NavBar";
import "./PublicStyle.css";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import Cookie from "cookie-universal";

export default function Support() {
  const [messageError, setmessageError] = useState('')
  const [messageSuccess, setMessageSuccess] = useState('')
  // Cookies
  const cookie = Cookie();

async function handelSupport(values) {
  if ( cookie.get("solom")!=null) {
    const token = cookie.get("solom");


    let {data}= await  axios
    .post("http://66.45.248.247:8000/report/",values, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }) .catch((errr) => {
      setmessageError(
        `${errr.response.data.email} `
      );
    });
if (data.id!=null) {
  setMessageSuccess("تم ارسال البيانات بنجاح");
}
}
}

let formik=useFormik({
  initialValues:{
    report_text:"",
    user_email:"",
  },onSubmit:handelSupport
})





  return (
    <>
      <Navbar />
      <div className=" bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
              
           
            <div className="col-md-6">
            <form onSubmit={formik.handleSubmit}>
       

              
      <h2 className="lead  my-3 fs-3 fw-normal">هل لديك مشكلة بخصوص موقعنا؟</h2>
            {messageError.length>0? <div className="alert alert-danger mt-2 text-center ">خطأ في ارسال البيانات </div>:null} 
      {messageSuccess.length>0? <div className="alert alert-success mt-2 ">{messageSuccess} </div>:null}
              <label className="fs-6 fw-normal  my-3" htmlFor="">ما هي المشكلة التي تواجهك في الموقع؟</label>
              <textarea
              required
                className="form-control bg-light"
                onChange={formik.handleChange} value={formik.values.report_text}
                name="report_text"
                id=""
                cols="30"
                rows="5"
              ></textarea>

              <label className="fs-6 fw-normal my-2" htmlFor="name">اسمك:</label>
              <input type="text" className="form-control bg-light" />
              <label className="fs-6 fw-normal my-2" htmlFor="name">:بريدك الإلكتروني</label>
              <input required  onChange={formik.handleChange} value={formik.values.user_email}  name="user_email" type="email" className="form-control bg-light" />

              <div className="button my-4 text-center">
                <button className=" formBtnStyle px-5 text-center">
                ارسل مشكلتك
                </button>
              </div>
            </form >
            </div>




            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}
