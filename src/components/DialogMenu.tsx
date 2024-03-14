/* eslint-disable @next/next/no-img-element */
import { CSSTransition } from "react-transition-group";
import styles from "@/componentsStyles/DialogMenu.module.scss";
import { useEffect, useState } from "react";
import CommonNormal from "./common/normal";
import { useRouter } from "next/router";
import { getGameNew } from "@/api";
type props = {
  visible: boolean;
  menu: any;
  gameList?: any;
  onClose: () => void;
};

// 弹出框示例
export default function DialogMenu({ visible, menu, onClose }: props) {
  const [visibleMain, setVisibleMain] = useState(false);
  const [gameList, setGameList] = useState([]);
  const pathname = useRouter().pathname;
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

  useEffect(() => {
    getGameNew({ size: 15 })
      .then((res) => {
        setGameList(res.data.list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            classNames="slideTrans"
            timeout={300}
            unmountOnExit
            onExited={() => onClose()}
          >
            <div className={styles["dialog__main"]}>
              <button
                className={`${styles["return"]} common-btn`}
                onClick={closeVisibleMain}
              >
                <div className={styles["return__img"]}></div>
              </button>
              <div>
                <div className={styles["top"]}>
                  <p className={styles["top__title"]}>NAVIGATION</p>
                  <div className={styles["top__menu"]}>
                    {menu.map((item: any, index: number) => (
                      <a
                        className={`${styles["href"]} ${
                          (item.path == pathname ||
                            (item.path !== "/" &&
                              pathname.includes(item.path))) &&
                          styles["active"]
                        }`}
                        href={`${item.href}/`}
                        key={index}
                      >
                        <div className={styles["name"]}>{item.name}</div>
                      </a>
                    ))}
                  </div>
                </div>
                <div className={styles["bottom"]}>
                  <div className={styles["area"]}>
                    <div className={styles["game"]}>
                      <p className={styles["game__title"]}>RECOMMEND</p>
                      <div className={styles["game__list"]}>
                        {gameList.map((item: any) => (
                          <CommonNormal
                            className={styles["dialog__normal"]}
                            item={item}
                            key={item.id}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CSSTransition>
        </aside>
      </CSSTransition>
    </>
  );
}
