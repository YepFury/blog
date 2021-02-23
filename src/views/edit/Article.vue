<template>
  <div class="article-content">
    <div class="article-header">
      <el-button class="re-back" @click="handleBack">返回</el-button>
      <h1>
        <span v-show="!editStatus">{{ articleTitle }}</span>
        <input v-show="editStatus" type="text" v-model="articleTitle" />
      </h1>
      <ul class="article-info">
        <li>
          <label>发布时间：</label>
          <span
            style="display: inline-block;width: 120px;"
            v-show="!editStatus"
            >{{ releaseTime }}</span
          >
          <el-date-picker
            class="date-picker"
            v-model="releaseTime"
            type="date"
            placeholder="选择日期"
            v-show="editStatus"
          >
          </el-date-picker>
        </li>
        <li>
          <label>标签：</label>
          <el-select
            class="tag-select"
            v-model="tagValue"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择文章标签"
            :disabled="!editStatus"
          >
            <el-option
              v-for="item in tags"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </li>
      </ul>
    </div>
    <div class="markdown-container">
      <!-- <div class="edit-list">
        <i
          class="el-icon-edit-outline"
          v-show="!editStatus"
          title="编辑"
          @click="editArticle"
        ></i>
        <i
          class="iconfont icon-save"
          v-show="editStatus"
          title="保存"
          @click="saveArticle"
        ></i>
      </div> -->
      <Editor :content="articleContent" v-show="editStatus"></Editor>
      <VueMarkdown
        v-show="!editStatus"
        class="markdown"
        :source="articleContent"
      ></VueMarkdown>
    </div>
  </div>
</template>

<script>
import { getArticle, updateArticle } from "../../api/client";
import { dateFormat } from "../../utils/formatdate";

export default {
  name: "Article",
  components: {
    Tag: () => import("../../components/Tag"),
    Editor: () => import("./Editor"),
    VueMarkdown: () => import("vue-markdown")
  },
  data() {
    return {
      articleId: "",
      articleTitle: "",
      articleContent: "",
      tags: ["前端", "Vue"],
      tagValue: [],
      releaseTime: "2020-10-15",
      editStatus: false,
      editor: null,
      exitSatus: false
    };
  },
  mounted() {
    this.articleId = localStorage.getItem("articleId");
    this.getArticleContet();
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    getArticleContet() {
      this.articleContent = ``;
      getArticle(this.articleId).then(res => {
        this.articleTitle = res.articlename;
        this.articleContent = res.articlecontent;
        this.releaseTime = res.releasetime;
        this.tagValue = res.tags.split(",");
        this.exitSatus = true;
      });
    },
    editArticle() {
      this.editStatus = true;
      createEditor(this.articleContent).then(res => {
        this.editor = res;
      });
    },
    saveArticle() {
      let updateContent = this.editor.getMarkdown();
      let params = {
        articleid: this.articleId,
        articlename: this.articleTitle,
        releasetime: dateFormat("yyyy-mm-dd", new Date(this.releaseTime)),
        tags: this.tagValue.join(","),
        articlecontent: updateContent
      };
      updateArticle(params).then(res => {
        if (res.status === "success") {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.editStatus = false;
          this.getArticleContet();
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.article-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  &:hover {
    .edit-list {
      display: block;
    }
  }
  .article-header {
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    position: relative;
    .re-back {
      line-height: 30px;
      padding: 0 20px;
      position: absolute;
      left: 10px;
      top: 10px;
    }
    h1 {
      line-height: 50px;
      text-align: center;
      input {
        border: 0;
        outline: none;
        font-size: 28px;
        font-weight: 700;
        text-align: center;
      }
    }
  }
  .article-info {
    li {
      display: inline-block;
      line-height: 30px;
      margin-right: 20px;
    }
  }
  .markdown-container {
    height: calc(100% - 101px);
  }
  .edit-list {
    display: none;
    position: absolute;
    top: 10px;
    right: 20px;
    z-index: 11;
    i {
      cursor: pointer;
      margin-left: 10px;
      font-size: 18px;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
