/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import styles from "./large.module.scss";
import BaseImage from "../BaseImage";
type props = {
  className?: string;
  item: any;
};

export default function CommonLarge({ className = "", item }: props) {
  const pathName = useRouter().pathname;
  const path = pathName === "/" ? "home" : pathName;
  return (
    <a
      href={`/category/${item.name.toLowerCase()}/?from=${path}`}
      className={`${styles["large"]} ${className}`}
    >
      <BaseImage
        className={styles["img"]}
        src={item.site_icon}
        width={270}
        height={270}
        anim
        loading="lazy"
        alt="gameIcon"
      />
      <div className={styles["large__info"]}>
        <div className={styles["content"]}>
          <span className={styles["name"]}>{item.name}</span>
          <span className={styles["total"]}>{item.total} Games</span>
        </div>
        <img
          className={styles["cateBg"]}
          src="/img/base/cate-bg.svg"
          alt="cateBg"
        />
      </div>
    </a>
  );
}
