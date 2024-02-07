import { Button, Container, Dropdown } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./NavBarStyle.css";
import React, { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaProjectDiagram,
  FaUserCircle,
  FaHeart,
  FaUserAlt,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";

export default function Navbar() {
  const [showAll, setShowAll] = useState(true);

  // Navigate
  const navigate = useNavigate();
  const nav = window.location.pathname;

  // Cookie
  const cookie = Cookie();

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const handleLogout = () => {
    // Delete all tokens
    cookie.remove("solom");
    cookie.remove("isVerified");
    navigate("/login");
  };

  return (
    <Container>
      <nav>
        <div className="logo">
          <Link to={"/"}>
            <img src={require("../../Assets/Images/logo.png")} alt="logo" />
          </Link>
        </div>
        <div className="content">
          <div className="search">
            <NavLink
              activeclassname="active-link"
              to={"/search"}
              className={() =>
                "searchBtn" + (nav === "/search" ? " active-link" : "")
              }
              onClick={handleToggle}
            >
              بحث
              <FaSearch
                className={() =>
                  "search-icon" + (nav === "/search" ? " active-link" : "")
                }
              />
            </NavLink>
            <select>
              <option id="default" defaultValue={"default"} disabled></option>
              <option>بحث عام</option>
              <option>عقارات</option>
            </select>
          </div>
          
          <NavLink
            activeclassname="active-link"
            className={() =>
              "searchWithMap" + (nav === "/map" ? " active-link" : "")
            }
            to={"/map"}
          >
            <FaMapMarkerAlt
              className={() =>
                "search-icon" + (nav === "/map" ? " active-link" : "")
              }
            />
            البحث بالخريطة
          </NavLink>
          <NavLink
            activeclassname="active-link"
            className={() =>
              "packages" + (nav === "/packages" ? " active-link" : "")
            }
            to={"/packages"}
          >
            <FaProjectDiagram
              className={() =>
                "search-icon" + (nav === "/packages" ? " active-link" : "")
              }
            />
            الباقات
          </NavLink>
          <Link to={"/support"} className="support">مساعدة؟</Link>
          <Dropdown as={ButtonGroup}>
            <div className="dropDown">
              <Button className="userIcon">
                <FaUserCircle className="user-icon" />
              </Button>
              <Dropdown.Toggle
                className="toggleBtn"
                id="dropdown-split-basic"
              />
            </div>
            <Dropdown.Menu>
              <Dropdown.Item id="phoneOnly">
                <Link to={"/search"}>
                  البحث <FaSearch />
                </Link>
              </Dropdown.Item>
              <Dropdown.Item id="phoneOnly">
                <Link to={"/map"}>
                  الإيجار اليومي <FaCalendarAlt />
                </Link>
              </Dropdown.Item>
              <Dropdown.Item id="phoneOnly">
                <Link to={"/settings"}>
                  الخريطة <FaMapMarkerAlt />
                </Link>
              </Dropdown.Item>
              <Dropdown.Item id="phoneOnly">
                <Link to={"/settings"}>
                  الباقات <FaProjectDiagram />
                </Link>
              </Dropdown.Item>
              {/* <p className="lead fs-6 text-end px-1">Mohamed Ahmed</p>
              <div className="time d-flex justify-content-between">
                <p className="lead  itemM">سجل منذ </p>
                <p className="lead itemM">9/24/2023</p>
                <p className="lead itemT">تعديل البيانات</p>
              </div> */}
              {/* border-bottom border-2 mb-2  */}
              {/* <p className="lead fs-6 text-end ">نشــاطـاتــي</p> */}
              
              <hr id="phoneOnly" />
              <Dropdown.Item>

                <Link to={"/settings"}>
                  حسابي <FaUserAlt />
                </Link>



              </Dropdown.Item>
              <Dropdown.Item>
                <Link  to={"/favourites"}>
                  مفضلتي <FaHeart />
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                style={{ color: "#fd7571" }}
                onClick={() => handleLogout()}
              >
                تسجيل الخروج <FiLogOut />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    </Container>
  );
}
