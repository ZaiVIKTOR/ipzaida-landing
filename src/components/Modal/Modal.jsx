// Modal.jsx
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import styles from "./Modal.module.css";

export const Modal = ({ isOpen, onClose, buttonType }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    reason: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const reasonOptions = [
    { value: "consultation", label: "Получить консультацию" },
    { value: "visit", label: "Заказать выезд специалиста" },
    { value: "project", label: "Рассчитать стоимость проекта" },
    { value: "service", label: "Заказать услугу" },
    { value: "callback", label: "Заказать обратный звонок" },
    { value: "other", label: "Другой вопрос" },
  ];

  const getModalConfig = () => {
    switch (buttonType) {
      case "callback":
        return { title: "Заказать звонок", defaultReason: "callback" };
      case "contact":
        return { title: "Связаться с нами", defaultReason: "consultation" };
      case "visit":
        return { title: "Заказать выезд", defaultReason: "visit" };
      case "project":
        return { title: "Рассчитать проект", defaultReason: "project" };
      default:
        return { title: "Оставить заявку", defaultReason: "consultation" };
    }
  };

  const config = getModalConfig();

  const getReasonText = (reason) => {
    const reasons = {
      consultation: "Консультация",
      visit: "Выезд специалиста",
      project: "Расчет проекта",
      service: "Заказ услуги",
      callback: "Обратный звонок",
      other: "Другой вопрос",
    };
    return reasons[reason] || reason;
  };

  // Отправка в Google Sheets
  const sendToGoogleSheets = async (data) => {
    // ЗАМЕНИТЕ НА ВАШ URL от Apps Script!
    const GOOGLE_SHEETS_URL =
      "https://script.google.com/macros/s/AKfycbw4Fl1n4mZKZOL5jxyrVyZaCWkhXxm8i7e5PrW00V37ten6EWbEGkPBv9YUxlQnKmz7qw/exec";

    const requestData = {
      name: data.name,
      phone: data.phone,
      reason: getReasonText(data.reason),
      message: data.message || "—",
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      mode: "no-cors", // Важно для Google Sheets
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    // При mode: 'no-cors' ответа не будет, но запрос уйдёт
    // Возвращаем успех, так как ошибки быть не может
    return { success: true };
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        phone: "",
        reason: config.defaultReason,
        message: "",
      });
      setSubmitStatus(null);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, config.defaultReason]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("Пожалуйста, введите ваше имя");
      return false;
    }
    if (!formData.phone.trim()) {
      alert("Пожалуйста, введите номер телефона");
      return false;
    }
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      alert("Пожалуйста, введите корректный номер телефона");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await sendToGoogleSheets(formData);
      setSubmitStatus("success");

      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      console.error("Ошибка отправки:", error);
      setSubmitStatus("error");
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button className={styles.closeButton} onClick={onClose}>
              <FaTimes />
            </button>

            {submitStatus === "success" ? (
              <div className={styles.successState}>
                <FaCheckCircle className={styles.successIcon} />
                <h3>Заявка отправлена!</h3>
                <p>Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : submitStatus === "error" ? (
              <div className={styles.errorState}>
                <FaExclamationCircle className={styles.errorIcon} />
                <h3>Ошибка отправки</h3>
                <p>Пожалуйста, попробуйте позже или позвоните нам</p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className={styles.retryButton}
                >
                  Попробовать снова
                </button>
              </div>
            ) : (
              <>
                <h2 className={styles.modalTitle}>{config.title}</h2>
                <p className={styles.modalSubtitle}>
                  Заполните форму, и мы свяжемся с вами в ближайшее время
                </p>

                <form
                  onSubmit={handleSubmit}
                  className={styles.form}
                  noValidate
                >
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Ваше имя *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Номер телефона *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="reason">Причина обращения</label>
                    <select
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                    >
                      {reasonOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message">Сообщение (необязательно)</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Опишите ваш вопрос или задачу..."
                      rows={4}
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Отправка..." : "Отправить заявку"}
                  </button>

                  <p className={styles.privacyNote}>
                    Нажимая кнопку, вы соглашаетесь с политикой
                    конфиденциальности
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};
