import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navigation.module.css";
import { Modal } from "../Modal/Modal";

export const Navigation = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("contact");

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const navLinks = [
    { id: "home", label: "Главная", href: "#home", offset: 0 },
    { id: "services", label: "Услуги", href: "#services", offset: 100 },
    { id: "works", label: "Наши работы", href: "#works", offset: 100 },
    { id: "price", label: "Выезд", href: "#price", offset: 100 },
    { id: "faq", label: "FAQ", href: "#faq", offset: 100 },
    { id: "contacts", label: "Контакты", href: "#contacts", offset: 100 },
  ];

  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Закрытие меню при ресайзе на десктоп
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  // Блокировка скролла при открытом мобильном меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Эффект для изменения стиля навигации при скролле
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Определение активной ссылки по скроллу
  useEffect(() => {
    const handleActiveLink = () => {
      const sections = navLinks.map((link) => ({
        id: link.id,
        element: document.getElementById(link.id),
        offset: link.offset,
      }));

      const scrollPosition = window.scrollY + 120;

      let currentSection = "home";

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const sectionTop = section.element.offsetTop;
          if (scrollPosition >= sectionTop - section.offset) {
            currentSection = section.id;
            break;
          }
        }
      }

      setActiveLink(currentSection);
    };

    window.addEventListener("scroll", handleActiveLink);
    handleActiveLink();

    return () => window.removeEventListener("scroll", handleActiveLink);
  }, [navLinks]);

  // Плавный скролл к секции
  const scrollToSection = (sectionId, href) => {
    setIsMenuOpen(false);

    const element = document.getElementById(sectionId);

    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else if (href) {
      window.location.hash = href;
    }
  };

  const handleLinkClick = (linkId, href) => {
    setActiveLink(linkId);
    scrollToSection(linkId, href);
  };

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
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const mobileMenuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <motion.nav
        className={`${styles.navigation} ${isScrolled ? styles.scrolled : ""} ${isMenuOpen ? styles.menuOpen : ""}`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className={`${styles.logo} creato-display`}
          variants={itemVariants}
          onClick={() => scrollToSection("home", "#home")}
        >
          ИП За<span className={styles.highlight}>й</span>да
        </motion.div>

        {/* Десктопное меню */}
        <ul
          className={`${styles.navLinks} ${styles.desktopMenu} creato-display`}
        >
          {navLinks.map((link) => (
            <motion.li key={link.id} variants={itemVariants}>
              <a
                href={link.href}
                className={`${styles.navLink} ${
                  activeLink === link.id ? styles.active : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id, link.href);
                }}
              >
                {link.label}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Кнопка "Связаться" (десктоп) */}
        <motion.button
          className={`${styles.contactButton} ${styles.desktopButton}`}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            handleOpenModal("contact");
          }}
        >
          Связаться
        </motion.button>

        {/* Бургер-кнопка (мобильная) - теперь с повышенным z-index */}
        <button
          className={`${styles.burgerButton} ${isMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Меню"
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>
      </motion.nav>

      {/* Мобильное меню (выезжающее) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Оверлей для затемнения фона */}
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              className={styles.mobileMenu}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ul className={styles.mobileNavLinks}>
                {navLinks.map((link) => (
                  <motion.li
                    key={link.id}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * navLinks.indexOf(link) }}
                  >
                    <a
                      href={link.href}
                      className={`${styles.mobileNavLink} ${
                        activeLink === link.id ? styles.active : ""
                      } creato-display`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.id, link.href);
                      }}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.button
                className={styles.mobileContactButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsMenuOpen(false);

                  handleOpenModal("contact");
                }}
              >
                Связаться
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonType={modalType}
      />
    </>
  );
};
