<template>
  <el-table
    :data="data"
    :stripe="stripe"
    :border="border"
    :row-class-name="rowClassName"
    :height="height"
    :max-height="maxHeight"
    :highlight-current-row="highlightCurrentRow"
    @current-change="handleCurrentChange"
  >
    <el-table-column v-if="index" type="index" :width="indexWidth"> </el-table-column>
    <el-table-column v-if="selection" type="selection" :width="selectionWidth">
    </el-table-column>
    <el-table-column
      v-for="item in columns"
      :key="item.prop"
      :type="item.type"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      :fixed="item.fixed"
    >
      <template slot-scope="scope">
        <render-template
          v-if="item.render"
          :render="item.render"
          :row="scope.row"
          :index="scope.$index"
          :column="item"
        ></render-template>
        <span v-else>{{ scope.row[item.prop] }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
const renderTemplate = {
  name: "render-template",
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  render: (h, data) => {
    const params = {
      row: data.props.row,
      index: data.props.index
    };
    if (data.props.column) params.column = data.props.column;
    return data.props.render(h, params);
  }
};

export default {
  name: "Table",
  components: { renderTemplate },
  props: {
    data: {
      type: Array,
      require: true,
      defult: function() {
        return [];
      }
    },
    columns: {
      type: Array,
      require: true,
      defult: function() {
        return [];
      }
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Boolean,
      default: false
    },
    selectionWidth: {
      type: [String, Number],
      default: 50
    },
    index: {
      type: Boolean,
      default: false
    },
    indexWidth: {
      type: [String, Number],
      default: 50
    },
    rowClassName: [Function, String],
    height: [String, Number],
    maxHeight: [String, Number],
    highlightCurrentRow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentRow: null
    };
  },
  mounted() {},
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val;
      this.$emit("currentChange", val);
    }
  }
};
</script>

<style></style>
