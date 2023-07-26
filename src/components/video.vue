

<template>
  <div>
    <div class="wrapper">
      <el-row>
        <!-- 大厅布局 -->

        <el-col :span="18" style="margin-right: 20px; margin-left: 50px">
          <el-tabs v-model="roomName" @tab-click="roomClick">
            <el-tab-pane label="大厅北侧" name="north">
              <div :style="wdHeigth">
                <div class="qiantai1">
                  <div style="margin-top: 20px">
                    <div>北</div>
                    <i class="el-icon-top"></i>
                  </div>
                </div>
                <div class="qiantai">
                  <div>电动门</div>
                </div>

                <div class="northBigBox">
                  <div class="smallArrBox">
                    <div
                      class="seatStyle"
                      v-for="(item, index) in north1"
                      :key="index"
                      @dragenter="dragenter(item, north1)"
                      @dblclick="shishiClick(item)"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                  <div class="smallArrBox">
                    <div
                      class="seatStyle"
                      v-for="(item, index) in north2"
                      :key="index"
                      @dragenter="dragenter(item, north2)"
                      @dblclick="shishiClick(item)"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                  <div class="smallArrBox">
                    <div
                      class="seatStyle"
                      v-for="(item, index) in north3"
                      :key="index"
                      @dragenter="dragenter(item, north3)"
                      @dblclick="shishiClick(item)"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                  <div class="smallArrBox">
                    <div
                      class="seatStyle"
                      v-for="(item, index) in north4"
                      :key="index"
                      @dragenter="dragenter(item, north4)"
                      @dblclick="shishiClick(item)"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                  <div class="smallArrBox">
                    <div
                      class="seatStyle"
                      v-for="(item, index) in north5"
                      :key="index"
                      @dragenter="dragenter(item, north5)"
                      @dblclick="shishiClick(item)"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                </div>
                <div class="northBigBox" style="position: relative">
                  <div class="xiuxian">
                    <div>休闲区</div>
                  </div>

                  <div class="smallArrBox" style="margin-top: 25px">
                    <div
                      class="seatStyle"
                      v-for="(item, index) in north6"
                      :key="index"
                      @dragenter="dragenter(item, north6)"
                      @dblclick="shishiClick(item)"
                    >
                      {{ item.name }}
                    </div>
                  </div>

                  <div class="smallArrBox"></div>
                  <div class="smallArrBox"></div>
                  <div class="smallArrBox"></div>
                  <div class="smallArrBox" style="margin-top: 25px">
                    <div
                      class="seatStyle"
                      v-for="(item, index) in north7"
                      :key="index"
                      @dragenter="dragenter(item, north7)"
                      @dblclick="shishiClick(item)"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="大厅南侧" name="south">
              <div class="qiantai2">
                <div>电动门</div>
                <div style="margin-top: 20px">
                  <div>北</div>
                  <i class="el-icon-top"></i>
                </div>
              </div>
              <div class="northBigBox" style="margin-top: 80px">
                <div class="smallArrBox">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north8"
                    :key="index"
                    @dragenter="dragenter(item, north8)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north9"
                    :key="index"
                    @dragenter="dragenter(item, north9)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north10"
                    :key="index"
                    @dragenter="dragenter(item, north10)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north11"
                    :key="index"
                    @dragenter="dragenter(item, north11)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north12"
                    :key="index"
                    @dragenter="dragenter(item, north12)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
              <div class="northBigBox">
                <div class="smallArrBox" style="margin-top: 25px">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north13"
                    :key="index"
                    @dragenter="dragenter(item, north13)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>

                <div class="smallArrBox" style="margin-top: 25px">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north14"
                    :key="index"
                    @dragenter="dragenter(item, north14)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox" style="margin-top: 25px">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north15"
                    :key="index"
                    @dragenter="dragenter(item, north15)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox" style="margin-top: 25px">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north16"
                    :key="index"
                    @dragenter="dragenter(item, north16)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox" style="margin-top: 25px">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north17"
                    :key="index"
                    @dragenter="dragenter(item, north17)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="805房间" name="805">
              <div class="qiantai3">
                <div style="margin-top: 20px">
                  <div>北</div>
                  <i class="el-icon-top"></i>
                </div>
              </div>
              <div class="northBigBox" style="margin-top: 40px">
                <div class="smallArrBox">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north18"
                    :key="index"
                    @dragenter="dragenter(item, north18)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox">
                  <div>门</div>
                </div>

                <div class="smallArrBox">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north19"
                    :key="index"
                    @dragenter="dragenter(item, north19)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox">
                  <div>805房间</div>
                </div>

                <div class="smallArrBox" style="display: flex">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north20"
                    :key="index"
                    @dragenter="dragenter(item, north20)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox">
                  <div>门</div>
                </div>
              </div>

              <div class="northBigBox">
                <div class="smallArrBox" style="margin-top: 25px">
                  <div
                    class="seatStyle"
                    style="display: block"
                    v-for="(item, index) in north21"
                    :key="index"
                    @dragenter="dragenter(item, north21)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox" style="margin-top: 25px">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north22"
                    :key="index"
                    @dragenter="dragenter(item, north22)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox" style="margin-top: 25px">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north23"
                    :key="index"
                    @dragenter="dragenter(item, north23)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox" style="margin-top: 25px">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north24"
                    :key="index"
                    @dragenter="dragenter(item, north24)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox" style="margin-top: 25px">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north25"
                    :key="index"
                    @dragenter="dragenter(item, north25)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox" style="margin-top: 25px">
                  <div
                    class="seatStyle"
                    style="display: block; margin-left: 163px"
                    v-for="(item, index) in north26"
                    :key="index"
                    @dragenter="dragenter(item, north26)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
              <div class="northBigBox">
                <div class="smallArrBox" style="margin-top: 25px">
                  <div
                    class="seatStyle"
                    style="display: block"
                    v-for="(item, index) in north27"
                    :key="index"
                    @dragenter="dragenter(item, north27)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>

                <div class="smallArrBox" style="margin-top: 25px">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north28"
                    :key="index"
                    @dragenter="dragenter(item, north28)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox" style="margin-top: 25px">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north29"
                    :key="index"
                    @dragenter="dragenter(item, north29)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox" style="margin-top: 25px">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north30"
                    :key="index"
                    @dragenter="dragenter(item, north30)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox" style="margin-top: 25px">
                  <div
                    class="seatStyle"
                    v-for="(item, index) in north31"
                    :key="index"
                    @dragenter="dragenter(item, north31)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="smallArrBox" style="margin-top: 25px">
                  <div
                    class="seatStyle"
                    style="display: block; margin-left: 163px"
                    v-for="(item, index) in north32"
                    :key="index"
                    @dragenter="dragenter(item, north32)"
                    @dblclick="shishiClick(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!-- 人员数据 -->
        <el-col :span="4">
          <el-tabs v-model="groupName" @tab-click="groupClick">
            <el-tab-pane label="画面组" name="hua">
              <div class="boxWarpperStyle" @dragenter="colEnter">
                <div
                  v-for="(item, index) in huaArr"
                  :key="index"
                  :class="item.isshow == false ? 'boxStyle' : 'boxStyle1'"
                  @dragstart="item.isshow == false ? dragstart : ''"
                  @drag="drag"
                  @dragend="item.isshow == false ? dragend(item) : ''"
                  @dragleave="dragleave(item)"
                  draggable
                >
                  {{ item.name }}
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="制片组" name="zhi">
              <div class="boxWarpperStyle" @dragenter="colEnter">
                <div
                  v-for="(item, index) in zhiArr"
                  :key="index"
                  :class="item.isshow == false ? 'boxStyle' : 'boxStyle1'"
                  @dragstart="item.isshow == false ? dragstart : ''"
                  @drag="item.isshow == false ? drag : ''"
                  @dragend="item.isshow == false ? dragend(item) : ''"
                  draggable
                >
                  {{ item.name }}
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="动画组" name="dong">
              <div class="boxWarpperStyle" @dragenter="colEnter">
                <div
                  v-for="(item, index) in dongArr"
                  :key="index"
                  :class="item.isshow == false ? 'boxStyle' : 'boxStyle1'"
                  @dragstart="item.isshow == false ? dragstart : ''"
                  @drag="item.isshow == false ? drag : ''"
                  @dragend="item.isshow == false ? dragend(item) : ''"
                  draggable
                >
                  {{ item.name }}
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="资产组" name="zi">
              <div class="boxWarpperStyle" @dragenter="colEnter">
                <div
                  v-for="(item, index) in ziArr"
                  :key="index"
                  :class="item.isshow == false ? 'boxStyle' : 'boxStyle1'"
                  @dragstart="item.isshow == false ? dragstart : ''"
                  @drag="item.isshow == false ? drag : ''"
                  @dragend="item.isshow == false ? dragend(item) : ''"
                  draggable
                >
                  {{ item.name }}
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="运营部" name="yun">
              <div class="boxWarpperStyle" @dragenter="colEnter">
                <div
                  v-for="(item, index) in yunArr"
                  :key="index"
                  :class="item.isshow == false ? 'boxStyle' : 'boxStyle1'"
                  @dragstart="item.isshow == false ? dragstart : ''"
                  @drag="item.isshow == false ? drag : ''"
                  @dragend="item.isshow == false ? dragend(item) : ''"
                  draggable
                >
                  {{ item.name }}
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="研发部" name="yan">
              <div class="boxWarpperStyle" @dragenter="colEnter">
                <div
                  v-for="(item, index) in yanArr"
                  :key="index"
                  :class="item.isshow == false ? 'boxStyle' : 'boxStyle1'"
                  @dragstart="item.isshow == false ? dragstart : ''"
                  @drag="item.isshow == false ? drag : ''"
                  @dragend="item.isshow == false ? dragend(item) : ''"
                  draggable
                >
                  {{ item.name }}
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="导演组" name="dao">
              <div class="boxWarpperStyle" @dragenter="colEnter">
                <div
                  v-for="(item, index) in daoArr"
                  :key="index"
                  :class="item.isshow == false ? 'boxStyle' : 'boxStyle1'"
                  @dragstart="item.isshow == false ? dragstart : ''"
                  @drag="item.isshow == false ? drag : ''"
                  @dragend="item.isshow == false ? dragend(item) : ''"
                  draggable
                >
                  {{ item.name }}
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="设计组" name="she">
              <div class="boxWarpperStyle" @dragenter="colEnter">
                <div
                  v-for="(item, index) in sheArr"
                  :key="index"
                  :class="item.isshow == false ? 'boxStyle' : 'boxStyle1'"
                  @dragstart="item.isshow == false ? dragstart : ''"
                  @drag="item.isshow == false ? drag : ''"
                  @dragend="item.isshow == false ? dragend(item) : ''"
                  draggable
                >
                  {{ item.name }}
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="编剧组" name="bian">
              <div class="boxWarpperStyle" @dragenter="colEnter">
                <div
                  v-for="(item, index) in bianArr"
                  :key="index"
                  :class="item.isshow == false ? 'boxStyle' : 'boxStyle1'"
                  @dragstart="item.isshow == false ? dragstart : ''"
                  @drag="item.isshow == false ? drag : ''"
                  @dragend="item.isshow == false ? dragend(item) : ''"
                  draggable
                >
                  {{ item.name }}
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      wdHeigth: "height:" + (window.innerHeight - 285) + "px",
      upshow: false,
      endShow: false,
      north1: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north2: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north3: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north4: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north5: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north6: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north7: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north8: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north9: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north10: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north11: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north12: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north13: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north14: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north15: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north16: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north17: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north18: [
        {
          name: "",
        },
      ],
      north19: [
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north20: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north21: [
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north22: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north23: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north24: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north25: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north26: [
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north27: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],

      north28: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north29: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north30: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north31: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      north32: [
        {
          name: "",
        },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      enterData: "",
      enterArr: [],
      roomName: "north",
      groupName: "hua",
      huaArr: [
        {
          name: "王瑞",
          isshow: false,
          group: "huaArr",
        },
        {
          name: "贺玉霖",
          isshow: false,
          group: "huaArr",
        },
        {
          name: "田诗璇",
          isshow: false,
          group: "huaArr",
        },
        {
          name: "张富",
          isshow: false,
          group: "huaArr",
        },
        {
          name: "韩昕芮",
          isshow: false,
          group: "huaArr",
        },
        {
          name: "贲鹏",
          isshow: false,
          group: "huaArr",
        },
        {
          name: "董梦美",
          isshow: false,
          group: "huaArr",
        },
        {
          name: "季心成",
          isshow: false,
          group: "huaArr",
        },
        {
          name: "刘金婵",
          isshow: false,
          group: "huaArr",
        },
        {
          name: "张艳",
          isshow: false,
          group: "huaArr",
        },
        {
          name: "胡玉玲",
          isshow: false,
          group: "huaArr",
        },
        {
          name: "刘畅",
          isshow: false,
          group: "huaArr",
        },
        {
          name: "谭勇",
          isshow: false,
          group: "huaArr",
        },

        {
          name: "杨向平",
          isshow: false,
          group: "huaArr",
        },
        {
          name: "于杭师",
          isshow: false,
          group: "huaArr",
        },
        {
          name: "张晓萌",
          isshow: false,
          group: "huaArr",
        },
        {
          name: "胡滔",
          isshow: false,
          group: "huaArr",
        },
      ],
      zhiArr: [
        {
          name: "娄文婧",
          isshow: false,
          group: "zhiArr",
        },
        {
          name: "陈媛",
          isshow: false,
          group: "zhiArr",
        },
        {
          name: "广璐",
          isshow: false,
          group: "zhiArr",
        },
        {
          name: "沈斌",
          isshow: false,
          group: "zhiArr",
        },
        {
          name: "孙亚鑫",
          isshow: false,
          group: "zhiArr",
        },
        {
          name: "魏瑶",
          isshow: false,
          group: "zhiArr",
        },
        {
          name: "赵雁",
          isshow: false,
          group: "zhiArr",
        },
        {
          name: "孙萌",
          isshow: false,
          group: "zhiArr",
        },
        {
          name: "王小宁",
          isshow: false,
          group: "zhiArr",
        },
        {
          name: "王雨岩",
          isshow: false,
          group: "zhiArr",
        },
      ],
      ziArr: [
        {
          name: "隗合鹏",
          isshow: false,
          group: "ziArr",
        },
        {
          name: "蔡晓旭",
          isshow: false,
          group: "ziArr",
        },
        {
          name: "杜元龙",
          isshow: false,
          group: "ziArr",
        },
        {
          name: "刘翠馨",
          isshow: false,
          group: "ziArr",
        },
        {
          name: "邵晶",
          isshow: false,
          group: "ziArr",
        },
        {
          name: "张曼思",
          isshow: false,
          group: "ziArr",
        },
        {
          name: "郑熙千",
          isshow: false,
          group: "ziArr",
        },
        {
          name: "范晓鹏",
          isshow: false,
          group: "ziArr",
        },
        {
          name: "高杰",
          isshow: false,
          group: "ziArr",
        },
        {
          name: "高玉杰",
          isshow: false,
          group: "ziArr",
        },
        {
          name: "李娜",
          isshow: false,
          group: "ziArr",
        },
        {
          name: "张淼",
          isshow: false,
          group: "ziArr",
        },
        {
          name: "赵元龙",
          isshow: false,
          group: "ziArr",
        },
        {
          name: "门宇",
          isshow: false,
          group: "ziArr",
        },
        {
          name: "王乐",
          isshow: false,
          group: "ziArr",
        },
        {
          name: "肖玉丰",
          isshow: false,
          group: "ziArr",
        },
      ],
      dongArr: [
        {
          name: "祁智",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "杨海艺",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "高晓朋",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "陈沛帆",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "陈鹏",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "苗丰",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "秦玉涛",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "尚治君",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "王洪狄",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "王林如",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "刘少龙",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "王林如",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "周星",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "陈诚",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "樊金超",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "范茗",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "闫志东",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "张悦翔",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "兰海隆",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "马煜程",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "付林",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "晁辉",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "段荣臻",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "陆玉",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "孙也桃",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "王苗苗",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "尤明彦",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "曹希坤",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "李明星",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "吕秋虹",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "梅卫康",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "王宏玥",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "焦石",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "孙鼎禅",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "万宇彤",
          isshow: false,
          group: "dongArr",
        },
        {
          name: "魏冠宇",
          isshow: false,
          group: "dongArr",
        },
      ],
      yunArr: [
        {
          name: "贺莉",
          isshow: false,
          group: "yunArr",
        },
        {
          name: "刘超",
          isshow: false,
          group: "yunArr",
        },
        {
          name: "牛安妮",
          isshow: false,
          group: "yunArr",
        },
        {
          name: "孙嘉宇",
          isshow: false,
          group: "yunArr",
        },
        {
          name: "王畅",
          isshow: false,
          group: "yunArr",
        },
        {
          name: "薛珺儒",
          isshow: false,
          group: "yunArr",
        },
        {
          name: "武桂田",
          isshow: false,
          group: "yunArr",
        },
        {
          name: "黄晓东",
          isshow: false,
          group: "yunArr",
        },
      ],
      yanArr: [
        {
          name: "张旭",
          isshow: false,
          group: "yanArr",
        },
        {
          name: "杜静东",
          isshow: false,
          group: "yanArr",
        },
        {
          name: "方婷",
          isshow: false,
          group: "yanArr",
        },
        {
          name: "史佳昕",
          isshow: false,
          group: "yanArr",
        },
        {
          name: "张继良",
          isshow: false,
          group: "yanArr",
        },
        {
          name: "刘传坤",
          isshow: false,
          group: "yanArr",
        },
        {
          name: "咸金辉",
          isshow: false,
          group: "yanArr",
        },
        {
          name: "孙振林",
          isshow: false,
          group: "yanArr",
        },
      ],
      daoArr: [
        {
          name: "郝超",
          isshow: false,
          group: "daoArr",
        },
        {
          name: "刘猛",
          isshow: false,
          group: "daoArr",
        },
        {
          name: "曲艺",
          isshow: false,
          group: "daoArr",
        },
        {
          name: "白鸿",
          isshow: false,
          group: "daoArr",
        },
        {
          name: "金渤",
          isshow: false,
          group: "daoArr",
        },
      ],
      sheArr: [
        {
          name: "靳学全",
          isshow: false,
          group: "sheArr",
        },
        {
          name: "黄亚男",
          isshow: false,
          group: "sheArr",
        },
        {
          name: "姜昱州",
          isshow: false,
          group: "sheArr",
        },
        {
          name: "龙心悦",
          isshow: false,
          group: "sheArr",
        },
        {
          name: "马琳媛",
          isshow: false,
          group: "sheArr",
        },
        {
          name: "丘鑫",
          isshow: false,
          group: "sheArr",
        },
        {
          name: "王单庆",
          isshow: false,
          group: "sheArr",
        },
        {
          name: "王起波",
          isshow: false,
          group: "sheArr",
        },
        {
          name: "王哲勋",
          isshow: false,
          group: "sheArr",
        },
        {
          name: "张印",
          isshow: false,
          group: "sheArr",
        },
        {
          name: "朱杉",
          isshow: false,
          group: "sheArr",
        },
      ],
      bianArr: [
        {
          name: "白杨",
          isshow: false,
          group: "bianArr",
        },
        {
          name: "黄磊",
          isshow: false,
          group: "bianArr",
        },
        {
          name: "苗铱",
          isshow: false,
          group: "bianArr",
        },
        {
          name: "万佳龙",
          isshow: false,
          group: "bianArr",
        },
      ],
      updataData: '{"north1":[{"name":"","group":"","isshow":false},{"name":"","group":"","isshow":false},{"name":"","group":"","isshow":false},{"name":"","group":"","isshow":false},{"name":"武桂田","group":"yunArr","isshow":true},{"name":"黄晓东","group":"yunArr","isshow":true}],"north2":[{"name":"","group":"","isshow":false},{"name":""},{"name":""},{"name":""},{"name":"郝超","group":"daoArr","isshow":true},{"name":""}],"north3":[{"name":"贺玉霖","group":"huaArr","isshow":true},{"name":"田诗璇","group":"huaArr","isshow":true},{"name":"张富","group":"huaArr","isshow":true},{"name":"韩昕芮","group":"huaArr","isshow":true}],"north4":[{"name":"","group":"","isshow":false},{"name":"刘金婵","group":"huaArr","isshow":true},{"name":"","group":"","isshow":false},{"name":"董梦美","group":"huaArr","isshow":true},{"name":"胡滔","group":"huaArr","isshow":true},{"name":"季心成","group":"huaArr","isshow":true}],"north5":[{"name":"贲鹏","group":"huaArr","isshow":true},{"name":"","group":"","isshow":false},{"name":"张艳","group":"huaArr","isshow":true},{"name":"陈媛","group":"zhiArr","isshow":true},{"name":"王瑞","group":"huaArr","isshow":true},{"name":"魏瑶","group":"zhiArr","isshow":true}],"north6":[{"name":"刘超","group":"yunArr","isshow":true},{"name":"孙嘉宇","group":"yunArr","isshow":true},{"name":"贺莉","group":"yunArr","isshow":true},{"name":"薛珺儒","group":"yunArr","isshow":true},{"name":"牛安妮","group":"yunArr","isshow":true},{"name":"王畅","group":"yunArr","isshow":true}],"north7":[{"name":"胡玉玲","group":"huaArr","isshow":true},{"name":"张晓萌","group":"huaArr","isshow":true},{"name":"谭勇","group":"huaArr","isshow":true},{"name":"杨向平","group":"huaArr","isshow":true},{"name":"于杭师","group":"huaArr","isshow":true},{"name":"刘畅","group":"huaArr","isshow":true}],"north8":[{"name":"苗丰","group":"dongArr","isshow":true},{"name":"秦玉涛","group":"dongArr","isshow":true},{"name":"闫志东","group":"dongArr","isshow":true},{"name":"张悦翔","group":"dongArr","isshow":true},{"name":"","group":"","isshow":false},{"name":"刘少龙","group":"dongArr","isshow":true}],"north9":[{"name":"陈鹏","group":"dongArr","isshow":true},{"name":"段荣臻","group":"dongArr","isshow":true},{"name":"陈沛帆","group":"dongArr","isshow":true},{"name":"陆玉","group":"dongArr","isshow":true},{"name":"周星","group":"dongArr","isshow":true},{"name":"晁辉","group":"dongArr","isshow":true}],"north10":[{"name":"孙也桃","group":"dongArr","isshow":true},{"name":"王雨岩","group":"zhiArr","isshow":true},{"name":"王苗苗","group":"dongArr","isshow":true},{"name":"广璐","group":"zhiArr","isshow":true}],"north11":[{"name":"兰海隆","group":"dongArr","isshow":true},{"name":"史佳昕","group":"yanArr","isshow":true},{"name":""},{"name":"张继良","group":"yanArr","isshow":true},{"name":"赵雁","group":"zhiArr","isshow":true},{"name":"方婷","group":"yanArr","isshow":true}],"north12":[{"name":"","group":"","isshow":false},{"name":"刘传坤","group":"yanArr","isshow":true},{"name":"杜静东","group":"yanArr","isshow":true},{"name":"","group":"","isshow":false},{"name":"张旭","group":"yanArr","isshow":true},{"name":""}],"north13":[{"name":"范茗","group":"dongArr","isshow":true},{"name":"王林如","group":"dongArr","isshow":true},{"name":"付林","group":"dongArr","isshow":true},{"name":"尚治君","group":"dongArr","isshow":true},{"name":""},{"name":"陈诚","group":"dongArr","isshow":true}],"north14":[{"name":"刘猛","group":"daoArr","isshow":true},{"name":"王宏玥","group":"dongArr","isshow":true},{"name":"王洪狄","group":"dongArr","isshow":true},{"name":"万宇彤","group":"dongArr","isshow":true},{"name":"樊金超","group":"dongArr","isshow":true},{"name":"孙鼎禅","group":"dongArr","isshow":true}],"north15":[{"name":"焦石","group":"dongArr","isshow":true},{"name":"曹希坤","group":"dongArr","isshow":true},{"name":"魏冠宇","group":"dongArr","isshow":true},{"name":"李明星","group":"dongArr","isshow":true}],"north16":[{"name":"尤明彦","group":"dongArr","isshow":true},{"name":"白鸿","group":"daoArr","isshow":true},{"name":"吕秋虹","group":"dongArr","isshow":true},{"name":"沈斌","group":"zhiArr","isshow":true},{"name":"梅卫康","group":"dongArr","isshow":true},{"name":""}],"north17":[{"name":"咸金辉","group":"yanArr","isshow":true},{"name":"娄文婧","group":"zhiArr","isshow":true},{"name":"孙振林","group":"yanArr","isshow":true},{"name":"","group":"","isshow":false},{"name":"","group":"","isshow":false},{"name":""}],"north18":[{"name":"","group":"","isshow":false}],"north19":[{"name":"曲艺","group":"daoArr","isshow":true},{"name":"龙心悦","group":"sheArr","isshow":true}],"north20":[{"name":"丘鑫","group":"sheArr","isshow":true},{"name":""},{"name":""}],"north21":[{"name":"苗铱","group":"bianArr","isshow":true},{"name":"黄磊","group":"bianArr","isshow":true}],"north22":[{"name":"白杨","group":"bianArr","isshow":true},{"name":""},{"name":"万佳龙","group":"bianArr","isshow":true},{"name":"孙亚鑫","group":"zhiArr","isshow":true}],"north23":[{"name":"马琳媛","group":"sheArr","isshow":true},{"name":"黄亚男","group":"sheArr","isshow":true},{"name":"朱杉","group":"sheArr","isshow":true},{"name":"张印","group":"sheArr","isshow":true}],"north24":[{"name":"王小宁","group":"zhiArr","isshow":true},{"name":"王单庆","group":"sheArr","isshow":true},{"name":"孙萌","group":"zhiArr","isshow":true},{"name":"靳学全","group":"sheArr","isshow":true}],"north25":[{"name":"王起波","group":"sheArr","isshow":true},{"name":"王哲勋","group":"sheArr","isshow":true},{"name":"姜昱州","group":"sheArr","isshow":true},{"name":"金渤","group":"daoArr","isshow":true}],"north26":[{"name":""},{"name":""}],"north27":[{"name":""},{"name":""},{"name":"杜元龙","group":"ziArr","isshow":true}],"north28":[{"name":"张曼思","group":"ziArr","isshow":true},{"name":"郑熙千","group":"ziArr","isshow":true},{"name":"刘翠馨","group":"ziArr","isshow":true},{"name":""},{"name":"邵晶","group":"ziArr","isshow":true},{"name":""}],"north29":[{"name":"赵元龙","group":"ziArr","isshow":true},{"name":"隗合鹏","group":"ziArr","isshow":true},{"name":"李娜","group":"ziArr","isshow":true},{"name":"蔡晓旭","group":"ziArr","isshow":true},{"name":""},{"name":""}],"north30":[{"name":"范晓鹏","group":"ziArr","isshow":true},{"name":"高杰","group":"ziArr","isshow":true},{"name":"张淼","group":"ziArr","isshow":true},{"name":"高玉杰","group":"ziArr","isshow":true},{"name":"","group":"","isshow":false},{"name":"门宇","group":"ziArr","isshow":true}],"north31":[{"name":"王乐","group":"ziArr","isshow":true},{"name":"高晓朋","group":"dongArr","isshow":true},{"name":"肖玉丰","group":"ziArr","isshow":true},{"name":"杨海艺","group":"dongArr","isshow":true},{"name":""},{"name":"祁智","group":"dongArr","isshow":true}],"north32":[{"name":""},{"name":""},{"name":""}]}',
    };
  },
  mounted() {
    this.getAxios();
  },
  methods: {
    getAxios() {
      axios({
        method: "get",
        url: "http://tpi.tgyc.com/index.php/home/seat/getseat",
      }).then((res) => {
        // if(res)
        let { data } = res;
        console.log(data);
        if (data.data.length != 0) {
          let {
            north1,
            north2,
            north3,
            north4,
            north5,
            north6,
            north7,
            north8,
            north9,
            north10,
            north11,
            north12,
            north13,
            north14,
            north15,
            north16,
            north17,
            north18,
            north19,
            north20,
            north21,
            north22,
            north23,
            north24,
            north25,
            north26,
            north27,
            north28,
            north29,
            north30,
            north31,
            north32,
          } = JSON.parse(data.data.seat);

          this.north1 = north1;
          this.north2 = north2;
          this.north3 = north3;
          this.north4 = north4;
          this.north5 = north5;
          this.north6 = north6;
          this.north7 = north7;
          this.north8 = north8;
          this.north9 = north9;
          this.north10 = north10;
          this.north11 = north11;
          this.north12 = north12;
          this.north13 = north13;
          this.north14 = north14;
          this.north15 = north15;
          this.north16 = north16;
          this.north17 = north17;
          this.north18 = north18;
          this.north19 = north19;
          this.north20 = north20;
          this.north21 = north21;
          this.north22 = north22;
          this.north23 = north23;
          this.north24 = north24;
          this.north25 = north25;
          this.north26 = north26;
          this.north27 = north27;
          this.north28 = north28;
          this.north29 = north29;
          this.north30 = north30;
          this.north31 = north31;
          this.north32 = north32;

          this.north1.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north2.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north3.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north4.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north5.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north6.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north7.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north8.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north9.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north10.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north11.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north12.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north13.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north14.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north15.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north16.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north17.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north18.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north19.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north20.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north21.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north22.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north23.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north24.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north25.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north26.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north27.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north28.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north29.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north30.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north31.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
          this.north32.forEach((item) => {
            if (this[item.group] != undefined) {
              if (item.name != "") {
                this[item.group].forEach((el) => {
                  if (el.name == item.name) {
                    el.isshow = true;
                  }
                });
              }
            }
          });
        }
        console.log(this.huaArr)
        console.log(this.zhiArr)
        console.log(this.ziArr)
        console.log(this.dongArr)
        console.log(this.yunArr)
        console.log(this.yanArr)
        console.log(this.daoArr)
        console.log(this.sheArr)
        console.log(this.bianArr)
        //   huaArr:
        // zhiArr:
        // ziArr:
        // dongArr:
        // yunArr:
        // yanArr:
        // daoArr:
        // sheArr:
        // bianArr:
      });
    },
    updataAxios() {
      let data = new FormData();
      data.append("seat", this.updataData);
      axios({
        method: "post",
        url: "http://tpi.tgyc.com/index.php/home/seat/updseat",
        data,
      }).then((res) => {
        console.log(res);
        console.log("去更新数据");
      });
    },
    shishiClick(val) {
      console.log(val);
      let groupName = this.groupName;
      console.log(groupName);

      this.huaArr.forEach((item) => {
        if (item.name == val.name) {
          item.isshow = false;
          val.name = "";
          val.isshow = false;
          val.group = "";
        }
      });

      this.zhiArr.forEach((item) => {
        if (item.name == val.name) {
          item.isshow = false;
          val.name = "";
          val.isshow = false;
          val.group = "";
        }
      });

      this.ziArr.forEach((item) => {
        if (item.name == val.name) {
          item.isshow = false;
          val.name = "";
          val.isshow = false;
          val.group = "";
        }
      });

      this.dongArr.forEach((item) => {
        if (item.name == val.name) {
          item.isshow = false;
          val.name = "";
          val.isshow = false;
          val.group = "";
        }
      });

      this.yunArr.forEach((item) => {
        if (item.name == val.name) {
          item.isshow = false;
          val.name = "";
          val.isshow = false;
          val.group = "";
        }
      });

      this.yanArr.forEach((item) => {
        if (item.name == val.name) {
          item.isshow = false;
          val.name = "";
          val.isshow = false;
          val.group = "";
        }
      });

      this.daoArr.forEach((item) => {
        if (item.name == val.name) {
          item.isshow = false;
          val.name = "";
          val.isshow = false;
          val.group = "";
        }
      });

      this.sheArr.forEach((item) => {
        if (item.name == val.name) {
          item.isshow = false;
          val.name = "";
          val.isshow = false;
          val.group = "";
        }
      });

      this.bianArr.forEach((item) => {
        if (item.name == val.name) {
          item.isshow = false;
          val.name = "";
          val.isshow = false;
          val.group = "";
        }
      });

      let data = {
        north1: this.north1,
        north2: this.north2,
        north3: this.north3,
        north4: this.north4,
        north5: this.north5,
        north6: this.north6,
        north7: this.north7,
        north8: this.north8,
        north9: this.north9,
        north10: this.north10,
        north11: this.north11,
        north12: this.north12,
        north13: this.north13,
        north14: this.north14,
        north15: this.north15,
        north16: this.north16,
        north17: this.north17,
        north18: this.north18,
        north19: this.north19,
        north20: this.north20,
        north21: this.north21,
        north22: this.north22,
        north23: this.north23,
        north24: this.north24,
        north25: this.north25,
        north26: this.north26,
        north27: this.north27,
        north28: this.north28,
        north29: this.north29,
        north30: this.north30,
        north31: this.north31,
        north32: this.north32,
      };
      this.updataData = data;

      // this.updataAxios();
      this.$message({
        type: "success",
        message: "人员清除成功",
      });
    },
    roomClick() {},
    groupClick() {},
    dragstart() {
      console.log("红色");
    },
    drag() {},
    dragend(data) {
      console.log(this.upshow);
      console.log(data);
      if (this.upshow) {
        if (this.enterData.name == "") {
          this.enterData.name = data.name;
          this.enterData.group = data.group;
          this.enterData.isshow = true;
          data.isshow = true;

          let val = {
            north1: this.north1,
            north2: this.north2,
            north3: this.north3,
            north4: this.north4,
            north5: this.north5,
            north6: this.north6,
            north7: this.north7,
            north8: this.north8,
            north9: this.north9,
            north10: this.north10,
            north11: this.north11,
            north12: this.north12,
            north13: this.north13,
            north14: this.north14,
            north15: this.north15,
            north16: this.north16,
            north17: this.north17,
            north18: this.north18,
            north19: this.north19,
            north20: this.north20,
            north21: this.north21,
            north22: this.north22,
            north23: this.north23,
            north24: this.north24,
            north25: this.north25,
            north26: this.north26,
            north27: this.north27,
            north28: this.north28,
            north29: this.north29,
            north30: this.north30,
            north31: this.north31,
            north32: this.north32,
          };
          this.updataData = val;

          // this.updataAxios();
        } else {
          this.$message({
            type: "warning",
            message: "请先确定当前位置无人，且位置正确",
          });
        }
      }
    },
    dragenter(item, arr) {
      // var a = "";
      // window.clearTimeout(a);
      // a = setTimeout(() => {
      this.enterData = item;
      this.enterArr = arr;
      this.upshow = true;
      // }, 800);

      console.log("wojinlail ");
    },
    dragleave(item, arr) {
      this.enterData = {};
      this.enterArr = [];
      this.upshow = true;
      console.log(`likai绿色`);
    },
    colEnter() {
      console.log("我进来col了");
    },
  },
};
</script>
<style scoped >
.northBigBox1 {
  width: 100%;
}
.northBigBox {
  width: 100%;
  display: flex;
}
.smallArrBox {
  width: 235px;
}
.boxWarpperStyle {
}
.boxStyle {
  width: 70px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  display: inline-block;
  background-color: #409eff;
  color: #ffffff;
  margin-right: 5px;
  font-size: 12px;
  margin-top: 5px;
}
.boxStyle1 {
  width: 70px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  display: inline-block;
  background-color: #606266;
  color: #ffffff;
  margin-right: 5px;
  font-size: 12px;
  margin-top: 5px;
}
.box1 {
  position: absolute;
  top: 0px;
  right: 10px;
  width: 80px;
  height: 580px;
}
.seatStyle {
  width: 70px;
  height: 50px;
  line-height: 50px;
  font-size: 12px;
  text-align: center;
  border: 1px solid #409eff;
  display: inline-block;
  background-color: #409eff;
  margin-right: 10px;
  margin-bottom: 5px;
  margin-top: 10px;
  color: #fff;
  overflow: hidden;
  cursor: pointer;
}
.canSet {
  width: 100%;
}
.noSet {
  border: 1px solid #409eff;
  background-color: #409eff;
}
.qiantai {
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 70px;
  height: 50px;
}
.qiantai1 {
  position: absolute;
  right: 0px;
  top: 10px;
  width: 70px;
  height: 50px;
}
.qiantai2 {
  position: absolute;
  right: 0px;
  top: 10px;
  width: 70px;
  height: 50px;
}
.qiantai3 {
  position: absolute;
  right: 0px;
  top: 10px;
  width: 70px;
  height: 50px;
}
.xiuxian {
  position: absolute;
  right: 45%;
  top: 50px;
  width: 400px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  color: #fff;
  background-color: #909399;
}
</style>
