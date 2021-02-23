const pg = require("pg");

const pgConfig = {
  user: "postgres", // 数据库用户名
  database: "postgres", // 数据库
  password: "postgres", // 数据库密码
  host: "49.233.191.35", // 数据库所在IP
  port: "5433" // 连接端口
};
const pool = new pg.Pool(pgConfig);
function connectPg(sql) {
  return new Promise((resolve, reject) => {
    pool.connect(function(error, client, done) {
      error && reject(error);
      client.query(sql, [], function(err, response) {
        err && reject(err);
        done();
        resolve(response); // 根据SQL语句查出的数据
      });
    });
  });
}
module.exports = {
  connectPg
};
