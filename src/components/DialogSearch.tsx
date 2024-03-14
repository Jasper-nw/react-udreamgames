/* eslint-disable @next/next/no-img-element */
import { CSSTransition } from "react-transition-group";
import styles from "@/componentsStyles/DialogSearch.module.scss";
import { useEffect, useState } from "react";
import CommonNormal from "./common/normal";
import { useRouter } from "next/router";
import { getGameLabel, getGameNew, getGameSearch, getLabel } from "@/api";
import { toast } from "react-toastify";
type props = {
  visible: boolean;
  menu: any;
  onClose: () => void;
};

// 弹出框示例
export default function DialogSearch({ visible, onClose }: props) {
  const [visibleMain, setVisibleMain] = useState(false);
  const [gameList, setGameList] = useState([]);
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

  const [inputValue, setInputValue] = useState("");
  const [label, setLabel] = useState("");
  const [labelList, setLabelList] = useState([]);
  const [popularList, setPopularList] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = (value: string) => {
    let regSearch = /^.{2,}$/;
    if (label) {
      if (value && regSearch.test(value)) {
        setLabel("");
        setLoading(true);
        getGameSearch({ name: value })
          .then((res) => {
            setGameList(res.data);
            setLoading(false);
          })
          .catch((error) => {
            toast.error(error.msg);
            setLoading(false);
          });
      }
    } else {
      if (!value || !regSearch.test(value)) {
        if (!value) {
          setGameList([]);
        }
      } else {
        setLabel("");
        setLoading(true);
        getGameSearch({ name: value })
          .then((res) => {
            setGameList(res.data);
            setLoading(false);
          })
          .catch((error) => {
            toast.error(error.msg);
            setLoading(false);
          });
      }
    }
  };
  const handleChangeValue = (event: any) => {
    setInputValue(event.target.value);
    handleSearch(event.target.value);
  };

  useEffect(() => {
    getLabel({}).then((res) => {
      setLabelList(res.data);
    });
    getGameNew({ size: 15 }).then((res) => {
      setPopularList(res.data.list);
    });
  }, []);

  const closeVisibleMain = () => {
    setVisibleMain(false);
    clearInput();
  };
  const clearInput = () => {
    setInputValue("");
    setGameList([]);
  };
  const searchLabel = (item: any) => {
    setInputValue("");
    if (item.id == label) {
      setLabel("");
      setGameList([]);
    } else {
      // this.status = true
      setLabel(item.id);
      getGameLabel({
        label: item.id,
        size: 30,
      })
        .then((res) => {
          // this.status = false
          setGameList(res.data.list);
        })
        .catch((error) => {
          // this.status = false
          toast.error(error.msg);
        });
    }
  };
  return (
    <>
      <CSSTransition in={visible} timeout={300} classNames="fade" unmountOnExit>
        <aside className={styles["search"]}>
          <div
            className={styles["search__mask"]}
            onClick={closeVisibleMain}
          ></div>
          <CSSTransition
            in={visibleMain}
            classNames="slideTrans"
            timeout={300}
            unmountOnExit
            onExited={() => onClose()}
          >
            <div className={styles["search__main"]}>
              <button
                className={`${styles["return"]} common-btn`}
                onClick={closeVisibleMain}
              >
                <div className={styles["return__img"]}></div>
              </button>
              <div>
                <div className={styles["top"]}>
                  <div className={styles["top__main"]}>
                    <input
                      className={styles["input"]}
                      value={inputValue}
                      onChange={handleChangeValue}
                      placeholder="What are you playing today?"
                    ></input>
                    <div className={styles["btn"]}>
                      {loading ? (
                        <button className="common-btn" key="loading">
                          <div className={styles["loading"]}></div>
                          <span>Loading</span>
                        </button>
                      ) : !inputValue.replace(/\s+/g, "") ? (
                        <button className="common-btn" key="search">
                          <img src="/img/header/iconSearch.png" alt="search" />
                          <span>Search</span>
                        </button>
                      ) : (
                        <button
                          className="common-btn"
                          onClick={clearInput}
                          key="clear"
                        >
                          <img src="/img/header/clear.png" alt="search" />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles["bottom"]}>
                  <div className={styles["labels"]}>
                    <ul className={styles["list"]}>
                      {labelList.map((item: any, index: number) => (
                        <li
                          className={`${styles["list__li"]} common-btn ${
                            label == item.id ? styles["active"] : ""
                          }`}
                          key={index}
                          onClick={() => searchLabel(item)}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles["area"]}>
                    {gameList.length > 0 ? (
                      <div className={styles["game"]}>
                        {!label && (
                          <p className={styles["game__title"]}>
                            <span>
                              {gameList.length}
                              {gameList.length > 1 ? " Results " : " Result "}
                            </span>
                            {gameList.length > 1 ? "are" : "is"} found
                          </p>
                        )}
                        <div className={styles["game__list"]}>
                          {gameList.map((item: any) => (
                            <CommonNormal
                              className={styles["search__normal"]}
                              item={item}
                              key={item.id}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className={styles["game"]}>
                        {((inputValue.replace(/\s+/g, "") &&
                          /^.{2,}$/.test(inputValue.replace(/\s+/g, ""))) ||
                          label !== "") && (
                          <div className={styles["game__none"]}>
                            <h1>Hmm, nothing’s coming up for that.</h1>
                            <p>Try searching for something else?</p>
                          </div>
                        )}
                        <p className={styles["game__title"]}>Popular Games</p>
                        <div className={styles["game__list"]}>
                          {popularList.map((item: any) => (
                            <CommonNormal
                              className={styles["search__normal"]}
                              item={item}
                              key={item.id}
                            />
                          ))}
                        </div>
                      </div>
                    )}
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
