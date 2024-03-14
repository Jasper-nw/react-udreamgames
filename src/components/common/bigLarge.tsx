import { useRouter } from "next/router";
import styles from "./bigLarge.module.scss";
import BaseImage from "../BaseImage";
import TextBg from "../TextBg";
type props = {
  className?: string;
  item: any;
};

export default function CommonBigLarge({ className = "", item }: props) {
  const href = item.name.replace(/[^a-zA-Z0-9\\s]/g, "-").toLowerCase();
  const pathName = useRouter().pathname;
  const path = pathName === "/" ? "home" : pathName;
  return (
    <a
      href={
        item.source === 0
          ? `/game/${href}-${item.id}/?from=${path}`
          : `/app/${href}-${item.id}/?from=${path}`
      }
      className={`${styles["large"]} ${className}`}
    >
      <BaseImage
        className={styles["img"]}
        src={item.icon}
        width={380}
        height={380}
        loading="lazy"
        alt="gameIcon"
      />
      <div className={styles["large__info"]}>
        <span className={styles["large__span"]}>{item.name}</span>
        <span className={styles["large__desc"]}>{item.desc}</span>
        <TextBg className={styles["large__btn"]} yellow>
          <span>PLAY</span>
        </TextBg>
      </div>
    </a>
  );
}
