/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/recent.module.scss";
import { getGameRecent } from "@/api/index";
import CommonNormal from "@/components/common/normal";
import GoogleAd from "@/components/GoogleAd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BaseBackground from "@/components/BaseBackground";

export default function RecentPage() {
  const [recentList, setRecentList] = useState([]);
  const [recommendList, setRecommendList] = useState([]);
  useEffect(() => {
    getGameRecent({})
      .then((res: any) => {
        // setRecentList(res.data.recent);
        setRecommendList(res.data.recommend);
      })
      .catch((error: any) => {
        toast.error(error.msg);
      });
    let recentGame =
      JSON.parse(localStorage.getItem("recentGame") || "[]") || [];
    setRecentList(recentGame);
  }, []);
  return (
    <article className={styles["recent"]}>
      <BaseBackground className={styles["container-info"]}>
        <div className={styles["recent-content"]}>
          <div className={styles["title"]}>Recent Games</div>
          {recentList.length > 0 ? (
            <div className={styles["recent-list"]}>
              {recentList.map((item: any) => (
                <CommonNormal item={item} key={item.id} />
              ))}
            </div>
          ) : (
            <div className={styles["none"]}>
              <p className={styles["sorry"]}>Sorry, You have no recent games</p>
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
