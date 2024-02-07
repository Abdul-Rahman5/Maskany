import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Cookie from "cookie-universal";


export default function Confirm() {
let [ isloading , setisloading] = useState(false)  
    const [subscription, setsubscription] = useState(0);
    const [error, seterror] = useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const idUrl = searchParams.get('id');
    console.log(idUrl);
      // Cookies
  const cookie = Cookie();


   let navigate= useNavigate();
/*


https://accept.paymobsolutions.com/api/acceptance/mpgs_secure_callback/get_acs_page?token=ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrbHVkR1ZuY21GMGFXOXVWVzVwY1hWbFVtVm1JaXdpY21WbVgzQnJJam80T1RFNU1qRTNNeXdpWlhod0lqb3hOekEzTVRRME9Ua3hmUS4zdl9NLXpyNWZQaUVGU05fLVdpWWQ4cWFHUmNRRjllcTRqWGczSlQyQzRzOW03ZUQzVGJUZVB6TlF5LTR3R2VaejZKVmVSS3J4TXJ2aUUyOVJQOGFodw==&init=true
*/


async function confirmPay() {
    setisloading(true);
    const token = cookie.get("solom");
   let packageId= localStorage.getItem("packageId")
    // Assuming you have a function or method to retrieve the authentication token
  
    try {
      const payload = {
        package_id: packageId,
        txn_id: idUrl,
        subscription_id: subscription
      };
  
      // Adding Authorization header to the request
      const {data} = await axios.post('http://66.45.248.247:8000/payment/confirmtxn/', payload, {
        headers: {
          'Authorization': `Token  ${token}`
        }
      });
  
      console.log('API Response:', data);
  
      if (data.type === 'success') {
        setisloading(false);
        navigate("/PaymentCompleted");
      } else {
        setisloading(false);
        seterror("خطا في عمليه الدفع الرجاء المحاوله لاحقا");
      }
    } catch (error) {
      setisloading(false);
      seterror("خطا في عمليه الدفع الرجاء المحاوله لاحقا");
      console.error('API Request Failed:', error.message);
    }
  }


  return <div className="">
  <div className="layout"></div>

  <div className=" row  d-flex justify-content-center     text-end">

    <div className="boxInFor col-md-4   pb-3  bg-body text-center px-4 pt-5 rounded-2 shadow ">
       {error? <div className="alert alert-danger"> {error} </div>:''}
       
        {/* error */}
      <i
        className="fa fa-check-circle colorDef fa-3x"
        aria-hidden="true"
      ></i>
      <p className="m-0 fs-4 mb-3"> تاكيد عمليه الدفع   </p>
      {isloading===true?<i className='fas fa-spin fa-spinner'></i>: <Link
      onClick={()=>confirmPay()}
        className="px-4  mainButton rounded-2 py-1   mb-2 text-center w-50 "
        type="submit"
      >
تاكيد
      </Link>}

     
    </div>

  </div>

  <div className="fixeW m-auto pt-5 text-end mt-5 layer">
    <div className="  py-5 container-fluid">
      <div className="row gx-4 mx-3">
     

      
      </div>
    </div>
  </div>
</div>
}
