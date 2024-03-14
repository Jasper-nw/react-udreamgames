/* eslint-disable @next/next/no-img-element */
import BaseImage from "@/components/BaseImage";
import styles from "@/styles/app.module.scss";
import { getGameDetail } from "@/api";
import CommonNormal from "@/components/common/normal";
import GoogleAd from "@/components/GoogleAd";
import { BASEURL, PRIVATEURL } from "@/config";
import { formatDate } from "@/utils";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import DialogPreviewImage from "@/components/DialogPreviewImage";
import { useRef, useState } from "react";
import BaseBackground from "@/components/BaseBackground";
import TextBg from "@/components/TextBg";
import GoogleAutoAd from "@/components/GoogleAutoAd";

export async function getStaticPaths() {
  const response = await fetch(
    `${
      process.env.NODE_ENV === "development" ? BASEURL : PRIVATEURL
    }api/sitemap/games?origin=udreamgames`,
    { method: "GET" }
  );
  const data = await response.json();
  const paths = data.data
    .filter((bigItem: any) => bigItem.source !== 0)
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
  if (!res.data.detail.banner) {
    res.data.detail.banner = [];
  } else {
    res.data.detail.banner = res.data.detail.banner.split(",");
  }
  let time = "";
  res.data.detail.apk_updated.split("/").map((item: any, index: number) => {
    time +=
      index > 0
        ? "," + formatDate(new Date(item * 1000), "mm/dd/YYYY")
        : "" + formatDate(new Date(item * 1000), "mm/dd/YYYY");
  });
  res.data.detail.apk_updated = time;
  const allList =
    res.data.rec_library.first_100.concat(res.data.rec_library.last_100) || [];
  return {
    props: {
      appInfo: res.data,
      gameInfo: res.data.detail,
      allList,
    },
  };
}

export default function AppPage({
  appInfo,
  gameInfo,
  allList,
}: {
  appInfo: any;
  gameInfo: any;
  allList: any;
}) {
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [imgList, setImgList] = useState([]);
  const getGame = useRef(null);
  const previewImg = (index: number) => {
    setImgIndex(index);
    setImgList(gameInfo.banner);
    setVisiblePreview(true);
  };
  const goAdDownload = () => {
    if (getGame.current) {
      let offsetTop = (getGame.current as any).offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <article className={styles["app"]}>
      <section className={styles["list"]}>
        {allList.map((item: any) => (
          <CommonNormal className="cross-item" item={item} key={item.id} />
        ))}
        <div className={styles["container"]}>
          <BaseBackground className={styles["container__info"]}>
            <GoogleAd className={styles["midAd1"]} id="9932027425" />
            <div className={styles["right"]}>
              <div className={styles["info"]}>
                <BaseImage
                  className={styles["img"]}
                  src={gameInfo.icon}
                  width={160}
                  height={160}
                  loading="lazy"
                  alt="gameIcon"
                />
                <div className={styles["name-info"]}>
                  <span className={styles["span1"]}>{gameInfo.name}</span>
                  <span className={styles["span2"]}>{gameInfo.company_id}</span>
                </div>
                <div
                  className={styles["btn"]}
                  onClick={goAdDownload}
                  id="getToCheck"
                >
                  <img src="/img/base/boldArrow.svg" alt="arrow" />
                  <img src="/img/base/boldArrow.svg" alt="arrow" />
                  <img src="/img/base/boldArrow.svg" alt="arrow" />
                </div>
              </div>
              <div className={styles["desc"]}>{gameInfo.desc}</div>
            </div>
          </BaseBackground>
          <GoogleAutoAd className={styles["h5Ad1"]} id="2245109092" />
          <BaseBackground className={styles["container__screenshots"]}>
            <div className={styles["menu-title"]}>Screenshots</div>
            <div className={styles["banner"]}>
              <Swiper
                className={styles["swiper"]}
                slidesPerView="auto"
                modules={[Autoplay, Navigation]}
                navigation={{ nextEl: ".nextEl", prevEl: ".prevEl" }}
                autoplay={{
                  delay: 5000,
                  stopOnLastSlide: false,
                  disableOnInteraction: false,
                }}
                speed={500}
              >
                {gameInfo.banner.map((item: any, index: number) => (
                  <SwiperSlide
                    className={styles["swiper__item"]}
                    key={index}
                    onClick={() => previewImg(index)}
                  >
                    <BaseImage
                      className={styles["img"]}
                      src={item}
                      height={270}
                      loading="lazy"
                      alt="gameIcon"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div
                className={`${styles["swiper_btn"]} ${styles["prev"]} prevEl`}
              >
                <img src="/img/base/prev.svg" alt="prev" />
              </div>
              <div
                className={`${styles["swiper_btn"]} ${styles["next"]} nextEl`}
              >
                <img src="/img/base/next.svg" alt="next" />
              </div>
            </div>
          </BaseBackground>
          <BaseBackground className={styles["container__related"]} pink>
            <div className={styles["menu-title"]}>Related Games</div>
            <div className={styles["related-list"]}>
              {appInfo.relate.slice(0, 8).map((item: any) => (
                <CommonNormal
                  className={styles["related-item"]}
                  item={item}
                  key={item.id}
                />
              ))}
            </div>
          </BaseBackground>
          <div ref={getGame}>
            <BaseBackground className={styles["container__getGame"]}>
              <div className={styles["menu-title"]}>Get the Game</div>
              <div className={styles["extend-info"]}>
                <BaseImage
                  className={styles["img"]}
                  src={gameInfo.icon}
                  width={164}
                  height={164}
                  loading="lazy"
                  alt="gameIcon"
                />
                <div className={styles["name-info"]}>
                  <div className={styles["top-content"]}>
                    <BaseImage
                      className={styles["img-h5"]}
                      src={gameInfo.icon}
                      width={128}
                      height={128}
                      loading="lazy"
                      alt="gameIcon"
                    />
                    <div className={styles["content"]}>
                      <span className={styles["span1"]}>{gameInfo.name}</span>
                      <span className={styles["p1"]}>
                        Ver: {gameInfo.version}
                      </span>
                      <div className={styles["p1"]}>
                        <span>Size: {gameInfo.apk_size}</span>
                        <span className={styles["vercel"]}>|</span>
                        <span>Update: {gameInfo.apk_updated}</span>
                      </div>
                    </div>
                  </div>
                  <TextBg className={styles["download-content"]} yellow>
                    <a
                      href={`/download/${gameInfo.name
                        .replace(/[^a-zA-Z0-9\\s]/g, "-")
                        .toLowerCase()}-${gameInfo.id}/`}
                      className={styles["download_btn"]}
                    >
                      <span className={styles["pc"]}>Check All Versions</span>
                      <img src="/img/header/download-h5.svg" alt="download" />
                    </a>
                  </TextBg>
                </div>
              </div>
            </BaseBackground>
          </div>
        </div>
        <GoogleAutoAd className={styles["h5Ad2"]} id="4871272434" />
      </section>
      <DialogPreviewImage
        visible={visiblePreview}
        imgList={imgList}
        imgIndex={imgIndex}
        onClose={() => setVisiblePreview(false)}
      />
    </article>
  );
}
