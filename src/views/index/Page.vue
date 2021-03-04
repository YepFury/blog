<template>
  <div class="index-view">
    <aside>
      <div class="user-info">
        <div class="img">
          <img src="../../assets/touxiang.png" alt="" style="width: 100%;height: 100%;" />
        </div>
        <div class="user-name">yBlog</div>
      </div>
      <div class="user-tags">
        <span v-for="tag in userTags" :key="tag.id">{{ tag.name }}</span>
      </div>
      <div class="user-href">
        <div class="github">
          <i class="iconfont icon-github"></i>
          <a href="https://github.com/YepFury">YepFury</a>
        </div>
        <div class="github">
          <i class="iconfont icon-CN_csdnnet"></i>
          <a href="https://github.com/YepFury">Microsoft YaHei</a>
        </div>
      </div>
    </aside>
    <section class="index-main">
      <div class="main-container">
        <div class="acticle-filter">
          <div class="filter-input">
            <input
              v-model="searchKey"
              type="text"
              placeholder="请输入"
              @input="searchArticle"
            />
          </div>
          <!-- <div>
            <el-dropdown
              class="filter-dropdown"
              trigger="click"
              @command="handleSelectTag"
            >
              <span class="el-dropdown-link">
                标签：{{ tag }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="all">全部</el-dropdown-item>
                <el-dropdown-item command="fe">前端</el-dropdown-item>
                <el-dropdown-item command="vue">Vue</el-dropdown-item>
                <el-dropdown-item command="node">Node</el-dropdown-item>
                <el-dropdown-item command="react">React</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown
              class="filter-dropdown"
              trigger="click"
              @command="handleSelectRelease"
            >
              <span class="el-dropdown-link">
                发布日期：{{ release }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="all">全部</el-dropdown-item>
                <el-dropdown-item command="week">最近一周</el-dropdown-item>
                <el-dropdown-item command="month">最近一月</el-dropdown-item>
                <el-dropdown-item command="year">最近一年</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button class="filter-add" type="success" @click="addArticle">
              <i class="el-icon-plus"></i>新增
            </el-button>
          </div> -->
        </div>
        <div class="articles">
          <ArticleList :articleList="articleList"></ArticleList>
        </div>
        <div class="article-page">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import _ from "lodash";
import { selectArticle } from "../../api/client";
import { dateFormat } from "../../utils/formatdate";
export default {
  name: "Page",
  components: {
    ArticleList: () => import("../../components/ArticleList")
  },
  data() {
    return {
      searchKey: "",
      activeIndex: "1",
      tag: "全部",
      release: "全部",
      articleList: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tags: {
        all: "全部",
        fe: "前端",
        vue: "Vue",
        node: "Node",
        react: "React"
      },
      releases: {
        all: "全部",
        week: "最近一周",
        month: "最近一月",
        year: "最近一年"
      },
      userTags: [
        {
          id: "fe",
          name: "前端"
        },
        {
          id: "vue",
          name: "Vue"
        },
        {
          id: "node",
          name: "Node"
        },
        {
          id: "react",
          name: "React"
        },
        {
          id: "js",
          name: "JavaScript"
        }
      ]
    };
  },
  watch: {
    pageNum(v1, v2) {
      this.handleSelect();
    }
  },
  mounted() {
    this.handleSelect();
  },
  methods: {
    handleSelect() {
      let params = {
        pageInfo: { pageNum: this.pageNum, pageSize: this.pageSize },
        filterInfo: {
          keywords: this.searchKey,
          tag: this.tag,
          starttime: this.releaseDate().starttime,
          endtime: this.releaseDate().endtime
        }
      };
      selectArticle(params).then(res => {
        this.articleList = res.list;
        this.total = res.total;
      });
    },
    handleSelectTag(item) {
      this.tag = this.tags[item];
    },
    handleSelectRelease(item) {
      this.release = this.releases[item];
    },
    releaseDate() {
      let starttime = "";
      let endtime = "";
      let date = new Date();
      switch (this.release) {
        case "全部":
          starttime = "";
          endtime = "";
          break;
        case "最近一周":
          starttime = dateFormat(
            "yyyy-mm-dd",
            new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000)
          );
          endtime = dateFormat("yyyy-mm-dd", date);
          break;
        case "最近一月":
          starttime = dateFormat(
            "yyyy-mm-dd",
            new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000)
          );
          endtime = dateFormat("yyyy-mm-dd", date);
          break;
        case "最近一年":
          starttime = dateFormat(
            "yyyy-mm-dd",
            new Date(date.getTime() - 365 * 24 * 60 * 60 * 1000)
          );
          endtime = dateFormat("yyyy-mm-dd", date);
          break;
      }
      return {
        starttime,
        endtime
      };
    },
    addArticle() {
      this.$router.push({
        path: "/add",
        name: "Add"
      });
    },
    handleCurrentChange(page) {
      console.log(page);
    },
    searchArticle() {
      const _this = this;
      _.debounce(() => {
        _this.handleSelect();
      }, 400)();
    }
  }
};
</script>

<style lang="less" scoped>
.index-view {
  height: 100%;
  display: flex;
  overflow: hidden;
  aside {
    width: 300px;
    padding: 20px;
    .user-info {
      margin-top: 80px;
    }
    .img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto 20px;
    }
    .user-name {
      font-size: 20px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 20px;
    }
    .user-tags {
      padding: 20px;
      border-top: 1px solid #e1e4e8;
      border-bottom: 1px solid #e1e4e8;
      span {
        display: inline-block;
        font-size: 12px;
        margin-right: 15px;
        position: relative;
        padding-left: 15px;
        &::before {
          content: "";
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          position: absolute;
          left: 0;
          top: 4px;
          border: 1px solid #1b1f231a;
        }
        &:nth-child(1) {
          &::before {
            background-color: #f1e05a;
          }
        }
        &:nth-child(2) {
          &::before {
            background-color: #2c3e50;
          }
        }
        &:nth-child(3) {
          &::before {
            background-color: #e34c26;
          }
        }
        &:nth-child(4) {
          &::before {
            background-color: #b07219;
          }
        }
        &:nth-child(5) {
          &::before {
            background-color: #5a82f1;
          }
        }
        &:nth-child(6) {
          &::before {
            background-color: #e45af1;
          }
        }
      }
    }
    .github {
      height: 40px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      i {
        font-size: 26px;
        margin-right: 20px;
      }
      a {
        font-weight: 700;
      }
    }
  }
  .index-main {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
  .main-container {
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
  .acticle-filter {
    display: flex;
    padding: 15px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e1e4e8;
    .filter-input {
      width: 400px;
      input {
        outline: none;
        width: 100%;
        height: 32px;
        line-height: 30px;
        padding: 0 10px;
        border-radius: 4px;
        border: 1px solid #1b1f2326;
      }
    }
    .filter-dropdown {
      cursor: pointer;
      height: 32px;
      line-height: 30px;
      margin-right: 10px;
      border-radius: 4px;
      padding: 0 15px;
      border: 1px solid #1b1f2326;
    }
    .filter-add {
      height: 32px;
      line-height: 30px;
      padding: 0 15px;
      font-weight: 500;
      background-color: #2c974b;
      i {
        margin-right: 5px;
      }
    }
  }
  .articles {
    height: calc(100% - 120px);
    overflow-y: auto;
  }
  .article-page {
    text-align: right;
    margin-top: 10px;
  }
}
</style>
