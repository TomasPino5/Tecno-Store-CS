import style from "./footer.module.css";
const Footer = () => {
  return (
    <footer className={style.Footer}>
      <div className={style.container_foot}>
        <div className={style.colum1}>
          <p className={style.colum1_p}>Mas informacion sobre Tecno Store SC</p>
          <span className={style.colum1_spn}>
          ¡Descubre la tecnología en su máxima expresión en Tecno Store C! Encuentra los últimos smartphones, auriculares de alta calidad y accesorios esenciales, todo en un solo lugar. Tu destino definitivo para mantenerte conectado y disfrutar al máximo de tus dispositivos. ¡Bienvenido a la revolución tecnológica!
          </span>
        </div>
        <div className={style.column3}>
          <p className={style.colum1_p}>Informacion de contactos</p>
          <div className={style.row2}>
            <img src="https://i.ibb.co/WvGMRvx/ubicacion-logo.png" alt="" />
            <p>Rosario-Santa Fe-Argentina</p>
          </div>
          <div className={style.row2}>
            <img src="https://i.ibb.co/4VJwHrg/whatsapp-logo.png" alt="" />
            <p>+54 341 658-6272</p>
          </div>
          <div className={style.row2}>
            <img src="https://i.ibb.co/nCbxwm9/gmail-icono.png" alt="" />
            <p>tecnostorecs55@gmail.com</p>
          </div>
        </div>
        <div className={style.column2}>
          <p className={style.colum1_p}>Redes Sociales</p>
          <div className={style.gd}>
            <div className={style.row}>
              <img src="https://i.ibb.co/ynz3ySx/ico-github.png" alt="" />
              <a href="https://github.com/TomiB98">Tomas-Baldi</a>
            </div>
            <div className={style.row}>
              <img src="https://i.ibb.co/ynz3ySx/ico-github.png" alt="" />
              <a href="https://github.com/TomasPino5">Tomas-Pino</a>
            </div>
            <div className={style.row}>
              <img src="https://i.ibb.co/ynz3ySx/ico-github.png" alt="" />
              <a href="https://github.com/KayitaC2024">Claudia-Torres</a>
            </div>
            <div className={style.row}>
              <img src="https://i.ibb.co/ynz3ySx/ico-github.png" alt="" />
              <a href="https://github.com/cottier55">Solange-Cottier</a>
            </div>
            <div className={style.row}>
              <img src="https://i.ibb.co/ynz3ySx/ico-github.png" alt="" />
              <a href="https://github.com/AldoTorrez">Aldo-Torrez</a>
            </div>
            <div className={style.row}>
              <img src="https://i.ibb.co/ynz3ySx/ico-github.png" alt="" />
              <a href="https://github.com/MarianoMenseguez">Mariano-Mesenguez</a>
            </div>
            <div className={style.row}>
              <img src="https://i.ibb.co/ynz3ySx/ico-github.png" alt="" />
              <a href="https://github.com/SebastianBeltzer">Sebastian-Ramos</a>
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
