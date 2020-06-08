<template>
  <div id="pdfDom">
    <div id="subOutputRank-print">
        <h1 class="TR_title">产品制作参数</h1>
        <p class="TR_time">打印时间：{{testReport.printDate}}</p>
        <div id="basic_information">
          <el-row>
            <el-col :span="6">
              <div>客户姓名：{{testReport.name}}</div>
            </el-col>
            <el-col :span="6">
              <div>性别：{{testReport.sex}}</div>
            </el-col>
            <el-col :span="12">
              <div>出生日期：{{testReport.birthday}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>身高：{{testReport.height}}cm</div>
            </el-col>
            <el-col :span="6">
              <div>体重：{{testReport.weight}}kg</div>
            </el-col>
            <el-col :span="12">
              <div>血型：</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>家长姓名：</div>
            </el-col>
            <el-col :span="6">
              <div>联系电话：{{testReport.phone}}</div>
            </el-col>
            <el-col :span="12">
              <div>家庭地址：{{testReport.address}}</div>
            </el-col>
          </el-row>
        </div>
        <h3 class="margin-l-20">图像信息</h3>
        <div class="list_photo" v-if="isTwo">
          <div class="imgList">
            <div>
              <img :src="testReport.zgRight" alt="tupian1" />
            </div>
            <div>
              <img :src="testReport.zgLeft" alt="tupian2" />
            </div>
            <div>
              <img :src="testReport.ggLeft" alt="tupian3" />
            </div>
            <div>
              <img :src="testReport.ggRight" alt="tupian4" />
            </div>
          </div>
          <el-row>
            <el-col :span="6">
              <div class="text-c">
                <p>右足弓</p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="text-c">
                <p>左足弓</p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="text-c">
                <p>左跟骨</p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="text-c">
                <p>右跟骨</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="list_photo" v-else>
          <el-row class="imgList">
            <el-col :span="7">
              <div class="text-c">
                <img :src="testReport.zgRight" alt="tupian1" />
              </div>
            </el-col>
            <el-col :span="7">
              <div class="text-c">
                <img :src="testReport.zgLeft" alt="tupian2" />
              </div>
            </el-col>
            <el-col :span="10">
              <div class="text-c">
                <img :src="testReport.ggLeft" alt="tupian3" />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <div class="text-c">
                <p>右足弓</p>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="text-c">
                <p>左足弓</p>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="text-c">
                <p class="margin-r-50 display-i-b">左跟骨</p>
                <p class="display-i-b">右跟骨</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <h3 class="margin-l-20">发育指数</h3>
        <div id="development_information">
          <el-row>
            <el-col :span="6">
              <div >右足弓指数：{{testReport.rightProportion || "暂无数据"}}</div>
            </el-col>
            <el-col :span="6">
              <div >左足弓指数：{{testReport.leftProportion || "暂无数据"}}</div>
            </el-col>
            <el-col :span="6">
              <div >左跟骨外翻：{{testReport.leftAbroadCalcaneus || "暂无数据"}}</div>
            </el-col>
            <el-col :span="6">
              <div >右跟骨外翻：{{testReport.rightAbroadCalcaneus || "暂无数据"}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" :offset="12">
              <div >左跟骨内翻：{{testReport.leftWithinCalcaneus || "暂无数据"}}</div>
            </el-col>
            <el-col :span="6">
              <div >右跟骨内翻：{{testReport.rightWithinCalcaneus || "暂无数据"}}</div>
            </el-col>
          </el-row>
        </div>
        <h3 class="margin-l-20">足部3D扫描：见附件</h3>
        <div class="border-b-2-e"></div>
        <h3 class="margin-l-20">产品信息</h3>
        <div id="development_information">
          <el-row>
            <el-col :span="24">
              <div >产品名称：发育型防护气垫</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div >产品特点：亲肤面料、柔软随行、贴合足部曲线、U型根杯保护跟骨部位，前掌设计更适合脚型</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div >产品说明：数字化定制的发育型防护气垫，营造出更适合足部的发育环境</div>
            </el-col>
          </el-row>
          <h3>注意事项</h3>
          <el-row>
            <el-col :span="24">
              <div>1.禁止暴力挤压、禁止接触热源、</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>2.穿戴过程中有任何不适，请及时与我们联系</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>3.为了保证足部与鞋垫的贴合度，需每3个月带孩子去医院复诊</div>
            </el-col>
          </el-row>
        </div>
        <div class="text-c margin-t-30 ">服务电话：029-68882888</div>
        <div class="text-c margin-t-20 ">服务地址：陕西省西安市未央区经开万科中心15楼福音康复</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // isTwo: true
    };
  },
  props: {
    testReport: {
      type: Object
    },
    isTwo: {
      type: Boolean
    },
  }
};
</script>
<style lang="scss" scoped>
//检测报告css
.imgList {
  width: 100%;
  display: flex;
  display: -webkit-flex; /* Safari */
  // justify-content:center;
  justify-content: flex-start;
  div {
    margin: 0 2px;
    img {
      width: 100%;
    }
  }
}

#subOutputRank-print {
  color: #3a3a3a;
  margin: 0 40px;
}
.TR_title {
  letter-spacing: 10px;
  text-align: center;
  border-bottom: #666 solid 2px;
  line-height: 80px;
}
.TR_time {
  text-align: right;
  margin-top: -62px;
}
#basic_information {
  margin-top: 50px;
  padding: 0 20px;
  border-bottom: #666 solid 2px;
  .el-row {
    margin-bottom: 20px;
  }
}
#development_information {
  padding: 0 20px;
  border-bottom: #666 solid 2px;
  .el-row {
    margin-bottom: 20px;
  }
}
.list_photo {
  padding-bottom: 10px;
  border-bottom: #666 solid 2px;
}
.border-b-2-e {
  border-bottom: #666 solid 2px;
}
.font-italic {
  font-style: italic;
}
</style>


