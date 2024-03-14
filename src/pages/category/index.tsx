/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/category.module.scss";
import { getCategory, getGameMenu } from "@/api/index";
import CommonNormal from "@/components/common/normal";
import GoogleAd from "@/components/GoogleAd";
import { useEffect, useState } from "react";
import BaseImage from "@/components/BaseImage";
import BaseBackground from "@/components/BaseBackground";
import CommonCategory from "@/components/common/category";
import TextBg from "@/components/TextBg";
import GoogleAutoAd from "@/components/GoogleAutoAd";

export async function getStaticProps() {
  const res = await getCategory({});
  let totalNum = 0,
    totalPage = 1,
    search = {
      page: 1,
      size: 35,
    };
  const recRes = await getGameMenu({ ...search, menu: "best-games" });
  totalNum = recRes.data.count;
  totalPage =
    Math.ceil(totalNum / search.size) === 0
      ? 1
      : Math.ceil(totalNum / search.size);
  return {
    props: {
      totalNum,
      totalPage,
      search,
      categoryList: res.data,
      gameList: recRes.data.list,
    },
  };
}

export default function Category({
  categoryList,
  gameList,
  totalNum,
  totalPage,
  search,
}: {
  categoryList: any;
  gameList: any;
  totalNum: number;
  totalPage: number;
  search: any;
}) {
  const [loading, setLoading] = useState(false);
  const [changeCateList, setChangeCateList] = useState([]);
  const [visibleMore, setVisibleMore] = useState(true);
  useEffect(() => {
    if (visibleMore) {
      setChangeCateList(categoryList.slice(0, 13));
    } else {
      setChangeCateList(categoryList);
    }
  }, [categoryList, visibleMore]);
  const showMoreGame = () => {
    setLoading(true);
    search.page += 1;
    getGameMenu({ ...search, menu: "best-games" })
      .then((res) => {
        res.data.list &&
          res.data.list.map((item: any) => {
            gameList.push(item);
          });
        totalNum = res.count;
        totalPage =
          Math.ceil(totalNum / search.size) === 0
            ? 1
            : Math.ceil(totalNum / search.size);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        search.page -= 1;
        setLoading(false);
      });
  };
  return (
    <article className={styles["category"]}>
      <BaseBackground className={styles["cate-content"]} pink>
        <div className={styles["left-content"]}>
          <TextBg className={styles["title-content"]}>
            <div className={styles["title"]}>
              <span>CATEGORY</span>
            </div>
          </TextBg>
          <div className={styles["cate-list"]}>
            <CommonCategory isNew item={{ name: "NEW GAMES" }} />
            {changeCateList.map((item: any) => (
              <CommonCategory item={item} key={item.id} />
            ))}
            {categoryList.length > 13 && visibleMore && (
              <div
                className={styles["classify"]}
                onClick={() => setVisibleMore(false)}
              >
                <div className={styles["classify__left"]}>
                  <img src="/img/pc/more.svg" alt="more" />
                </div>
                <div className={styles["classify__right"]}>MORE GAMES</div>
              </div>
            )}
          </div>
        </div>
        <img
          className={styles["cate-img"]}
          src="/img/base/cate-bg.png"
          alt="cateBg"
        ></img>
      </BaseBackground>
      <BaseBackground className={styles["game-content"]}>
        <section className={styles["game-list"]}>
          {gameList.map((item: any) => (
            <CommonNormal item={item} key={item.id} />
          ))}
          {(search.page < totalPage || loading) && (
            <button className={styles["more"]} onClick={showMoreGame}>
              {!loading ? (
                <div>
                  <img src="/img/pc/more.svg" alt="more" />
                  <span>More Games</span>
                </div>
              ) : (
                <div>
                  <div className={styles["loader"]}></div>
                </div>
              )}
            </button>
          )}
          <GoogleAd className={styles["pcAd"]} id="6044753309" />
        </section>
      </BaseBackground>
      <GoogleAutoAd className={styles["h5Ad"]} id="2668561179" />
    </article>
  );
}
