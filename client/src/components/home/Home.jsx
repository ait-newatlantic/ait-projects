import React from "react";
import "./style.css";
import ParticlesBg from "particles-bg";
import Slider from "../slider/slide"
import { Button } from "react-bootstrap";

export default function Home() {

  return (
    <>
      <div className="container h-100">
        <div className="d-flex h-100 text-center align-items-center">
          <div className="w-100 text-white">
            <form className="item-center">
              <h1>CÔNG TY CỔ PHẦN TÂN ĐẠI TÂY DƯƠNG</h1>
              <h5>Phần mềm doanh nghiệp AIT</h5>
              <hr />
              <a href="/about">
                <button type="button" class="btn btn-warning">
                  Tìm hiểu thêm
              </button>{" "}
              </a>
            </form>
          </div>
        </div>
      </div>
      {/* <ParticlesBg color="#97caef" num={200} type="cobweb" bg={true} /> */}
    </>
  );
}
