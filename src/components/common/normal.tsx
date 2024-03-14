import { useRouter } from "next/router";
import styles from "./normal.module.scss";
import BaseImage from "../BaseImage";
type props = {
  recommend?: boolean;
  className?: string;
  item: any;
};

export default function CommonNormal({
  recommend = false,
  className,
  item,
}: props) {
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
      className={`${styles["normal"]} ${styles["scrollItem"]} ${className ? className : ""} ${recommend ? styles["recommend-normal"] : ""
        } ${item.source === 0 && item.platform === 1 && styles["showH5"]} ${item.source === 0 && item.platform === 2 && styles["showPc"]
        }`}
    >
      <BaseImage
        className={styles["normal__img"]}
        src={item.icon}
        width={172}
        height={172}
        loading="lazy"
        alt="gameIcon"
      />
      <span className={styles["normal__span"]}>{item.name}</span>
      {item.source == 0 && <div className={`${styles["normal__h5"]}`}></div>}
    </a>
  );
}
