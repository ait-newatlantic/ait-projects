import React from "react";
import imgsrc from "../../assets/img/ait_logo.jpg";

export default function NavigationBar() {
  return (
    <nav className="container navbar navbar-expand-lg navbar-light">
      <a className="navbar-brand" href="#">
        <img src={imgsrc} alt="logo" height="48px" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Trang chủ <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Trang
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="https://www.newatlantic.vn/">
                NewAtlantic
              </a>
              <a className="dropdown-item" href="http://kamazvietnam.com.vn/">
                KamazVN
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
