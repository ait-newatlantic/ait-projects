import React from "react";

import Icon1 from "../../images/img1.svg";
import Icon2 from "../../images/img2.svg";
import Icon3 from "../../images/img3.svg";
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "./ServicesElements";

function Services() {
  return (
    <ServicesContainer id="services">
      <ServicesH1>Web-app</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Giảm thiểu công việc</ServicesH2>
          <ServicesP>
            Phần mềm giúp công việc báo cáo đồng bộ và chính xác.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>Nhanh và tiện lợi</ServicesH2>
          <ServicesP>
            Phần mềm có thể truy cập ở mọi nơi.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>Hỗ trợ 24/7</ServicesH2>
          <ServicesP>
            Nhân viên kỹ thuật hỗ trợ nhiệt tình.
          </ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
}

export default Services;
