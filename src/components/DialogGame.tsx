/* eslint-disable @next/next/no-img-element */
import { CSSTransition } from "react-transition-group";
import styles from "@/componentsStyles/DialogGame.module.scss";
import { useEffect, useState } from "react";
import CommonNormal from "./common/normal";
import TextBg from "./TextBg";
type props = {
  visible: boolean;
  gameList?: any;
  onClose: () => void;
};

// 弹出框示例
export default function DialogGame({ visible, gameList, onClose }: props) {
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
            classNames="slide"
            timeout={300}
            unmountOnExit
            onExited={() => onClose()}
          >
            <div className={styles["dialog__main"]}>
              <div className={styles["close"]} onClick={closeVisibleMain}></div>
              <p className={styles["p1"]}>Choose a similar game to play!</p>
              <p className={styles["p2"]}>
                These are the similar games recommended for you
              </p>
              <div className={styles["list"]}>
                {gameList.map((item: any) => (
                  <CommonNormal item={item} key={item.id} />
                ))}
              </div>
              <TextBg className={styles["href"]} yellow>
                <a
                  id="quickGame"
                  className={`${styles["quick"]} common-btn`}
                  href={`/game/${gameList[0].name
                    .replace(/[^a-zA-Z0-9\\s]/g, "-")
                    .toLowerCase()}-${gameList[0].id}/?from=quickgame`}
                >
                  <span>Quick Game</span>
                  <img src="/img/base/play-zise.svg" alt="playnow"></img>
                </a>
              </TextBg>
            </div>
          </CSSTransition>
        </aside>
      </CSSTransition>
    </>
  );
}
