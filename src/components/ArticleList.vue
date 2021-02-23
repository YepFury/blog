<template>
  <div class="article-container">
    <ul class="article-list">
      <li
        class="article-list-item"
        v-for="article in articleList"
        :key="article.articleid"
      >
        <div>
          <h3 @click="toArticle(article)">{{ article.articlename }}</h3>
          <div class="artcile-des">
            {{ article.des }}
          </div>
        </div>
        <div class="article-option">
          <div class="article-tag">
            <span v-for="tag in article.tags" :key="tag">{{ tag }}</span>
          </div>
          <span class="article-time">{{ article.releasetime }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Tag from "./Tag";
export default {
  name: "ArticleList",
  components: {
    Tag
  },
  props: {
    articleList: {
      type: Array,
      require: true,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    toArticle(art) {
      localStorage.setItem("articleId", art.articleid);
      this.$router.push({
        name: "Article",
        path: "/article",
        params: {
          id: art.articleid
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.article-container {
  padding: 10px;
  .article-list-item {
    margin-bottom: 5px;
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1px solid #eaecef;
    h3 {
      font-size: 16px;
      color: #0366d6;
      cursor: pointer;
      display: inline-block;
      margin-bottom: 10px;
      &:hover {
        text-decoration: underline;
        color: #1881dc;
      }
    }
    .artcile-des {
      margin-bottom: 10px;
      max-width: 50%;
    }
  }
  .article-tag {
    display: inline-block;
  }
  .article-tag span {
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
  .article-time {
    font-size: 12px;
    color: #9c9d9e;
  }
}
</style>
