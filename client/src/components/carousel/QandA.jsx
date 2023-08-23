import React, { useState } from "react";
import style from "./QandA.module.css";
import { useSelector } from "react-redux";

const FaqSection = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const darkMode = useSelector((state) => state.darkMode);

  const questionsAndAnswers = [
    {
      question: "¿Cuál es la garantía que ofrecen para sus productos?",
      answer:
        "En Tecno Store CS, nos enorgullece ofrecer una garantía sólida en todos nuestros productos. Nuestra garantía cubre defectos de fabricación y mal funcionamiento. Si tienes algún problema, estaremos aquí para respaldarte y proporcionarte la mejor solución posible.",
    },
    {
      question:
        "¿Cómo puedo estar seguro de que estoy comprando productos genuinos y de calidad?",
      answer:
        "Comprendemos la importancia de la autenticidad y la calidad. En Tecno Store CS, trabajamos directamente con fabricantes y distribuidores confiables. Todos nuestros productos son originales y pasan por rigurosos controles de calidad antes de llegar a tus manos, brindándote tranquilidad en cada compra.",
    },
    {
      question:
        "¿Ofrecen opciones de financiamiento o planes de pago a plazos?",
      answer:
        "¡Sí, lo hacemos! En Tecno Store CS, deseamos que tengas acceso sencillo a la tecnología que amas. Ofrecemos opciones de financiamiento flexibles y planes de pago a plazos para adaptarnos a tus necesidades y presupuesto. Siempre nos esforzamos por hacer que tu experiencia de compra sea conveniente y accesible.",
    },
    {
      question: "¿Cómo funciona el proceso de envío y entrega de productos?",
      answer:
        "Nuestro proceso de envío es seguro y confiable. Trabajamos con servicios de mensajería de renombre para garantizar que tus productos lleguen de manera segura y puntual. Una vez que realices tu pedido, recibirás actualizaciones de seguimiento para que puedas estar al tanto de la ubicación de tu paquete. Tu satisfacción y comodidad son nuestras prioridades.",
    },
  ];

  return (
    <div className={darkMode ? style.faqSection : style.faqSection}>
      <div className={darkMode ? style.imageContainer : style.imageContainer}>
        <img
          src="https://img.freepik.com/foto-gratis/close-up-retrato-atractiva-joven-aislada_273609-36523.jpg"
          alt=""
        />
      </div>
      <div
        className={
          darkMode ? style.questionsContainerdarkMode : style.questionsContainer
        }
      >
        {questionsAndAnswers.map((item, index) => (
          <div
            key={index}
            className={
              darkMode
                ? `${style.questiondarkMode} ${
                    expandedQuestion === index ? style.expanded : ""
                  }`
                : `${style.question} ${
                    expandedQuestion === index ? style.expanded : ""
                  }`
            }
            onClick={() =>
              setExpandedQuestion(expandedQuestion === index ? null : index)
            }
          >
            <p><strong>{item.question}</strong></p>
            <div className={darkMode ? style.answerdarkMode : style.answer}>
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
