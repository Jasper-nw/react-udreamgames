import "@/styles/main.scss";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

import Layout from "@/components/layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // 当组件挂载时，设置isClient为true
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const device = require("current-device").default;
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("lang", "en");

    const setDeviceTypeClass = () => {
      // 首先移除所有可能的类名
      ["mobile", "tablet", "desktop"].forEach((type) => {
        htmlElement.classList.remove(type);
      });

      if (device.mobile()) {
        htmlElement.classList.add("mobile");
      } else if (device.tablet()) {
        htmlElement.classList.add("tablet");
      } else if (device.desktop()) {
        htmlElement.classList.add("desktop");
      }
    };

    const setOrientationClass = () => {
      ["landscape", "portrait"].forEach((orientation) => {
        htmlElement.classList.remove(orientation);
      });

      if (device.landscape()) {
        htmlElement.classList.add("landscape");
      } else if (device.portrait()) {
        htmlElement.classList.add("portrait");
      }
    };

    // 初始化时设置设备类型和方向的类名
    setDeviceTypeClass();
    setOrientationClass();

    // 监听设备方向的变化
    device.onChangeOrientation(() => {
      setOrientationClass();
    });
  }, [isClient]);
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-left"
        closeOnClick={false}
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable={false}
        draggablePercent={0.6}
        rtl={false}
        icon={true}
        hideProgressBar
      />
    </Layout>
  );
}
