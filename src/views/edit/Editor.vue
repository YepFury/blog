<template>
  <div class="editor-view">
    <div id="editormd"></div>
  </div>
</template>

<script>
import scriptjs from "scriptjs";
import { upload } from "../../api/client";
export default {
  name: "Editor",
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    this.initEditor();
  },
  destroyed() {
    this.editor = null;
  },
  methods: {
    initEditor() {
      const _this = this;
      (async () => {
        await this.fetchFile("./editor.md/jquery.min.js");
        await this.fetchFile("./editor.md/editormd.js");
        this.ditor = editormd("editormd", {
          path: "./editor.md/lib/",
          width: 1180,
          height: "99%",
          markdown: this.content,
          placeholder: "",
          codeFold: true,
          saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
          searchReplace: true,
          htmlDecode: "style,script,iframe|on*", // 开启 HTML 标签解析，为了安全性，默认不开启
          emoji: false,
          taskList: true,
          tocm: true, // Using [TOCM]
          tex: true, // 开启科学公式TeX语言支持，默认关闭
          flowChart: true, // 开启流程图支持，默认关闭
          sequenceDiagram: true, // 开启时序/序列图支持，默认关闭,
          toolbarIcons: function() {
            return [
              "undo",
              "redo",
              "|",
              "bold",
              "del",
              "italic",
              "quote",
              "uppercase",
              "lowercase",
              "|",
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "|",
              "list-ul",
              "list-ol",
              "hr",
              "|",
              "watch",
              "preview",
              "fullscreen",
              "|",
              "exportIcon",
              "importIcon"
            ];
          },
          toolbarIconsClass: {
            exportIcon: "iconfont icon-printdaoru",
            importIcon: "iconfont icon-exportdaochu",
            tips: "fa fa-exclamation-circle"
          },
          lang: {
            toolbar: {
              exportIcon: "导出", // 自定义按钮的提示文本，即title属性
              importIcon: "导入",
              tips: "提示"
            }
          },
          toolbarHandlers: {
            /**
             * @param {Object}      cm         CodeMirror对象
             * @param {Object}      icon       图标按钮jQuery元素对象
             * @param {Object}      cursor     CodeMirror的光标对象，可获取光标所在行和位置
             * @param {String}      selection  编辑器选中的文本
             */
            exportIcon: function(cm, icon, cursor, selection) {
              // this == 当前editormd实例
            },
            importIcon: function(cm, icon, cursor, selection) {
              // this == 当前editormd实例
              const instance = this;
              let input = document.createElement("input");
              input.type = "file";
              input.click();
              input.addEventListener("change", function(e) {
                console.log(input.files);
                let formData = new FormData();
                formData.append("file", input.files[0]);
                upload(formData).then(res => {
                  if (res.status === "success") {
                    instance.setMarkdown(res.content);
                    _this.$emit("updateContent", res.content);
                  }
                });
              });
            }
          },
          onwatch: function() {
            console.log(this.getMarkdown());
          }
        });
      })();
    },
    fetchFile(url) {
      return new Promise((resolve, reject) => {
        scriptjs(url, () => {
          resolve();
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.editor-view {
  height: 100%;
  position: relative;
  .iconfont {
    font-weight: 700;
  }
  .tips {
    position: absolute;
    right: 0;
    top: 10px;
  }
}
</style>
