import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Dashboard/NavBar'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Cookie from "cookie-universal";

export default function Packages() {
let [ isloading , setisloading] = useState(false)  
const [ userError , setuserError] = useState('')  
//useState stor All Packages 
  const [allPackages, setallPackages] = useState([]);
        // Cookies
        const cookie = Cookie();
  //get all  Packages axios
  
    async function getpackages() {

      if (cookie.get("solom")!=null) {
    const token = cookie.get("solom");
    let {data}= await  axios.get("http://66.45.248.247:8000/payment/packages/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    
    setallPackages(data);
  }
  }
 //onlinePayment 
async function onlinePayment(packagesId) {
  setisloading(true)
  localStorage.setItem("packageId",packagesId)
  if (cookie.get("solom") != null) {
    const token = cookie.get("solom");


    try {
      let response = await axios.post("http://66.45.248.247:8000/payment/createinvoice/", {
        package_id: packagesId,  // أضف packagesId إلى الجسم (body)
      }, {
        headers: {
          // /86f04a3f99b2f5c4a74b751ea60c4ebb61f55b64	
          //0839abf1a5cd655d1c1096eaf56526c8504396df
          Authorization: `Token ${token}`,
        },
      });

      if (response?.data?.type === 'success') {
        console.log(response.data.type);
    setisloading(false)
        window.location.href=response.data.url;
      }else{
    setisloading(false)

        setuserError("حاول لاحقا")
      }
    } catch (error) {
    setisloading(false)
    setuserError("حاول لاحقا")

      // console.error("Error:", error);
    }
  }
}


  //call
    useEffect(() => {
      getpackages();
    }, []);

// console.log(allPackages);
  return <div className=''>
   <Navbar />
   <div className=" bg-light py-5 container-fluid">
   {userError.length > 0? <div className="alert w-25 text-center alert-danger">
   حدث خطأ أثناء إنشاء الفاتورة، برجاء التواصل مع الدعم
</div>:""}
    <div className="row gx-4 mx-3">
        <h3 className='fw-light fs-4'>باقــات مالك مسـكنـي الاسـاسـية</h3>
        <p>..اختر الباقة التي تناسب ميزانيتك، واحصل على نتائج فورية</p>
        
       
        
        
        {allPackages.map((Package,index)=>
        
        <div key={index} className="col-md-4 pt-3 ">
        <h5 className='text-center fw-light  '>باقــة {Package.ads_number} اعـلان</h5>
        <div className="item bg-white p-3 rounded-3 shadow">
            <p className='text-center mainColor fs-4 fw-light text-shad'> {Package.price} جنية سنويأ  </p>
            {Package.notes===null? <p  className='fw-light mainFont'><i className="fa-solid mainColor fs-4 ms-2  fa-circle-check"></i> لا يوجد مميزات </p> :Package.notes}

           
            
            <div className="button  my-4 text-center">
            <button onClick={(()=>onlinePayment(Package.id) )} className=" mainbutton py-2 rounded-3 w-50 px-5 ">
            {isloading===true?<i className='fas fa-spin fa-spinner'></i>:' اشترك الان'}
           
            </button>
          </div>
        </div>
    </div>
        
        )}
       
       
       
        <div className="button  my-4 text-center">
                <Link to='/terms' className=" text-decoration-none scButton py-2 rounded-4  px-5 ">
                الأحكام والشروط
                </Link>
              </div>
       
        
    </div>
   </div>
  
  
  
  
  </div>
}
