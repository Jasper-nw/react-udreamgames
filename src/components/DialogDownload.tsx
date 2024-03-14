/* eslint-disable @next/next/no-img-element */
import { CSSTransition } from "react-transition-group";
import styles from "@/componentsStyles/DialogDownload.module.scss";
import { useEffect, useState } from "react";
import TextBg from "./TextBg";
type props = {
  visible: boolean;
  iosUrl?: any;
  androidUrl?: any;
  onClose: () => void;
};

// 弹出框示例
export default function DialogDownload({
  visible,
  iosUrl,
  androidUrl,
  onClose,
}: props) {
  const [visibleMain, setVisibleMain] = useState(false);
  useEffect(() => {
    let bodyStyle = document.body.style;

    if (visible) {
      bodyStyle.overflow = "hidden";
      bodyStyle.height = "100vh";
      setVisibleMain(visible);
    }

    return () => {
      bodyStyle.overflow = "";
      bodyStyle.height = "";
    };
  }, [visible]);

  const closeVisibleMain = () => {
    setVisibleMain(false);
  };
  return (
    <>
      <CSSTransition in={visible} timeout={300} classNames="fade" unmountOnExit>
        <aside className={styles["dialog"]}>
          <div
            className={styles["dialog__mask"]}
            onClick={closeVisibleMain}
          ></div>
          <CSSTransition
            in={visibleMain}
            classNames="zoom"
            timeout={300}
            unmountOnExit
            onExited={() => onClose()}
          >
            <div className={styles["dialog__main"]}>
              <p className={styles["p1"]}>Download</p>
              <p className={styles["p2"]}>
                Select the system corresponding to your phone
              </p>
              {iosUrl && (
                <TextBg className={styles["item"]}>
                  <a
                    className={`${styles["href"]} common-btn`}
                    href={iosUrl}
                    id="ios-h5"
                  >
                    <img src="/img/download/iosWhite.svg" alt="ios" />
                    <span>From App Store</span>
                  </a>
                </TextBg>
              )}
              {androidUrl && (
                <TextBg className={styles["item"]} green>
                  <a
                    className={`${styles["href"]} common-btn ${styles["android"]}`}
                    href={androidUrl}
                    id="android-h5"
                  >
                    <img src="/img/download/androidWhite.svg" alt="android" />
                    <span>From Google Play</span>
                  </a>
                </TextBg>
              )}
            </div>
          </CSSTransition>
        </aside>
      </CSSTransition>
    </>
  );
}
