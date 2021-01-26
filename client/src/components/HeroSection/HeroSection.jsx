import React, { useState } from "react";

import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "./HeroElements";
import { Button } from "../ButtonElements";
import video from "../../static/videos/video.mp4"

function HeroSection() {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover((prev) => !prev);
  };

  return (
    <>
      <HeroContainer id="home">
        <HeroBg>
          <VideoBg autoPlay loop muted src={video} type="video/mp4" />
        </HeroBg>
        <HeroContent>
          <HeroH1>PHẦN MỀM DOANH NGHIỆP AIT</HeroH1>
          <HeroP>
            CHÚC MỪNG NĂM TÂN SỬU 2021
          </HeroP>
          <HeroP>
            An Khang - Thịnh Vượng
          </HeroP>
          <HeroBtnWrapper>
            <Button
              to="signup"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
              primary
              dark
              onMouseEnter={onHover}
              onMouseLeave={onHover}
            >
              Tìm hiểu thêm {hover ? <ArrowForward /> : <ArrowRight />}
            </Button>
          </HeroBtnWrapper>
        </HeroContent>
      </HeroContainer>
    </>
  );
}

export default HeroSection;
