import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Dashboard/NavBar";
import 'react-responsive-pagination/themes/classic.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import Cookie from "cookie-universal";

export default function Search() {
  const [UserData, setUserData] = useState([])
  const [categories, setcategories] = useState([]);

  //pagination 
  const items= 7;
  const [current, setCurrent] = useState(1);
  const NPage=Math.ceil(UserData.length/items)
  const startIndex=(current-1)*items;
  const endIndex=startIndex +items;
  const dataPage=UserData.slice(startIndex,endIndex)

  //search 
  const [query, setQuery] = useState('')
  const [rooms, setRooms] = useState(0);
  const [floor, setFloor] = useState(0);
  const [typeSreach, setTypeSreach] = useState('');
  const [AllFillter, setAllFillter] = useState([]);
        // Cookies
        const cookie = Cookie();
        //search
  async function displayData() {

    const token = cookie.get("solom");

    //86f04a3f99b2f5c4a74b751ea60c4ebb61f55b64 ${token}
  let {data}= await  axios.get("http://66.45.248.247:8000/properties/", {
    headers: {
      Authorization: `Token ${token}	`,
    },
  })
  setUserData(data.results);
}
//displaycategories
async function displaycategories() {
  const token = cookie.get("solom");

  let {data}= await  axios.get("http://66.45.248.247:8000/properties/categories/",{
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'multipart/form-data'
    },
  })
  console.log(data.name);
  setcategories(data);
  
}
useEffect(() => {
  displayData()
  displaycategories()
 }, [])


//handelSreach
function handelSreach(values) {
  setRooms(AllFillter.rooms);
  setFloor(AllFillter.floor);
  setAllFillter(values)
  setQuery(typeSreach)
  console.log(floor);
}
//form
let formik=useFormik({
  initialValues:{
  typeS:typeSreach,
  priceFrom:'',
  priceTo:'',
  spaceFrom:'',
  spaceTo:'',
  rooms:rooms,
  floor:floor,
  },onSubmit:handelSreach
  });

  return (
    <>
      <Navbar />
      <div className="categories">
        <button className="btnFilter">الكل</button>
      </div>


          
       

      
      
      <div className="layerSearch  position-fixed d-flex justify-content-center   ">
     
        <div className="row pt-5 overflow-auto  mainSreach d-flex align-items-start mainWith bg-white shadow rounded-3">
       
     
        <div className="col-md-3 px-0 filtter my-4 shadow">
          <div className="searchMore mx-0">
          <p className="text-center  lead mt-2  mb-0">  <i className="fa fa-light fa-location-dot mainColor"></i>  ابحث اكثر </p> 
           <div className="boder mt-1 mainBrdBo  m-auto bg-info text-center"></div>

            <p className="lead boderAll pb-2 mx-0">نوع العقار</p>
          </div>
          <form onSubmit={formik.handleSubmit}>
          
          <div className="type  flex-column ">

          {categories.map((category,index)=>

<div  className="home" key={index}>
            <label  onClick={()=> setTypeSreach(`${category.name.slice(0, 4)}`)} className="radio-container mb-0">
        <input type="radio" name="options" />
        <span className="checkmark mx-2 "></span>
     {category.name}
    </label>
            </div>
          
          
          )}
          </div>

          <div className="price boderAll pb-3 px-3">
            <p>تحديد السعر</p>
            <div className="d-flex align-items-center">

            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.priceFrom} name="priceFrom" className="form-control w-50" placeholder=" من " type="number" />
            <i className="fa-solid fa-minus px-2"></i>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.priceTo} name="priceTo" className="form-control w-50" placeholder="الي " type="number" />
            </div>
          </div>

          <div className="space boderAll pb-3 px-3">
            <p className="pt-2">تحديد المساحة (  م   )</p>
            <div className="d-flex align-items-center">

            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.spaceFrom} name="spaceFrom" className="form-control w-50" placeholder=" من 10" type="number" />
            <i className="fa-solid fa-minus px-2"></i>

            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.spaceTo}  name="spaceTo"  className="form-control w-50" placeholder="الي 100,000" type="number" />
            </div>
          </div>
          
          
          <div className="numberRoms  boderAll pb-3 px-3 ">
            <p className="pt-2">عدد الغرف</p>
            <div className="d-flex align-items-center">
            <Link onClick={()=>setRooms(0)}  className="mainBg text-decoration-none  text-white px-2 mx-3 rounded-3">الكل</Link>

            <input  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rooms} name="rooms"  className="form-control w-50" placeholder="+1 | +2 | +3| +4" type="number" />

            </div>
          </div>
          <div className="numberRoms mb-2  px-3">
            <p className="pt-2">رقم الدور</p>
            <div className="d-flex">
                           <p onClick={()=>setFloor(0)}  className="mainBg text-white text-decoration-none px-2 mx-3 rounded-3">الكل</p>

            <input  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.floor}  name="floor" className="form-control w-50" placeholder="+1 | +2 | +3| +4" type="number" />

            </div>
          </div>
          <div className="bott text-center my-2">

          <button  type="submit" className="mainBg border-0 text-white px-4 py-1 mx-4 rounded-5 text-decoration-none" >بحث الان</button>
          </div>
          <Link onClick={()=> setQuery('')} className="text-danger text-decoration-none fs-6">البحث من جديد</Link>
          </form>

          </div>
         
          <div className="col-md-7">
          <div className="   mb-3 w-75 mt-4 m-auto">
              <input onChange={e =>setQuery(e.target.value)} className="form-control searchInput rounded-3" placeholder="بحث" type="search" />
          </div>
          { dataPage.filter(products=>{
            if (query===''  ) {
              return products
            } else if(products.title.toLowerCase().includes(query.toLowerCase())) {
              return products
            } else if(
              products.price >= AllFillter.priceFrom && products.price < AllFillter.priceTo 
          &&  products.space >= AllFillter.spaceFrom && products.space <= AllFillter.spaceTo
                  ) {
                    if (products.rooms == AllFillter.rooms || rooms==0   ) {
                      if (products.floor == AllFillter.floor || floor==0) {
                        
                        return products
                      }
                      
                    }
            }
          }).map((product)=> <div key={product.id} className=" my-3 d-flex justify-content-between rounded-3  shadow">
              
              <div className=" info bg-body col-md-8 bg-info   text-end p-4">
                
                <h5 className="fs-5">{product.title}            
                </h5>
                <div className="price d-flex justify-content-end">
                  <p className="mx-1 mainColor">{product.price}</p>
                  <p className="mx-3 mainColor">جنية مصري</p>
                </div>

                <div className="iconHotl mainColor">
                  <span>{product.rooms}</span>
                  <i className="fa-solid fa-bed mx-2"></i>
                  <span>{product.bathrooms}</span>

                  <i className="fa-solid fa-bath mx-2"></i>
                  <span>{product.floor}</span>

                  <i className="fa-solid fa-couch mx-2"></i>

                  <span> |{product.space}م² </span>
                </div>
                <div className="info w-100 detils  text-end  d-flex justify-content-end">
                  <p className="">
                  {product.details.split(' ').slice(0,15).join(' ')}
                  </p>
                </div>
              </div>
              <div className="image   col-md-4 ">
                <img
                  className="w-100 mainBoder"
                  src={`http://66.45.248.247:8000${product.images[0].image}/`}
                  alt=""
                />
              </div>
            </div>
          
          )}

          {/* {dataPage.map((product)=> <div key={product.id} className=" my-3 d-flex justify-content-between rounded-3  shadow">
              
              <div className=" info bg-body col-md-8 bg-info   text-end p-4">
                
                <h5 className="fs-5">{product.title}            
                </h5>
                <div className="price d-flex justify-content-end">
                  <p className="mx-1 mainColor">{product.price}</p>
                  <p className="mx-3 mainColor">جنية مصري</p>
                </div>

                <div className="iconHotl mainColor">
                  <span>{product.rooms}</span>
                  <i className="fa-solid fa-bed mx-2"></i>
                  <span>{product.bathrooms}</span>

                  <i className="fa-solid fa-bath mx-2"></i>
                  <span>{product.floor}</span>

                  <i className="fa-solid fa-couch mx-2"></i>

                  <span> |128م² </span>
                </div>
                <div className="info w-100 detils  text-end  d-flex justify-content-end">
                  <p className="">
                  {product.details.split(' ').slice(0,15).join(' ')}
                  </p>
                </div>
              </div>
              <div className="image   col-md-4 ">
                <img
                  className="w-100 mainBoder"
                  src={`http://66.45.248.247:8000${product.images[0].image}/`}
                  alt=""
                />
              </div>
            </div>
          
          )} */}

<div className="d-flex justify-content-center  flex-md-row-reverse mt-4  text-center">
            {
              Array.from({length:NPage},(_,i)=>i+1).map(page =>{
                return   <Link onClick={()=>setCurrent(page)} className="mainColor mx-1 text-center text-decoration-none fs-6">. {page} </Link>
              })
            }
          </div>
        
          
          </div>
          <div className="col-md-2 mt-4 ">
            <Link to={'/'} className="mainColor text-decoration-none fs-2">X</Link>
          </div>
        

          
         
        </div>
      </div>
    </>
  );
}
