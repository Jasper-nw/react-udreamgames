/* eslint-disable @next/next/no-img-element */
import { CSSTransition } from "react-transition-group";
import styles from "@/componentsStyles/DialogPreviewImage.module.scss";
import { useEffect, useState } from "react";
import BaseImage from "./BaseImage";
type props = {
  visible: boolean;
  imgList?: any;
  imgIndex: number;
  onClose: () => void;
};

// 弹出框示例
export default function DialogPreviewImage({
  visible,
  imgList,
  imgIndex,
  onClose,
}: props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    let bodyStyle = document.body.style;

    if (visible) {
      bodyStyle.overflow = "hidden";
      bodyStyle.height = "100vh";
    }

    return () => {
      bodyStyle.overflow = "";
      bodyStyle.height = "";
    };
  }, [visible]);
  useEffect(() => {
    setCurrentIndex(imgIndex);
  }, [imgIndex]);
  const nextImg = () => {
    if (currentIndex + 1 < imgList.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const prevImg = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <>
      <CSSTransition in={visible} timeout={300} classNames="fade" unmountOnExit>
        <aside className={styles["dialog"]}>
          <div className={styles["dialog__main"]}>
            <div className={styles["dialog__main__top"]}>
              <button
                className={`${styles["close"]} ${styles["common__btn"]}`}
                onClick={() => onClose()}
              ></button>
            </div>
            <div className={styles["content-info"]}>
              <BaseImage
                className={styles["img"]}
                src={imgList[currentIndex]}
                loading="lazy"
                alt="swiper"
              />
            </div>
            {currentIndex < imgList.length - 1 && (
              <div className={styles["next"]} onClick={nextImg}></div>
            )}
            {currentIndex !== 0 && (
              <div className={styles["prev"]} onClick={prevImg}></div>
            )}
          </div>
        </aside>
      </CSSTransition>
    </>
  );
}
