import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaMinus,
  FaQuestionCircle,
  FaTools,
  FaShieldAlt,
  FaClock,
  FaRubleSign,
  FaCar,
  FaWifi,
  FaVideo,
} from "react-icons/fa";
import { MdOutlineSecurity, MdOutlineSettings } from "react-icons/md";
import { GiEntryDoor } from "react-icons/gi";
import styles from "./FAQ.module.css";
import { Modal } from "../Modal/Modal";

export const FAQ = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [openItems, setOpenItems] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("contact");

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Эффект параллакса
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleItem = (id) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const faqItems = [
    {
      id: 1,
      question: "Какие слаботочные системы вы монтируете?",
      answer:
        'Мы выполняем полный комплекс работ по монтажу структурированных кабельных систем (СКС), систем охранного телевидения (СОТ), систем контроля и управления доступом (СКУД), автоматизированных систем учёта энергоресурсов (АСКУЭ), автоматизации управления (АСУД), видеонаблюдения и систем "Умный дом".',
      icon: <FaTools size={24} />,
    },
    {
      id: 2,
      question: "Сколько стоит выезд специалиста на объект?",
      answer:
        "Выезд специалиста в пределах МКАД - 5 000 ₽. При выезде за МКАД стоимость составляет 7500 ₽ до 50 км, далее стоимость обсуждается индивидуально. При заключении договора на монтаж, стоимость выезда включается в общую смету.",
      icon: <FaCar size={24} />,
    },
    {
      id: 3,
      question: "Как долго длится монтаж слаботочных систем?",
      answer:
        "Сроки монтажа зависят от сложности проекта и объёма работ. В среднем, монтаж СКС для офиса площадью 100-200 кв.м занимает 3-5 дней. Полный комплекс работ по всем системам может занять от 1 до 4 недель. Точные сроки мы определяем после выезда на объект.",
      icon: <FaClock size={24} />,
    },
    {
      id: 4,
      question: "Предоставляете ли вы гарантию на работы?",
      answer:
        "Да, мы предоставляем гарантию на все виды работ. Гарантийный срок на монтажные работы составляет 1 год. На оборудование действует заводская гарантия производителя (обычно 12-36 месяцев). В течение гарантийного срока мы бесплатно устраняем любые неисправности, возникшие по нашей вине.",
      icon: <FaShieldAlt size={24} />,
    },
    {
      id: 5,
      question: "Работаете ли вы с юридическими лицами?",
      answer:
        "Да, мы работаем как с физическими, так и с юридическими лицами. Заключаем официальные договоры, предоставляем закрывающие документы (акты, счета-фактуры).",
      icon: <FaQuestionCircle size={24} />,
    },
    {
      id: 6,
      question: "Как происходит оплата услуг?",
      answer:
        "Система оплаты: предоплата 30%, остальная сумма после завершения каждого этапа работ.",
      icon: <FaRubleSign size={24} />,
    },
    {
      id: 7,
      question: "Какое оборудование вы используете?",
      answer:
        "Мы работаем только с проверенным оборудованием ведущих производителей: D-Link, Cisco, TP-Link, Hikvision, Dahua, Axis, Legrand, Schneider Electric, IEK и других. Подбираем оборудование оптимально под бюджет и задачи заказчика.",
      icon: <MdOutlineSettings size={24} />,
    },
  ];

  // Декоративные элементы
  const decorativeElements = [
    {
      id: 1,
      type: "square",
      size: 55,
      x: 2,
      y: 5,
      color: "#2dca72",
      rotation: 0,
      speed: 0.04,
      opacity: 0.12,
    },
    {
      id: 2,
      type: "diamond",
      size: 45,
      x: 88,
      y: 12,
      color: "#825EEE",
      rotation: 45,
      speed: 0.05,
      opacity: 0.1,
    },
    {
      id: 3,
      type: "square",
      size: 38,
      x: 10,
      y: 38,
      color: "#FF761B",
      rotation: 15,
      speed: 0.035,
      opacity: 0.11,
    },
    {
      id: 4,
      type: "diamond",
      size: 50,
      x: 94,
      y: 68,
      color: "#588FFF",
      rotation: 45,
      speed: 0.045,
      opacity: 0.1,
    },
    {
      id: 5,
      type: "square",
      size: 32,
      x: 7,
      y: 82,
      color: "#873600",
      rotation: 25,
      speed: 0.03,
      opacity: 0.12,
    },
    {
      id: 6,
      type: "diamond",
      size: 28,
      x: 20,
      y: 28,
      color: "#588FFF",
      rotation: 45,
      speed: 0.038,
      opacity: 0.1,
    },
    {
      id: 7,
      type: "square",
      size: 22,
      x: 72,
      y: 35,
      color: "#2dca72",
      rotation: 0,
      speed: 0.032,
      opacity: 0.12,
    },
    {
      id: 8,
      type: "diamond",
      size: 38,
      x: 78,
      y: 78,
      color: "#825EEE",
      rotation: 45,
      speed: 0.042,
      opacity: 0.09,
    },
    {
      id: 9,
      type: "square",
      size: 14,
      x: 42,
      y: 15,
      color: "#FF761B",
      rotation: 0,
      speed: 0.025,
      opacity: 0.15,
    },
    {
      id: 10,
      type: "diamond",
      size: 12,
      x: 60,
      y: 55,
      color: "#2dca72",
      rotation: 45,
      speed: 0.022,
      opacity: 0.14,
    },
    {
      id: 11,
      type: "square",
      size: 18,
      x: 35,
      y: 68,
      color: "#588FFF",
      rotation: 20,
      speed: 0.028,
      opacity: 0.13,
    },
    {
      id: 12,
      type: "diamond",
      size: 10,
      x: 82,
      y: 48,
      color: "#873600",
      rotation: 45,
      speed: 0.018,
      opacity: 0.16,
    },
  ];

  // Варианты анимации для аккордеона
  const accordionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.05 },
    }),
  };

  const answerVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: "easeInOut" },
        opacity: { duration: 0.3, delay: 0.1 },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.2 },
      },
    },
  };

  return (
    <section ref={sectionRef} className={styles.faqSection} id="faq">
      {/* Декоративные элементы */}
      <div className={styles.decorativeContainer}>
        {decorativeElements.map((el) => {
          const offsetX = mousePosition.x * 50 * el.speed;
          const offsetY = mousePosition.y * 50 * el.speed;
          const isDiamond = el.type === "diamond";

          return (
            <div
              key={el.id}
              className={`${styles.decorativeElement} ${isDiamond ? styles.diamond : styles.square}`}
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                width: isMobile ? el.size * 0.6 : el.size,
                height: isMobile ? el.size * 0.6 : el.size,
                backgroundColor: el.color,
                opacity: isMobile ? el.opacity * 0.7 : el.opacity,
                transform: `rotate(${el.rotation}deg) translate(${offsetX}px, ${offsetY}px)`,
                transition: "transform 0.1s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
              }}
            />
          );
        })}
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Часто задаваемые вопросы</h2>
          <p className={styles.subtitle}>
            Ответы на самые популярные вопросы о наших услугах
          </p>
        </motion.div>

        <div className={styles.faqGrid}>
          <div className={styles.faqList}>
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={`${styles.faqItem} ${openItems.includes(item.id) ? styles.open : ""}`}
                custom={index}
                variants={accordionVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleItem(item.id)}
                >
                  <div className={styles.questionIcon}>{item.icon}</div>
                  <span className={styles.questionText}>{item.question}</span>
                  <div className={styles.toggleIcon}>
                    {openItems.includes(item.id) ? <FaMinus /> : <FaPlus />}
                  </div>
                </button>
                <AnimatePresence mode="wait">
                  {openItems.includes(item.id) && (
                    <motion.div
                      className={styles.faqAnswer}
                      variants={answerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className={styles.answerContent}>{item.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Статистика / Контактный блок */}
          <motion.div
            className={styles.statsCard}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={styles.statsIcon}>
              <FaQuestionCircle />
            </div>
            <h3 className={styles.statsTitle}>Остались вопросы?</h3>
            <p className={styles.statsText}>
              Не нашли ответ на свой вопрос? Свяжитесь с нами, и мы поможем
              разобраться
            </p>
            <button
              className={styles.contactButton}
              onClick={() => handleOpenModal("contact")}
            >
              Связаться с нами
            </button>
          </motion.div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonType={modalType}
      />
    </section>
  );
};
