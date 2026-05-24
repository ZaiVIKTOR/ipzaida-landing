import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import heroImage from "../../assets/hero-image.png";
import { useState } from "react";
import { Modal } from "../Modal/Modal";

export const Hero = () => {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("contact");

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const leftContentVariants = {
    hidden: { x: -60, opacity: 0, rotateY: -15 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 25,
        duration: 0.9,
      },
    },
  };

  const rightContentVariants = {
    hidden: { x: 60, opacity: 0, rotateY: 15, scale: 0.9 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 25,
        duration: 0.9,
        delay: 0.15,
      },
    },
  };

  const buttonVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.08,
      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.96,
    },
  };

  const textVariants = {
    hidden: { y: 30, opacity: 0, filter: "blur(8px)" },
    visible: (custom) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: custom * 0.1,
      },
    }),
  };

  // Анимация для изображения с легким паринием
  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    float: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      className={styles.hero}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      id="home"
    >
      <div className={styles.container}>
        <motion.div className={styles.content} variants={leftContentVariants}>
          <motion.h1
            className={`${styles.title} creato-display`}
            variants={textVariants}
            custom={0}
          >
            Профессиональный монтаж слаботочных систем
          </motion.h1>

          <motion.p
            className={styles.description}
            variants={textVariants}
            custom={1}
          >
            Монтаж и обслуживание СКС, СОТ, АСКУЭ, АСУД и других слаботочных
            систем. Гарантия качества и соблюдение сроков для вашего бизнеса.
          </motion.p>

          <motion.button
            className={styles.ctaButton}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleOpenModal("contact")}
          >
            Связаться
          </motion.button>
        </motion.div>

        <motion.div
          className={styles.imageWrapper}
          variants={rightContentVariants}
        >
          <motion.img
            src={heroImage}
            alt="Professional слаботочные системы"
            className={styles.heroImage}
            loading="lazy"
            variants={imageVariants}
            animate="visible"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonType={modalType}
      />
    </motion.section>
  );
};
