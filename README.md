## Vue + Koa + ElementUI 搭建博客

    技术栈：Vue + Vuex + Vue-Router + Nodejs + Koa + PostgreSQL + Docker
### 项目启动

```bash
    git pull https://github.com/YepFury/blog.git
    cd blog
    yarn install
    #启动本地服务
    yarn server
    #启动本地项目
    yarn dev
```

### 前端 Vue + ElementUI

功能
* 登录
* 首页
* 文章详情
* 筛选搜索
* 上传本地Markdown文件
* 编辑上传的Markdown文件
* 文章管理（待完善）
* 角色管理（待完善）
* 个人中心（待增加）
* 单元测试（待增加）
* 性能优化（待增加）
* Nuxt（待重写）
* Vue3（待重写）

```bash
# 本地前端启动
yarn dev
# 本地前端打包
yarn build
```

### 后端

```bash
# 本地后端启动
cd server
nodemon app.js
```

### 部署
使用Docker + Nginx + pm2对网页进行部署（直接拉取git地址进行部署待重写）
```bash
# docker安装postgresql
docker pull postgres
docker run --name mypostgres -e POSTGRES_PASSWORD=设置密码 -d -p 5432:5432 postgres
# docker安装nginx
docker pull nginx
docker run --name nginx0 -d -p 8080:80 nginx
docker cp nginx:/etc/nginx/ /home/admin/nginx/config
docker cp nginx:/var/log/nginx /home/admin/nginx/log
docker kill ngxin0
docker rm nginx0
docker run --name mynginx -d -p 8080:80 -v /home/admin/nginx/html/:/usr/share/nginx/html -v /home/admin/nginx/config/nginx/:/etc/nginx -v /home/admin/nginx/log/nginx/:/var/log/nginx/ -it nginx
docker cp /etc/localtime nginx:/etc/localtime
# pm2
npm install -g pm2
pm2 start app.js
```