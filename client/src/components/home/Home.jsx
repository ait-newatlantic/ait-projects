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
              <h3>Chinh phục mọi nẻo đường</h3>
              <hr />
              <button type="button" class="btn btn-primary" href="https://www.facebook.com/newait.kamaz">
                Facebook
              </button>{" "}
              <button type="button" class="btn btn-danger" href="https://www.youtube.com/channel/UCyDJ_4eE0k7R66dns8WZZWg">
                Youtube
              </button>{" "}
              <button type="button" class="btn btn-warning" href="https://newatlantic.vn/">
                NewAIT
              </button>{" "}
            </form>
          </div>
        </div>
      </div>
      <ParticlesBg color="#97caef" num={200} type="cobweb" bg={true} />
    </>
  );
}
