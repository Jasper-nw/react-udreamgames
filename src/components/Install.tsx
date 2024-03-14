/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import styles from "@/componentsStyles/install.module.scss";
export default function Install() {
  let [prompt, setPrompt] = useState(null);
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", beforeinstallprompt);
  }, []);
  const beforeinstallprompt = (e: any) => {
    setPrompt(e);
    e.preventDefault();
    return false;
  };
  const download = () => {
    if (prompt) {
      (prompt as any).prompt(); // 使用类型断言
      (prompt as any).userChoice
        .then((res: any) => {
          console.log(res);
          // {outcome: "dismissed", platform: ""} // cancel
          // {outcome: "accepted", platform: "web"} // complete
        })
        .catch((err: any) => {
          // 同样，为 err 提供一个更精确的类型
          console.log(err);
        });
    }
  };
  return (
    <>
      {prompt && (
        <div className={styles["install"]} onClick={download}>
          <img src="/img/pc/downLoad.svg" alt="download" />
        </div>
      )}
    </>
  );
}
