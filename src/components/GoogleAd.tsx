import styles from "@/componentsStyles/GoogleAd.module.scss";
import { useEffect, useRef } from "react";
type props = {
  className: string;
  id: string;
};

export default function GoogleAd({ className, id }: props) {
  const googleAdStyle = useRef<HTMLDivElement>(null);
  let observer = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        const targetElement = entries[0].target;
        const adScript = document.createElement("script");
        adScript.innerHTML = `(adsbygoogle = window.adsbygoogle || []).push({});`;
        const insElement = document.createElement("ins");
        insElement.setAttribute("class", "adsbygoogle");
        insElement.setAttribute(
          "style",
          "display: block; width: 100%; height: 100%;"
        );
        insElement.setAttribute("data-ad-client", "ca-pub-3887371527059481");
        insElement.setAttribute("data-ad-slot", `${id}`);
        insElement.setAttribute("data-full-width-responsive", "true");
        targetElement.appendChild(insElement);
        targetElement.appendChild(adScript);
        observer.current?.unobserve(googleAdStyle.current as Element);
      }
    };
    if (googleAdStyle.current) {
      observer.current = new IntersectionObserver(handleIntersection);
      observer.current.observe(googleAdStyle.current);
    }

    return () => {
      observer.current?.disconnect(); // 清理 observer
    };
  }, [id]);

  return (
    <div
      className={`${className} ${styles["googleAdStyle"]}`}
      ref={googleAdStyle}
    >
      <p className={styles["title"]}>Advertisement</p>
    </div>
  );
}
