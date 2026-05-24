import React, { useRef, useEffect, useState } from "react";
import {
  MdOutlineRouter,
  MdOutlineSecurity,
  MdOutlineSettings,
} from "react-icons/md";
import { GiEntryDoor } from "react-icons/gi";
import { FiVideo, FiWifi, FiServer } from "react-icons/fi";
import { FaRegBuilding, FaRegLightbulb } from "react-icons/fa";
import { TbDeviceAnalytics } from "react-icons/tb";
import styles from "./ServicesGrid.module.css";

export const ServicesGrid = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Проверка на мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const services = [
    {
      id: 1,
      title: "СКС",
      icon: <MdOutlineRouter size={74} />,
      desc: "Структурированные кабельные системы",
    },
    {
      id: 2,
      title: "СОТ",
      icon: <MdOutlineSecurity size={74} />,
      desc: "Системы охранного телевидения",
    },
    {
      id: 3,
      title: "АСКУЭ",
      icon: <TbDeviceAnalytics size={74} />,
      desc: "Автоматизированный учёт энергоресурсов",
    },
    {
      id: 4,
      title: "АСУД",
      icon: <MdOutlineSettings size={74} />,
      desc: "Автоматизация управления",
    },
    {
      id: 5,
      title: "Видеонаблюдение",
      icon: <FiVideo size={74} />,
      desc: "Современные системы видеоконтроля",
    },
    {
      id: 6,
      title: "Умный дом",
      icon: <FaRegLightbulb size={74} />,
      desc: "Автоматизация и управление",
    },
    {
      id: 7,
      title: "Серверные",
      icon: <FiServer size={74} />,
      desc: "Оборудование серверных комнат",
    },
    {
      id: 8,
      title: "СКУД",
      icon: <GiEntryDoor size={74} />,
      desc: "Система контроля и управления доступом",
    },
  ];

  // Наблюдатель за видимостью
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          const totalItems = 10;
          for (let i = 0; i <= totalItems; i++) {
            setTimeout(() => {
              setAnimatedItems((prev) => [...prev, i]);
            }, i * 80);
          }
        } else {
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Ускоренный параллакс эффект
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Вычисляем прогресс прокрутки секции
        let progress = 0;

        if (rect.top < windowHeight && rect.bottom > 0) {
          // Секция видна на экране
          const visibleStart = Math.max(0, windowHeight - rect.bottom);
          const visibleEnd = Math.min(windowHeight, rect.bottom) - rect.top;
          progress = visibleStart / (visibleEnd + windowHeight);
          progress = Math.min(Math.max(progress, 0), 1);
        } else if (rect.top < 0 && rect.bottom > windowHeight) {
          progress = 0.5;
        } else if (rect.bottom < 0) {
          progress = 1;
        } else if (rect.top > windowHeight) {
          progress = 0;
        }

        // Ускоренный параллакс - смещение от -300 до 300 пикселей
        const offset = (progress - 0.5) * 300;
        setParallaxOffset(offset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rows = [];
  for (let i = 0; i < services.length; i += 4) {
    rows.push(services.slice(i, i + 4));
  }

  return (
    <section ref={sectionRef} className={styles.services} id="services">
      <div className={styles.decorativeContainer}>
        {/* Крупные элементы - с разной скоростью для эффекта глубины */}
        <div
          className={`${styles.decorativeElement} ${styles.large}`}
          style={{
            left: "3%",
            top: "10%",
            width: isMobile ? "40px" : "80px",
            height: isMobile ? "40px" : "80px",
            backgroundColor: "#825EEE",
            opacity: isMobile ? 0.25 : 0.35,
            transform: `translateY(${parallaxOffset * 0.6}px) rotate(0deg)`,
            transition: "transform 0.08s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
          }}
        />

        <div
          className={`${styles.decorativeElement} ${styles.diamond} ${styles.large}`}
          style={{
            left: "85%",
            top: "15%",
            width: isMobile ? "35px" : "65px",
            height: isMobile ? "35px" : "65px",
            backgroundColor: "#873600",
            opacity: isMobile ? 0.22 : 0.32,
            transform: `translateY(${parallaxOffset * 0.9}px) rotate(45deg)`,
            transition: "transform 0.06s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
          }}
        />

        <div
          className={`${styles.decorativeElement} ${styles.large}`}
          style={{
            left: "10%",
            top: "40%",
            width: isMobile ? "45px" : "55px",
            height: isMobile ? "45px" : "55px",
            backgroundColor: "#FF761B",
            opacity: isMobile ? 0.28 : 0.38,
            transform: `translateY(${parallaxOffset * 0.75}px) rotate(15deg)`,
            transition: "transform 0.07s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
          }}
        />

        <div
          className={`${styles.decorativeElement} ${styles.diamond} ${styles.large}`}
          style={{
            left: "92%",
            top: "65%",
            width: isMobile ? "50px" : "70px",
            height: isMobile ? "50px" : "70px",
            backgroundColor: "#588FFF",
            opacity: isMobile ? 0.2 : 0.3,
            transform: `translateY(${parallaxOffset * 1.0}px) rotate(45deg)`,
            transition: "transform 0.05s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
          }}
        />

        <div
          className={`${styles.decorativeElement} ${styles.large}`}
          style={{
            left: "6%",
            top: "80%",
            width: isMobile ? "30px" : "45px",
            height: isMobile ? "30px" : "45px",
            backgroundColor: "#282A5B",
            opacity: isMobile ? 0.3 : 0.4,
            transform: `translateY(${parallaxOffset * 0.5}px) rotate(25deg)`,
            transition: "transform 0.09s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
          }}
        />

        {/* Средние элементы */}
        <div
          className={styles.decorativeElement}
          style={{
            left: "20%",
            top: "25%",
            width: isMobile ? "25px" : "40px",
            height: isMobile ? "25px" : "40px",
            backgroundColor: "#588FFF",
            opacity: isMobile ? 0.32 : 0.42,
            transform: `translateY(${parallaxOffset * 0.7}px) rotate(45deg)`,
            transition: "transform 0.065s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
          }}
        />

        <div
          className={styles.decorativeElement}
          style={{
            left: "60%",
            top: "35%",
            width: isMobile ? "28px" : "38px",
            height: isMobile ? "28px" : "38px",
            backgroundColor: "#825EEE",
            opacity: isMobile ? 0.35 : 0.45,
            transform: `translateY(${parallaxOffset * 0.55}px)`,
            transition: "transform 0.075s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
          }}
        />

        <div
          className={styles.decorativeElement}
          style={{
            left: "75%",
            top: "50%",
            width: isMobile ? "22px" : "35px",
            height: isMobile ? "22px" : "35px",
            backgroundColor: "#FF761B",
            opacity: isMobile ? 0.3 : 0.4,
            transform: `translateY(${parallaxOffset * 0.85}px) rotate(45deg)`,
            transition: "transform 0.055s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
          }}
        />

        <div
          className={styles.decorativeElement}
          style={{
            left: "30%",
            top: "70%",
            width: isMobile ? "20px" : "30px",
            height: isMobile ? "20px" : "30px",
            backgroundColor: "#873600",
            opacity: isMobile ? 0.28 : 0.38,
            transform: `translateY(${parallaxOffset * 0.45}px) rotate(30deg)`,
            transition: "transform 0.085s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
          }}
        />

        {/* Маленькие акценты - самые быстрые */}
        <div
          className={styles.decorativeElement}
          style={{
            left: "45%",
            top: "8%",
            width: isMobile ? "10px" : "12px",
            height: isMobile ? "10px" : "12px",
            backgroundColor: "#FF761B",
            opacity: isMobile ? 0.45 : 0.55,
            transform: `translateY(${parallaxOffset * 0.4}px)`,
            transition: "transform 0.1s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
          }}
        />

        <div
          className={`${styles.decorativeElement} ${styles.diamond}`}
          style={{
            left: "68%",
            top: "18%",
            width: isMobile ? "8px" : "10px",
            height: isMobile ? "8px" : "10px",
            backgroundColor: "#825EEE",
            opacity: isMobile ? 0.42 : 0.52,
            transform: `translateY(${parallaxOffset * 0.35}px) rotate(45deg)`,
            transition: "transform 0.095s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
          }}
        />

        <div
          className={styles.decorativeElement}
          style={{
            left: "15%",
            top: "52%",
            width: isMobile ? "12px" : "14px",
            height: isMobile ? "12px" : "14px",
            backgroundColor: "#588FFF",
            opacity: isMobile ? 0.4 : 0.5,
            transform: `translateY(${parallaxOffset * 0.5}px) rotate(20deg)`,
            transition: "transform 0.07s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
          }}
        />

        <div
          className={`${styles.decorativeElement} ${styles.diamond}`}
          style={{
            left: "82%",
            top: "78%",
            width: isMobile ? "9px" : "11px",
            height: isMobile ? "9px" : "11px",
            backgroundColor: "#873600",
            opacity: isMobile ? 0.38 : 0.48,
            transform: `translateY(${parallaxOffset * 0.45}px) rotate(45deg)`,
            transition: "transform 0.08s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
          }}
        />

        <div
          className={styles.decorativeElement}
          style={{
            left: "55%",
            top: "92%",
            width: isMobile ? "12px" : "16px",
            height: isMobile ? "12px" : "16px",
            backgroundColor: "#FF761B",
            opacity: isMobile ? 0.36 : 0.46,
            transform: `translateY(${parallaxOffset * 0.4}px)`,
            transition: "transform 0.09s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
          }}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Первая строка */}
          <div className={styles.firstRow}>
            <div
              className={`${styles.card} ${animatedItems.includes(0) ? styles.animated : ""}`}
              style={{
                opacity: animatedItems.includes(0) ? 1 : 0,
                transform: animatedItems.includes(0)
                  ? "translateY(0)"
                  : "translateY(50px)",
              }}
            >
              <div className={styles.cardIcon}>
                <FaRegBuilding size={isMobile ? 50 : 74} />
              </div>
              <div className={styles.cardTitle}>Слаботочные системы</div>
              <div className={styles.cardDescription}>
                Полный комплекс работ
              </div>
            </div>

            <div
              className={`${styles.textBlock} ${animatedItems.includes(1) ? styles.animated : ""}`}
              style={{
                opacity: animatedItems.includes(1) ? 1 : 0,
                transform: animatedItems.includes(1)
                  ? "translateX(0)"
                  : "translateX(-30px)",
              }}
            >
              <h2 className={styles.textBlockTitle}>
                Профессиональный
                <br />
                монтаж слаботочных систем
              </h2>
              <p className={styles.textBlockDescription}>
                Мы специализируемся на монтаже и обслуживании слаботочных систем
                любой сложности. Гарантия качества и соблюдение сроков.
              </p>
            </div>
          </div>

          {/* Остальные строки */}
          <div className={styles.otherRows}>
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.row}>
                {row.map((service, colIndex) => {
                  const itemIndex = 2 + rowIndex * 4 + colIndex;
                  return (
                    <div
                      key={service.id}
                      className={`${styles.card} ${animatedItems.includes(itemIndex) ? styles.animated : ""}`}
                      style={{
                        opacity: animatedItems.includes(itemIndex) ? 1 : 0,
                        transform: animatedItems.includes(itemIndex)
                          ? "translateY(0)"
                          : "translateY(50px)",
                      }}
                    >
                      <div className={styles.cardIcon}>
                        {React.cloneElement(service.icon, {
                          size: isMobile ? 50 : 74,
                        })}
                      </div>
                      <div className={styles.cardTitle}>{service.title}</div>
                      <div className={styles.cardDescription}>
                        {service.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
