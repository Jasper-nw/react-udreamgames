/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/favorite.module.scss";
import { getGameFavorite } from "@/api/index";
import CommonNormal from "@/components/common/normal";
import GoogleAd from "@/components/GoogleAd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BaseBackground from "@/components/BaseBackground";

export default function Favorite() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [recommendList, setRecommendList] = useState([]);
  useEffect(() => {
    getGameFavorite({})
      .then((res) => {
        setFavoriteList(res.data.favorite);
        setRecommendList(res.data.recommend);
      })
      .catch((error) => {
        toast.error(error.msg);
      });
  }, []);
  return (
    <article className={styles["favorite"]}>
      <BaseBackground className={styles["container-info"]}>
        <div className={styles["favorite-content"]}>
          <div className={styles["title"]}>Favorite Games</div>
          {favoriteList.length > 0 ? (
            <div className={styles["favorite-list"]}>
              {favoriteList.map((item: any) => (
                <CommonNormal item={item} key={item.id} />
              ))}
            </div>
          ) : (
            <div className={styles["none"]}>
              <p className={styles["sorry"]}>Sorry, You have no favorite games</p>
            </div>
          )}
        </div>
        <div className={styles["recommend-content"]}>
          <div className={styles["title"]}>Recommend</div>
          <div className={styles["recommend-list"]}>
            {recommendList.slice(0, 24).map((item: any) => (
              <CommonNormal item={item} key={item.id} />
            ))}
          </div>
        </div>
      </BaseBackground>
      <GoogleAd className={styles["midAd"]} id="2819824160" />
    </article>
  );
}
