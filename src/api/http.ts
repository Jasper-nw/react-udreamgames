import { BASEURL } from "@/config/index";

//定义ts变量类型接口
interface HttpParms {
  baseURL?: string; //请求的基本URL，即后台服务器地址，（若服务器请求地址只有一个，可不填）
  url: string; //请求api接口地址
  method?: any; //请求方法
  query?: any; //添加查询搜索参数到URL
  body?: any; //请求体
}

export const http = async (obj: HttpParms) => {
  const queryString = Object.keys(obj.query)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(obj.query[key])}`
    )
    .join("&");

  let url = `${BASEURL}${obj.url}?origin=${process.env.origin}${
    queryString ? `&${queryString}` : ""
  }`;
  if (obj.method === "POST") {
    url = `${BASEURL}${obj.url}`;
    obj.query.origin = process.env.origin;
  }
  let options = {
    method: obj.method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj.query),
  };

  if (options.method === "GET") {
    delete (options as any).body;
  }
  const res = await fetch(url, { ...options, credentials: "include" });
  const resData = await res.json();
  return resData;
};
