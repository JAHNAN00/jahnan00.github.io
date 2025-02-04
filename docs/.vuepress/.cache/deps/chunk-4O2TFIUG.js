// node_modules/.pnpm/vuepress-theme-reco@2.0.0-rc.26_@algolia+client-search@5.20.0_@types+node@22.13.0_@vueu_80e849c83c00e1b3689a4f5e3185bc23/node_modules/vuepress-theme-reco/lib/client/utils/other.js
function formatISODate(ISODate = "") {
  const dateStr = ISODate.replace("T", " ").replace("Z", "").split(".")[0];
  const formatDateStr = dateStr.replace(/(\s00:00:00)$/, "");
  return formatDateStr;
}

export {
  formatISODate
};
//# sourceMappingURL=chunk-4O2TFIUG.js.map
