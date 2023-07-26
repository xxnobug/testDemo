<template>
  <div>
    <div style="height: 600px; overflow-y: auto; margin-bottom: 30px">
      <div v-for="item in chatList">
        <div style="text-align: left" class="chatlistStyle icons-list">
          <div v-if="!item.isMe">
            <!-- <AndroidOutlined style="margin-right: 10px; color: #67c23a" /> -->
            <span v-html="item.message" :style="item.err ? 'color:F56C6C' : ''">
            </span>
          </div>
          <div v-else style="margin: 10px 0">
            <!-- <SmileOutlined style="margin-right: 10px; color: #f56c6c" /> -->
            {{ item.message }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-input
        v-model="searchValue"
        placeholder="请输入你的问题"
        :loading="loadingFlag"
        @change="pressEnterHandel"
      />
    </div>
  </div>
</template>;
<script>
import axios from "axios";
export default {
  data() {
    return {
      chatList: [],
      searchValue: "",
      loadingFlag: false,
    };
  },
  mounted() {},
  methods: {
    pressEnterHandel(value, event) {
      if (value == "") {
        return;
      }

      this.loadingFlag = true;
      let allcontent = [{ role: "user", value }];
      this.chatList.push({
        isMe: true,
        message: value,
      });
      const timestamp = Date.now();

      let content = {
        messages: [{ role: "user", content: "你是谁呢" }],
        time: 1678184467903,
        sign: "ac8d2ee54631da9b193b44b67a597c0783697c3957be6ddddea9a66dcb3ab562",
      };
      axios({
        method: "post",
        url: "https://api.nextweb.fun/openai/v1/chat/completions",
        // url: "https://api.openai.com/v1/completions",
        // url: "/api/generate",
        data: {
        
          model: "gpt-3.5-turbo-0613",
     
          messages: allcontent,
        },
        headers: {
          "content-type": "application/json",
          "Authorization":
            "Bearer ak-Bk5kyi0xsY2XzrRq4CPIa8YRpNGdr6IfPhzkAPMmk0pQwE4Y",
        },
      })
        .then((res) => {
          console.log(res);
          chatList.push({
            isMe: false,
            message: res.data.choices[0].text.slice(
              1,
              res.data.choices[0].text.length
            ),
          });
          loadingFlag.value = false;
          searchValue.value = "";
        })
        .catch((err) => {
          chatList.push({
            isMe: false,
            err: true,
            message: err,
          });
          console.log(err);
          loadingFlag.value = false;
          searchValue.value = "";
        });
    },
  },
};
</script>
<style scoped >
</style>