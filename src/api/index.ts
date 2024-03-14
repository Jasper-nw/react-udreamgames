import { http } from "./http";

/* 主页 */
export const getGameHome = (params: any) => {
  return http({ url: "api/game/home", query: params });
};
/* 查询分类列表 */
export const getCategory = (params: any) => {
  return http({ url: "api/category", query: params });
};
/* 分类详情 */
export const getGameCategory = (params: any) => {
  return http({ url: "api/game/category", query: params });
};
/* 获取推荐游戏 */
export const getGameRecommend = (params: any) => {
  return http({ url: "api/game/rec", query: params });
};
/* 查询详情 */
export const getGameDetail = (params: any) => {
  return http({ url: "api/game/detail", query: params });
};
/* 推荐游戏 */
export const getGameNew = (params: any) => {
  return http({ url: "api/game/new", query: params });
};
/* 搜索 */
export const getGameSearch = (params: any) => {
  return http({ url: "api/game/search", query: params });
};
/* 获取分类推荐 */
export const getGameMenu = (params: any) => {
  return http({ url: "api/game/menu", query: params });
};
/* 游戏标签 */
export const getLabel = (params: any) => {
  return http({ url: "api/label", query: params });
};
/* 获取喜爱游戏 */
export const getGameFavorite = (params: any) => {
  return http({ url: "api/game/favorite", query: params });
};
/* 最近访问 */
export const getGameRecent = (params: any) => {
  return http({ url: "api/game/recent", query: params });
};
/* 游戏标签搜索 */
export const getGameLabel = (params: any) => {
  return http({ url: "api/game/label", query: params });
};
/* 游戏标签搜索 */
export const getGameRecommendList = (params: any) => {
  return http({ url: "api/game/release", query: params });
};
/* 喜爱游戏 */
export const postGameVote = (params: any) => {
  return http({ url: "api/game/vote", method: "POST", query: params });
};

/* 邮箱订阅 */
export const postSubscribe = (params: any) => {
  return http({ url: "api/subscribe", method: "POST", query: params });
};
