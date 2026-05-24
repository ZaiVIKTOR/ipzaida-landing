import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Modal } from "../Modal/Modal";
import {
  FaCar,
  FaMapMarkerAlt,
  FaRubleSign,
  FaClock,
  FaShieldAlt,
  FaTools,
  FaPhoneAlt,
} from "react-icons/fa";
import { GiSpeedometer, GiPriceTag } from "react-icons/gi";
import { MdOutlineCheckCircle, MdOutlineCalculate } from "react-icons/md";
import styles from "./PriceBlock.module.css";

export const PriceBlock = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  // Декоративные элементы
  const decorativeElements = [
    {
      id: 1,
      type: "square",
      size: 50,
      x: 3,
      y: 8,
      color: "#2dca72",
      rotation: 0,
      speed: 0.04,
      opacity: 0.15,
    },
    {
      id: 2,
      type: "diamond",
      size: 40,
      x: 88,
      y: 15,
      color: "#825EEE",
      rotation: 45,
      speed: 0.05,
      opacity: 0.12,
    },
    {
      id: 3,
      type: "square",
      size: 35,
      x: 12,
      y: 40,
      color: "#FF761B",
      rotation: 15,
      speed: 0.035,
      opacity: 0.13,
    },
    {
      id: 4,
      type: "diamond",
      size: 45,
      x: 92,
      y: 65,
      color: "#588FFF",
      rotation: 45,
      speed: 0.045,
      opacity: 0.12,
    },
    {
      id: 5,
      type: "square",
      size: 30,
      x: 6,
      y: 78,
      color: "#873600",
      rotation: 25,
      speed: 0.03,
      opacity: 0.15,
    },
    {
      id: 6,
      type: "diamond",
      size: 25,
      x: 22,
      y: 25,
      color: "#588FFF",
      rotation: 45,
      speed: 0.038,
      opacity: 0.12,
    },
    {
      id: 7,
      type: "square",
      size: 20,
      x: 68,
      y: 32,
      color: "#2dca72",
      rotation: 0,
      speed: 0.032,
      opacity: 0.14,
    },
    {
      id: 8,
      type: "diamond",
      size: 35,
      x: 78,
      y: 82,
      color: "#825EEE",
      rotation: 45,
      speed: 0.042,
      opacity: 0.11,
    },
    {
      id: 9,
      type: "square",
      size: 12,
      x: 45,
      y: 12,
      color: "#FF761B",
      rotation: 0,
      speed: 0.025,
      opacity: 0.18,
    },
    {
      id: 10,
      type: "diamond",
      size: 10,
      x: 58,
      y: 55,
      color: "#2dca72",
      rotation: 45,
      speed: 0.022,
      opacity: 0.16,
    },
    {
      id: 11,
      type: "square",
      size: 15,
      x: 35,
      y: 70,
      color: "#588FFF",
      rotation: 20,
      speed: 0.028,
      opacity: 0.15,
    },
    {
      id: 12,
      type: "diamond",
      size: 8,
      x: 82,
      y: 45,
      color: "#873600",
      rotation: 45,
      speed: 0.018,
      opacity: 0.2,
    },
  ];

  const pricePlans = [
    {
      id: 1,
      title: "Выезд специалиста",
      subtitle: "Осмотр объекта · Консультация",
      price: "5 000",
      priceNote: "₽",
      features: [
        "Осмотр объекта",
        "Профессиональная консультация",
        "Срок выезда: 1-3 дня",
        "Бесплатный повторный выезд",
      ],
      icon: <FaCar size={50} />,
      color: "#2dca72",
      popular: false,
    },
  ];

  const additionalInfo = [
    {
      label: "Выезд в пределах МКАД",
      value: "5 000 ₽",
      icon: <FaMapMarkerAlt />,
    },
    {
      label: "Выезд за МКАД до 50 км",
      value: "7 500 ₽",
      icon: <GiSpeedometer />,
    },
    { label: "Выезд за МКАД от 50 км", value: "договорная", icon: <FaCar /> },
    { label: "Срочный выезд (24 часа)", value: "+50%", icon: <FaClock /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
    }),
    hover: {
      y: -10,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section ref={sectionRef} className={styles.priceSection} id="price">
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
          <h2 className={styles.title}>Выезд на объект</h2>
          <p className={styles.subtitle}>
            Профессиональный выезд специалиста для осмотра, консультации и
            составления сметы
          </p>
        </motion.div>

        {/* Ценовые карточки */}
        <motion.div
          className={styles.priceCards}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {pricePlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`${styles.priceCard} ${plan.popular ? styles.popular : ""}`}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
            >
              {plan.popular && (
                <div className={styles.popularBadge}>
                  <FaTools />
                  <span>Популярный</span>
                </div>
              )}
              <div className={styles.cardIcon} style={{ color: plan.color }}>
                {plan.icon}
              </div>
              <h3 className={styles.cardTitle}>{plan.title}</h3>
              <p className={styles.cardSubtitle}>{plan.subtitle}</p>
              <div className={styles.price}>
                <span className={styles.priceValue}>{plan.price}</span>
                <span className={styles.priceNote}>{plan.priceNote}</span>
              </div>
              <ul className={styles.features}>
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <MdOutlineCheckCircle className={styles.checkIcon} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleOpenModal("visit")}
                className={styles.orderButton}
              >
                Заказать выезд
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div
          className={styles.additionalInfo}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className={styles.additionalTitle}>
            Стоимость выезда по регионам
          </h3>
          <div className={styles.infoGrid}>
            {additionalInfo.map((info, index) => (
              <div key={index} className={styles.infoCard}>
                <div className={styles.infoIcon}>{info.icon}</div>
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>{info.label}</div>
                  <div className={styles.infoValue}>{info.value}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Призыв к действию */}
        <motion.div
          className={styles.ctaBlock}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className={styles.ctaContent}>
            <FaPhoneAlt className={styles.ctaIcon} />
            <div className={styles.ctaText}>
              <h4>Остались вопросы?</h4>
              <p>Позвоните нам, и мы ответим на все ваши вопросы</p>
            </div>
            <button className={styles.ctaButton}>+7 (991) 261-06-40</button>
          </div>
        </motion.div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonType={modalType}
      />
    </section>
  );
};
