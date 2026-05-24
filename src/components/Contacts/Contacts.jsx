import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTelegram,
  FaWhatsapp,
  FaViber,
  FaBuilding,
  FaUserTie,
  FaRegBuilding,
  FaFileAlt,
} from "react-icons/fa";
import { MdOutlineEmail, MdOutlineQrCodeScanner } from "react-icons/md";
import { HiOutlineIdentification } from "react-icons/hi";
import styles from "./Contacts.module.css";

export const Contacts = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);

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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Декоративные элементы
  const decorativeElements = [
    {
      id: 1,
      type: "square",
      size: 60,
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
      size: 50,
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
      size: 42,
      x: 10,
      y: 35,
      color: "#FF761B",
      rotation: 15,
      speed: 0.035,
      opacity: 0.11,
    },
    {
      id: 4,
      type: "diamond",
      size: 55,
      x: 94,
      y: 65,
      color: "#588FFF",
      rotation: 45,
      speed: 0.045,
      opacity: 0.1,
    },
    {
      id: 5,
      type: "square",
      size: 35,
      x: 7,
      y: 80,
      color: "#873600",
      rotation: 25,
      speed: 0.03,
      opacity: 0.12,
    },
    {
      id: 6,
      type: "diamond",
      size: 30,
      x: 22,
      y: 25,
      color: "#588FFF",
      rotation: 45,
      speed: 0.038,
      opacity: 0.1,
    },
    {
      id: 7,
      type: "square",
      size: 25,
      x: 70,
      y: 30,
      color: "#2dca72",
      rotation: 0,
      speed: 0.032,
      opacity: 0.12,
    },
    {
      id: 8,
      type: "diamond",
      size: 40,
      x: 76,
      y: 80,
      color: "#825EEE",
      rotation: 45,
      speed: 0.042,
      opacity: 0.09,
    },
    {
      id: 9,
      type: "square",
      size: 16,
      x: 45,
      y: 12,
      color: "#FF761B",
      rotation: 0,
      speed: 0.025,
      opacity: 0.15,
    },
    {
      id: 10,
      type: "diamond",
      size: 14,
      x: 62,
      y: 52,
      color: "#2dca72",
      rotation: 45,
      speed: 0.022,
      opacity: 0.14,
    },
    {
      id: 11,
      type: "square",
      size: 20,
      x: 38,
      y: 70,
      color: "#588FFF",
      rotation: 20,
      speed: 0.028,
      opacity: 0.13,
    },
    {
      id: 12,
      type: "diamond",
      size: 12,
      x: 85,
      y: 45,
      color: "#873600",
      rotation: 45,
      speed: 0.018,
      opacity: 0.16,
    },
  ];

  const contactInfo = [
    {
      icon: <FaPhoneAlt />,
      label: "Телефон",
      value: "+7 (991) 261-06-40",
      href: "tel:+74950000000",
      action: "call",
    },
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: "ipzaidavs@gmail.com",
      href: "mailto:ipzaidavs@gmail.com",
      action: "copy",
    },
    {
      icon: <FaTelegram />,
      label: "Telegram",
      value: "@zaida_vik",
      href: "https://t.me/zaida_vik",
      action: "link",
    },
  ];

  const workingHours = [
    { days: "Понедельник - Пятница", hours: "09:00 - 20:00" },
    { days: "Суббота", hours: "10:00 - 18:00" },
    { days: "Воскресенье", hours: "Выходной" },
  ];

  const ipData = [
    {
      icon: <FaUserTie />,
      label: "ИП Зайда",
      value: "Индивидуальный предприниматель",
    },
    {
      icon: <HiOutlineIdentification />,
      label: "ИНН",
      value: "634000188563",
      copyable: true,
    },
    {
      icon: <FaRegBuilding />,
      label: "ОГРНИП",
      value: "326632700075492",
      copyable: true,
    },
    {
      icon: <FaFileAlt />,
      label: "Расчётный счёт",
      value: "40802810620000979423",
      copyable: true,
    },
    { icon: <FaBuilding />, label: "Банк", value: "ООО «Банк Точка»" },
    {
      icon: <FaFileAlt />,
      label: "Корр. счёт",
      value: "30101810745374525104",
      copyable: true,
    },
    {
      icon: <HiOutlineIdentification />,
      label: "БИК",
      value: "044525104",
      copyable: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section ref={sectionRef} className={styles.contactsSection} id="contacts">
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
          <h2 className={styles.title}>Контакты</h2>
          <p className={styles.subtitle}>
            Свяжитесь с нами удобным для вас способом
          </p>
        </motion.div>

        <div className={styles.contactsGrid}>
          {/* Левая колонка - контактная информация */}
          <motion.div
            className={styles.contactInfo}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div className={styles.infoCard} variants={itemVariants}>
              <h3 className={styles.cardTitle}>Свяжитесь с нами</h3>
              <div className={styles.contactList}>
                {contactInfo.map((contact, index) => (
                  <div key={index} className={styles.contactItem}>
                    <div className={styles.contactIcon}>{contact.icon}</div>
                    <div className={styles.contactDetails}>
                      <div className={styles.contactLabel}>{contact.label}</div>
                      {contact.action === "copy" ? (
                        <button
                          className={styles.contactValueCopy}
                          onClick={() => copyToClipboard(contact.value)}
                        >
                          {contact.value}
                          <span className={styles.copyHint}>Копировать</span>
                        </button>
                      ) : (
                        <a href={contact.href} className={styles.contactValue}>
                          {contact.value}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Режим работы */}
            <motion.div className={styles.infoCard} variants={itemVariants}>
              <h3 className={styles.cardTitle}>
                <FaClock /> Режим работы
              </h3>
              <div className={styles.workingHours}>
                {workingHours.map((item, index) => (
                  <div key={index} className={styles.hourItem}>
                    <span className={styles.hourDays}>{item.days}</span>
                    <span className={styles.hourTime}>{item.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Правая колонка - данные ИП */}
          <motion.div
            className={styles.ipInfo}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div className={styles.ipCard} variants={itemVariants}>
              <h3 className={styles.cardTitle}>Реквизиты ИП</h3>
              <div className={styles.ipList}>
                {ipData.map((item, index) => (
                  <div key={index} className={styles.ipItem}>
                    <div className={styles.ipIcon}>{item.icon}</div>
                    <div className={styles.ipDetails}>
                      <div className={styles.ipLabel}>{item.label}</div>
                      {item.copyable ? (
                        <button
                          className={styles.ipValueCopy}
                          onClick={() => copyToClipboard(item.value)}
                        >
                          {item.value}
                          <span className={styles.copyHint}>Копировать</span>
                        </button>
                      ) : (
                        <div className={styles.ipValue}>{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Уведомление о копировании */}
            {copied && (
              <div className={styles.copyNotification}>
                Скопировано в буфер обмена!
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
