<template>
  <div class="add-view">
    <div class="add-header">
      <a href="javascript:;" class="re-back" @click="handleBack">
        <i class="el-icon-arrow-left"></i>
        返回
      </a>
      <el-input
        :class="{ 'input-error': validateStatus }"
        v-model="articleTitle"
        placeholder="请输入标题"
      ></el-input>
      <el-button type="success" class="release-btn" @click="handleRelease">
        <i class="el-icon-s-promotion"></i>
        发布文章
      </el-button>
    </div>
    <div class="editor-container">
      <Editor :content="articleContent" @updateContent="updateContent"></Editor>
    </div>
    <el-dialog title="发布文章" width="600px" :visible.sync="dialogVisible">
      <div class="label-item">
        <label>标签：</label>
        <el-select
          v-model="tag"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="label-item">
        <label>描述：</label>
        <el-input
          type="textarea"
          v-model="desc"
          placeholder="最多可输入30个字符"
          maxlength="30"
          show-word-limit
        ></el-input>
      </div>
      <div class="footer-btns">
        <el-button size="small">取消</el-button>
        <el-button size="small" type="primary" @click="release">发布</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { dateFormat } from "../../utils/formatdate";
import { addArticle } from "../../api/client";
export default {
  name: "Add",
  components: {
    Editor: () => import("./Editor")
  },
  data() {
    return {
      editor: null,
      articleContent: "",
      articleTitle: "",
      releaseTime: "",
      tag: [],
      options: [
        {
          value: "HTML",
          label: "HTML"
        },
        {
          value: "CSS",
          label: "CSS"
        },
        {
          value: "JavaScript",
          label: "JavaScript"
        }
      ],
      validateStatus: false,
      dialogVisible: false,
      desc: "",
      isEdit: false
    };
  },
  mounted() {
    this.articleContent = "";
    this.articleTitle = "";
  },
  methods: {
    handleBack() {
      this.$router.push({
        path: "/page"
      });
    },
    handleRelease() {
      if (!this.articleTitle.trim()) {
        this.validateStatus = true;
        this.$message({
          type: "warning",
          message: "请输入标题"
        });
        return;
      }
      this.dialogVisible = true;
    },
    release() {
      let params = {
        articlename: this.articleTitle,
        articlecontent: this.articleContent,
        tags: this.tag.join(","),
        desc: this.desc,
        releasetime: dateFormat("yyyy-mm-dd", new Date())
      };
      addArticle(params).then(res => {
        console.log(res);
        this.$message({
          type: res.status,
          message: res.message
        });
        if (res.status === "success") {
          this.dialogVisible = false;
          this.$router.push({
            path: "/page",
            name: "Page"
          });
        }
      });
    },
    updateContent(content) {
      this.articleContent = content;
    }
  }
};
</script>

<style lang="less" scoped>
.add-view {
  height: 100%;
  position: relative;
  .add-header {
    padding: 10px;
    display: flex;
    align-items: center;
  }
  .re-back {
    width: 80px;
    text-align: center;
    margin-right: 20px;
    &:hover {
      color: #1881dc;
    }
  }
  .release-btn {
    background-color: #2c974b;
    margin-left: 20px;
  }
  .editor-container {
    height: calc(100% - 60px);
  }
  .label-item {
    display: flex;
    margin-bottom: 15px;
    label {
      width: 80px;
      text-align: left;
    }
    .el-select {
      width: 500px;
    }
    .el-textarea {
      width: 500px;
    }
  }
  .footer-btns {
    text-align: center;
    button {
      width: 80px;
      margin: 0 20px;
    }
  }
}
</style>
