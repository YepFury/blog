const uuid = require("uuid");
// 查询列表
const selectArticle = params => {
  let pageNum = params.pageInfo.pageNum;
  let pageSize = params.pageInfo.pageSize;
  let keywords = params.filterInfo.keywords;
  let tag = params.filterInfo.tag;
  let starttime = params.filterInfo.starttime;
  let endtime = params.filterInfo.endtime;
  let baseSql = `SELECT articlename,articleid,tags,des,releasetime FROM article`;
  let filterSql = "";
  let pageSql = ` LIMIT ${pageSize} OFFSET ${(pageNum - 1) * 10}`;
  if (keywords) {
    filterSql = `WHERE POSITION('${keywords}' in articlename) > 0 OR POSITION('${keywords}' in des) > 0`;
  } else if (tag) {
    filterSql = `WHERE POSITION('${keywords}' in articlename) > 0`;
  } else if (starttime && endtime) {
    filterSql = `WHERE releasetime BETWEEN '${starttime}' and '${endtime}'`;
  } else {
    filterSql = ``;
  }
  return `SELECT COUNT(*) FROM article ${filterSql}; ${baseSql} ${filterSql} ORDER BY "releasetime" DESC ${pageSql}`;
};
// 获取文章
const getArticle = id => {
  return `SELECT * FROM "article" WHERE articleid='${id}'`;
};
// 更新文章
const updateArticle = (params, id) => {
  let str = "";
  for (let key in params) {
    if (key !== "articleid") {
      str += `${key} = '${params[key]}',`;
    }
  }
  return `UPDATE "article" SET ${str.slice(0, -1)} WHERE articleid = '${id}';`;
};
// 添加文章
const addArticle = params => {
  let id = uuid.v1();
  return `INSERT INTO "public"."article"("articlename", "articleid", "articlecontent", "tags", "releasetime", "des") VALUES ('${params.articlename}', '${id}', '${params.articlecontent}', '${params.tags}', '${params.releasetime}', '${params.desc}')`;
};
// 登录
const login = params => {
  return `SELECT * FROM "user" WHERE username = '${
    params.username
  }' AND password = '${params.password.slice(6, -1)}'`;
};

module.exports = {
  selectArticle,
  getArticle,
  updateArticle,
  addArticle,
  login
};
