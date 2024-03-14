/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import styles from "./category.module.scss";
import BaseImage from "../BaseImage";
type props = {
  isNew?: boolean;
  className?: string;
  item: any;
};

export default function CommonCategory({ isNew, className, item }: props) {
  const pathName = useRouter().pathname;
  const path = pathName === "/" ? "home" : pathName;
  return (
    <a
      href={
        isNew
          ? `/new/?from=${path}`
          : `/category/${item.name.toLowerCase()}/?from=${path}`
      }
      className={`${styles["classify"]} ${className ? className : ""}`}
    >
      {isNew ? (
        <img
          className={styles["img"]}
          src="/img/base/new.png"
          alt="newBg"
        ></img>
      ) : (
        <BaseImage
          className={styles["img"]}
          src={item.bg_icon}
          width={160}
          height={160}
          loading="lazy"
          alt="gameIcon"
        />
      )}
      <div className={styles["classify__span"]}>{item.name}</div>
      <img
        className={styles["classify__img"]}
        src="/img/base/cate-info-bg.png"
        alt="cateItemBg"
      ></img>
    </a>
  );
}
