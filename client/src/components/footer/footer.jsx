import style from "./footer.module.css";
const Footer = () => {
  return (
    <footer className={style.Footer}>
      <div className={style.container_foot}>
        <div className={style.colum1}>
          <p className={style.colum1_p}>Mas informacion sobre Tecno Store SC</p>
          <span className={style.colum1_spn}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            commodi modi nisi quis debitis laborum dicta laudantium laboriosam
            quod et aspernatur obcaecati sequi aperiam officiis eaque ut, ex
            consectetur quo!
          </span>
        </div>
        <div className={style.column3}>
          <p className={style.colum1_p}>Informacion de contactos</p>
          <div className={style.row2}>
            <img src="" alt="" />
            <p>Calle Av. America 888</p>
          </div>
          <div className={style.row2}>
            <img src="" alt="" />
            <p>+54 343 531-4078</p>
          </div>
          <div className={style.row2}>
            <img src="" alt="" />
            <p>TecnoStoreCS@gmail.com</p>
          </div>
        </div>
        <div className={style.column2}>
          <p className={style.colum1_p}>Redes Sociales</p>
          <div className={style.gd}>
            <div className={style.row}>
              <img src="" alt="" />
              <a href="https://github.com/TomiB98">Salta</a>
            </div>
            <div className={style.row}>
              <img src="" alt="" />
              <a href="https://github.com/TomasPino5">Pino</a>
            </div>
            <div className={style.row}>
              <img src="" alt="" />
              <a href="https://github.com/KayitaC2024">Clua</a>
            </div>
            <div className={style.row}>
              <img src="" alt="" />
              <a href="https://github.com/cottier55">Sol</a>
            </div>
            <div className={style.row}>
              <img src="" alt="" />
              <a href="https://github.com/AldoTorrez">Aldo</a>
            </div>
            <div className={style.row}>
              <img src="" alt="" />
              <a href="https://github.com/MarianoMenseguez">Mariano</a>
            </div>
            <div className={style.row}>
              <img src="" alt="" />
              <a href="https://github.com/SebastianBeltzer">Seba</a>
            </div>
          </div>
        </div>
      </div>
      <div className={style.container_footer}>
        <div className={style.copy}>
          © 2018 Todos los Derechos Reservados |{" "}
          <a href="#">Henry Corte 39a Grupo 07</a>
        </div>
        <div className={style.info}>
          <a href="">Informacion Compañia</a> |{" "}
          <a href="">Privacion y Politica</a> |{" "}
          <a href="">Terminos y Condiciones</a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
