<template>
  <div>
    <div :style="chatListHeight" class="chatListStyle">
      <div v-for="item in chatList">
        <div style="text-align: left" class="chatlistStyle icons-list">
          <div v-if="!item.isMe">
            <span>
              <i class="el-icon-cpu iconsize"></i>
            </span>
            <span v-html="item.message" :style="item.err ? 'color:F56C6C' : ''">
            </span>
          </div>
          <div v-else style="margin: 10px 0">
            <span>
              <i class="el-icon-user iconsize"></i>
            </span>

            {{ item.message }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-input
        v-model="searchValue"
        placeholder="请输入你的问题"
        :disabled="loading"
        @change="pressEnterHandel(searchValue)"
      >
        <el-button
          slot="append"
          :icon="loading ? 'el-icon-loading' : 'el-icon-position'"
          @click="pressEnterHandel(searchValue)"
        ></el-button>
      </el-input>
    </div>
  </div>
</template>;
<script>
import axios from "axios";
export default {
  data() {
    return {
      chatList: [
        {
          isMe: false,
          message: "我是一个AI模型,请尽情向我提问吧！",
        },
      ],
      searchValue: "",
      loading: false,
      chatListHeight: "height:" + (window.innerHeight - 120) + "px",
    };
  },
  mounted() {
    window.onresize = () => {
      this.chatListHeight = "height:" + (window.innerHeight - 120) + "px";
    };
  },
  methods: {
    pressEnterHandel(value) {
      if (value == "") {
        return;
      }

      this.loading = true;
      let allcontent = [{ role: "user", content: value }];
      let endArr = [];
      this.chatList.forEach((el) => {
        if (el.isMe) {
          endArr.push({
            role: "user",
            content: el.message,
          });
        } else {
          endArr.push({
            role: "assistant",
            content: el.message,
          });
        }
      });
      this.chatList.push({
        isMe: true,
        message: value,
      });
  

     
      let sendArr = endArr.concat(allcontent);
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
          messages: sendArr,
        }),
        headers: {
          "content-type": "application/json",
          Authorization:
            "Bearer ak-Bk5kyi0xsY2XzrRq4CPIa8YRpNGdr6IfPhzkAPMmk0pQwE4Y",
        },
      })
        .then((res) => {
          this.chatList.push({
            isMe: false,
            message: "",
          });

          console.log(res);

          const { data } = res;

          const regex = /({.*?]})/g;

          let messageArr = data.match(regex);
          console.log(messageArr);
          let messageText = "";
          messageArr.forEach((v) => {
            if (v.indexOf("choices") != -1) {
              const json = JSON.parse(v);

              const content =
                json.choices[0].finish_reason != "stop"
                  ? json.choices[0].delta.content
                  : "";

              this.chatList[this.chatList.length - 1].message = this.chatList[
                this.chatList.length - 1
              ].message += content;
            }
          });

          this.loading = false;
          this.searchValue = ''
          console.log(messageText);
          console.log("messageText");
        })
        .catch((err) => {
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped >
.chatListStyle {
  overflow-y: auto;
  margin-bottom: 30px;
}
.iconsize {
  font-size: 16px;
  font-weight: 700;
}
.el-input__inner {
  height: 60px;
  line-height: 60px;
}
</style>