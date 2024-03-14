/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import BaseImage from "@/components/BaseImage";
import styles from "@/styles/game.module.scss";
import { getGameDetail, postGameVote } from "@/api";
import CommonNormal from "@/components/common/normal";
import GoogleAd from "@/components/GoogleAd";
import { adBreakInit, showAdBreak } from "@/utils/ad";
import { BASEURL, PRIVATEURL } from "@/config";
import { useRouter } from "next/router";
import BaseBackground from "@/components/BaseBackground";
import TextBg from "@/components/TextBg";

export async function getStaticPaths() {
  const response = await fetch(
    `${
      process.env.NODE_ENV === "development" ? BASEURL : PRIVATEURL
    }api/sitemap/games?origin=udreamgames`,
    { method: "GET" }
  );
  const data = await response.json();
  const paths = data.data
    .filter((bigItem: any) => bigItem.source === 0)
    .map((item: any) => ({
      params: {
        id: `${item.name.replace(/[^a-zA-Z0-9\\s]/g, "-").toLowerCase()}-${
          item.id
        }`,
      },
    }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  let res = await getGameDetail({
    site_id: process.env.origin,
    game_id: params.id.replace(
      /^.*?(\d*)$/,
      (str, match, index) => match || "0"
    ),
  });
  let labels: any = [];
  if (res.data.detail.labels) {
    Object.keys(res.data.detail.labels).map((item) => {
      labels.push({ id: item, name: res.data.detail.labels[item] });
    });
  }
  return {
    props: {
      appInfo: res.data,
      gameInfo: res.data.detail,
      labels,
    },
  };
}

export default function GamePage({
  appInfo,
  gameInfo,
  labels,
}: {
  appInfo: any;
  gameInfo: any;
  labels: any;
}) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [full, setFull] = useState(false);
  const query = useRouter().query;
  const hasplayNow = query.hasOwnProperty("playnow");

  useEffect(() => {
    if (hasplayNow) {
      openPc();
    }
  }, [hasplayNow]);

  const fullScreen = () => {
    setFull(true);
  };

  const smallScreen = () => {
    setFull(false);
    setVisible(false);
  };

  const openPc = () => {
    const currentDevice = require("current-device").default;
    setLoading(true);
    if (currentDevice.type == "mobile") {
      fullScreen();
    }
    showAdBreak(adComplete);
    setTimeout(() => {
      setVisible(true);
      setLoading(false);
      setLocalRecent();
    }, 5000);
  };

  const openH5 = () => {
    setLoading(true);
    fullScreen();
    showAdBreak(adComplete);
    setTimeout(() => {
      setVisible(true);
      setLoading(false);
      setLocalRecent();
    }, 5000);
  };

  const loveGame = () => {
    let data = {
      id: gameInfo.id,
      opt: favorite ? 1 : 0,
      type: 4,
    };
    postGameVote(data)
      .then(() => {
        setFavorite(!favorite);
        setLocalFavorite(gameInfo.id, !favorite);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setLocalFavorite = (id: any, isFavorite: boolean) => {
    let num = Number(id);
    let favoriteGame =
      JSON.parse(localStorage.getItem("favoriteGame") || "[]") || [];
    if (isFavorite) {
      if (favoriteGame.includes(num)) {
        return false;
      } else {
        favoriteGame.push(num);
      }
    } else {
      if (favoriteGame.includes(num)) {
        favoriteGame.splice(favoriteGame.indexOf(num), 1);
      } else {
        return false;
      }
    }
    localStorage.setItem("favoriteGame", JSON.stringify(favoriteGame));
  };

  useEffect(() => {
    const setDomHeight = () => {
      const dom = document.getElementById("game-area") as HTMLElement;
      if (full) {
        dom.style.minHeight = `${window.innerHeight}px`;
        dom.style.height = `${window.innerHeight}px`;
      } else {
        dom.style.minHeight = "";
        dom.style.height = "";
      }
    };
    setDomHeight();

    window.addEventListener("resize", () => {
      setDomHeight();
    });
    return () => {
      window.removeEventListener("resize", setDomHeight);
    };
  }, [full]);

  const adComplete = (data: any) => {
    console.log(data);
  };

  const setLocalRecent = () => {
    let data = {
      id: gameInfo.id,
      icon: gameInfo.icon,
      name: gameInfo.name,
      source: 0,
      video: gameInfo.video,
      platform: gameInfo.platform,
    };
    let recentGame =
      JSON.parse(localStorage.getItem("recentGame") || "[]") || [];
    let index = recentGame.findIndex((item: any) => item.id === data.id);
    if (index !== -1) {
      return false;
    } else {
      if (recentGame.length < 30) {
        recentGame.unshift(data);
      } else {
        recentGame.splice(29, 1);
        recentGame.unshift(data);
      }
    }
    localStorage.setItem("recentGame", JSON.stringify(recentGame));
  };

  useEffect(() => {
    const getLocalFavorite = (id: any) => {
      let num = Number(id);
      let favoriteGame =
        JSON.parse(localStorage.getItem("favoriteGame") || "[]") || [];
      return favoriteGame.includes(num);
    };
    setFavorite(getLocalFavorite(gameInfo.id));
  }, [gameInfo.id]);

  useEffect(() => {
    adBreakInit();
  }, []);

  useEffect(() => {
    if (full) {
      let bodyStyle = document.body.style;
      bodyStyle.overflow = "hidden";
      bodyStyle.height = "100vh";
    } else {
      let bodyStyle = document.body.style;
      bodyStyle.overflow = "";
      bodyStyle.height = "";
    }
  }, [full]);

  return (
    <article className={styles["game"]}>
      <section className={styles["list"]}>
        {appInfo.relate.map((item: any) => (
          <CommonNormal className="cross-item" item={item} key={item.id} />
        ))}
        <div className={styles["area"]}>
          <BaseBackground className={styles["area__container"]}>
            <div
              className={`${styles["area__container__main"]} ${
                full && styles["active"]
              }`}
              id="game-area"
            >
              <div className={styles["top"]}>
                {!visible && (
                  <div className={styles["top__shading"]}>
                    {!loading ? (
                      <>
                        <TextBg
                          className={`${styles["btn"]} ${styles["btn-pc"]}`}
                          pink
                        >
                          <button
                            className={`common-btn ${styles["pc"]}`}
                            onClick={openPc}
                            id="playNowPc"
                          >
                            <span>Play Now</span>
                            <img
                              src="/img/base/playnow.svg"
                              alt="playnow"
                            ></img>
                          </button>
                        </TextBg>
                        <TextBg
                          className={`${styles["btn"]} ${styles["btn-h5"]}`}
                          pink
                        >
                          <button
                            className={`common-btn ${styles["h5"]}`}
                            onClick={openH5}
                            id="playNowH5"
                          >
                            <span>Play Now</span>
                            <img
                              src="/img/base/playnow.svg"
                              alt="playnow"
                            ></img>
                          </button>
                        </TextBg>
                      </>
                    ) : (
                      <div className={styles["loading"]}></div>
                    )}
                  </div>
                )}
                <iframe
                  className={styles["game-element"]}
                  allow="autoplay"
                  allowFullScreen
                  seamless
                  loading="lazy"
                  src={gameInfo.url}
                  title={gameInfo.name}
                ></iframe>
              </div>
              <div className={styles["bottom"]}>
                <BaseImage
                  className={styles["bottom__img"]}
                  src={gameInfo.icon}
                  width={56}
                  height={56}
                  loading="lazy"
                  alt="gameIcon"
                />
                <p className={styles["bottom__title"]}>{gameInfo.name}</p>
                <button
                  className={`${styles["common-btn"]} ${
                    styles["bottom__btn"]
                  } ${styles["bottom__love"]} ${favorite && styles["active"]}`}
                  onClick={loveGame}
                ></button>
                {!full ? (
                  <button
                    className={`${styles["common-btn"]} ${styles["bottom__btn"]} ${styles["bottom__full"]}`}
                    onClick={fullScreen}
                  >
                    <img
                      className={styles["fullScreen"]}
                      src="/img/game/fullScreen.svg"
                      alt="fullScreen"
                    />
                  </button>
                ) : (
                  <button
                    className={`${styles["common-btn"]} ${styles["bottom__btn"]} ${styles["bottom__full"]}`}
                    onClick={smallScreen}
                  >
                    <img
                      className={styles["smallScreen"]}
                      src="/img/game/smallScreen.svg"
                      alt="smallScreen"
                    />
                  </button>
                )}
              </div>
              <div className={styles["recommend"]}>
                {appInfo.relate.slice(-20).map((item: any) => (
                  <CommonNormal
                    className={styles["recommend-item"]}
                    recommend
                    item={item}
                    key={item.id}
                  />
                ))}
              </div>
              {full && !loading && (
                <div className={styles["return"]} onClick={smallScreen}>
                  <img src="/img/game/back.svg" alt="back" />
                </div>
              )}
            </div>
          </BaseBackground>
          <GoogleAd className={styles["midAd1"]} id="6375925791" />
          <BaseBackground className={styles["area__info"]}>
            <div className={styles["top"]}>
              <p className={styles["title"]}>{gameInfo.name}</p>
              {labels.map((item: any) => (
                <a
                  className={`${styles["label"]} ${styles["common-btn"]}`}
                  href={`/label/${item.name.toLowerCase()}-${
                    item.id
                  }/?from=game-id`}
                  key={item.id}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className={styles["explain"]}>{gameInfo.desc}</div>
            {gameInfo.category && (
              <p className={styles["category"]}>
                <span>{gameInfo.category} / </span>
                {gameInfo.name}
              </p>
            )}
          </BaseBackground>
          <GoogleAd className={styles["midAd2"]} id="4731671637" />
        </div>
      </section>
    </article>
  );
}
