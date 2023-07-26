<template>
  <div>
    12333
  </div>
</template>

<script>
import { mapState } from "vuex";

import {
  BatchDelTask, //删除任务
} from "@/api/task.js";

import {
  GetPerTimeWeek, //根据时间段查询多人周计划
} from "@/api/weekplan.js";
import util from "@/libs/util.js";

import taskSlider from "../components/taskSlider/index.vue"; //引入任务侧边栏
export default {
  data() {
    this.nodeChartSettings = {
      radius: 30,
      offsetY: 100,
    };
    this.projectChartSettings = {
      radius: 30,
      offsetY: 100,
    };
    return {
      type: util.cookies.get("loginType"),
      // weekHeight:window.innerHeight-270,
      personeTaskData: [], //全部任务
      currentPersoneTaskData: [], //当前任务
      personeTaskDataPage: [],
      weekSelection: [],
      personnelTaskTotal: 0,
      personnelTaskPageSize: 30,
      personnelTaskCurrentPage: 1,
      completeData: [], //完成任务
      reviewData: [], //审核中任务
      taskCTimeoutData: [], //即将超时任务
      taskTimeoutData: [], //已经超时
      taskCount: 0, //任务数
      review: 0, //审核中
      taskComplete: 0, //本周完成
      taskDoing: 0, //在做工时
      taskCTimeout: 0, //即将超时
      taskTimeout: 0, //已超时
      nodeChart: {
        columns: ["prop", "num"],
        rows: [],
      },
      projectChart: {
        columns: ["prop", "num"],
        rows: [],
      },
      taskSearch: "",
    };
  },
  components: {
    taskSlider,
  },
  //初始化页面
  created: function () {
    // this.$core.test()

    this.myInit();
  },
  methods: {
    //初始化页面
    myInit() {
      this.GetPerTimeWeek();
    },
    //获取当前周任务
    GetPerTimeWeek() {
      let thmark = this.$task.getCurrentMark();
      let personnelList = [];
      personnelList.push(this.info.userDetails.id);
      personnelList = JSON.stringify(personnelList);
      GetPerTimeWeek({
        start: thmark,
        end: thmark,
        json: personnelList,
      })
        .then((res) => {
          // 返回数据
          // console.log(res)
          if (res.length > 0) {
            let taskData = res[0].weektask;
            taskData = JSON.parse(taskData);
            this.openPersonnelTask(taskData);
            this.setTaskCount(taskData);
          }
        })
        .catch((err) => {
          // 异常情况
        });
    },
    setTaskCount(data) {
      let reviewData = [];
      let completeData = [];
      let taskCTimeoutData = [];
      let taskTimeoutData = [];

      let nodeChartData = [];
      let projectChartData = [];

      let currentTime = new Date();
      currentTime = currentTime.getTime();

      let taskList = data.children;
      for (let item in taskList) {
        let nodeEndTime = taskList[item].nodeEnd;
        var Nowdate = new Date();
        Nowdate.setTime(nodeEndTime);
        Nowdate.setHours(23);
        Nowdate.setMinutes(59);
        Nowdate.setSeconds(59);
        Nowdate.setMilliseconds(999);
        // console.log(Nowdate.getTime())
        let endTime = Nowdate.getTime();
        let JTime = endTime - 24 * 3600 * 1000;
        // console.log(item)
        if (taskList[item].state == "4") {
          reviewData.push(taskList[item]);
        }
        if (taskList[item].state == "5") {
          completeData.push(taskList[item]);
        }
        if (currentTime > JTime && currentTime < endTime) {
          taskCTimeoutData.push(taskList[item]);
        }
        if (nodeEndTime != null && nodeEndTime != "null" && nodeEndTime != 0) {
          if (
            currentTime > endTime &&
            taskList[item].state != "5" &&
            taskList[item].state != "8"
          ) {
            taskTimeoutData.push(taskList[item]);
          }
        }

        let nodeName = taskList[item].nodeName;
        function findNode(node) {
          return node.prop == nodeName;
        }
        let nodeIndex = nodeChartData.findIndex(findNode);
        if (nodeIndex > -1) {
          nodeChartData[nodeIndex].num = nodeChartData[nodeIndex].num + 1;
        } else {
          let addNode = {
            prop: nodeName,
            num: 1,
          };
          nodeChartData.push(addNode);
        }

        let projectName = taskList[item].projectName;
        function findProject(project) {
          return project.prop == projectName;
        }
        let projectIndex = projectChartData.findIndex(findProject);
        if (projectIndex > -1) {
          projectChartData[projectIndex].num =
            projectChartData[projectIndex].num + 1;
        } else {
          let addProject = {
            prop: projectName,
            num: 1,
          };
          projectChartData.push(addProject);
        }
      }
      this.reviewData = reviewData;
      this.taskCTimeoutData = taskCTimeoutData;
      this.taskTimeoutData = taskTimeoutData;
      this.completeData = completeData;

      this.taskCount = data.taskName;
      this.taskComplete = data.complete;
      this.taskDoing = data.forecast;
      this.review = reviewData.length;
      this.taskCTimeout = taskCTimeoutData.length;
      this.taskTimeout = taskTimeoutData.length;
      this.projectChart.rows = projectChartData;
      this.nodeChart.rows = nodeChartData;
    },

    //表格多选变化
    weekSelectionChange(val) {
      this.weekSelection = val;
    },
    //快捷操作
    weekSelect(selection, row) {},
    //打开人员任务详情
    openPersonnelTask(data) {
      let taskData = data["children"];
      taskData.forEach((item, index) => {
        // console.log(item)
        // console.log(index)
        taskData[index]["forecast"] = parseFloat(taskData[index]["forecast"]);
      });
      // console.log('处理后数据')
      // console.log(taskData)
      this.personeTaskData = taskData;
      this.currentPersoneTaskData = taskData;
      this.personnelTaskCurrentPage = 1;
      this.personnelTaskTotal = this.currentPersoneTaskData.length;
      this.personnelTaskPageSet();
    },
    selectTask(model) {
      switch (model) {
        case "all":
          this.currentPersoneTaskData = this.personeTaskData;
          break;
        case "review":
          this.currentPersoneTaskData = this.reviewData;
          break;
        case "complete":
          this.currentPersoneTaskData = this.completeData;
          break;
        case "cTimeout":
          this.currentPersoneTaskData = this.taskCTimeoutData;
          break;
        case "timeout":
          this.currentPersoneTaskData = this.taskTimeoutData;
          break;
      }
      this.personnelTaskCurrentPage = 1;
      this.personnelTaskTotal = this.currentPersoneTaskData.length;
      this.personnelTaskPageSet();
    },
    personnelTaskPageChange(data) {
      this.personnelTaskCurrentPage = data;
      this.personnelTaskPageSet();
    },
    personnelTaskPageSet() {
      let start =
        this.personnelTaskPageSize * (this.personnelTaskCurrentPage - 1);
      let end = start + this.personnelTaskPageSize;
      this.personeTaskDataPage = this.currentPersoneTaskData.slice(start, end);
    },
    //每页页数变化
    personnelTaskSizeChange(data) {
      this.personnelTaskPageSize = data;
      this.personnelTaskCurrentPage = 1;
      this.personnelTaskPageSet();
    },
    weekSortChange(data) {
      // console.log('开始排序')
      // console.log(data)
      let that = this;
      this.personeTaskDataPage = [];
      let thprop = data.prop;
      let order = data.order;

      // 检测是否为中文，true表示是中文，false表示非中文
      function isChinese(str) {
        // 中文万国码正则
        if (
          /[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/.test(
            str
          )
        ) {
          return true;
        } else {
          return false;
        }
      }
      // 数字字母中文混合排序
      function arrSortMinToMax(a, b) {
        // 判断是否为数字开始; 为啥要判断?看上图源数据
        let aName;
        let bName;
        if (order != null && order != "") {
          let avalue;
          let bvalue;

          switch (thprop) {
            case "nodeState":
              let alabel = a[thprop];
              let blable = b[thprop];
              avalue = alabel != undefined ? a[thprop].label : a["state"];
              bvalue = blable != undefined ? b[thprop].label : b["state"];
              break;
            // case 'forecast':
            // 	avalue = parseFloat(a['forecast']);
            // 	bvalue = parseFloat(b['forecast']);
            // 	break;
            default:
              avalue =
                a[thprop] == "" || a[thprop] == null || a[thprop] == "null"
                  ? "-"
                  : a[thprop];
              bvalue =
                b[thprop] == "" || b[thprop] == null || b[thprop] == "null"
                  ? "-"
                  : b[thprop];
              break;
          }

          // console.log(avalue)
          // console.log(bvalue)
          // console.log('---')

          if (order == "ascending") {
            aName = avalue;
            bName = bvalue;
          } else if (order == "descending") {
            aName = bvalue;
            bName = avalue;
          }

          if (that.$task.isNumber(avalue) && that.$task.isNumber(bName)) {
            return aName - bName;
          } else {
            if (aName != "" && aName != null && bName != "" && bName != null) {
              if (/^\d+/.test(aName) && /^\d+/.test(bName)) {
                // 提取起始数字, 然后比较返回
                return /^\d+/.exec(aName) - /^\d+/.exec(bName);
                // 如包含中文, 按照中文拼音排序
              } else if (isChinese(aName) && isChinese(bName)) {
                // 按照中文拼音, 比较字符串
                return aName.localeCompare(bName, "zh-CN");
              } else {
                // 排序数字和字母
                return aName.localeCompare(bName, "en");
              }
            } else {
              return false;
            }
          }
        } else {
          return false;
        }
      }

      this.currentPersoneTaskData.sort(arrSortMinToMax);

      // console.log('排序结果')
      // console.log(this.personeTaskData)
      this.personnelTaskPageSet();
    },
    //打开任务详情
    openTask(taskId) {
      this.$refs.taskSlider.getCurrentTask(taskId);
    },
    findTask() {
      let taskList = this.$task.fuzzyQuery(
        this.personeTaskData,
        this.taskSearch
      );
      this.currentPersoneTaskData = taskList;
      this.personnelTaskCurrentPage = 1;
      this.personnelTaskTotal = this.currentPersoneTaskData.length;
      this.personnelTaskPageSet();
    },
  },
  computed: {
    ...mapState("d2admin/user", ["info"]),
  },
};
</script>
<style>
</style>
