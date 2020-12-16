import React from "react";
import "./style.css";
import ParticlesBg from "particles-bg";

export default function Home() {

  return (
    <div className="main">
      <>
        <ParticlesBg color="#97caef" num={200} type="cobweb" bg={true} />
      </>
      <div className="row banner">
        <div className="banner-text">
          <h1 className="responsive-headline"><strong>CÔNG TY CỔ PHẦN TÂN ĐẠI TÂY DƯƠNG</strong></h1>
          <h3>Phần mềm nhập liệu và phân tích</h3>
          <hr />
          <ul className="social">
            <li>
              <a href="https://www.newatlantic.vn/" class="btn btn-warning btn-lg" role="button" aria-disabled="true">NewAtlantic</a>
            </li>
            <li>
              <a href="#" class="btn btn-info btn-lg" role="button" aria-disabled="true">Hướng dẫn</a>
            </li>
            <li>
              <a href="https://www.facebook.com/newait.kamaz/?view_public_for=108681160997508" class="btn btn-primary btn-lg" role="button" aria-disabled="true">Facebook</a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UCyDJ_4eE0k7R66dns8WZZWg" class="btn btn-danger btn-lg" role="button" aria-disabled="true">Youtube</a>
            </li>
          </ul>
        </div>
      </div>
      {/* <Slider /> */}
    </div>
  );
}
