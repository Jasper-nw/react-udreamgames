/* eslint-disable @next/next/no-img-element */
import { postSubscribe } from "@/api";
import styles from "@/componentsStyles/PageFooter.module.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TextBg from "./TextBg";

export default function PageFooter() {
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const handleChangeValue = (event: any) => {
    setInputValue(event.target.value);
  };
  const handleOnKeyDown = (event: any) => {
    if (event.key === "Enter") {
      subscribeEmaill();
    }
  };

  useEffect(() => {
    const scrolling = () => {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      setIsTop(!scrollTop);
    };
    window.addEventListener("scroll", scrolling);
  }, []);

  const subscribeEmaill = () => {
    if (status) return;
    if (
      inputValue.search(
        /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
      ) != -1
    ) {
      setStatus(true);
      let data = {
        email: inputValue,
      };
      postSubscribe(data)
        .then(() => {
          toast.success("Subscribed email successfully");
          setStatus(false);
        })
        .catch((error) => {
          toast.error(error.msg);
          setStatus(false);
        });
    } else {
      toast.warning("Please enter the correct email address");
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className={styles["footer"]}>

      <h2 className={`${styles["recommend_div"]} ${styles["recommend_div-h5"]} `}>
        <span>About Us</span>
      </h2>
      <div className={styles["recommend_div"]}>
        <p className={styles["title_P"]}>
          <span className={styles["title_span"]}>About udreamgames</span><br />
          <span className={styles["title_desc"]}>
            Our mission is to be the most concerned company in gaming by players
            and developers. <br />
            We cultivate a creative, come-as-you-are environment around our people
            to enable their best work, ensure all are heard and celebrated, and
            enable ownership over a culture that ultimately belongs to them.<br />
            We invite those interested in being part of something new to explore
            our openings and join us.
          </span>
        </p>
      </div>
      <div className={styles["footer__bottom"]}>
        {!isTop && (
          <div className={styles["scroll-top"]} onClick={scrollToTop}>
            <img src="/img/footer/goTop.svg" alt="toTop" />
          </div>
        )}
        <div className={styles["footer__bottom__link"]}>
          <div className={styles["links"]}>
            <span>
              <img src="/img/footer/udream.svg" alt="footerImg" />
            </span>
            <a href={"/eula.html"} target="_blank">
              Terms of Service
            </a>
            <a href={"/privacy.html"} target="_blank">
              Privacy Policy
            </a>
            <a href={"/cookies.html"} target="_blank">
              Cookies Policy
            </a>
            <a href="mailto:service@Udreamgames.com">Contact Us</a>
          </div>
          <div className={styles["handle"]}>
            <p>Notify me when there are new games</p>
            <input
              className={styles["inp"]}
              value={inputValue}
              onChange={handleChangeValue}
              placeholder="Email address..."
              onKeyDown={handleOnKeyDown}
              maxLength={50}
            ></input>
            <button className={styles["common-btn"]} onClick={subscribeEmaill}>
              SUBMIT
            </button>
          </div>
        </div>
        <div className={styles["bottom_characters"]}>
          <span className={styles["active"]}>Copyright © 2023 udreamgames All rights reserved.</span>
        </div>
      </div>
      <div className={styles["footer__bottom-h5"]}>
        <div className={styles["logo"]}>
          <img src="/img/footer/udream.svg" alt="footerImg" />
        </div>
        <h3 >
          Notify me when there are new games
        </h3>
        <div className={styles["handle_h5"]}>
          <input
            className={styles["inp"]}
            value={inputValue}
            onChange={handleChangeValue}
            placeholder="Email address..."
            onKeyDown={handleOnKeyDown}
            maxLength={50}
          ></input>
          <button className={styles["common-btn"]} onClick={subscribeEmaill}>
            SUBMIT
          </button>
        </div>
        <hr />
        <div className={styles["link"]}>
          <div className={styles["links"]}>
            <a className={styles["item"]} href={"/eula.html"} target="_blank">
              <span>Terms of Service</span>
              <span> > </span>
            </a>
            <a className={styles["item"]} href={"/privacy.html"} target="_blank">
              <span>Privacy Policy</span>
              <span>></span>
            </a>
            <a className={styles["item"]} href={"/cookies.html"} target="_blank">
              <span>Cookies Policy</span>
              <span>></span>
            </a>
            <a className={styles["item"]} href="mailto:service@Udreamgames.com"> <span>Contact Us</span>
              <span>></span>
            </a>
          </div>
          <span className={styles["active"]}>
            Copyright © 2023 udreamgames All rights reserved.
          </span>
          <div className={styles["right-bg"]}></div>
        </div>
      </div>
    </footer>
  );
}
