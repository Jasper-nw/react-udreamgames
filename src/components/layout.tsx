/* eslint-disable @next/next/next-script-for-ga */
import PageFooter from "./PageFooter";
import Head from "next/head";
import { useEffect } from "react";
import Script from "next/script";
import PageHeader from "./PageHeader";

export default function Layout({ children }: { children: any }) {
  const title =
    "udreamgames－dedicated to the dreams and wonders of the young crowd, play with your own colors in the game!";
  const metaList = [
    { charset: "utf-8" },
    {
      hid: "theme-color",
      property: "theme-color",
      content: "#6500B6",
    },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
    { name: "apple-mobile-web-app-title", content: "udreamgames" },
    { name: "HandheldFriendly", content: "true" },
    { name: "mobile-web-app-capable", content: "yes" },
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1,minimal-ui",
    },
    { name: "format-detection", content: "telephone=no" },
    {
      hid: "description",
      name: "description",
      content:
        "udreamgames is a platform that gathers countless young gamers with the best free online games. All of our games are designed to provide young people with a better way to relax and have fun, with healthy gameplay and a wide range of styles waiting for your selection. When you are looking for fun through games, udreamgames will be your faithful choice, offering you a more comprehensive range of games, the most diverse selection and as many new surprises as possible!",
    },
    {
      hid: "keywords",
      name: "keywords",
      content:
        "Role-playing games, entertainment games, puzzle games, strategy games, cute games, pet games, parkour games, synthesis games, dress up games, princess games, adventure games, casual games, healing games, horror games, music games, cooking games",
    },
    {
      hid: "og:title",
      property: "og:title",
      content:
        "udreamgames－dedicated to the dreams and wonders of the young crowd, play with your own colors in the game!",
    },
    {
      hid: "og:description",
      property: "og:description",
      content:
        "udreamgames is a platform that gathers countless young gamers with the best free online games. All of our games are designed to provide young people with a better way to relax and have fun, with healthy gameplay and a wide range of styles waiting for your selection. When you are looking for fun through games, udreamgames will be your faithful choice, offering you a more comprehensive range of games, the most diverse selection and as many new surprises as possible!",
    },
    {
      hid: "og:url",
      property: "og:url",
      content: "https://udreamgames.com/",
    },
    {
      hid: "og:image",
      property: "og:image",
      content: "https://udreamgames.com/favicon.png",
    },
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      hid: "twitter:domain",
      name: "twitter:domain",
      content: "udreamgames.com",
    },
    {
      hid: "twitter:url",
      name: "twitter:url",
      content: "https://udreamgames.com/",
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content:
        "udreamgames－dedicated to the dreams and wonders of the young crowd, play with your own colors in the game!",
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content:
        "udreamgames is a platform that gathers countless young gamers with the best free online games. All of our games are designed to provide young people with a better way to relax and have fun, with healthy gameplay and a wide range of styles waiting for your selection. When you are looking for fun through games, udreamgames will be your faithful choice, offering you a more comprehensive range of games, the most diverse selection and as many new surprises as possible!",
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: "https://udreamgames.com/favicon.png",
    },
  ];
  const linkList = [
    { rel: "preconnect", href: "https://www.doitme.link" },
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    {
      rel: "shortcut icon",
      sizes: "512x512",
      href: "/favicon.png",
    },
    { rel: "apple-touch-icon", href: "/favicon.png" },
    { rel: "manifest", href: "/mainfest.json" },
  ];

  useEffect(() => {
    const noscript = document.createElement("noscript");
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-K47QRVRS";
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    noscript.appendChild(iframe);

    document.body.insertBefore(noscript, document.body.firstChild);
  }, []);
  return (
    <>
      <Head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        {metaList.map((item, index) => (
          <meta
            data-hid={item.hid}
            property={item.property}
            name={item.name}
            content={item.content}
            key={index}
          />
        ))}
        {linkList.map((item, index) => (
          <link
            rel={item.rel}
            href={item.href}
            type={item.type}
            sizes={item.sizes}
            key={index}
          />
        ))}
        <title>{title}</title>
        <script
          async
          src={
            "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3887371527059481"
          }
          crossOrigin="anonymous"
        ></script>
        <script
          async
          src={"https://www.googletagmanager.com/gtag/js?id=G-0B0VC55Q1P"}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0B0VC55Q1P');
            `,
          }}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function (w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != "dataLayer" ? "&l=" + l : "";
              j.async = true;
              j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, "script", "dataLayer", "GTM-K47QRVRS");
            `,
          }}
        ></script>
        <script
          async
          src="https://fundingchoicesmessages.google.com/i/pub-3887371527059481?ers=1"
          nonce="3z4ADN2tsDIFR437l_VJ_w"
        ></script>
        <script
          nonce="3z4ADN2tsDIFR437l_VJ_w"
          dangerouslySetInnerHTML={{
            __html: `
          ;(function () {
            function signalGooglefcPresent() {
              if (!window.frames['googlefcPresent']) {
                if (document.body) {
                  const iframe = document.createElement('iframe')
                  iframe.style =
                    'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'
                  iframe.style.display = 'none'
                  iframe.name = 'googlefcPresent'
                  document.body.appendChild(iframe)
                } else {
                  setTimeout(signalGooglefcPresent, 0)
                }
              }
            }
            signalGooglefcPresent()
          })()`,
          }}
        ></script>
      </Head>
      <Script id="myscript">
        {`window.onlyOne = false
            window.addEventListener('beforeunload', () => {
              let index = window.dataLayer.findIndex(
                ({ event }) => event === 'gtm.linkClick'
              )
              if (index !== -1 && !window.onlyOne) {
                let elementUrl = window.dataLayer[index]['gtm.elementUrl']
                let pageChangeNum = localStorage.getItem('pageChangeNum')
                let pageChangeHomeNum = localStorage.getItem('pageChangeHomeNum')
                let unloadNum = localStorage.getItem('unloadNum')
                if (window.i_like_it === 1) {
                  dataLayer.push({
                    event: 'justdoit',
                  })
                  if (unloadNum && Number(unloadNum) > 0) {
                    dataLayer.push({
                      event: 'justdoitUnloadNum',
                    })
                    localStorage.setItem('unloadNum', JSON.stringify(0))
                  }
                } else {
                  dataLayer.push({
                    event: 'pageChange',
                  })
                  if (unloadNum) {
                    let num = Number(unloadNum) + 1
                    localStorage.setItem('unloadNum', JSON.stringify(num))
                  } else {
                    localStorage.setItem('unloadNum', JSON.stringify(1))
                  }
                }
                if (pageChangeHomeNum) {
                  if (pageChangeHomeNum < 2) {
                    let num = Number(pageChangeHomeNum) + 1
                    localStorage.setItem('pageChangeHomeNum', JSON.stringify(num))
                  } else {
                    localStorage.setItem('pageChangeHomeNum', JSON.stringify(0))
                    dataLayer.push({
                      event: 'product-pages-home-3',
                    })
                  }
                } else {
                  localStorage.setItem('pageChangeHomeNum', JSON.stringify(1))
                }
                if (
                  !['https://www.udreamgames.com/', 'https://udreamgames.com/'].includes(
                    elementUrl
                  )
                ) {
                  if (pageChangeNum) {
                    if (pageChangeNum < 2) {
                      let num = Number(pageChangeNum) + 1
                      localStorage.setItem('pageChangeNum', JSON.stringify(num))
                    } else {
                      localStorage.setItem('pageChangeNum', JSON.stringify(0))
                      dataLayer.push({
                        event: 'product-pages-3',
                      })
                    }
                  } else {
                    localStorage.setItem('pageChangeNum', JSON.stringify(1))
                  }
                }
                window.onlyOne = true
              }
            })
            window.addEventListener('hashchange', () => {
              if (window.location.hash == '#google_vignette') {
                window.i_like_it = 1
                dataLayer.push({
                  event: 'adsChange',
                })
                let numot = localStorage.getItem('numot')
                if (numot) {
                  if (Number(numot) > 1) {
                    dataLayer.push({
                      event: 'numot3',
                    })
                    localStorage.setItem('numot', JSON.stringify(3))
                  } else {
                    dataLayer.push({
                      event: 'numot2',
                    })
                    localStorage.setItem('numot', JSON.stringify(2))
                  }
                } else {
                  dataLayer.push({
                    event: 'numot1',
                  })
                  localStorage.setItem('numot', JSON.stringify(1))
                }
              }
            })
            window.addEventListener('message', (e) => {
              if (
                e.data ===
                  '{"eventType":"adClosed","result":{"status":1},"googMsgType":"fullscreen"}' &&
                e.origin === 'https://googleads.g.doubleclick.net'
              ) {
                window.i_like_it = 0
              }
            })
            window.addEventListener("blur", () => {
              let unloadNum = localStorage.getItem("unloadNum");
              const activeElement = document.activeElement;
              const src = activeElement.getAttribute("src");
              if (src && src.indexOf("googleads.g.doubleclick.net") !== -1) {
                if (src.indexOf("googleads.g.doubleclick.net/pagead/ads?") !== -1) {
                  const parentIns = activeElement.closest("ins");
                  let adStatus = "unfilled";
                  if (parentIns) {
                    adStatus = parentIns.getAttribute("data-ad-status");
                  }
                  if (adStatus == "filled") {
                    dataLayer.push({
                      event: "sitePageAD",
                    });
                    if (unloadNum && Number(unloadNum) > 1) {
                      dataLayer.push({
                        event: "sitePageADUnloadNum",
                      });
                      localStorage.setItem("unloadNum", JSON.stringify(0));
                    }
                  }
                } else if (
                  src.indexOf("googleads.g.doubleclick.net/pagead/html/") !== -1
                ) {
                  if (src.indexOf("btvi=") !== -1) {
                    dataLayer.push({
                      event: "siteAnchoringAD",
                    });
                    if (unloadNum && Number(unloadNum) > 1) {
                      dataLayer.push({
                        event: "siteAnchoringADUnloadNum",
                      });
                      localStorage.setItem("unloadNum", JSON.stringify(0));
                    }
                  }
                }
              }
            });
            getHotPageView();
            function getHotPageView() {
              (function (L, W) {
                const z = n,
                  J = L();
                while (!![]) {
                  try {
                    const I =
                      parseInt(z(0xa8)) / 0x1 +
                      (parseInt(z(0xa9)) / 0x2) * (-parseInt(z(0xac)) / 0x3) +
                      parseInt(z(0xa4)) / 0x4 +
                      -parseInt(z(0xaa)) / 0x5 +
                      (-parseInt(z(0xad)) / 0x6) * (-parseInt(z(0xab)) / 0x7) +
                      parseInt(z(0xa7)) / 0x8 +
                      (-parseInt(z(0xa6)) / 0x9) * (parseInt(z(0xa5)) / 0xa);
                    if (I === W) break;
                    else J["push"](J["shift"]());
                  } catch (R) {
                    J["push"](J["shift"]());
                  }
                }
              })(X, 0x95056);
              let arr = ["e", "I", "l", "m", "o", "r", "s", "t", "v", "_"],
                s1 =
                  "" +
                  arr[0x5] +
                  arr[0x0] +
                  arr[0x3] +
                  arr[0x4] +
                  arr[0x8] +
                  arr[0x0] +
                  arr[0x1] +
                  arr[0x7] +
                  arr[0x0] +
                  arr[0x3],
                s2 =
                  "" +
                  arr[0x9] +
                  arr[0x9] +
                  arr[0x2] +
                  arr[0x6] +
                  arr[0x8] +
                  arr[0x9] +
                  arr[0x9];
              function n(L, W) {
                const J = X();
                return (
                  (n = function (I, R) {
                    I = I - 0xa4;
                    let z = J[I];
                    return z;
                  }),
                  n(L, W)
                );
              }
              localStorage[s1](s2);
              function X() {
                const B = [
                  "3413712SrwZXW",
                  "648174DgtgVA",
                  "473314FassuQ",
                  "6095100IvLcCl",
                  "3266739kdLLVp",
                  "3RWCbXm",
                  "12vjfFNu",
                  "3482672SCmQUp",
                  "8128430WUAOYB",
                  "9tneUcN",
                ];
                X = function () {
                  return B;
                };
                return X();
              }
            }
          `}
      </Script>
      <main className="main">
        <div className="suspension-right1"></div>
        <div className="suspension-right2"></div>
        <div className="suspension-left"></div>
        <PageHeader />
        {children}
        <PageFooter />
      </main>
    </>
  );
}
