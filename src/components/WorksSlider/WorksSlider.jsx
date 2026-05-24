import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaMicrochip,
  FaBuilding,
} from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import styles from "./WorksSlider.module.css";

export const WorksSlider = () => {
  const sectionRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const autoPlayRef = useRef(null);

  const works = [
    {
      id: 1,
      title: "АО Микрон",
      subtitle: "Крупнейший микроэлектронный завод в России",
      description:
        "Выполнены работы по монтажу структурированных кабельных систем (СКС) и систем охранного телевидения (СОТ). Обеспечена надежная связь и видеонаблюдение на предприятии.",
      icon: <FaMicrochip size={60} />,
      services: ["СКС", "СОТ"],
      color: "#825EEE",
      stats: [
        { label: "RJ розеток", value: "200+" },
        { label: "Кабеля", value: "15+ км" },
        { label: "Камер", value: "20+" },
      ],
    },
    {
      id: 2,
      title: "ОЭЗ Технополис Москва",
      subtitle: "Особая экономическая зона технико-внедренческого типа",
      description:
        "Реализован комплексный проект по автоматизации управления (АСУД), установке систем учёта энергоресурсов (АСКУЭ) и контролю доступа (СКУД). Обеспечено эффективное управление инфраструктурой.",
      icon: <FaBuilding size={60} />,
      services: ["АСУД", "АСКУЭ", "СКУД"],
      color: "#588FFF",
      stats: [
        { label: "Территория", value: "180+ га" },
        { label: "Резидентов", value: "200+" },
        { label: "Точек доступа", value: "100+" },
      ],
    },
    {
      id: 3,
      title: "Промышленный парк Сенькино",
      subtitle: "Современный промышленный кластер",
      description:
        "Внедрена система автоматизации управления (АСУД), обеспечивающая централизованное управление инженерными системами парка.",
      icon: <MdOutlineSettings size={60} />,
      services: ["АСУД"],
      color: "#FF761B",
      stats: [
        { label: "Площадь", value: "50+ га" },
        { label: "Резидентов", value: "30+" },
        { label: "Вентустановок", value: "30+" },
      ],
    },
  ];

  // Декоративные элементы
  const decorativeElements = [
    // Крупные элементы
    {
      id: 1,
      type: "square",
      size: 60,
      x: 2,
      y: 5,
      color: "#825EEE",
      rotation: 0,
      speed: 0.04,
      opacity: 0.2,
    },
    {
      id: 2,
      type: "diamond",
      size: 50,
      x: 88,
      y: 12,
      color: "#873600",
      rotation: 45,
      speed: 0.05,
      opacity: 0.18,
    },
    {
      id: 3,
      type: "square",
      size: 45,
      x: 12,
      y: 35,
      color: "#FF761B",
      rotation: 15,
      speed: 0.035,
      opacity: 0.22,
    },
    {
      id: 4,
      type: "diamond",
      size: 55,
      x: 95,
      y: 60,
      color: "#588FFF",
      rotation: 45,
      speed: 0.045,
      opacity: 0.2,
    },
    {
      id: 5,
      type: "square",
      size: 40,
      x: 5,
      y: 78,
      color: "#282A5B",
      rotation: 25,
      speed: 0.03,
      opacity: 0.25,
    },

    // Средние элементы
    {
      id: 6,
      type: "diamond",
      size: 35,
      x: 18,
      y: 22,
      color: "#588FFF",
      rotation: 45,
      speed: 0.038,
      opacity: 0.2,
    },
    {
      id: 7,
      type: "square",
      size: 30,
      x: 65,
      y: 30,
      color: "#825EEE",
      rotation: 0,
      speed: 0.032,
      opacity: 0.22,
    },
    {
      id: 8,
      type: "diamond",
      size: 40,
      x: 82,
      y: 45,
      color: "#FF761B",
      rotation: 45,
      speed: 0.042,
      opacity: 0.18,
    },
    {
      id: 9,
      type: "square",
      size: 28,
      x: 72,
      y: 75,
      color: "#873600",
      rotation: 30,
      speed: 0.036,
      opacity: 0.2,
    },
    {
      id: 10,
      type: "diamond",
      size: 32,
      x: 42,
      y: 82,
      color: "#282A5B",
      rotation: 45,
      speed: 0.04,
      opacity: 0.22,
    },

    // Маленькие акценты
    {
      id: 11,
      type: "square",
      size: 15,
      x: 35,
      y: 8,
      color: "#FF761B",
      rotation: 0,
      speed: 0.025,
      opacity: 0.3,
    },
    {
      id: 12,
      type: "diamond",
      size: 12,
      x: 75,
      y: 20,
      color: "#825EEE",
      rotation: 45,
      speed: 0.028,
      opacity: 0.28,
    },
    {
      id: 13,
      type: "square",
      size: 10,
      x: 25,
      y: 52,
      color: "#588FFF",
      rotation: 20,
      speed: 0.022,
      opacity: 0.32,
    },
    {
      id: 14,
      type: "diamond",
      size: 14,
      x: 88,
      y: 85,
      color: "#873600",
      rotation: 45,
      speed: 0.03,
      opacity: 0.25,
    },
    {
      id: 15,
      type: "square",
      size: 8,
      x: 58,
      y: 15,
      color: "#FF761B",
      rotation: 0,
      speed: 0.02,
      opacity: 0.35,
    },
    {
      id: 16,
      type: "diamond",
      size: 11,
      x: 48,
      y: 45,
      color: "#825EEE",
      rotation: 45,
      speed: 0.024,
      opacity: 0.3,
    },
    {
      id: 17,
      type: "square",
      size: 18,
      x: 15,
      y: 68,
      color: "#282A5B",
      rotation: 40,
      speed: 0.026,
      opacity: 0.25,
    },
    {
      id: 18,
      type: "diamond",
      size: 9,
      x: 52,
      y: 70,
      color: "#588FFF",
      rotation: 45,
      speed: 0.027,
      opacity: 0.32,
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Эффект параллакса от мыши
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

  // Автоматическая прокрутка
  useEffect(() => {
    if (isAutoPlaying && !isMobile) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % works.length);
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isMobile, works.length]);

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const nextSlide = () => {
    stopAutoPlay();
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % works.length);
  };

  const prevSlide = () => {
    stopAutoPlay();
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + works.length) % works.length);
  };

  const handleTouchStart = (e) => {
    stopAutoPlay();
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStart - touchEnd;
    if (swipeDistance > 50) {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % works.length);
    }
    if (swipeDistance < -50) {
      setDirection(-1);
      setCurrentSlide((prev) => (prev - 1 + works.length) % works.length);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.97,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "tween", duration: 0.2, ease: "easeOut" },
        opacity: { duration: 0.15 },
        scale: { duration: 0.15 },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.97,
      transition: {
        x: { type: "tween", duration: 0.2, ease: "easeIn" },
        opacity: { duration: 0.15 },
        scale: { duration: 0.15 },
      },
    }),
  };

  return (
    <section ref={sectionRef} className={styles.works} id="works">
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
          <h2 className={styles.title}>Наши последние работы</h2>
          <p className={styles.subtitle}>
            Реализованные проекты, которыми мы гордимся
          </p>
        </motion.div>

        <div className={styles.sliderWrapper}>
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={prevSlide}
            aria-label="Предыдущий слайд"
          >
            <FaArrowLeft />
          </button>

          <div
            ref={sliderContainerRef}
            className={styles.sliderContainer}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={styles.slide}
              >
                <div className={styles.slideContent}>
                  <div className={styles.slideLeft}>
                    <div
                      className={styles.iconWrapper}
                      style={{ backgroundColor: works[currentSlide].color }}
                    >
                      {works[currentSlide].icon}
                    </div>
                    <h3 className={styles.workTitle}>
                      {works[currentSlide].title}
                    </h3>
                    <p className={styles.workSubtitle}>
                      {works[currentSlide].subtitle}
                    </p>
                    <div className={styles.servicesList}>
                      {works[currentSlide].services.map((service, i) => (
                        <span key={i} className={styles.serviceTag}>
                          {service}
                        </span>
                      ))}
                    </div>
                    <p className={styles.workDescription}>
                      {works[currentSlide].description}
                    </p>
                    <div className={styles.stats}>
                      {works[currentSlide].stats.map((stat, i) => (
                        <div key={i} className={styles.stat}>
                          <div className={styles.statValue}>{stat.value}</div>
                          <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!isMobile && (
                    <div className={styles.slideRight}>
                      <div className={styles.previewCard}>
                        <div className={styles.previewIcon}>
                          {works[currentSlide].icon}
                        </div>
                        <div className={styles.previewTitle}>
                          {works[currentSlide].title}
                        </div>
                        <div className={styles.previewServices}>
                          {works[currentSlide].services.map((service, i) => (
                            <span key={i}>{service}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={nextSlide}
            aria-label="Следующий слайд"
          >
            <FaArrowRight />
          </button>
        </div>

        <div className={styles.indicators}>
          {works.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${currentSlide === index ? styles.active : ""}`}
              onClick={() => {
                stopAutoPlay();
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
