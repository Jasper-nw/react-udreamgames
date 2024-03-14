/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import styles from "@/componentsStyles/PageHeader.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import Install from "./Install";
import DialogMenu from "./DialogMenu";
import DialogSearch from "./DialogSearch";

export default function PageHeader() {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const pathname = useRouter().pathname;
  const menu = [
    {
      name: "Home",
      path: "/",
      href: "",
      svg: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-v-677403e8=""
        >
          <path
            d="M11.0836 14.5037L10.9454 14.2273H10.6364H7.36364H7.05462L6.91642 14.5037L5.41826 17.5H2.66165L1.58083 16.4192L0.5 15.3383V9V3.47983L1.98992 1.98992L3.47983 0.5H9H14.5202L16.0101 1.98992L17.5 3.47983V9V13.5V15.3383L16.4192 16.4192L15.3383 17.5H12.5817L11.0836 14.5037Z"
            stroke="black"
            data-v-677403e8=""
          ></path>{" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 6H2V9H4V11H7V9H9V6L7 6V4H4V6ZM5 5V7H3V8H5V10H6V8H8V7H6V5H5Z"
            fill="black"
            data-v-677403e8=""
          ></path>{" "}
          <circle
            cx="13.5"
            cy="7.5"
            r="2"
            stroke="black"
            data-v-677403e8=""
          ></circle>
        </svg>
      ),
      svgAc: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="#F09E36"
          xmlns="http://www.w3.org/2000/svg"
          data-v-677403e8=""
        >
          <path
            d="M11.0836 14.5037L10.9454 14.2273H10.6364H7.36364H7.05462L6.91642 14.5037L5.41826 17.5H2.66165L1.58083 16.4192L0.5 15.3383V9V3.47983L1.98992 1.98992L3.47983 0.5H9H14.5202L16.0101 1.98992L17.5 3.47983V9V13.5V15.3383L16.4192 16.4192L15.3383 17.5H12.5817L11.0836 14.5037Z"
            stroke="black"
            data-v-677403e8=""
          ></path>{" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 6H2V9H4V11H7V9H9V6L7 6V4H4V6ZM5 5V7H3V8H5V10H6V8H8V7H6V5H5Z"
            fill="black"
            data-v-677403e8=""
          ></path>{" "}
          <circle
            cx="13.5"
            cy="7.5"
            r="2"
            stroke="black"
            data-v-677403e8=""
          ></circle>
        </svg>
      ),
    },
    {
      name: "Category",
      path: "/category",
      href: "/category",
      svg: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-v-677403e8=""
        >
          <rect
            x="0.5"
            y="0.5"
            width="7"
            height="7"
            stroke="black"
            data-v-677403e8=""
          ></rect>{" "}
          <rect
            x="10.5"
            y="0.5"
            width="7"
            height="7"
            stroke="black"
            data-v-677403e8=""
          ></rect>{" "}
          <rect
            x="10.5"
            y="10.5"
            width="7"
            height="7"
            stroke="black"
            data-v-677403e8=""
          ></rect>
        </svg>
      ),
      svgAc: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="#F09E36"
          xmlns="http://www.w3.org/2000/svg"
          data-v-677403e8=""
        >
          <rect
            x="0.5"
            y="0.5"
            width="7"
            height="7"
            stroke="black"
            data-v-677403e8=""
          ></rect>{" "}
          <rect
            x="10.5"
            y="0.5"
            width="7"
            height="7"
            stroke="black"
            data-v-677403e8=""
          ></rect>{" "}
          <rect
            x="10.5"
            y="10.5"
            width="7"
            height="7"
            stroke="black"
            data-v-677403e8=""
          ></rect>
        </svg>
      ),
    },
    {
      name: "Favorite",
      path: "/favorite",
      href: "/favorite",
      svg: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-v-677403e8=""
        >
          <path
            d="M7.02577 3.36858L7.16914 3.5H7.36364H17.5V16.5H0.5V0.5H3.89642L7.02577 3.36858Z"
            stroke="black"
            data-v-677403e8=""
          ></path>{" "}
          <rect
            x="8"
            y="1"
            width="9"
            height="1"
            fill="black"
            data-v-677403e8=""
          ></rect>{" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 8H5V12H7L7 14H11V12H13V8H11V6H7V8ZM8 7V9H6V11H8V13H10V11H12V9H10V7H8Z"
            fill="black"
            data-v-677403e8=""
          ></path>
        </svg>
      ),
      svgAc: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="#F09E36"
          xmlns="http://www.w3.org/2000/svg"
          data-v-677403e8=""
        >
          <path
            d="M7.02577 3.36858L7.16914 3.5H7.36364H17.5V16.5H0.5V0.5H3.89642L7.02577 3.36858Z"
            stroke="black"
            data-v-677403e8=""
          ></path>{" "}
          <rect
            x="8"
            y="1"
            width="9"
            height="1"
            fill="black"
            data-v-677403e8=""
          ></rect>{" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 8H5V12H7L7 14H11V12H13V8H11V6H7V8ZM8 7V9H6V11H8V13H10V11H12V9H10V7H8Z"
            fill="black"
            data-v-677403e8=""
          ></path>
        </svg>
      ),
    },
    {
      name: "Recent",
      path: "/recent",
      href: "/recent",
      svg: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-v-677403e8=""
        >
          <circle
            cx="9"
            cy="9"
            r="8.5"
            stroke="black"
            data-v-677403e8=""
          ></circle>{" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 7V3H7V11H15V7H11ZM14 8H10V4H8V10H14V8Z"
            fill="black"
            data-v-677403e8=""
          ></path>
        </svg>
      ),
      svgAc: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="#F09E36"
          xmlns="http://www.w3.org/2000/svg"
          data-v-677403e8=""
        >
          <circle
            cx="9"
            cy="9"
            r="8.5"
            stroke="black"
            data-v-677403e8=""
          ></circle>{" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 7V3H7V11H15V7H11ZM14 8H10V4H8V10H14V8Z"
            fill="black"
            data-v-677403e8=""
          ></path>
        </svg>
      ),
    },
  ];

  return (
    <header className={`${styles["header"]}`} id="pageHeader">
      <div className={styles["pcActive"]}>
        <a href={"/"} className={styles["logo"]}></a>
        <div className={styles["pcActive"]}>
          <div className={styles["pc_left"]}>
            <a href={"https://udreamgames.com/"} aria-label="Return Home">
              {/* <img src="/public/img/header/log_home_Color 01.svg" alt="" /> */}
              <img src="/img/header/log_home_Color01.svg" alt="search" />
            </a>
            {/* <a href={"https://udreamgames.com/"} aria-label="Return Home">
              <img src="/public/img/header/left_logo.svg" alt="" />
            </a> */}
          </div>
          <div className={styles["pc_contonet"]}>
            <nav className={styles["menu"]}>
              {menu.map((item, index) => (
                <a
                  className={`${styles["menu-item"]} ${
                    (item.path == pathname ||
                      (item.path !== "/" && pathname.includes(item.path))) &&
                    styles["active"]
                  } ${item.path === "/" && styles["isHome"]}
                  `}
                  href={`${item.href}/`}
                  key={index}
                >
                  {item.path == pathname ||
                  (item.path !== "/" && pathname.includes(item.path))
                    ? item.svgAc
                    : item.svg}
                  <p className={styles["path"]}>{item.name}</p>
                </a>
              ))}
            </nav>
          </div>
          <div className={styles["pc_right"]}>
            <button
              className={styles["search_img"]}
              onClick={() => setVisibleSearch(true)}
            >
              <img src="/img/header/iconSearch.svg" alt="search" />
            </button>
            <Install />
            <button className={styles["search_img"]}>
              <img src="/img/header/ic_turn02.svg" alt="search" />
            </button>
          </div>
        </div>
        <div className={styles["h5Active"]}>
          <Install />
          <button
            className={styles["h5search"]}
            onClick={() => setVisibleSearch(true)}
          >
            <img src="/img/header/iconSearch.svg" alt="search" />
          </button>
          <button
            className={styles["h5menu"]}
            onClick={() => setVisibleMenu(true)}
          >
            <img src="/img/header/iconMenu.svg" alt="menu" />
          </button>
        </div>
      </div>
      <DialogMenu
        visible={visibleMenu}
        menu={menu}
        onClose={() => setVisibleMenu(false)}
      />
      <DialogSearch
        visible={visibleSearch}
        menu={menu}
        onClose={() => setVisibleSearch(false)}
      />
    </header>
  );
}
