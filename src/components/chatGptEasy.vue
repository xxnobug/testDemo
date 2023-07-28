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
      let allcontent = [{ role: "user", content: value }];
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
        data: JSON.stringify({
          frequency_penalty: 0,
          model: "gpt-3.5-turbo-0613",
          presence_penalty: 0,
          stream: true,
          temperature: 0.5,
          top_p: 1,
          messages: allcontent,
        }),
        headers: {
          "content-type": "application/json",
          Authorization:
            "Bearer ak-Bk5kyi0xsY2XzrRq4CPIa8YRpNGdr6IfPhzkAPMmk0pQwE4Y",
        },
      })
        .then((res) => {
          console.log(res);

          const { data } = res;

          const regex = /({.*?]})/g;

          let messageArr = data.match(regex);
          console.log(messageArr);
          let messageText = ''
          messageArr.forEach((v) => {
            if (v.indexOf("choices") != -1) {
              const json = JSON.parse(v);

              const content =
                json.choices[0].finish_reason != "stop"
                  ? json.choices[0].delta.content
                  : "";


              messageText += content;
            }
          });
          console.log(messageText);
          console.log("messageText");
          this.chatList.push({
            isMe:false,
            message:messageText
          })
        
        })
        .catch((err) => {
         
        });
    },
  },
};
</script>
<style scoped >
</style>