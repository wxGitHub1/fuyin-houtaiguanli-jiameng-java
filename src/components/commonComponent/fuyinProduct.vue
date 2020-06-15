<template>
  <div>
    <div id="printTest">
      <div v-if="sizeMapList.length == 0" class="center">该产品暂无模板，工作人员正在添加中...</div>
      <div v-else>
        <h3
          class="title"
        >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]-{{productTitle.recordNumber}}-{{productTitle.baseProductUnit}}</h3>
        <table class="border margin-b-20">
          <tr>
            <td class="border-b">姓名</td>
            <td>{{printFormData.memberName}}</td>
            <td class="border-b">年龄</td>
            <td>{{printFormData.age}}</td>
            <td class="border-b">是否加急</td>
            <td>{{printFormData.quickly}}</td>
            <td class="border-b">X光片</td>
            <td>{{printFormData.xRay}}</td>
            <td class="border-b">医院名称</td>
            <td>{{printFormData.hospitalName}}</td>
            <td class="border-b">交货日期</td>
            <td>{{printFormData.deliveryTime}}</td>
          </tr>
          <tr>
            <td class="border-b first-tr">病情</td>
            <td colspan="11">{{printFormData.condition}}，{{printFormData.illness}}</td>
          </tr>
          <tr>
            <td class="border-b">特殊要求</td>
            <td colspan="5">{{printFormData.demand}}</td>
            <td class="border-b">取型人员</td>
            <td colspan="5">{{printFormData.user}}</td>
          </tr>
        </table>
        <table class="border margin-b-20" v-for="(item,index) in sizeMapList" :key="index">
          <tr>
            <td class="border-b first-tr">{{item.key}}-(工号)</td>
            <td :colspan="4" class="border-b"></td>
            <td :colspan="4" class="border-b">检验-(签字)</td>
            <td :colspan="4" class="border-b"></td>
          </tr>

          <tr v-for="(obj,index) in item.value" :key="index">
            <td class="border-b first-tr background-y">{{obj.key}}</td>
            <td :colspan="12/obj.value.length" v-for="(list,index) in obj.value" :key="index">
              <span
                v-if="obj.key == '围长'||obj.key== '宽度'||obj.key== '高度' || obj.key== '足部' || obj.key== '带子长度'|| obj.key== '型式'|| obj.key== '患侧'|| obj.key== '其他'"
              >{{list.key}} : {{list.value}}</span>
              <span v-else>{{list}}</span>
            </td>
          </tr>

        </table>
        <table class="border margin-t-20">
          <tr>
            <td class="border-b first-tr background-y">入库检-(签字)</td>
            <td class="border-b"></td>
          </tr>
          <tr>
            <td class="border-b first-tr background-y">基本要求</td>
            <td>符合以上全部工序要求</td>
          </tr>
        </table>
        <table class="border margin-t-20">
          <tr>
            <td class="border-b first-tr background-y">终检-(签字)</td>
            <td class="border-b"></td>
          </tr>
          <tr>
            <td class="border-b first-tr background-y">基本要求</td>
            <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import fuyinProduct from "../../utils/fuyinProduct";
export default {
  data() {
    return {
      // product: fuyinProduct.isShow
    };
  },
  props: {
    sizeMapList: {
      type: Array
    },
    productTitle: {
      type: Object
    },
    printFormData: {
      type: Object
    },
    // printFormDataMap: {
    //   type: Object
    // }
  }
};
</script>
<style lang="scss" scoped>
.title {
  color: #000;
  text-align: center;
}
.border {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #000000;
  color: #000;
  font-size: 14px;
  tr td {
    border: 1px solid #000;
    padding: 8.5px;
    text-align: center;
  }
  .background-y {
    background: #e26b0a;
  }
  .border-b {
    font-weight: 600;
    font-size: 14px;
  }
  .first-tr {
    width: 200px;
  }
}
.margin-t-20 {
  margin-top: 20px;
}
</style>


