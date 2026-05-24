// Footer.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTelegram,
  FaWhatsapp,
  FaViber,
  FaArrowUp,
  FaRegCopyright,
} from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import styles from "./Footer.module.css";
import { Modal } from "../Modal/Modal";

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("contact");

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    { label: "Главная", href: "#home" },
    { label: "Услуги", href: "#services" },
    { label: "Наши работы", href: "#works" },
    { label: "Цены", href: "#price" },
    { label: "FAQ", href: "#faq" },
    { label: "Контакты", href: "#contacts" },
  ];

  const legalLinks = [
    { label: "Политика конфиденциальности", href: "/privacy" },
    { label: "Согласие на обработку данных", href: "/agreement" },
    { label: "Пользовательское соглашение", href: "/terms" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Колонка 1 - Логотип и описание */}
          <div className={styles.footerColumn}>
            <div className={`${styles.logo} creato-display`}>
              ИП За<span className={styles.highlight}>й</span>да
            </div>
            <p className={styles.description}>
              Профессиональный монтаж слаботочных систем. Гарантия качества на
              все виды работ.
            </p>
            <div className={styles.socialLinks}>
              <a
                href="https://t.me/zaida_vik"
                className={styles.socialLink}
                aria-label="Telegram"
              >
                <FaTelegram />
              </a>
            </div>
          </div>

          {/* Колонка 2 - Быстрые ссылки */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Навигация</h3>
            <ul className={styles.footerLinks}>
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 3 - Контакты */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Контакты</h3>
            <ul className={styles.contactLinks}>
              <li>
                <FaPhoneAlt />
                <a href="tel:+79912610640">+7 (991) 261-06-40</a>
              </li>
              <li>
                <FaEnvelope />
                <a href="mailto:ipzaidavs@gmail.com">ipzaidavs@gmail.com</a>
              </li>
              <li>
                <FaMapMarkerAlt />
                <span>г. Москва</span>
              </li>
            </ul>
          </div>

          {/* Колонка 4 - Режим работы */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Режим работы</h3>
            <div className={styles.workingHours}>
              <div className={styles.hourItem}>
                <span>Пн-Пт:</span>
                <span>09:00 - 20:00</span>
              </div>
              <div className={styles.hourItem}>
                <span>Суббота:</span>
                <span>10:00 - 18:00</span>
              </div>
              <div className={styles.hourItem}>
                <span>Воскресенье:</span>
                <span>Выходной</span>
              </div>
            </div>
            <button
              onClick={() => handleOpenModal("callback")}
              className={styles.callbackButton}
            >
              Заказать звонок
            </button>
          </div>
        </div>

        {/* Нижняя часть с копирайтом */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <FaRegCopyright />
            <span>{currentYear} ИП Зайда. Все права защищены.</span>
          </div>
          <div className={styles.legalLinks}>
            {legalLinks.map((link, index) => (
              <React.Fragment key={index}>
                <a href={link.href}>{link.label}</a>
                {index < legalLinks.length - 1 && (
                  <span className={styles.separator}>|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Кнопка "Наверх" */}
      {showScrollTop && (
        <motion.button
          className={styles.scrollTop}
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Наверх"
        >
          <FaArrowUp />
        </motion.button>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonType={modalType}
      />
    </footer>
  );
};
