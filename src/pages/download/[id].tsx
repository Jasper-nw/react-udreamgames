/* eslint-disable @next/next/no-img-element */
import BaseImage from "@/components/BaseImage";
import styles from "@/styles/download.module.scss";
import { getGameDetail, getGameRecommend } from "@/api";
import CommonNormal from "@/components/common/normal";
import GoogleAd from "@/components/GoogleAd";
import { BASEURL, PRIVATEURL } from "@/config";
import { formatDate } from "@/utils";
import QRCode from "qrcode.react";
import { useRef, useState } from "react";
import DialogGame from "@/components/DialogGame";
import DialogDownload from "@/components/DialogDownload";
import BaseBackground from "@/components/BaseBackground";
import TextBg from "@/components/TextBg";
import GoogleAutoAd from "@/components/GoogleAutoAd";

export async function getStaticPaths() {
  const response = await fetch(
    `${
      process.env.NODE_ENV === "development" ? BASEURL : PRIVATEURL
    }api/sitemap/games?origin=udreamgames`,
    { method: "GET" }
  );
  const data = await response.json();
  const paths = data.data
    .filter((bigItem: any) => bigItem.source !== 0)
    .map((item: any) => ({
      params: {
        id: `${item.name.replace(/[^a-zA-Z0-9\\s]/g, "-").toLowerCase()}-${
          item.id
        }`,
      },
    }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  let res = await getGameDetail({
    site_id: process.env.origin,
    game_id: params.id.replace(
      /^.*?(\d*)$/,
      (str, match, index) => match || "0"
    ),
  });
  let recRes = await getGameRecommend({
    id: params.id.replace(/^.*?(\d*)$/, (str, match, index) => match || "0"),
  });
  let iosSup = null,
    androidSup = null,
    iosUrl = null,
    androidUrl = null;
  let labels: any = [];
  if (res.data.detail.labels) {
    Object.keys(res.data.detail.labels).map((item) => {
      labels.push({ id: item, name: res.data.detail.labels[item] });
    });
  }
  if (!res.data.detail.banner) {
    res.data.detail.banner = [];
  } else {
    res.data.detail.banner = res.data.detail.banner.split(",");
  }
  let time = "";
  res.data.detail.apk_updated.split("/").map((item: any, index: number) => {
    time +=
      index > 0
        ? "," + formatDate(new Date(item * 1000), "mm/dd/YYYY")
        : "" + formatDate(new Date(item * 1000), "mm/dd/YYYY");
  });
  res.data.detail.os.split(",").map((item: any) => {
    if (item.toLowerCase() == "ios") {
      iosSup = true;
    } else if (item.toLowerCase() == "android") {
      androidSup = true;
    }
  });
  res.data.detail.apk_updated = time;
  res.data.detail.os.split(",").map((item: any, index: number) => {
    if (item.toLowerCase() == "ios") {
      iosUrl = res.data.detail.url.split(",")[index];
    } else if (item.toLowerCase() == "android") {
      androidUrl = res.data.detail.url.split(",")[index];
    }
  });
  if (res.data.detail.his_ver) {
    res.data.detail.his_ver = JSON.parse(res.data.detail.his_ver);
    res.data.detail.his_ver.map((item: any) => {
      item.updated = formatDate(new Date(item.updated * 1000), "mm/dd/YYYY");
    });
  }
  const allList =
    res.data.rec_library.first_100.concat(res.data.rec_library.last_100) || [];
  return {
    props: {
      appInfo: res.data,
      gameInfo: res.data.detail,
      gameListH5: recRes.data.list,
      allList,
      androidSup,
      iosSup,
      iosUrl,
      androidUrl,
      labels,
    },
  };
}

export default function DownloadPage({
  appInfo,
  gameInfo,
  allList,
  iosSup,
  androidSup,
  iosUrl,
  androidUrl,
  labels,
  gameListH5,
}: {
  appInfo: any;
  gameInfo: any;
  labels: any;
  iosSup: any;
  androidSup: any;
  iosUrl: any;
  androidUrl: any;
  gameListH5: any;
  allList: any;
}) {
  const previous = useRef(null);
  const [visibleGame, setVisibleGame] = useState(false);
  const [visibleDownload, setVisibleDownload] = useState(false);
  const goPrevious = () => {
    if (previous.current) {
      let offsetTop = (previous.current as any).offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <article className={styles["download"]}>
      <section className={styles["list"]}>
        {allList.map((item: any) => (
          <CommonNormal item={item} key={item.id} />
        ))}
        <div className={styles["container"]}>
          <BaseBackground className={styles["container__info"]}>
            <BaseImage
              className={styles["img"]}
              src={gameInfo.icon}
              width={160}
              height={160}
              loading="lazy"
              alt="gameIcon"
            />
            <div className={styles["right-info"]}>
              <div className={styles["name-info"]}>
                <BaseImage
                  className={styles["img-h5"]}
                  src={gameInfo.icon}
                  width={128}
                  height={128}
                  loading="lazy"
                  alt="gameIcon"
                />
                <div>
                  <span className={styles["span1"]}>{gameInfo.name}</span>
                  <span className={styles["span2"]}>{gameInfo.company_id}</span>
                </div>
              </div>
              <div className={styles["btn-info"]}>
                {appInfo.similar_h5 ? (
                  <TextBg className={styles["btn-normal-content"]} pink>
                    <a
                      className={styles["playnow"]}
                      href={`/game/${appInfo.similar_h5.game_name
                        .replace(/[^a-zA-Z0-9\\s]/g, "-")
                        .toLowerCase()}-${
                        appInfo.similar_h5.game_id
                      }/?from=download-id&playnow`}
                    >
                      <span>Play Now</span>
                      <img src="/img/base/playnow.svg" alt="playnow"></img>
                    </a>
                  </TextBg>
                ) : (
                  <TextBg
                    className={`${styles["btn-normal-content"]} ${styles["similarGame"]}`}
                    pink
                  >
                    <div
                      className={styles["playnow"]}
                      id="playSimilarBtnPc"
                      onClick={() => setVisibleGame(true)}
                    >
                      <span>Play Similar H5 Game</span>
                      <img src="/img/base/playnow.svg" alt="playnow"></img>
                    </div>
                  </TextBg>
                )}
                {gameInfo.his_ver && (
                  <TextBg
                    className={`${styles["btn-normal-content"]} ${styles["previous"]}`}
                    yellow
                  >
                    <div
                      className={styles["prever"]}
                      id="previousVerPc"
                      onClick={goPrevious}
                    >
                      <span>Download</span>
                      <img src="/img/base/download.svg" alt="download"></img>
                    </div>
                  </TextBg>
                )}
                {gameInfo.url && (
                  <TextBg
                    className={`${styles["btn-normal-content"]} ${styles["store-h5"]}`}
                  >
                    <div
                      className={styles["down_h5_hover"]}
                      id="downloadFromStoreH5"
                      onClick={() => setVisibleDownload(true)}
                    >
                      <span>Store Link</span>
                      <img src="/img/base/storelink.svg" alt="download"></img>
                    </div>
                  </TextBg>
                )}
                {gameInfo.url && (
                  <TextBg
                    className={`${styles["btn-normal-content"]} ${styles["store"]}`}
                  >
                    <div
                      className={styles["down_hover"]}
                      id="downloadFromStorePc"
                    >
                      <span>Store Link</span>
                      <img src="/img/base/storelink.svg" alt="download"></img>
                      <div className={styles["code"]}>
                        {iosUrl && (
                          <div className={styles["code__item"]}>
                            <p>iOS</p>
                            <QRCode value={iosUrl} size={90} level="H" />
                          </div>
                        )}
                        {androidUrl && (
                          <div className={styles["code__item"]}>
                            <p>Android</p>
                            <QRCode value={androidUrl} size={90} level="H" />
                          </div>
                        )}
                      </div>
                    </div>
                  </TextBg>
                )}
              </div>
              <div className={styles["desc"]}>{gameInfo.desc}</div>
            </div>
          </BaseBackground>
          <GoogleAd className={styles["midAd1"]} id="7497435779" />
          <BaseBackground className={styles["container__information"]}>
            <div className={styles["menu-title"]}>Additional Information</div>
            <div className={styles["information"]}>
              <div className={styles["information__item"]}>
                <span>Platform:</span>
                {iosUrl && <img src="/img/download/iosWhite.svg" alt="ios" />}
                {androidUrl && (
                  <img src="/img/download/androidWhite.svg" alt="android" />
                )}
              </div>
              <div className={styles["information__item"]}>
                <span>Version:</span>
                <span>{gameInfo.version}</span>
              </div>
              <div className={styles["information__item"]}>
                <span>Full Size:</span>
                <span>{gameInfo.apk_size}</span>
              </div>
              <div className={styles["information__item"]}>
                <span>Developer:</span>
                <span>{gameInfo.company_id}</span>
              </div>
              <div className={styles["information__item"]}>
                <span>Update:</span>
                <span>{gameInfo.apk_updated}</span>
              </div>
              <div className={styles["information__item"]}>
                <span className={styles["tags__span"]}>Tags:</span>
                {labels.map((item: any) => (
                  <a
                    href={`/label/${item.name.toLowerCase()}-${
                      item.id
                    }/?from=download-id`}
                    className={styles["game_tag"]}
                    key={item.id}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </BaseBackground>
          <BaseBackground className={styles["container__disclaimer"]}>
            <div className={styles["menu-title"]}>Disclaimer</div>
            <div className={styles["text"]}>
              The games on the Udreamgames.com website are sourced from the App
              Store and Google Play, and edited by our team. If you are
              interested in the games on our website, you can download them
              through the recommended download links, and some games that
              support being played directly on the browser. If there is any
              infringement, please contact us.
            </div>
          </BaseBackground>
          <BaseBackground className={styles["container__related"]} pink>
            <div className={styles["menu-title"]}>Related Games</div>
            <div className={styles["related-list"]}>
              {appInfo.relate.slice(0, 8).map((item: any) => (
                <CommonNormal
                  className={styles["related-item"]}
                  item={item}
                  key={item.id}
                />
              ))}
            </div>
          </BaseBackground>
          <div ref={previous}>
            <BaseBackground className={styles["container__previous"]}>
              <div className={styles["menu-title"]}>
                Previous versions(Only Android APK)
              </div>
              {!gameInfo.his_ver ? (
                <div className={styles["ver__none"]}>
                  Sorry, have no previous versions
                </div>
              ) : (
                <div className={`${styles["game_version"]}`}>
                  {gameInfo.his_ver.map((item: any, index: number) => (
                    <a
                      href={process.env.cdnUrl + item.down_url}
                      key={index}
                      className={`${styles["game_version_item"]}`}
                    >
                      <span>Ver: {item.ver}</span>
                      <span>Size: {item.apk_size}</span>
                      <span>Date: {item.updated}</span>
                    </a>
                  ))}
                </div>
              )}
            </BaseBackground>
          </div>
        </div>
        <GoogleAutoAd className={styles["h5Ad2"]} id="2436680786" />
      </section>
      <DialogGame
        visible={visibleGame}
        gameList={gameListH5}
        onClose={() => setVisibleGame(false)}
      />
      <DialogDownload
        visible={visibleDownload}
        iosUrl={iosUrl}
        androidUrl={androidUrl}
        onClose={() => setVisibleDownload(false)}
      />
    </article>
  );
}
