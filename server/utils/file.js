const fs = require("fs");
function findDir(fp) {
  if (!fs.existsSync(fp)) {
    // 检查是否有文件夹
    fs.mkdirSync(fp); // 没有就创建
  }
}

function getFileExt(fileName) {
  let ext = fileName.split(".");
  return ext[ext.length - 1];
}

function getFileName(ext) {
  return `${Date.now()}${Number.parseInt(Math.random() * 10000)}.${ext}`;
}
module.exports = {
  findDir,
  getFileExt,
  getFileName
};
