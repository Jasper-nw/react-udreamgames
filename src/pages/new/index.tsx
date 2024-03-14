/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/new.module.scss";
import { getGameCategory, getGameMenu } from "@/api";
import CommonNormal from "@/components/common/normal";
import GoogleAd from "@/components/GoogleAd";
import { BASEURL, PRIVATEURL } from "@/config";
import { useState } from "react";
import BaseBackground from "@/components/BaseBackground";
import TextBg from "@/components/TextBg";
import GoogleAutoAd from "@/components/GoogleAutoAd";

export async function getStaticProps() {
  let totalNum = 0,
    totalPage = 1,
    search = {
      page: 1,
      size: 35,
    };
  const res = await getGameMenu({
    menu: "new-games",
    ...search,
  });
  totalNum = res.data.count;
  totalPage =
    Math.ceil(totalNum / search.size) === 0
      ? 1
      : Math.ceil(totalNum / search.size);
  return {
    props: {
      gameList: res.data.list,
      totalNum,
      totalPage,
      search,
    },
  };
}

export default function NewPage({
  gameList,
  totalNum,
  totalPage,
  search,
}: {
  gameList: any;
  totalNum: number;
  totalPage: number;
  search: any;
}) {
  const [loading, setLoading] = useState(false);
  const showMoreGame = () => {
    setLoading(true);
    search.page += 1;
    getGameMenu({ ...search, menu: "new-games" })
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
  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <article className={styles["category"]}>
      <BaseBackground className={styles["game-content"]}>
        <div className={styles["title-top"]}>
          <a className={styles["return"]} href={"/category/"}>
            <img src="/img/base/return.svg" alt="return"></img>
          </a>
          <TextBg className={styles["title-content"]}>
            <div className={styles["title"]}>
              <span>New Games</span>
            </div>
          </TextBg>
        </div>
        <section className={styles["list"]}>
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
