import React, { useEffect, useState } from "react"
import AuthService from "../../services/auth.service";
import { FaBars } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

export default function Test({ toggle }) {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showEmployeeBoard, setShowEmployeeBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const scrollProps = {
    activeClass: "border-solid border-b-4 border-green-500",
    smooth: true,
    duration: 500,
    spy: true,
    exact: "true",
    offset: -80,
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowEmployeeBoard(user.roles.includes("ROLE_EMPLOYEE"))
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
  return (
    <>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <NavLogo to="/" onClick={toggleHome}>
            AIT
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to="about" {...scrollProps}>
                Giới thiệu
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="discover" {...scrollProps}>
                Khám phá
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="services" {...scrollProps}>
                Chức năng
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="signup" {...scrollProps}>
                Hỗ trợ
              </NavLinks>
            </NavItem>
          </NavMenu>
          {showModeratorBoard && (
            <NavBtn>
              <NavBtnLink to="/dashboard">Dashboard</NavBtnLink>
            </NavBtn>
          )}
          {showAdminBoard && (
            <NavBtn>
              <NavBtnLink to="/dashboard">Dashboard</NavBtnLink>
            </NavBtn>
          )}
          {currentUser ? (
            <NavBtn>
              <NavBtnLink to="/login" onClick={logOut}>Đăng Xuất</NavBtnLink>
            </NavBtn>
          ) : (
              <NavBtn>
                <NavBtnLink to="/login">Đăng nhập</NavBtnLink>
              </NavBtn>
            )}
        </NavbarContainer>
      </Nav>
    </>
  )
}