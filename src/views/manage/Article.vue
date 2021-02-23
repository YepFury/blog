<template>
  <div>
    <div class="header-operation">
      <h3>文章管理</h3>
    </div>
    <Table index selection :data="tableData" :columns="columns"></Table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    >
    </el-pagination>
  </div>
</template>

<script>
import Tag from "../../components/Tag";
import Table from "../../components/Table";
export default {
  name: "ManageArticle",
  components: {
    Tag,
    Table
  },
  data() {
    return {
      tableData: [
        {
          articleid: "1",
          name: "测试数据001",
          time: "2020-10-05",
          tags: "Vue,Node"
        }
      ],
      columns: [
        {
          prop: "name",
          label: "名称"
        },
        {
          prop: "time",
          label: "发布日期",
          width: 200
        },
        {
          prop: "tags",
          label: "标签",
          width: 180,
          render: (h, scope) => {
            let tags = scope.row.tags ? scope.row.tags.split(",") : [];
            return (
              <div>
                {tags.map(item => {
                  return <Tag>{item}</Tag>;
                })}
              </div>
            );
          }
        },
        {
          prop: "action",
          label: "操作",
          width: 180,
          render: (h, scope) => {
            return (
              <div>
                <el-button
                  class="text-button"
                  type="text"
                  onClick={() => {
                    this.toArticle(scope.row);
                  }}
                >
                  查看
                </el-button>
                <el-button class="text-button" type="text">
                  编辑
                </el-button>
              </div>
            );
          }
        }
      ],
      currentPage: 1
    };
  },
  methods: {
    toArticle(row) {
      console.log(row);
      // localStorage.setItem("articleId", row.articleid);
      // this.$router.push({
      //   name: "Article",
      //   path: "/article",
      //   params: {
      //     id: row.articleid
      //   }
      // });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
.header-operation {
  margin-bottom: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
</style>
