import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Index",
      redirect: "/page",
      component: () => import("../views/index/Index.vue"),
      children: [
        {
          path: "/page",
          name: "Page",
          component: () => import("../views/index/Page.vue")
        },
        {
          path: "/article",
          name: "Article",
          component: () => import("../views/edit/Article.vue")
        },
        {
          path: "/add",
          name: "Add",
          component: () => import("../views/edit/Add.vue")
        },
        {
          path: "/manage",
          name: "Manage",
          component: () => import("../views/manage/Index.vue"),
          children: [
            {
              path: "/manage",
              name: "ManageArticle",
              component: () => import("../views/manage/Article.vue")
            },
            {
              path: "/manage/user",
              name: "ManageUser",
              component: () => import("../views/manage/User.vue")
            }
          ]
        },
        {
          path: "/about",
          name: "About",
          component: () => import("../views/About.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/login/Index.vue")
    }
  ]
});
router.beforeEach((to, from, next) => {
  next();
});
export default router;
