const Koa = require("koa");
const path = require("path");
const koaBody = require("koa-body");
const jwt = require("jsonwebtoken");
const router = require("./routes");
const cors = require("koa2-cors");
const app = new Koa();
const { findDir, getFileExt, getFileName } = require("./utils/file");
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
      uploadDir: path.join(__dirname, "upload/"), // 设置文件上传目录
      keepExtensions: true,
      onFileBegin: (name, file) => {
        // 获取文件后缀
        const ext = getFileExt(file.name);
        // 最终要保存到的文件夹目录
        const dir = path.join(__dirname, `upload/`);
        // 检查文件夹是否存在如果不存在则新建文件夹
        findDir(dir);
        // 获取文件名称
        const fileName = getFileName(ext);
        // 重新覆盖 file.path 属性
        file.path = `${dir}/${fileName}`;
      }
    }
  })
);
app.use(
  cors({
    origin: function(ctx) {
      return "*";
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 1000,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
  })
);
// async function checkToken(ctx) {
//   let url = ctx.request.url;
//   // 登录 不用检查
//   if (url === "/login") await next();
//   else {
//     // 规定token写在header 的 'autohrization'
//     let token = ctx.request.headers["authorization"];
//     // 解码
//     let payload = await jwt.verify(token, 'fuyafeng');
//     console.log(payload);
//     let { time, timeout } = payload;
//     let data = new Date().getTime();
//     if (data - time <= timeout) {
//       // 未过期
//       await next();
//     } else {
//       //过期
//       ctx.body = {
//         status: 50014,
//         message: "token 已过期"
//       };
//     }
//   }
// }
// app.use(checkToken);
app.use(router.routes(), router.allowedMethods());
app.listen(3000);
