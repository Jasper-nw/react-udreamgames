//@ts-nocheck
let tryAdTimes = 0;
export const adBreakInit = () => {
  const defaultHolderFn = function (o) {
    window.adsbygoogle.push(o);
  };
  window.adBreak = window.adBreak || defaultHolderFn;
  window.adConfig = window.adConfig || defaultHolderFn;
  // 将游戏的当前配置传递给 Ad Placement API。Ad Placement API 可以借此调整广告的预加载方式，并过滤所请求的广告类型，以选择合适的类型（例如，需要声音的视频广告）
  try {
    console.log("config adBreak");
    window.adConfig({
      preloadAdBreaks: "on",
      sound: "off",
      onReady() {
        window.AD_BREAK_READY = true;
      },
    });
  } catch (error) {
    console.error("adConfig error=", error);
  }
};
export const showAdBreak = (callback) => {
  if (tryAdTimes >= 2) return;
  if (tryAdTimes < 2) {
    console.log("Ad start :>>", window.adBreak);
    try {
      window.adBreak({
        type: "preroll",
        name: "udreamgames_preroll",
        adBreakDone(placementInfo) {
          if (placementInfo.breakStatus === "timeout") {
            setTimeout(() => {
              tryAdTimes++;
              showAdBreak(callback);
            }, 1000);
          }
          callback(`Ad end :>> ${placementInfo.breakStatus}`);
        },
      });
    } catch (error) {
      console.error("Ad error :>>", error);
    }
  }
};
