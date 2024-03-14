import { useRouter } from "next/router";
import { getGameHome } from "@/api/index";
import styles from "./list.module.scss";
import CommonNormal from "@/components/common/normal";
import BaseImage from "../BaseImage";
type props = {
  recommend?: boolean;
  className?: string;
  item: any;
  gameList: any
};

export default function CommonNormalList({
  recommend = false,
  className,
  gameList,
  item,
}: props) {
  const href = item.name.replace(/[^a-zA-Z0-9\\s]/g, "-").toLowerCase();
  const pathName = useRouter().pathname;
  const path = pathName === "/" ? "home" : pathName;
  return (
    <div className={styles["more"]}>
      <div className={styles["more__info"]}>
        {gameList.map((item: any, index: number) =>
          <CommonNormal className={styles["moreList"]} item={item} key={item.id} />
        )}
        <div className={styles["info"]}>
          <div className={styles["title"]}>{item.name}</div>
          <a
            href={
              `/category/${item.name.toLowerCase()}/?from=${path}`
            }
            className={`${styles["more-btn"]}`}
          >
            <span>
              <span className={`${styles["more-span"]}`}>
                More
              </span>
              <img
                className={styles["img1"]}
                src="/img/pc/Rectangle22842.svg"
                alt=""
              />
              <img
                className={styles["img2"]}
                src="/img/pc/Rectangle22841.svg"
                alt=""
              />
              <img
                className={styles["img3"]}
                src="/img/pc/Rectangle22840.svg"
                alt=""
              />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
