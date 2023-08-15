import { useSelector } from "react-redux";
import style from "./hero.module.css";

export default function Hero() {
  const darkMode = useSelector((state) => state.darkMode); // Agrega esta línea
  // className={darkMode ? style.darkMode : style.lightMode}
  return (
    <div className={style.bgGray50}>
      <div
        className={`${style.mxAuto} ${style.maxW7xl} ${style.py12} ${style.px4} ${style.smPx6} ${style.lgFlex} ${style.lgItemsCenter} ${style.lgJustifyBetween} ${style.lgPy16} ${style.lgPx8}`}
      >
        <h2
          className={`${style.text3xl} ${style.fontBold} ${style.trackingTight} ${style.textGray900} ${style.smText4xl} ${style.textLeft}`}
        >
          <span className={darkMode && style.block}>
            Lo ultimo en Tecnología, lo encuentras aquí,
          </span>
          <br />
          <br />
          <span className={` ${style.textGreen600}`}>TECNO-STORE</span>{" "}
          {/* Cambio de clase de color */}
        </h2>
        <div
          className={`${style.mt8} ${style.flex} ${style.lgMt0} ${style.lgFlexShrink0}`}
        >
          {/* ... */}
        </div>
      </div>
    </div>
  );
}
