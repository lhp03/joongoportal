import { Container } from "@mui/system";
import React, { useEffect } from "react";

const KaKaoAdfit = (props) => {
  useEffect(() => {
    let ins = document.createElement("ins");
    let scr = document.createElement("script");
    ins.className = "kakao_ad_area";
    ins.style = "display:none width:100%";
    scr.async = "true";
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    ins.setAttribute("data-ad-width", "728");
    ins.setAttribute("data-ad-height", "90");
    ins.setAttribute("data-ad-unit", props.unit_id);

    document.querySelector(`.adfit_${props.unit_id}`).appendChild(ins);
    document.querySelector(`.adfit_${props.unit_id}`).appendChild(scr);
  }, []);
  return (
    <Container
      sx={{ m: 2 }}
      component={"div"}
      className={`adfit_${props.unit_id}`}
    ></Container>
  );
};

export default KaKaoAdfit;
