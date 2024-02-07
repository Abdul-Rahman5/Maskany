import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as Yup from "yup";
export default function ForGetPasswordOne() {
  
  let navigate=useNavigate();

//messageError
const [messageError, setmessageError] = useState('')
      //validtion input
      let validationSchema=Yup.object({
        otp:Yup.number().required('كود التفعيل مطلوب'),
      });
      
       // send api to backend
// send api to backend
 function handelRePassword(values) {
  
  console.log(values);
  if (values.otp== localStorage.getItem("OtpPhone")) {
    navigate("/");
    //send backend
    
  } else{
    setmessageError(" لقد قمت بأدخال كود تفعيل خاطئ")
  }
  
  }
  let formik=useFormik({
    initialValues:{
      otp:'',
    },validationSchema,onSubmit:handelRePassword
    });




  return  <div className=' fixeW  text-end  vh-100 d-flex justify-content-center align-items-center '>

  <form className=' w'  onSubmit={formik.handleSubmit}>
  <h2 className='mb-5'>تأكيد رمز الدخول</h2>

  {messageError.length >0?<div className="text-danger " role="alert">
  لقد قمت بأدخال كود تفعيل خاطئ</div>:null}


<label  className=' mb-2 ps-5 text-end  mt-4' htmlFor="otp">   تم ارسال كود التفعيل لهاتفك {localStorage.getItem("phoneNumber")} </label>
<input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.otp} placeholder=' اكتب كود التفعيل' className='form-control mb-2 text-end ' type="number" name="otp" id="otp" />
{formik.errors.otp && formik.touched.otp?
      <div className="text-danger small" role="alert">
     {formik.errors.otp}
    </div>:null}




<div className="item text-center">

<button  className='px-4 mt-3  mainButton rounded-2 py-1   mb-2 text-center w-100 ' type="submit"> تـأكــيد </button>
<p >   هل تذكرة كلمة المرور الأن ؟ <Link   to="/login" className='colorDef text-decoration-none '>   الي الخلف</Link>  </p>

</div>




  </form>

  </div>
}
