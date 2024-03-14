/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/categoryDetail.module.scss";
import { getGameCategory, getGameMenu } from "@/api";
import CommonNormal from "@/components/common/normal";
import GoogleAd from "@/components/GoogleAd";
import { BASEURL, PRIVATEURL } from "@/config";
import { useState } from "react";
import BaseBackground from "@/components/BaseBackground";
import TextBg from "@/components/TextBg";
import GoogleAutoAd from "@/components/GoogleAutoAd";

export async function getStaticPaths() {
  const response = await fetch(
    `${
      process.env.NODE_ENV === "development" ? BASEURL : PRIVATEURL
    }api/category?origin=udreamgames&page=1&size=10000`,
    { method: "GET" }
  );
  const data = await response.json();
  const paths = data.data.map((item: any) => ({
    params: {
      title: `${item.name.toLowerCase()}`,
    },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}: {
  params: { title: string };
}) {
  let totalNum = 0,
    totalPage = 1,
    search = {
      page: 1,
      size: 35,
    };
  const res = await getGameCategory({
    cate_name: params.title,
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
      title: params.title,
      totalNum,
      totalPage,
      search,
    },
  };
}

export default function CategoryDetail({
  gameList,
  title,
  totalNum,
  totalPage,
  search,
}: {
  gameList: any;
  title: string;
  totalNum: number;
  totalPage: number;
  search: any;
}) {
  const [loading, setLoading] = useState(false);
  const showMoreGame = () => {
    setLoading(true);
    search.page += 1;
    getGameCategory({ ...search, cate_name: title.toLowerCase() })
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
      <BaseBackground className={styles["game-content"]}>
        <div className={styles["title-top"]}>
          <a className={styles["return"]} href={"/category/"}>
            <img src="/img/base/return.svg" alt="return"></img>
          </a>
          <TextBg className={styles["title-content"]}>
            <div className={styles["title"]}>
              <span>{title}</span>
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
