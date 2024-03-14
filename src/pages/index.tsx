/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/Home.module.scss";
import BaseImage from "@/components/BaseImage";
import { useRef, useState } from "react";
import { getGameHome, getCategory, getGameMenu } from "@/api/index";
import CommonNormal from "@/components/common/normal";
import CommonList from "@/components/common/list";
import CommonLarge from "@/components/common/large";
import BaseBackground from "@/components/BaseBackground";
import TextBg from "@/components/TextBg";
import CommonCategory from "@/components/common/category";
import CommonBigLarge from "@/components/common/bigLarge";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";


export async function getStaticProps() {
  let contentList = []
  const res = await getGameHome({
    origin: process.env.origin,
  });
  const cateRes = await getCategory({});
  const resRecommend = await getGameMenu({
    origin: process.env.origin,
    menu: "recommended_games",
  });
  contentList = resRecommend.data.list
  let categoryList = cateRes.data;
  let gameList: any = [];
  let categoryListNew = []
  res.data.list.max &&
    res.data.list.max.map((item: any) => {
      categoryListNew.push({ ...item, areaType: 3 });
    });
  res.data.list.comm &&
    res.data.list.comm.map((item: any) => {
      gameList.push({ ...item, areaType: 1 });
    });
  const largeCateList = categoryList.filter(
    (item: any) => item.is_home_display
  );
  largeCateList.map((item: any, index: number) => {
    switch (index) {
      case 0:
        gameList.splice(4, 0, { ...item, areaType: 2 });
        break;
      case 1:
        gameList.splice(23, 0, { ...item, areaType: 2 });
        break;
      case 2:
        gameList.splice(33, 0, { ...item, areaType: 2 });
        break;
      default:
        gameList.push({ ...item, areaType: 2 });
    }
  });
  return {
    props: {
      gameList: gameList,
      categoryList,
      contentList
    },

  };
}

export default function Home({
  gameList,
  categoryList,
  contentList
}: {
  gameList: any;
  categoryList: any;
  contentList: any;
}) {
  const [imgList, setImgList] = useState([]);
  const previewImg = (index: number) => {
    setImgList(contentList);
  };
  return (
    <>
      <article className={styles["home"]}>
        <div className={styles["div_total"]} >
          <div className={styles["list_title"]}>
            <a
              className={styles["title_left"]}
              href={`https://udreamgames.com/appType/`}
              id="appList" >
              <h2>
                <span className={styles["app"]} >APP</span> <span className={styles["appGame"]} >GAMES</span>
              </h2>
              <span className={styles["delta"]} >
                <img
                  className={styles["delta_img1"]}
                  src="/img/pc/ic_get_now.svg"
                  alt=""
                />
              </span>
              <p className={styles["app_p"]}>
                In our catalog you can download the <br />
                Latest versions of popular games For <br />
                <span className={styles["p_Android"]} >Android</span>
              </p>
              <button className={styles["downloadApp"]} >Download Games</button>
            </a>

            <a
              className={styles["title_right"]}
              href={`https://udreamgames.com/h5Type/`}
              id="h5List" >
              <h2 className={styles["htmlTitle"]} >
                <span className={styles["gamehtml"]} >HTML</span>
                <span className={styles["gamespan"]} >GAMES</span>
              </h2>
              <span className={styles["delta"]} >
                <img
                  className={styles["delta_img1"]}
                  src="/img/pc/ic_get_now.svg"
                  alt=""
                />
              </span>
              <p className={styles["h5_p"]}>
                In our catalog you can play A Large <br />
                number of HTML games online Without <br />
                <span className={styles["p_down"]} >Downloading them</span>
              </p>
              <button className={styles["playbutton"]} >Play Similar H5 Game</button>
            </a>

          </div>
          <div className={`${styles["recommend_div"]} ${styles["recommend_div-h5"]} `}>
            <h2
              className={styles["h2-h5"]}>
              <span> Recommended Games</span>
            </h2>
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
                {contentList.map((item: any, index: number) => (
                  <SwiperSlide
                    className={styles["swiper__item"]}
                    key={index}
                    onClick={() => previewImg(index)}
                  >
                    <a
                      className={styles["main"]}
                      href={item.source == 0
                        ? `${'https://udreamgames.com/appType'}/game/${item.name
                          .replace(/[^a-zA-Z0-9\\s]/g, '-')
                          .toLowerCase()}-${item.id}/?from=home`
                        : `${'https://udreamgames.com/appType'}/app/${item.name
                          .replace(/[^a-zA-Z0-9\\s]/g, '-')
                          .toLowerCase()}-${item.id}/?from=home`}
                    >

                      {item.source == 0 ? (
                        <img className={styles["icon_h5"]} src="/img/pc/ic_H5.svg" alt="" />
                      ) : (null)}
                      <img className={styles["fire"]} src="/img/pc/ic_hot.svg" alt="" />
                      <BaseImage
                        className={styles["img-info"]}
                        src={item.icon}
                        width={165}
                        height={165}
                        loading="lazy"
                        alt="gameIcon"
                      />
                      <span className={styles["name"]}>{item.name}</span>
                      <div className={styles["foot"]}>
                        <span className={styles["cate-name"]}>{item.category}</span>
                        <div className={styles["score-info"]}>
                          <img src="/img/pc/star.svg" alt="" />
                          <span className={styles["score"]}>
                            {item.score}
                          </span>
                        </div>
                      </div>
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className={`${styles["recommend_div"]} ${styles["recommend_div-h5"]} `}>
            <h2 className={styles["h2-h5"]}>
              <span>Latest Games</span>
            </h2>
          </div>
          <div className={`${styles["list_div"]} ${styles["list_div-h5"]}`}>
            <section className={styles["list"]}>
              {gameList.map((item: any, index: number) =>
                item.areaType === 1 ? (
                  <CommonNormal item={item} key={item.id} />
                ) : (
                  <CommonList
                    gameList={gameList}
                    className={`${styles[`category-list${index}`]}`}
                    item={item}
                    key={index}
                  />
                )
              )}
            </section>
          </div>
        </div >
        {/* <BaseBackground className={styles["game-content"]}>
          <section className={styles["list"]}>
            {gameList.map((item: any, index: number) =>
              index === 0 ? (
                <CommonBigLarge item={item} key={item.id} />
              ) : item.areaType === 1 ? (
                <CommonNormal item={item} key={item.id} />
              ) : (
                <CommonLarge
                  className={`${styles[`large-cate${index}`]}`}
                  item={item}
                  key={index}
                />
              )
            )}
          </section>
        </BaseBackground> */}
        {/* <BaseBackground className={styles["cate-content"]} pink>
          <div className={styles["left-content"]}>
            <TextBg className={styles["title-content"]}>
              <div className={styles["title"]}>
                <span>TAGS</span>
              </div>
            </TextBg>
            <div className={styles["cate-list"]}>
              <CommonCategory isNew item={{ name: "NEW GAMES" }} />
              {categoryList.slice(0, 9).map((item: any) => (
                <CommonCategory item={item} key={item.id} />
              ))}
            </div>
          </div>
          <img
            className={styles["cate-img"]}
            src="/img/base/cate-bg.png"
            alt="cateBg"
          ></img>
        </BaseBackground> */}
      </article >
    </>
  );
}
