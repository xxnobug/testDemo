import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import testDemo from "@/components/testDemo";
import pdf from "@/components/pdf";
import videoplay from "@/components/videoplay";
import pdfall from "@/components/pdfall";
import video from "@/components/video";
import tinymce from "@/components/tinymce";
import HeightJs from "@/components/HeightJs";
import HeightCss from "@/components/HeightCss";
import bridge from "@/components/bridge";
import dingzhiVideoPlay from "@/components/dingzhiVideoPlay";
import fullcalendar from "@/components/fullcalendar";
import markDown from "@/components/markDown";
import gantetu from "@/components/gantetu";
import three from "@/components/three";
import threeDemo from "@/components/threeDemo";
import choseStartFrame from "@/components/choseStartFrame";
import chatGpt from "@/components/chatGpt";
import aiPicture from "@/components/aiPicture";
import serve from "@/components/serve";
import tableInfiniteScroll from "@/components/tableInfiniteScroll";
import aiindex from "@/components/aiindex";
import moreitem from "@/components/moreitem";
import moreTableitem from "@/components/moreTableitem";
import chatGptEasyDemo from "@/components/chatGptEasy";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "bridge",
      component: bridge,
      children: [
        {
          path: "/chatGptEasy",
          name: "chatGptEasyDemo",
          component: chatGptEasyDemo
        },
        {
          path: "/test",
          name: "testDemo",
          component: testDemo
        },
        {
          path: "/HeightJs",
          name: "HeightJs",
          component: HeightJs
        },
        {
          path: "/HeightCss",
          name: "HeightCss",
          component: HeightCss
        },
        {
          path: "/aiindex",
          name: "aiindex",
          component: aiindex
        },
        {
          path: "/dingzhiVideoPlay",
          name: "dingzhiVideoPlay",
          component: dingzhiVideoPlay
        },
        {
          path: "/fullcalendar",
          name: "fullcalendar",
          component: fullcalendar
        },
        {
          path: "/markDown",
          name: "markDown",
          component: markDown
        },

        {
          path: "/videoplay",
          name: "videoplay",
          component: videoplay
        },
        {
          path: "/three",
          name: "three",
          component: three
        },
        {
          path: "/threeDemo",
          name: "threeDemo",
          component: threeDemo
        },
        {
          path: "/tableInfiniteScroll",
          name: "tableInfiniteScroll",
          component: tableInfiniteScroll
        },
        {
          path: "/gantetu",
          name: "gantetu",
          component: gantetu
        },
        {
          path: "/video",
          name: "video",
          component: video
        },

        {
          path: "/pdf",
          name: "pdf",
          component: pdf
        },

        {
          path: "/choseStartFrame",
          name: "choseStartFrame",
          component: choseStartFrame
        },

        {
          path: "/pdfall",
          name: "pdfall",
          component: pdfall
        },
        {
          path: "/SeatList",
          name: "SeatList",
          component: video
        },

        {
          path: "/tinymce",
          name: "tinymce",
          component: tinymce
        },
        {
          path: "/moreitem",
          name: "moreitem",
          component: moreitem
        },
        {
          path: "/moreTableitem",
          name: "moreTableitem",
          component: moreTableitem
        },
        {
          path: "/chatGpt",
          name: "chatGpt",
          meta: {
            cache: true
          },
          component: chatGpt
        },
        {
          path: "/aiPicture",
          name: "aiPicture",
          meta: {
            cache: true
          },
          component: aiPicture
        }
      ]
      // components: {
      //     default: HelloWorld,
      //     one: pdf,
      //     two: videoplay,
      //     three: testDemo
      // }
    }
  ]
});
