const fs = require("fs");
const router = require("koa-router")();
const CryptoJS = require("crypto-js");
const { connectPg } = require("./connect/config");
const sql = require("./connect/sql");
const dateFormat = require("./utils/formatdate");

router.post("/upload", async ctx => {
  let content = await fs.readFileSync(ctx.request.files.file.path, "utf-8");
  return (ctx.body = {
    status: "success",
    content: content
  });
});
router.post("/selectArticle", async ctx => {
  let params = ctx.request.body;
  await connectPg(sql.selectArticle(params)).then(res => {
    let list = res[1];
    let total = res[0].rows[0].count;
    ctx.body = {
      total: parseInt(total),
      list: list.rows.map(item => {
        item.tags = item.tags ? item.tags.split(",") : "";
        item.releasetime = dateFormat(
          "yyyy-mm-dd",
          item.releasetime || new Date()
        );
        return item;
      })
    };
  });
});
router.get("/getArticle", async ctx => {
  let id = ctx.query.id;
  await connectPg(sql.getArticle(id)).then(res => {
    let bodyObj = { ...res.rows[0] };
    bodyObj.releasetime = dateFormat(
      "yyyy-mm-dd",
      new Date(bodyObj.releasetime)
    );
    ctx.body = { ...bodyObj };
  });
});
router.post("/updateArticle", async ctx => {
  let id = ctx.request.body.articleid;
  let params = ctx.request.body;
  console.log(params);
  await connectPg(sql.updateArticle(params, id)).then(res => {
    if (res.rowCount > 0) {
      let token = jwt.sign(obj, secret, opt);
      ctx.body = {
        status: "success",
        message: "保存成功"
      };
    } else {
      ctx.body = {
        status: "fail",
        message: "保存失败"
      };
    }
  });
});
router.post("/addArticle", async ctx => {
  let params = ctx.request.body;
  await connectPg(sql.addArticle(params)).then(res => {
    if (res.rowCount > 0) {
      ctx.body = {
        status: "success",
        message: "发布成功"
      };
    } else {
      ctx.body = {
        status: "fail",
        message: "发布失败"
      };
    }
  });
});
router.post("/login", async ctx => {
  let params = ctx.request.body;
  let pwd = params.password.slice(6, -1);
  var bytes = CryptoJS.AES.decrypt(pwd, "secret key 123");
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  console.log(decryptedData);
  await connectPg(sql.login(params)).then(res => {
    if (res.rowCount > 0) {
      ctx.body = {
        status: "success",
        message: "登录成功"
      };
    } else {
      ctx.body = {
        status: "fail",
        message: "登录失败"
      };
    }
  });
});
module.exports = router;
