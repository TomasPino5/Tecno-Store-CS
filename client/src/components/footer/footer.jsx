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
          <p className={style.row2}>Direccion</p>
          <p className={style.row2}>Num</p>
          <p className={style.row2}>Gmail</p>
        </div>
        <div className={style.column2}>
          <p className={style.colum1_p}>Redes Sociales</p>

          <div className={style.row}>
            <a href="#">Salta</a>
          </div>
          <div className={style.row}>
            <img src="" alt="" />
            <a href="#">Pino</a>
          </div>
          <div className={style.row}>
            <img src="" alt="" />
            <a href="#">Clua</a>
          </div>
          <div className={style.row}>
            <img src="" alt="" />
            <a href="#">Sol</a>
          </div>
          <div className={style.row}>
            <img src="" alt="" />
            <a href="#">Aldo</a>
          </div>
          <div className={style.row}>
            <img src="" alt="" />
            <a href="#">Mariano</a>
          </div>
          <div className={style.row}>
            <img src="" alt="" />
            <a href="#">Seba</a>
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
