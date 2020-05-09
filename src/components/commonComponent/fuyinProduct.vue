<template>
  <div>
    <div id="printTest">
        <div v-if="product.product_1">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长 "]}}</td>
              <td>小腿最粗围长</td>
              <td>{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>股骨中段围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>踝关节围长</td>
              <td>{{printFormDataMap["围长"]["踝关节围长"]}}</td>
              <td>膝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td colspan="3">膝关节宽度</td>
              <td colspan="3">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td colspan="3">踝关节宽度</td>
              <td colspan="3">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td colspan="2">会阴--髌中心</td>
              <td colspan="3">{{printFormDataMap["高度"]["会阴--髌中心"]}}</td>
              <td colspan="2">大转子--踝上</td>
              <td colspan="3">{{printFormDataMap["高度"]["大转子--踝上"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="5">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节角度</td>
              <td colspan="2">阴型无变形</td>
              <td colspan="2">髋关节角度</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">髋膝关节</td>
              <td class="border-b background-y" colspan="2">足部要求</td>
              <td class="border-b background-y" colspan="2">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td rowspan="4">形状符合、角度符合订单要求</td>
              <td>足型一致</td>
              <td>翘度一致</td>
              <td>围长增加：2-5cm</td>
              <td>膝关节宽度增加：0.5-1cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>单侧左右相符</td>
              <td>足弓位置一致</td>
              <td>1cm≤翘度≤1.5cm</td>
              <td>宽度增加：0.5-1cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>翻边一致</td>
              <td colspan="2">受力点合适</td>
              <td>足长增加：1-1.5cm</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td>平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长 "]}}</td>
              <td>小腿最粗围长</td>
              <td>{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>股骨中段围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>踝关节围长</td>
              <td>{{printFormDataMap["围长"]["踝关节围长"]}}</td>
              <td>膝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td colspan="3">膝关节宽度</td>
              <td colspan="3">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td colspan="3">踝关节宽度</td>
              <td colspan="3">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td colspan="2">会阴--髌中心</td>
              <td colspan="3">{{printFormDataMap["高度"]["会阴--髌中心"]}}</td>
              <td colspan="2">大转子--踝上</td>
              <td colspan="3">{{printFormDataMap["高度"]["大转子--踝上"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="5">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节角度</td>
              <td colspan="2">阴型无变形</td>
              <td colspan="2">髋关节角度</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">铰链</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="3">额状面</td>
              <td>表面光滑，平顺</td>
              <td>膝关节铰链高低一致</td>
              <td>围长增加：2-3cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td rowspan="2">符合订单要求</td>
              <td>无凸凹不平</td>
              <td>内外平行</td>
              <td>大转子-髌中心</td>
            </tr>
            <tr>
              <td>横线直、弧线顺</td>
              <td>上下垂直</td>
              <td>踝关节宽度增加：1-1.5cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>支具与订单姓名一致</td>
              <td rowspan="2">矢状面</td>
              <td>无毛刺</td>
              <td>锁开闭灵活、同轴</td>
              <td>髌中心-地面</td>
            </tr>
            <tr>
              <td>单侧左右相符</td>
              <td>宽窄、长短、高低一致</td>
              <td>支条长短、孔距一致</td>
              <td>膝关节宽度增加：0.5-1cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td rowspan="2">两腿型一致</td>
              <td rowspan="2">水平面</td>
              <td>形状对称</td>
              <td>支条边缘光滑</td>
              <td rowspan="2">会阴到髌中心</td>
            </tr>
            <tr>
              <td>粗细一致</td>
              <td>内孔无毛刺</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">支条</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">对称</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_2">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>胸围长</td>
              <td colspan="3">{{printFormDataMap["围长"]["胸围长"]}}</td>
              <td>腰围</td>
              <td colspan="3">{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>取型人员</td>
              <td colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>胸宽</td>
              <td colspan="4">{{printFormDataMap["宽度"]["胸宽"]}}</td>
              <td>腰宽</td>
              <td colspan="5">{{printFormDataMap["宽度"]["腰宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>锁骨--髂嵴连线</td>
              <td colspan="2">{{printFormDataMap["高度"]["锁骨--髂嵴连线"]}}</td>
              <td>脖中头顶</td>
              <td colspan="2">{{printFormDataMap["高度"]["脖中--头顶"]}}</td>
              <td>脖中髂嵴连线</td>
              <td colspan="2">{{printFormDataMap["高度"]["脖中--髂嵴连线"]}}</td>
              <td>腋下--髂嵴</td>
              <td>{{printFormDataMap["高度"]["腋下--髂嵴"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">腰椎无过伸</td>
              <td colspan="2">塑出下颚形状</td>
              <td colspan="2">塑出髂脊形状</td>
              <td colspan="2">头部力线矫枉过正</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y" colspan="2">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y" colspan="2">外观</td>
              <td class="border-b background-y">力点</td>
              <td class="border-b background-y">形状</td>
              <td class="border-b background-y" colspan="2">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td colspan="2">模型与订单姓名一致</td>
              <td>额状面</td>
              <td colspan="2">表面平整，无凹凸不平</td>
              <td>压力点位置合适</td>
              <td>下颌骨形状合适</td>
              <td colspan="2">胸围增加:3-5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td colspan="2">符合订单要求</td>
              <td>矢状面</td>
              <td colspan="2">形状符合</td>
              <td>受力点合适</td>
              <td rowspan="2">头部形状合适</td>
              <td colspan="2" rowspan="2">宽度增加：0-1cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td colspan="2">斜颈左右相符</td>
              <td>水平面</td>
              <td colspan="2">腋下高低对称</td>
              <td>释放空间要够</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：5-8cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>前开口</td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">力点</td>
              <td class="border-b background-y" colspan="2">方扣、带子</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>支具与订单姓名一致</td>
              <td>表面平整，无凹凸不平</td>
              <td>压力点位置合适</td>
              <td>带子长短合适</td>
              <td>位置合适</td>
              <td>胸围增加:3-5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>形状符合</td>
              <td>受力点合适</td>
              <td>方扣三个</td>
              <td>结实、齐全</td>
              <td rowspan="2">宽度增加：0-1cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>斜颈左右相符</td>
              <td>无毛刺</td>
              <td>腋下高低对称</td>
              <td>带子三个</td>
              <td>子母扣平整</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <!-- <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>-->
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">结实、位置上对</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_3">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>胸围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["胸围长"]}}</td>
              <td>腰围</td>
              <td colspan="2">{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>髋围</td>
              <td colspan="2">{{printFormDataMap["围长"]["髋围"]}}</td>
              <td>取型人员</td>
              <td>{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>胸宽</td>
              <td colspan="2">{{printFormDataMap["宽度"]["胸宽"]}}</td>
              <td>腰宽</td>
              <td colspan="2">{{printFormDataMap["宽度"]["腰宽"]}}</td>
              <td>髋宽</td>
              <td colspan="2">{{printFormDataMap["宽度"]["髋宽"]}}</td>
              <td>腋下--髂嵴</td>
              <td>{{printFormDataMap["宽度"]["腋下--髂嵴"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>锁骨髂嵴连线</td>
              <td colspan="2">{{printFormDataMap["高度"]["锁骨--髂嵴连线"]}}</td>
              <td>髂嵴连线耻骨联合</td>
              <td colspan="2">{{printFormDataMap["高度"]["髂嵴连线--耻骨联合"]}}</td>
              <td>颈7髂嵴连线</td>
              <td colspan="2">{{printFormDataMap["高度"]["颈7--髂嵴连线"]}}</td>
              <td>髂嵴连线骶骨</td>
              <td>{{printFormDataMap["高度"]["髂嵴连线--骶骨"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="3">骨盆轴线与身体轴线水平</td>
              <td colspan="3">腰椎无过伸</td>
              <td colspan="3">塑出髂脊形状</td>
              <td colspan="2">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">骨盆</td>
              <td class="border-b background-y">力点</td>
              <td class="border-b background-y">形状</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>髂嵴左右对称</td>
              <td>表面平整，无凹凸不平</td>
              <td>压力点位置合适</td>
              <td>下颌骨形状合适</td>
              <td>髋围增加：5-6cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>矢状面</td>
              <td rowspan="2">形状符合</td>
              <td>骨盆左右对称</td>
              <td>受力点合适</td>
              <td>头部形状合适</td>
              <td>胸围增加:3-5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>斜颈左右相符</td>
              <td>水平面</td>
              <td>腋下高低对称</td>
              <td>释放空间要够</td>
              <td>骨盆形状合适</td>
              <td>宽度增加：0-1cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td>平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>前开口</td>
              <td>板材薄厚均匀</td>
              <td>{{}}</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">力点</td>
              <td class="border-b background-y" colspan="2">方扣、带子</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>支具与订单姓名一致</td>
              <td>表面平整，无凹凸不平</td>
              <td>压力点位置合适</td>
              <td>带子长短合适</td>
              <td>位置合适</td>
              <td>胸围增加:5-6cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>形状符合</td>
              <td>受力点合适</td>
              <td>方扣三个</td>
              <td>结实、齐全</td>
              <td>宽度增加：3-5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>斜颈左右相符</td>
              <td>无毛刺</td>
              <td>腋下高低对称</td>
              <td>带子三个</td>
              <td>子母扣平整</td>
              <td>宽度增加：0-1cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">外观要求</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y">交付时间</td>
              <td class="border-b background-y">铆钉要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td rowspan="3">打透气孔，无毛刺</td>
              <td rowspan="3">表面洁净，光滑</td>
              <td rowspan="3">结实、位置上对</td>
              <td rowspan="3">20~30分钟</td>
              <td rowspan="3">结实、平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_4">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子地面</td>
              <td>{{printFormDataMap["高度"]["大转子--地面"]}}</td>
              <td>会阴地面</td>
              <td>{{printFormDataMap["高度"]["会阴--地面"]}}</td>
              <td>髌中心地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <!-- <td>会阴地面</td>
              <td colspan="2">{{}}</td>-->
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="2">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">膝关节</td>
              <td class="border-b background-y">踝关节</td>
              <td class="border-b background-y" colspan="2">足部要求</td>
            </tr>
            <tr>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td rowspan="3">形状符合</td>
              <td>动踝高低一致</td>
              <td>足型一致</td>
              <td>翘度一致</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>单侧左右相符</td>
              <td>内外平行</td>
              <td>足弓位置一致</td>
              <td>1cm≤翘度≤1.5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>翻边一致</td>
              <td>上下垂直</td>
              <td colspan="2">受力点合适</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td class="background-y">尺寸要求</td>
              <td>会阴围长增加：1-2cm</td>
              <td>膝关节围长增加：1-2cm</td>
              <td>膝关节宽度增加：0.5-1cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
              <td>足长增加：1-1.5cm</td>
              <td colspan="2">足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td>平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>板材薄厚均匀</td>
              <td colspan="2">捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子地面</td>
              <td>{{printFormDataMap["高度"]["大转子--地面"]}}</td>
              <td>会阴地面</td>
              <td>{{printFormDataMap["高度"]["会阴--地面"]}}</td>
              <td>髌中心地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <!-- <td>会阴地面</td>
              <td colspan="2">{{}}</td>-->
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="2">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="3" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">铰链</td>
              <td class="border-b background-y">踝关节</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y" colspan="2">螺丝</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="2">额状面</td>
              <td>表面光滑，平顺</td>
              <td>膝关节铰链高低一样</td>
              <td>踝关节活动灵活</td>
              <td>方扣、带子位置合适</td>
              <td colspan="2">内侧螺丝不要过长</td>
            </tr>
            <tr>
              <td>左右脚正确</td>
              <td>无凸凹不平</td>
              <td>内外平行</td>
              <td>开缝&lt;0.3cm</td>
              <td>结实</td>
              <td colspan="2">螺丝长短合适，上紧</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td rowspan="2">矢状面</td>
              <td>横线直、弧线顺</td>
              <td>上下垂直</td>
              <td>缝隙要直</td>
              <td>齐全</td>
              <td colspan="2">内侧螺丝不要过长</td>
            </tr>
            <tr>
              <td rowspan="2">支具与订单姓名一致</td>
              <td>无毛刺</td>
              <td>锁开闭灵活</td>
              <td rowspan="5">无毛刺</td>
              <td>左右正确</td>
              <td rowspan="5" colspan="2">子母扣钉子处不能有毛刺，要平整</td>
            </tr>
            <tr>
              <td rowspan="3" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">水平面</td>
              <td>长短、高低一致</td>
              <td>同轴</td>
              <td>子母扣长短合适</td>
            </tr>
            <tr>
              <td>两腿型一致</td>
              <td>形状对称</td>
              <td>支条长短、孔距一致</td>
              <td>子母扣平整</td>
            </tr>
            <tr>
              <td>两足型一致</td>
              <td></td>
              <td>粗细一致</td>
              <td>支条边缘光滑</td>
              <td>方扣四个</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>单侧左右相符</td>
              <td></td>
              <td></td>
              <td>内孔无毛刺</td>
              <td>带子四根</td>
            </tr>
            <tr>
              <td class="border-b background-y">尺寸要求</td>
              <td>大转子-髌中心</td>
              <td>髌中心-地面</td>
              <td>会阴到髌中心</td>
              <td>膝关节宽度增加：1-1.5cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
              <td>足长增加：1-1.5cm</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_5">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="3">{{printFormDataMap["足部"]["足宽"]}}</td>
              <td>取型人员</td>
              <td colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="3">足内外翻中立位</td>
              <td colspan="3">内外旋中立位</td>
              <td colspan="3">踝关节90度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">尺寸要求</td>
              <td class="border-b background-y" colspan="2">足部要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>足长增加：1-1.5cm</td>
              <td>足型一致</td>
              <td>足弓位置一致</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">符合订单要求</td>
              <td rowspan="2">水平面</td>
              <td rowspan="2">形状相符</td>
              <td rowspan="2">足宽增加：0-0.3cm</td>
              <td rowspan="2" colspan="2">受力点合适</td>
            </tr>
            <tr>
              <td></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">信息</td>
              <td rowspan="2" class="border-b background-y">板材</td>
              <td rowspan="2" class="border-b background-y">烘箱</td>
              <td rowspan="2" class="border-b background-y">真空泵</td>
              <td rowspan="2" class="border-b background-y">纱套</td>
              <td rowspan="2" class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">符合订单要求</td>
              <td rowspan="2">板材薄厚要均匀</td>
              <td rowspan="2">120&lt;温度&lt;150</td>
              <td rowspan="2">服帖</td>
              <td rowspan="2">平整无褶皱</td>
              <td rowspan="2">成型表面平整</td>
            </tr>
            <tr>
              <td></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">足弓</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>姓名一致</td>
              <td>足弓高度一致</td>
              <td>无开胶</td>
              <td>足长增加：1-1.5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>单侧左右相符</td>
              <td rowspan="2">横弓高低、大小一致</td>
              <td>宽窄一致</td>
              <td rowspan="2">足宽增加：0-0.3cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>形状一致</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">形状一致</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
              <td rowspan="2">20~30分钟</td>
            </tr>
            <tr>
              <td></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_6">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>膝关节围长</td>
              <td colspan="3">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="3">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>髌韧带地面</td>
              <td colspan="3">{{printFormDataMap["高度"]["髌韧带--地面"]}}</td>
              <td>髌中心地面</td>
              <td colspan="3">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="3">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">膝关节</td>
              <td class="border-b background-y" colspan="2">足部要求</td>
              <td class="border-b background-y" colspan="2">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td>形状符合</td>
              <td>足型一致</td>
              <td>翘度一致</td>
              <td>膝关节围长增加：1-2cm</td>
              <td>膝关节宽度增加：0.5-1cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>单侧左右相符</td>
              <td rowspan="2">髌骨上沿宽度：2-2.5cm</td>
              <td>足弓位置一致</td>
              <td>1cm≤翘度≤1.5cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
              <td>高度±1cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>翻边一致</td>
              <td colspan="2">受力点合适</td>
              <td>足长增加：1-1.5cm</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：3-4cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">姓名一致</td>
              <td>高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>膝关节围长</td>
              <td colspan="3">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="3">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>髌韧带地面</td>
              <td colspan="3">{{printFormDataMap["高度"]["髌韧带--地面"]}}</td>
              <td>髌中心地面</td>
              <td colspan="3">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="3">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y" colspan="2">尺寸要求</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="2">额状面</td>
              <td>表面光滑，平顺</td>
              <td>方扣、带子位置合适</td>
              <td rowspan="2">膝关节围长增加：2-3cm</td>
              <td rowspan="2">膝关节宽度增加：0.5-1cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>无凸凹不平</td>
              <td>结实、齐全</td>
            </tr>
            <tr>
              <td rowspan="2">支具与订单姓名一致</td>
              <td rowspan="2">矢状面</td>
              <td>横线直、弧线顺</td>
              <td>左右正确</td>
              <td rowspan="2">踝关节宽度增加：1-1.5cm</td>
              <td rowspan="2">高度±1cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>无毛刺</td>
              <td>子母扣长短合适</td>
            </tr>
            <tr>
              <td>单侧左右相符</td>
              <td rowspan="3">水平面</td>
              <td>长短、高低一致</td>
              <td>子母扣平整</td>
              <td rowspan="3">足长增加：1-1.5cm</td>
              <td rowspan="3">足宽增加：0-0.3cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>两腿型一致</td>
              <td>形状对称</td>
              <td>方扣两个</td>
            </tr>
            <tr>
              <td>两足型一致</td>

              <td>粗细一致</td>
              <td>带子两根</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
            </tr>
            <tr>
              <td></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_7">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>膝关节围长</td>
              <td colspan="3">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="3">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>髌韧带地面</td>
              <td colspan="7">{{printFormDataMap["高度"]["髌韧带--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="3">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="2">阴型无变形</td>
              <td>角度要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">膝关节</td>
              <td class="border-b background-y" colspan="2">足部要求</td>
              <td class="border-b background-y" colspan="2">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td rowspan="3">形状符合</td>
              <td>足型一致</td>
              <td>翘度一致</td>
              <td>膝关节围长增加：1-2cm</td>
              <td>膝关节宽度增加：0.5-1cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>单侧左右相符</td>
              <td>足弓位置一致</td>
              <td>1cm≤翘度≤1.5cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
              <td>高度±1cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>翻边一致</td>
              <td>脚面形状一致</td>
              <td>受力点合适</td>
              <td>足长增加：1-1.5cm</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：3-4cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">姓名一致</td>
              <td>高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>膝关节围长</td>
              <td colspan="3">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="3">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>髌韧带地面</td>
              <td colspan="7">{{printFormDataMap["高度"]["髌韧带--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="3">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y" colspan="2">尺寸要求</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="2">额状面</td>
              <td>表面光滑，平顺</td>
              <td>方扣、带子位置合适</td>
              <td rowspan="2">膝关节围长增加：2-3cm</td>
              <td rowspan="2">膝关节宽度增加：0.5-1cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>无凸凹不平</td>
              <td>结实、齐全</td>
            </tr>
            <tr>
              <td rowspan="2">支具与订单姓名一致</td>
              <td rowspan="2">矢状面</td>
              <td>横线直、弧线顺</td>
              <td>左右正确</td>
              <td rowspan="2">踝关节宽度增加：1-1.5cm</td>
              <td rowspan="2">高度±1cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>无毛刺</td>
              <td>子母扣长短合适</td>
            </tr>
            <tr>
              <td>单侧左右相符</td>
              <td rowspan="3">水平面</td>
              <td>长短、高低一致</td>
              <td>子母扣平整</td>
              <td rowspan="3">足长增加：1-1.5cm</td>
              <td rowspan="3">足宽增加：0-0.3cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>两腿型一致</td>
              <td>形状对称</td>
              <td>方扣两个</td>
            </tr>
            <tr>
              <td>两足型一致</td>
              <td>粗细一致</td>
              <td>带子三根</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
            </tr>
            <tr>
              <td></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_8">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>膝关节围长</td>
              <td colspan="3">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="3">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>髌韧带地面</td>
              <td colspan="7">{{printFormDataMap["高度"]["髌韧带--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="3">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="5" class="border-b first-tr">修型(工号)</td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">膝关节</td>
              <td class="border-b background-y">踝关节</td>
              <td class="border-b background-y" colspan="2">足部要求</td>
              <td class="border-b background-y" colspan="2">尺寸要求</td>
            </tr>
            <tr>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td rowspan="3">形状符合</td>
              <td>动踝高低一致</td>
              <td>足型一致</td>
              <td>翘度一致</td>
              <td>膝关节围长增加：1-2cm</td>
              <td>膝关节宽度增加：0.5-1cm</td>
            </tr>
            <tr>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>单侧左右相符</td>
              <td>内外平行</td>
              <td>足弓位置一致</td>
              <td>1cm≤翘度≤1.5cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
              <td>高度±1cm</td>
            </tr>
            <tr>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>翻边一致</td>
              <td>上下垂直</td>
              <td colspan="2">受力点合适</td>
              <td>足长增加：1-1.5cm</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：3-4cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检测
                <br />(签字)
              </td>
              <td rowspan="2">姓名一致</td>
              <td>高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>膝关节围长</td>
              <td colspan="3">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="3">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>髌韧带地面</td>
              <td colspan="7">{{printFormDataMap["高度"]["髌韧带--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="3">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">螺丝</td>
              <td class="border-b background-y">踝关节</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="2">额状面</td>
              <td>表面光滑，平顺</td>
              <td>螺丝长短合适，上紧</td>
              <td>踝关节活动灵活</td>
              <td>方扣、带子位置合适</td>
              <td>膝关节围长增加：1-2cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>左右脚正确</td>
              <td>无凸凹不平</td>
              <td rowspan="6">子母扣钉子处不能有毛刺，要平整</td>
              <td>开缝&lt;0.3cm</td>
              <td>结实、齐全</td>
              <td>膝关节宽度增加：0.5-1cm</td>
            </tr>
            <tr>
              <td>符合订单要求</td>
              <td rowspan="2">矢状面</td>
              <td>横线直、弧线顺</td>
              <td>缝隙要直</td>
              <td>左右正确</td>
              <td>踝关节宽度增加：1-1.5cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr">
                检测
                <br />(签字)
              </td>
              <td>支具与订单姓名一致</td>
              <td>无毛刺</td>
              <td rowspan="4">无毛刺</td>
              <td>子母扣长短合适</td>
              <td>高度±1cm</td>
            </tr>
            <tr>
              <td>单侧左右相符</td>
              <td rowspan="3">水平面</td>
              <td>长短、高低一致</td>
              <td>子母扣平整</td>
              <td>足长增加：1-1.5cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>两腿型一致</td>
              <td>形状对称</td>
              <td>方扣两个</td>
              <td rowspan="2">足宽增加：0-0.3cm</td>
            </tr>
            <tr>
              <td>两足型一致</td>
              <td>粗细一致</td>
              <td>带子二根</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检测
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
            </tr>
            <tr>
              <td></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_9">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td colspan="2">会阴围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td colspan="2">膝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td colspan="2">小腿最粗围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td colspan="6">膝关节宽度</td>
              <td colspan="6">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["大转子--髌中心"]}}</td>
              <td>髌中心外踝</td>
              <td>{{printFormDataMap["高度"]["髌中心--外踝"]}}</td>
              <td>大转子外踝</td>
              <td colspan="2">{{printFormDataMap["高度"]["大转子--外踝"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">后腘窝与髌骨平行</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">阴型无变形</td>
              <td colspan="2">膝关节屈曲5度</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">膝关节</td>
              <td class="border-b background-y" colspan="2">尺寸要求</td>
            </tr>
            <tr>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td rowspan="2">髌骨与腘窝平行</td>
              <td>大腿围长增加：1-1.5cm</td>
              <td>小腿围长增加：1-1.5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>单侧左右相符</td>
              <td>膝关节围长增加：1-2cm</td>
              <td>膝关节宽度增加：0.5-1cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">符合订单要求</td>
              <td rowspan="2">水平面</td>
              <td rowspan="2">高低位置合适</td>
              <td rowspan="2">翻边一致</td>
              <td rowspan="2">髌骨上沿、内髁上沿宽度：4-5cm</td>
              <td colspan="2" rowspan="2">长度±1cm</td>
            </tr>
            <tr>
              <td></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td>平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>板材薄厚均匀</td>
              <td colspan="2">捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td colspan="2">会阴围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td colspan="2">膝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td colspan="2">小腿最粗围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td colspan="6">膝关节宽度</td>
              <td colspan="6">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["大转子--髌中心"]}}</td>
              <td>髌中心外踝</td>
              <td>{{printFormDataMap["高度"]["髌中心--外踝"]}}</td>
              <td>大转子外踝</td>
              <td colspan="2">{{printFormDataMap["高度"]["大转子--外踝"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">后腘窝与髌骨平行</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">阴型无变形</td>
              <td colspan="2">膝关节屈曲5度</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">支条</td>
              <td class="border-b background-y">螺丝</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="3">额状面</td>
              <td>表面光滑，平顺</td>
              <td>支条位置前后合适</td>
              <td>螺丝长短合适，上紧</td>
              <td>方扣、带子位置合适</td>
              <td rowspan="7">长度±1cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td rowspan="2">符合订单要求</td>
              <td>无凸凹不平</td>
              <td>两腿支条位置对称</td>
              <td>子母扣钉子处不能有毛刺</td>
              <td>结实</td>
            </tr>
            <tr>
              <td>横线直、弧线顺</td>
              <td>边缘光滑</td>
              <td rowspan="5">平整</td>
              <td>齐全</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>支具与订单姓名一致</td>
              <td rowspan="2">矢状面</td>
              <td>无毛刺</td>
              <td>长短一致</td>
              <td>左右正确</td>
            </tr>
            <tr>
              <td>单侧左右相符</td>
              <td>宽窄、长短、高低一致</td>
              <td>孔距一致</td>
              <td>子母扣平整</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td rowspan="2">两腿型一致</td>
              <td rowspan="2">水平面</td>
              <td>形状对称</td>
              <td rowspan="2">内孔无毛刺</td>
              <td>方扣两个</td>
            </tr>
            <tr>
              <td>粗细一致</td>
              <td>带子三根</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">支条</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">对称</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_10">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>小腿最粗围长</td>
              <td>{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>股骨中段围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>踝关节围长</td>
              <td>{{printFormDataMap["围长"]["踝关节围长"]}}</td>
              <td>膝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td colspan="3">膝关节宽度</td>
              <td colspan="3">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td colspan="3">踝关节宽度</td>
              <td colspan="3">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td colspan="2">会阴--髌中心</td>
              <td colspan="3">{{printFormDataMap["高度"]["会阴--髌中心"]}}</td>
              <td colspan="2">大转子--踝上</td>
              <td colspan="3">{{printFormDataMap["高度"]["大转子--踝上"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="5">膝关节屈曲5度</td>
              <td colspan="5">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">膝关节</td>
              <td class="border-b background-y" colspan="2">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td rowspan="4">形状符合、角度符合订单要求</td>
              <td>围长增加：2-5cm</td>
              <td>膝关节宽度增加：0.5-1cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>单侧左右相符</td>
              <td>宽度增加：0.5-1cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>翻边一致</td>
              <td>足长增加：1-1.5cm</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td>平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>小腿最粗围长</td>
              <td>{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>股骨中段围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>踝关节围长</td>
              <td>{{printFormDataMap["围长"]["踝关节围长"]}}</td>
              <td>膝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td colspan="3">膝关节宽度</td>
              <td colspan="3">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td colspan="3">踝关节宽度</td>
              <td colspan="3">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td colspan="2">会阴--髌中心</td>
              <td colspan="3">{{printFormDataMap["高度"]["会阴--髌中心"]}}</td>
              <td colspan="2">大转子--踝上</td>
              <td colspan="3">{{printFormDataMap["高度"]["大转子--踝上"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="5">膝关节屈曲5度</td>
              <td colspan="5">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">铰链</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="3">额状面</td>
              <td>表面光滑，平顺</td>
              <td>膝关节铰链高低一致</td>
              <td>围长增加：2-3cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td rowspan="2">符合订单要求</td>
              <td>无凸凹不平</td>
              <td>内外平行</td>
              <td>大转子-髌中心</td>
            </tr>
            <tr>
              <td>横线直、弧线顺</td>
              <td>上下垂直</td>
              <td>踝关节宽度增加：1-1.5cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>支具与订单姓名一致</td>
              <td rowspan="2">矢状面</td>
              <td>无毛刺</td>
              <td>锁开闭灵活、同轴</td>
              <td>髌中心-地面</td>
            </tr>
            <tr>
              <td>单侧左右相符</td>
              <td>宽窄、长短、高低一致</td>
              <td>支条长短、孔距一致</td>
              <td>膝关节宽度增加：0.5-1cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td rowspan="2">两腿型一致</td>
              <td rowspan="2">水平面</td>
              <td>形状对称</td>
              <td>支条边缘光滑</td>
              <td rowspan="2">会阴到髌中心</td>
            </tr>
            <tr>
              <td>粗细一致</td>
              <td>内孔无毛刺</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">支条</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">对称</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_11">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子地面</td>
              <td>{{printFormDataMap["高度"]["大转子--地面"]}}</td>
              <td>会阴地面</td>
              <td>{{printFormDataMap["高度"]["会阴--地面"]}}</td>
              <td>髌中心地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="2">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">膝关节</td>
              <td class="border-b background-y" colspan="2">足部要求</td>
            </tr>
            <tr>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td rowspan="3">形状符合</td>
              <td>足型一致</td>
              <td>翘度一致</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>单侧左右相符</td>
              <td>足弓位置一致</td>
              <td>1cm≤翘度≤1.5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>翻边一致</td>
              <td colspan="2">受力点合适</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td class="background-y">尺寸要求</td>
              <td>会阴围长增加：1-2cm</td>
              <td>膝关节围长增加：1-2cm</td>
              <td>膝关节宽度增加：0.5-1cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
              <td colspan="2">足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子地面</td>
              <td>{{printFormDataMap["高度"]["大转子--地面"]}}</td>
              <td>会阴地面</td>
              <td>{{printFormDataMap["高度"]["会阴--地面"]}}</td>
              <td>髌中心地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="2">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="3" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y" colspan="2">尺寸要求</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="2">额状面</td>
              <td>表面光滑，平顺</td>
              <td>方扣、带子位置合适</td>
              <td colspan="2">大转子-髌中心</td>
            </tr>
            <tr>
              <td>左右脚正确</td>
              <td>无凸凹不平</td>
              <td>结实</td>
              <td colspan="2">髌中心-地面</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td rowspan="2">矢状面</td>
              <td>横线直、弧线顺</td>
              <td>齐全</td>
              <td colspan="2">会阴到髌中心</td>
            </tr>
            <tr>
              <td rowspan="2">支具与订单姓名一致</td>
              <td>无毛刺</td>
              <td>左右正确</td>
              <td colspan="2">膝关节宽度增加：1-1.5cm</td>
            </tr>
            <tr>
              <td rowspan="3" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="4">水平面</td>
              <td>长短、高低一致</td>
              <td>子母扣长短合适</td>
              <td colspan="2">围长增加：2-3cm</td>
            </tr>
            <tr>
              <td>两腿型一致</td>
              <td>形状对称</td>
              <td>子母扣平整</td>
              <td colspan="2">踝关节宽度增加：1-1.5cm</td>
            </tr>
            <tr>
              <td>两足型一致</td>

              <td rowspan="2">粗细一致</td>
              <td>方扣四个</td>
              <td colspan="2">足长增加：1-1.5cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>单侧左右相符</td>
              <td>带子四根</td>
              <td colspan="2">足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_12">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子地面</td>
              <td>{{printFormDataMap["高度"]["大转子--地面"]}}</td>
              <td>会阴地面</td>
              <td>{{printFormDataMap["高度"]["会阴--地面"]}}</td>
              <td>髌中心地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="2">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">膝关节</td>
              <td class="border-b background-y" colspan="2">足部要求</td>
            </tr>
            <tr>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td rowspan="3">形状符合</td>
              <td>足型一致</td>
              <td>翘度一致</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>单侧左右相符</td>
              <td>足弓位置一致</td>
              <td>1cm≤翘度≤1.5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>翻边一致</td>
              <td colspan="2">受力点合适</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td class="background-y">尺寸要求</td>
              <td>会阴围长增加：1-2cm</td>
              <td>膝关节围长增加：1-2cm</td>
              <td>膝关节宽度增加：0.5-1cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
              <td colspan="2">足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子地面</td>
              <td>{{printFormDataMap["高度"]["大转子--地面"]}}</td>
              <td>会阴地面</td>
              <td>{{printFormDataMap["高度"]["会阴--地面"]}}</td>
              <td>髌中心地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="2">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="3" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y">尺寸要求</td>
              <td class="border-b background-y">螺丝</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="2">额状面</td>
              <td>表面光滑，平顺</td>
              <td>方扣、带子位置合适</td>
              <td>大转子-髌中心</td>
              <td>内侧螺丝合适</td>
            </tr>
            <tr>
              <td>左右脚正确</td>
              <td>无凸凹不平</td>
              <td>结实</td>
              <td>髌中心-地面</td>
              <td>螺丝长短合适，上紧</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td rowspan="2">矢状面</td>
              <td>横线直、弧线顺</td>
              <td>齐全</td>
              <td>会阴到髌中心</td>
              <td rowspan="7">子母扣钉子处不能有毛刺，要平整</td>
            </tr>
            <tr>
              <td rowspan="2">支具与订单姓名一致</td>
              <td>无毛刺</td>
              <td>左右正确</td>
              <td>膝关节宽度增加：1-1.5cm</td>
            </tr>
            <tr>
              <td rowspan="3" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="4">水平面</td>
              <td>长短、高低一致</td>
              <td>子母扣长短合适</td>
              <td>围长增加：2-3cm</td>
            </tr>
            <tr>
              <td>两腿型一致</td>
              <td>形状对称</td>
              <td>子母扣平整</td>
              <td>踝关节宽度增加：1-1.5cm</td>
            </tr>
            <tr>
              <td>两足型一致</td>

              <td rowspan="2">粗细一致</td>
              <td>方扣四个</td>
              <td>足长增加：1-1.5cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>单侧左右相符</td>
              <td>带子四根</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_13">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>小腿最粗围长</td>
              <td>{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>股骨中段围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>踝关节围长</td>
              <td>{{printFormDataMap["围长"]["踝关节围长"]}}</td>
              <td>膝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td colspan="3">膝关节宽度</td>
              <td colspan="3">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td colspan="3">踝关节宽度</td>
              <td colspan="3">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td colspan="2">会阴--髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["会阴--髌中心"]}}</td>
              <td>大转子--踝上</td>
              <td colspan="2">{{printFormDataMap["高度"]["大转子--踝上"]}}</td>
              <td>大转子--髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["大转子--髌中心"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="5">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="5">膝关节屈曲5度</td>
              <td colspan="5">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">膝关节</td>
              <td class="border-b background-y" colspan="2">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td rowspan="4">形状符合、角度符合订单要求</td>
              <td>围长增加：2-5cm</td>
              <td>膝关节宽度增加：0.5-1cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>单侧左右相符</td>
              <td>宽度增加：0.5-1cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>翻边一致</td>
              <td>足长增加：1-1.5cm</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td>平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长 "]}}</td>
              <td>小腿最粗围长</td>
              <td>{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>股骨中段围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>踝关节围长</td>
              <td>{{printFormDataMap["围长"]["踝关节围长"]}}</td>
              <td>膝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td colspan="3">膝关节宽度</td>
              <td colspan="3">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td colspan="3">踝关节宽度</td>
              <td colspan="3">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td colspan="2">会阴--髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["会阴--髌中心"]}}</td>
              <td>大转子--踝上</td>
              <td colspan="2">{{printFormDataMap["高度"]["大转子--踝上"]}}</td>
              <td>大转子--髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["大转子--髌中心"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="5">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="5">膝关节屈曲5度</td>
              <td colspan="5">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y">铰链</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="3">额状面</td>
              <td>表面光滑，平顺</td>
              <td>方扣、带子位置合适</td>
              <td>膝关节铰链高低一致</td>
              <td>围长增加：2-3cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td rowspan="2">符合订单要求</td>
              <td>无凸凹不平</td>
              <td>结实、齐全</td>
              <td>内外平行</td>
              <td>大转子-髌中心</td>
            </tr>
            <tr>
              <td>横线直、弧线顺</td>
              <td>左右正确</td>
              <td>上下垂直</td>
              <td>踝关节宽度增加：1-1.5cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>支具与订单姓名一致</td>
              <td rowspan="2">矢状面</td>
              <td>无毛刺</td>
              <td>子母扣长短合适</td>
              <td>锁开闭灵活、同轴</td>
              <td>髌中心-地面</td>
            </tr>
            <tr>
              <td>单侧左右相符</td>
              <td>宽窄、长短、高低一致</td>
              <td>子母扣平整</td>
              <td>支条长短、孔距一致</td>
              <td>膝关节宽度增加：0.5-1cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td rowspan="2">两腿型一致</td>
              <td rowspan="2">水平面</td>
              <td>形状对称</td>
              <td>方扣四个</td>
              <td>支条边缘光滑</td>
              <td rowspan="2">会阴到髌中心</td>
            </tr>
            <tr>
              <td>粗细一致</td>
              <td>带子四根</td>
              <td>内孔无毛刺</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">支条</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">对称</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_14">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子地面</td>
              <td>{{printFormDataMap["高度"]["大转子--地面"]}}</td>
              <td>会阴地面</td>
              <td>{{printFormDataMap["高度"]["会阴--地面"]}}</td>
              <td>髌中心地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="2">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">膝关节</td>
              <td class="border-b background-y" colspan="2">足部要求</td>
            </tr>
            <tr>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td rowspan="3">形状符合</td>
              <td>足型一致</td>
              <td>翘度一致</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>单侧左右相符</td>
              <td>足弓位置一致</td>
              <td>1cm≤翘度≤1.5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>翻边一致</td>
              <td colspan="2">受力点合适</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td class="background-y">尺寸要求</td>
              <td>会阴围长增加：1-2cm</td>
              <td>膝关节围长增加：1-2cm</td>
              <td>膝关节宽度增加：0.5-1cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
              <td colspan="2">足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子地面</td>
              <td>{{printFormDataMap["高度"]["大转子--地面"]}}</td>
              <td>会阴地面</td>
              <td>{{printFormDataMap["高度"]["会阴--地面"]}}</td>
              <td>髌中心地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="2">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="3" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">铰链</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y">尺寸要求</td>
              <td class="border-b background-y">螺丝</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="2">额状面</td>
              <td>表面光滑，平顺</td>
              <td>膝关节铰链高低一样</td>
              <td>方扣、带子位置合适</td>
              <td>大转子-髌中心</td>
              <td>内侧螺丝合适</td>
            </tr>
            <tr>
              <td>左右脚正确</td>
              <td>无凸凹不平</td>
              <td>内外平行</td>
              <td>结实</td>
              <td>髌中心-地面</td>
              <td>螺丝长短合适，上紧</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td rowspan="2">矢状面</td>
              <td>横线直、弧线顺</td>
              <td>上下垂直</td>
              <td>齐全</td>
              <td>会阴到髌中心</td>
              <td rowspan="6">子母扣钉子处不能有毛刺，要平整</td>
            </tr>
            <tr>
              <td rowspan="2">支具与订单姓名一致</td>
              <td>无毛刺</td>
              <td>锁开闭灵活</td>
              <td>左右正确</td>
              <td>膝关节宽度增加：1-1.5cm</td>
            </tr>
            <tr>
              <td rowspan="3" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="4">水平面</td>
              <td>长短、高低一致</td>
              <td>同轴</td>
              <td>子母扣长短合适</td>
              <td>围长增加：2-3cm</td>
            </tr>
            <tr>
              <td>两腿型一致</td>
              <td>形状对称</td>
              <td>支条长短、孔距一致</td>
              <td>子母扣平整</td>
              <td>踝关节宽度增加：1-1.5cm</td>
            </tr>
            <tr>
              <td>两足型一致</td>
              <td rowspan="2">粗细一致</td>
              <td>支条边缘光滑</td>
              <td>方扣四个</td>
              <td>足长增加：1-1.5cm</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>单侧左右相符</td>
              <td>内孔无毛刺</td>
              <td>带子四根</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_15">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td colspan="2">腰围</td>
              <td colspan="2">{{printFormDataMap["围长"]["腰围"]}}</td>
              <td colspan="2">髋围</td>
              <td colspan="3">{{printFormDataMap["围长"]["髋围"]}}</td>
              <td>取型人员</td>
              <td>{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>髂嵴--地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["髂嵴--地面"]}}</td>
              <td>大转子--外踝</td>
              <td colspan="3">{{printFormDataMap["高度"]["大转子--外踝"]}}</td>
              <td>大转子--地面</td>
              <td colspan="3">{{printFormDataMap["高度"]["大转子--地面"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="11">尺寸准确</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y">铰链</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y" colspan="2">基本要求</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>方扣、带子位置合适</td>
              <td>铰链高低一致</td>
              <td rowspan="3">水平面</td>
              <td>支具与订单姓名一致</td>
              <td>子母扣处无毛刺</td>
              <td>足长：髂嵴--大转子减2cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">子母扣长短合适</td>
              <td>内外平行</td>

              <td rowspan="2">长短、高低一致</td>
              <td rowspan="2">子母扣要平整</td>
              <td rowspan="2">足宽：大转子-髌中心加2cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>

              <td>上下垂直</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">外观要求</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y">交付时间</td>
              <td class="border-b background-y">铆钉要求</td>
              <td class="border-b background-y">尺寸要求</td>
              <td class="border-b background-y">角度</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td rowspan="3">打透气孔，无毛刺</td>
              <td rowspan="3">表面洁净，光滑</td>
              <td rowspan="3">结实、位置上对</td>
              <td rowspan="3">20~30分钟</td>
              <td rowspan="3">结实、平整</td>
              <td rowspan="3">脚大小一致（0.3cm内）</td>
              <td rowspan="3">角度符合订单要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_16">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>坐骨地面</td>
              <td>{{printFormDataMap["高度"]["坐骨地面"]}}</td>
              <td>会阴地面</td>
              <td>{{printFormDataMap["高度"]["会阴--地面"]}}</td>
              <td>髌中心地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="2">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y" colspan="2">腿型</td>
              <td class="border-b background-y" colspan="2">足部要求</td>
            </tr>
            <tr>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td colspan="2">膝关节形状符合</td>
              <td colspan="2">符合足弓形状</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td rowspan="2">高低位置合适</td>
              <td colspan="2" rowspan="2">单侧左右相符</td>
              <td colspan="2">1cm≤翘度≤1.5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td colspan="2">受力点合适</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td class="background-y">尺寸要求</td>
              <td>会阴围长增加：1-2cm</td>
              <td>膝关节围长增加：1-2cm</td>
              <td>膝关节宽度增加：0.5-1cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
              <td>足长增加：1-1.5cm</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>坐骨地面</td>
              <td>{{printFormDataMap["高度"]["坐骨地面"]}}</td>
              <td>会阴地面</td>
              <td>{{printFormDataMap["高度"]["会阴--地面"]}}</td>
              <td>髌中心地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="2">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="3" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y">尺寸要求</td>
              <td class="border-b background-y">铰链</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="2">额状面</td>
              <td>表面光滑，平顺</td>
              <td>方扣、带子位置合适</td>
              <td>大转子-髌中心</td>
              <td>内孔无毛刺</td>
            </tr>
            <tr>
              <td>左右脚正确</td>
              <td>无凸凹不平</td>
              <td>结实</td>
              <td>髌中心-地面</td>
              <td>内外平行</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td rowspan="2">矢状面</td>
              <td>横线直、弧线顺</td>
              <td>齐全</td>
              <td>会阴到髌中心</td>
              <td>上下垂直</td>
            </tr>
            <tr>
              <td rowspan="2">支具与订单姓名一致</td>
              <td>无毛刺</td>
              <td>左右正确</td>
              <td>膝关节宽度增加：1-1.5cm</td>
              <td>锁开闭灵活</td>
            </tr>
            <tr>
              <td rowspan="3" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="4">水平面</td>
              <td>长短、高低一致</td>
              <td>子母扣长短合适</td>
              <td>围长增加：2-3cm</td>
              <td>同轴</td>
            </tr>
            <tr>
              <td>两腿型一致</td>
              <td>形状对称</td>
              <td>子母扣平整</td>
              <td>踝关节宽度增加：1-1.5cm</td>
              <td>支条长短、孔距均等</td>
            </tr>
            <tr>
              <td>两足型一致</td>

              <td rowspan="2">粗细一致</td>
              <td>方扣四个</td>
              <td>足长增加：1-1.5cm</td>
              <td rowspan="2">支条边缘光滑</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>单侧左右相符</td>
              <td>带子四根</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
              <td rowspan="2" class="border-b background-y">角度</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
              <td rowspan="2">角度符合订单要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_17">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子地面</td>
              <td>{{printFormDataMap["高度"]["大转子--地面"]}}</td>
              <td>会阴地面</td>
              <td>{{printFormDataMap["高度"]["会阴--地面"]}}</td>
              <td>髌中心地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="2">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="2">阴型无变形</td>
              <td>补高角度</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">膝关节</td>
              <td class="border-b background-y" colspan="2">足部要求</td>
            </tr>
            <tr>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td rowspan="3">形状符合</td>
              <td>足型一致</td>
              <td>翘度一致</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>单侧左右相符</td>
              <td>足弓位置一致</td>
              <td>1cm≤翘度≤1.5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>翻边一致</td>
              <td colspan="2">受力点合适</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td class="background-y">尺寸要求</td>
              <td>会阴围长增加：1-2cm</td>
              <td>膝关节围长增加：1-2cm</td>
              <td>膝关节宽度增加：0.5-1cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
              <td colspan="2">足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>膝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="5">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子地面</td>
              <td>{{printFormDataMap["高度"]["大转子--地面"]}}</td>
              <td>会阴地面</td>
              <td>{{printFormDataMap["高度"]["会阴--地面"]}}</td>
              <td>髌中心地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="3">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="2">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="2">内外旋中立位</td>
              <td colspan="2">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="2">阴型无变形</td>
              <td>补高角度</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="3" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y">尺寸要求</td>
              <td class="border-b background-y">螺丝</td>
              <td class="border-b background-y">铰链</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="2">额状面</td>
              <td>表面光滑，平顺</td>
              <td>方扣、带子位置合适</td>
              <td>大转子-髌中心</td>
              <td>内侧螺丝合适</td>
              <td>膝关节铰链高低一样</td>
            </tr>
            <tr>
              <td>左右脚正确</td>
              <td>无凸凹不平</td>
              <td>结实</td>
              <td>髌中心-地面</td>
              <td>螺丝长短合适，上紧</td>
              <td>内外平行</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td rowspan="2">矢状面</td>
              <td>横线直、弧线顺</td>
              <td>齐全</td>
              <td>会阴到髌中心</td>
              <td rowspan="7">子母扣钉子处不能有毛刺，要平整</td>
              <td>上下垂直</td>
            </tr>
            <tr>
              <td>支具与订单姓名一致</td>
              <td>无毛刺</td>
              <td>左右正确</td>
              <td>膝关节宽度增加：1-1.5cm</td>
              <td>锁开闭灵活</td>
            </tr>
            <tr>
              <td rowspan="3" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>补高尺寸合适</td>
              <td rowspan="4">水平面</td>
              <td>长短、高低一致</td>
              <td>子母扣长短合适</td>
              <td>围长增加：2-3cm</td>
              <td>同轴</td>
            </tr>
            <tr>
              <td>两腿型一致</td>
              <td>形状对称</td>
              <td>子母扣平整</td>
              <td>踝关节宽度增加：1-1.5cm</td>
              <td>支条长短、孔距一致</td>
            </tr>
            <tr>
              <td>两足型一致</td>

              <td rowspan="2">粗细一致</td>
              <td>方扣四个</td>
              <td>足长增加：1-1.5cm</td>
              <td>支条边缘光滑</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>单侧左右相符</td>
              <td>带子四根</td>
              <td>足宽增加：0-0.3cm</td>
              <td>内孔无毛刺</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_18">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>髋围</td>
              <td colspan="3">{{printFormDataMap["围长"]["髋围"]}}</td>
              <td>腰围</td>
              <td colspan="3">{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>取型人员</td>
              <td colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td colspan="2">髋宽</td>
              <td colspan="4">{{printFormDataMap["宽度"]["髋宽"]}}</td>
              <td>腰宽</td>
              <td colspan="4">{{printFormDataMap["宽度"]["腰宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>髂嵴连线--骶骨</td>
              <td colspan="3">{{printFormDataMap["高度"]["髂嵴连线--骶骨"]}}</td>
              <td>髂嵴连线--耻骨</td>
              <td colspan="3">{{printFormDataMap["高度"]["髂嵴连线--耻骨"]}}</td>
              <td>髂嵴连线向上</td>
              <td colspan="2">{{printFormDataMap["高度"]["髂嵴连线向上"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">骨盆轴线与身体轴线水平</td>
              <td colspan="3">腰椎无过伸</td>
              <td colspan="3">塑出髂脊形状</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">力点</td>
              <td class="border-b background-y">骨盆</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>压力点位置合适</td>
              <td>髂嵴左右对称</td>
              <td>髋围增加：4-5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">符合订单要求</td>
              <td>矢状面</td>
              <td>形状符合</td>
              <td rowspan="2">释放空间要够</td>
              <td rowspan="2">骨盆左右对称</td>
              <td rowspan="2">宽度增加：0-1cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>水平面</td>
              <td>高低对称</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：5-8cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>前开口</td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y" colspan="2">方扣、带子</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>支具与订单姓名一致</td>
              <td>表面平整，无凹凸不平</td>
              <td>带子长短合适</td>
              <td>位置合适</td>
              <td>胸围增加:3-5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>形状符合</td>
              <td>方扣三个</td>
              <td>结实、齐全</td>
              <td rowspan="2">宽度增加：0-1cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>斜颈左右相符</td>
              <td>无毛刺</td>
              <td>带子三个</td>
              <td>子母扣平整</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">结实、位置上对</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_19">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>髋围</td>
              <td colspan="2">{{printFormDataMap["围长"]["髋围"]}}</td>
              <td>腰围</td>
              <td colspan="2">{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>大腿围</td>
              <td>{{printFormDataMap["围长"]["大腿围"]}}</td>
              <td>取型人员</td>
              <td colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>臀宽</td>
              <td colspan="2">{{printFormDataMap["宽度"]["臀宽"]}}</td>
              <td>腰宽</td>
              <td colspan="1">{{printFormDataMap["宽度"]["腰宽"]}}</td>
              <td>上背宽</td>
              <td colspan="1">{{printFormDataMap["宽度"]["上背宽"]}}</td>
              <td>下背宽</td>
              <td colspan="1">{{printFormDataMap["宽度"]["下背宽"]}}</td>
              <td>膝间距</td>
              <td colspan="2">{{printFormDataMap["宽度"]["膝间距"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="6">角度符合要求</td>
              <td colspan="6">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">角度要求</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>外展角度</td>
              <td>髋围增加：4-5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">符合订单要求</td>
              <td>矢状面</td>
              <td>形状符合</td>
              <td rowspan="2">屈曲角度</td>
              <td rowspan="2">宽度增加：0-1cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>水平面</td>
              <td>高低对称</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">姓名一致</td>
              <td rowspan="2">高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td rowspan="2">保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y" colspan="2">方扣、带子</td>
              <td class="border-b background-y">尺寸要求</td>
              <td class="border-b background-y">力点</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>支具与订单姓名一致</td>
              <td>表面平整，无凹凸不平</td>
              <td>带子长短合适</td>
              <td>位置合适</td>
              <td>胸围增加:3-5cm</td>
              <td>压力点位置合适</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>形状符合</td>
              <td>方扣三个</td>
              <td>结实、齐全</td>
              <td rowspan="2">宽度增加：0-1cm</td>
              <td rowspan="2">受力点合适</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>斜颈左右相符</td>
              <td>无毛刺</td>
              <td>带子三个</td>
              <td>子母扣平整</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">结实、位置上对</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_20">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="4">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="14">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="14">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>腰围</td>
              <td>{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>髋围</td>
              <td>{{printFormDataMap["围长"]["髋围"]}}</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td>{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td>{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td colspan="2">髋宽</td>
              <td colspan="2">{{printFormDataMap["宽度"]["髋宽"]}}</td>
              <td colspan="2">膝关节宽度</td>
              <td colspan="2">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td colspan="3">踝关节宽度</td>
              <td colspan="3">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>髂嵴大转子</td>
              <td>{{printFormDataMap["高度"]["髂嵴--大转子"]}}</td>
              <td>大转子髌中心</td>
              <td>{{printFormDataMap["高度"]["大转子--髌中心"]}}</td>
              <td>髌中心踝上</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--踝上"]}}</td>
              <td>会阴髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["会阴--髌中心"]}}</td>
              <td rowspan="2" colspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="5">膝关节角度</td>
              <td colspan="5">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">膝关节</td>
            </tr>
            <tr>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td rowspan="3">形状符合</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>单侧左右相符</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>翻边一致</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td class="background-y">尺寸要求</td>
              <td>围长增加：2-5cm</td>
              <td>宽度增加：0.5-1cm</td>
              <td colspan="2">膝关节宽度增加：0.5-1cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="4">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="14">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="14">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>腰围</td>
              <td>{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>髋围</td>
              <td>{{printFormDataMap["围长"]["髋围"]}}</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td>{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td>{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td colspan="2">髋宽</td>
              <td colspan="2">{{printFormDataMap["宽度"]["髋宽"]}}</td>
              <td colspan="2">膝关节宽度</td>
              <td colspan="2">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td colspan="3">踝关节宽度</td>
              <td colspan="3">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>髂嵴大转子</td>
              <td>{{printFormDataMap["高度"]["髂嵴--大转子"]}}</td>
              <td>大转子髌中心</td>
              <td>{{printFormDataMap["高度"]["大转子--髌中心"]}}</td>
              <td>髌中心踝上</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--踝上"]}}</td>
              <td>会阴髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["会阴--髌中心"]}}</td>
              <td rowspan="2" colspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="5">膝关节角度</td>
              <td colspan="5">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="3" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">铰链</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y" colspan="2">螺丝</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="2">额状面</td>
              <td>表面光滑，平顺</td>
              <td>髋关节、膝关节铰链高低一致</td>
              <td>方扣、带子位置合适</td>
              <td colspan="2">内侧螺丝不要过长</td>
            </tr>
            <tr>
              <td>左右脚正确</td>
              <td>无凸凹不平</td>
              <td>内外平行</td>
              <td>结实</td>
              <td colspan="2">螺丝长短合适，上紧</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td rowspan="2">矢状面</td>
              <td>横线直、弧线顺</td>
              <td>上下垂直</td>
              <td>齐全</td>
              <td colspan="2">内侧螺丝不要过长</td>
            </tr>
            <tr>
              <td rowspan="2">支具与订单姓名一致</td>
              <td>无毛刺</td>
              <td rowspan="2">锁开闭灵活、同轴</td>
              <td>左右正确</td>
              <td rowspan="5" colspan="2">子母扣钉子处不能有毛刺，要平整</td>
            </tr>
            <tr>
              <td rowspan="3" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="4">水平面</td>
              <td>长短、高低一致</td>
              <td>子母扣长短合适</td>
            </tr>
            <tr>
              <td rowspan="2">两腿型一致</td>
              <td>形状对称</td>
              <td>支条长短、孔距一致</td>
              <td>子母扣平整</td>
            </tr>
            <tr>
              <td rowspan="2">粗细一致</td>
              <td>支条边缘光滑</td>
              <td>方扣六个</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>单侧左右相符</td>
              <td>内孔无毛刺</td>
              <td>带子六根</td>
            </tr>
            <tr>
              <td class="border-b background-y">尺寸要求</td>
              <td>髂嵴--大转子减2cm</td>
              <td>大转子-髌中心加2cm</td>
              <td>髌中心-踝上</td>
              <td>会阴到髌中心</td>
              <td>膝关节宽度增加：1-1.5cm</td>
              <td>围长增加：3-7cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
              <td rowspan="2" class="border-b background-y">角度</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
              <td rowspan="2">角度符合订单要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_21">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="4">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="14">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="14">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>腰围</td>
              <td>{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>髋围</td>
              <td>{{printFormDataMap["围长"]["髋围"]}}</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td>{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td>{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>髋宽</td>
              <td colspan="3">{{printFormDataMap["宽度"]["髋宽"]}}</td>
              <td>膝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子地面</td>
              <td>{{printFormDataMap["高度"]["大转子--地面"]}}</td>
              <td>髂嵴大转子</td>
              <td colspan="2">{{printFormDataMap["高度"]["髂嵴--大转子"]}}</td>
              <td>髌中心地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <td>会阴地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["会阴--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="4">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="5">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="3">内外旋中立位</td>
              <td colspan="3">踝关节90度</td>
              <td colspan="3">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">膝关节</td>
              <td class="border-b background-y">踝关节</td>
              <td class="border-b background-y" colspan="2">足部要求</td>
            </tr>
            <tr>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td rowspan="3">形状符合</td>
              <td>动踝高低一致</td>
              <td>足型一致</td>
              <td>翘度一致</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>单侧左右相符</td>
              <td>内外平行</td>
              <td>足弓位置一致</td>
              <td>1cm≤翘度≤1.5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>翻边一致</td>
              <td>上下垂直</td>
              <td colspan="2">受力点合适</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td class="background-y">尺寸要求</td>
              <td>会阴围长增加：1-2cm</td>
              <td>膝关节围长增加：1-2cm</td>
              <td>膝关节宽度增加：0.5-1cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
              <td>足长增加：1-1.5cm</td>
              <td colspan="2">足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td>平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>板材薄厚均匀</td>
              <td colspan="2">捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="4">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="14">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="14">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>腰围</td>
              <td>{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>髋围</td>
              <td>{{printFormDataMap["围长"]["髋围"]}}</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td>{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td>{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>髋宽</td>
              <td colspan="3">{{printFormDataMap["宽度"]["髋宽"]}}</td>
              <td>膝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子地面</td>
              <td>{{printFormDataMap["高度"]["大转子--地面"]}}</td>
              <td>髂嵴大转子</td>
              <td colspan="2">{{printFormDataMap["高度"]["髂嵴--大转子"]}}</td>
              <td>髌中心地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <td>会阴地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["会阴--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="4">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="5">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="3">内外旋中立位</td>
              <td colspan="3">踝关节90度</td>
              <td colspan="3">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="3" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">铰链</td>
              <td class="border-b background-y">踝关节</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y" colspan="2">螺丝</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="2">额状面</td>
              <td>表面光滑，平顺</td>
              <td>膝关节铰链高低一样</td>
              <td>踝关节活动灵活</td>
              <td>方扣、带子位置合适</td>
              <td colspan="2">内侧螺丝不要过长</td>
            </tr>
            <tr>
              <td>左右脚正确</td>
              <td>无凸凹不平</td>
              <td>内外平行</td>
              <td>开缝&lt;0.3cm</td>
              <td>结实</td>
              <td colspan="2">螺丝长短合适，上紧</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td rowspan="2">矢状面</td>
              <td>横线直、弧线顺</td>
              <td>上下垂直</td>
              <td>缝隙要直</td>
              <td>齐全</td>
              <td colspan="2">内侧螺丝不要过长</td>
            </tr>
            <tr>
              <td rowspan="2">支具与订单姓名一致</td>
              <td>无毛刺</td>
              <td>锁开闭灵活</td>
              <td rowspan="5">无毛刺</td>
              <td>左右正确</td>
              <td rowspan="5" colspan="2">子母扣钉子处不能有毛刺，要平整</td>
            </tr>
            <tr>
              <td rowspan="3" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">水平面</td>
              <td>长短、高低一致</td>
              <td>同轴</td>
              <td>子母扣长短合适</td>
            </tr>
            <tr>
              <td>两腿型一致</td>
              <td>形状对称</td>
              <td>支条长短、孔距一致</td>
              <td>子母扣平整</td>
            </tr>
            <tr>
              <td>两足型一致</td>
              <td></td>
              <td>粗细一致</td>
              <td>支条边缘光滑</td>
              <td>方扣四个</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>单侧左右相符</td>
              <td></td>
              <td></td>
              <td>内孔无毛刺</td>
              <td>带子四根</td>
            </tr>
            <tr>
              <td class="border-b background-y">尺寸要求</td>
              <td>大转子-髌中心</td>
              <td>髌中心-地面</td>
              <td>会阴到髌中心</td>
              <td>膝关节宽度增加：1-1.5cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
              <td>足长增加：1-1.5cm</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_22">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="4">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="14">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="14">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>腰围</td>
              <td>{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>髋围</td>
              <td>{{printFormDataMap["围长"]["髋围"]}}</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td>{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td>{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>髋宽</td>
              <td colspan="3">{{printFormDataMap["宽度"]["髋宽"]}}</td>
              <td>膝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子地面</td>
              <td>{{printFormDataMap["高度"]["大转子--地面"]}}</td>
              <td>髂嵴大转子</td>
              <td colspan="2">{{printFormDataMap["高度"]["髂嵴--大转子"]}}</td>
              <td>髌中心地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <td>会阴地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["会阴--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="6">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="6">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="3">内外旋中立位</td>
              <td colspan="3">踝关节90度</td>
              <td colspan="2">膝关节屈曲5度</td>
              <td colspan="2">阴型无变形</td>
              <td colspan="2">髋关节角度</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">髋膝关节</td>
              <td class="border-b background-y" colspan="2">足部要求</td>
            </tr>
            <tr>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td rowspan="3">形状符合、角度符合订单要求</td>
              <td>足型一致</td>
              <td>翘度一致</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>内外平行</td>
              <td>足弓位置一致</td>
              <td>1cm≤翘度≤1.5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>上下垂直</td>
              <td colspan="2">受力点合适</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td class="background-y">尺寸要求</td>
              <td>会阴围长增加：1-2cm</td>
              <td>膝关节围长增加：1-2cm</td>
              <td>膝关节宽度增加：0.5-1cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
              <td>足长增加：1-1.5cm</td>
              <td colspan="2">足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td>平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>板材薄厚均匀</td>
              <td colspan="2">捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="4">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="14">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="14">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>腰围</td>
              <td>{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>髋围</td>
              <td>{{printFormDataMap["围长"]["髋围"]}}</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td>{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td>{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>髋宽</td>
              <td colspan="3">{{printFormDataMap["宽度"]["髋宽"]}}</td>
              <td>膝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子地面</td>
              <td>{{printFormDataMap["高度"]["大转子--地面"]}}</td>
              <td>髂嵴大转子</td>
              <td colspan="2">{{printFormDataMap["高度"]["髂嵴--大转子"]}}</td>
              <td>髌中心地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--地面"]}}</td>
              <td>会阴地面</td>
              <td colspan="2">{{printFormDataMap["高度"]["会阴--地面"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="6">{{printFormDataMap["足部"]["足长"]}}</td>
              <td>足宽</td>
              <td colspan="6">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">足内外翻中立位</td>
              <td colspan="3">内外旋中立位</td>
              <td colspan="3">踝关节90度</td>
              <td colspan="3">膝关节屈曲5度</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="3" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y" colspan="2">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">铰链</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y" colspan="2">螺丝</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="2" colspan="2">额状面</td>
              <td>表面光滑，平顺</td>
              <td>膝关节铰链高低一样</td>
              <td>方扣、带子位置合适</td>
              <td colspan="2">内侧螺丝不要过长</td>
            </tr>
            <tr>
              <td>左右脚正确</td>
              <td>无凸凹不平</td>
              <td>内外平行</td>
              <td>结实</td>
              <td colspan="2">螺丝长短合适，上紧</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td rowspan="2" colspan="2">矢状面</td>
              <td>横线直、弧线顺</td>
              <td>上下垂直</td>
              <td>齐全</td>
              <td colspan="2">内侧螺丝不要过长</td>
            </tr>
            <tr>
              <td rowspan="2">支具与订单姓名一致</td>
              <td>无毛刺</td>
              <td>锁开闭灵活</td>
              <td>左右正确</td>
              <td rowspan="5" colspan="2">子母扣钉子处不能有毛刺，要平整</td>
            </tr>
            <tr>
              <td rowspan="3" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="4" colspan="2">水平面</td>
              <td>长短、高低一致</td>
              <td>同轴</td>
              <td>子母扣长短合适</td>
            </tr>
            <tr>
              <td>两腿型一致</td>
              <td>形状对称</td>
              <td>支条长短、孔距一致</td>
              <td>子母扣平整</td>
            </tr>
            <tr>
              <td>两足型一致</td>
              <td rowspan="2">粗细一致</td>
              <td>支条边缘光滑</td>
              <td>方扣四个</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>单侧左右相符</td>

              <td>内孔无毛刺</td>
              <td>带子四根</td>
            </tr>
            <tr>
              <td class="border-b background-y">尺寸要求</td>
              <td>大转子-髌中心</td>
              <td>髌中心-地面</td>
              <td>会阴到髌中心</td>
              <td>膝关节宽度增加：1-1.5cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
              <td>足长增加：1-1.5cm</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
              <td rowspan="2" class="border-b background-y">角度</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
              <td rowspan="2">角度符合订单要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_23">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td colspan="3">踝关节围长</td>
              <td colspan="4">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
              <td>取型人员</td>
              <td colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>踝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
              <td colspan="2">肩宽</td>
              <td colspan="4">{{printFormDataMap["宽度"]["肩宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="3">足内外翻中立位</td>
              <td colspan="3">踝关节90度</td>
              <td colspan="3">内外旋中立位</td>
              <td colspan="2">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y" colspan="2">足部要求</td>
              <td class="border-b background-y">尺寸要求</td>
              <td class="border-b background-y">腿型</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>足型一致</td>
              <td>脚面形状一致</td>
              <td>踝关节宽度增加：0.5-1cm</td>
              <td>两腿型一致</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>翘度一致</td>
              <td>1cm≤翘度≤1.5cm</td>
              <td>足长增加：1-1.5cm</td>
              <td rowspan="2">翻边一致</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合腿型要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>受力点合适</td>
              <td>足弓位置一致</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="2">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">姓名一致</td>
              <td>高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚要均匀</td>
              <td>捏缝要直</td>
              <td>脚面板材不能厚</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y" colspan="2">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y" colspan="2">外观</td>
              <td class="border-b background-y" colspan="2">方扣、带子</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>保留部分要足够</td>
              <td>支具与订单姓名一致</td>
              <td>额状面</td>
              <td>表面光滑，平顺</td>
              <td>长短、高低一致</td>
              <td>方扣、带子位置合适</td>
              <td>子母扣平整</td>
              <td>踝关节宽度增加：1-1.5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>脚面板材薄厚合适</td>
              <td>两腿型一致</td>
              <td>矢状面</td>
              <td>无凸凹不平</td>
              <td>形状对称、粗细一致</td>
              <td>结实、齐全</td>
              <td>方扣三个</td>
              <td>足长增加：1-1.5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>两足型一致</td>
              <td>水平面</td>
              <td>横线直、弧线顺</td>
              <td>无毛刺</td>
              <td>子母扣长短合适</td>
              <td>带子三根</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">结实、位置上对</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_24">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>髋围</td>
              <td>{{printFormDataMap["围长"]["髋围"]}}</td>
              <td>腰围</td>
              <td>{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>取型人员</td>
              <td colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td colspan="3">髋宽</td>
              <td colspan="3">{{printFormDataMap["宽度"]["髋宽"]}}</td>
              <td colspan="3">腰宽</td>
              <td colspan="3">{{printFormDataMap["宽度"]["腰宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td colspan="3">髂嵴大转子</td>
              <td colspan="3">{{printFormDataMap["高度"]["髂嵴--大转子"]}}</td>
              <td colspan="3">大转子髌中心</td>
              <td colspan="3">{{printFormDataMap["高度"]["大转子--髌中心"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="6">塑出髂脊形状</td>
              <td colspan="6">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">形状</td>
              <td class="border-b background-y" colspan="2">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>髂嵴左右对称</td>
              <td>髋围增加：4-5cm</td>
              <td>宽度增加：0-1cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">符合订单要求</td>
              <td>矢状面</td>
              <td>形状符合</td>
              <td>骨盆左右对称</td>
              <td rowspan="2">腿围增加：1-2cm</td>
              <td rowspan="2">长度增加：1-2cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>水平面</td>
              <td>高低对称</td>
              <td>两腿型对称</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">姓名一致</td>
              <td rowspan="2">高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td rowspan="2">保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y" colspan="2">方扣、带子</td>
              <td class="border-b background-y">尺寸要求</td>
              <td class="border-b background-y" colspan="2">铰链</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>支具与订单姓名一致</td>
              <td>表面平整，无凹凸不平</td>
              <td>带子长短合适</td>
              <td>位置合适</td>
              <td>胸围增加:3-5cm</td>
              <td>髋关节铰链高低一样</td>
              <td>内外平行、同轴</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>形状符合</td>
              <td>方扣三个</td>
              <td>结实、齐全</td>
              <td rowspan="2">宽度增加：0-1cm</td>
              <td>支条长短，孔距一致</td>
              <td>上下垂直</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>斜颈左右相符</td>
              <td>无毛刺</td>
              <td>带子三个</td>
              <td>子母扣平整</td>
              <td>支条边缘光滑</td>
              <td>内孔无毛刺</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">结实、位置上对</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_25">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="4">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="14">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="14">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>腰围</td>
              <td>{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>髋围</td>
              <td colspan="2">{{printFormDataMap["围长"]["髋围"]}}</td>
              <td>会阴围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td colspan="2">髋宽</td>
              <td colspan="2">{{printFormDataMap["宽度"]["髋宽"]}}</td>
              <td colspan="2">髋宽</td>
              <td colspan="2">{{printFormDataMap["宽度"]["髋宽"]}}</td>
              <td colspan="3">膝关节宽度</td>
              <td colspan="3">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>髂嵴--大转子</td>
              <td colspan="2">{{printFormDataMap["高度"]["髂嵴--大转子"]}}</td>
              <td colspan="2">大转子--髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["大转子--髌中心"]}}</td>
              <td>会阴--髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["会阴--髌中心"]}}</td>
              <td rowspan="2" colspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="5">髂嵴形状相符</td>
              <td colspan="5">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">膝关节</td>
            </tr>
            <tr>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td rowspan="3">形状符合</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>单侧左右相符</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>翻边一致</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td class="background-y">尺寸要求</td>
              <td>围长增加：2-5cm</td>
              <td>宽度增加：0.5-1cm</td>
              <td colspan="2">膝关节宽度增加：0.5-1cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="4">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="14">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="14">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>腰围</td>
              <td>{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>髋围</td>
              <td colspan="2">{{printFormDataMap["围长"]["髋围"]}}</td>
              <td>会阴围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td colspan="2">髋宽</td>
              <td colspan="2">{{printFormDataMap["宽度"]["髋宽"]}}</td>
              <td colspan="2">髋宽</td>
              <td colspan="2">{{printFormDataMap["宽度"]["髋宽"]}}</td>
              <td colspan="3">膝关节宽度</td>
              <td colspan="3">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>髂嵴--大转子</td>
              <td colspan="2">{{printFormDataMap["高度"]["髂嵴--大转子"]}}</td>
              <td colspan="2">大转子--髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["大转子--髌中心"]}}</td>
              <td>会阴--髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["会阴--髌中心"]}}</td>
              <td rowspan="2" colspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="5">髂嵴形状相符</td>
              <td colspan="5">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="3" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">铰链</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y" colspan="2">螺丝</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="2">额状面</td>
              <td>表面光滑，平顺</td>
              <td>髋关节、膝关节铰链高低一致</td>
              <td>方扣、带子位置合适</td>
              <td colspan="2">内侧螺丝不要过长</td>
            </tr>
            <tr>
              <td>左右脚正确</td>
              <td>无凸凹不平</td>
              <td>内外平行</td>
              <td>结实</td>
              <td colspan="2">螺丝长短合适，上紧</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td rowspan="2">矢状面</td>
              <td>横线直、弧线顺</td>
              <td>上下垂直</td>
              <td>齐全</td>
              <td colspan="2">内侧螺丝不要过长</td>
            </tr>
            <tr>
              <td rowspan="2">支具与订单姓名一致</td>
              <td>无毛刺</td>
              <td rowspan="2">锁开闭灵活、同轴</td>
              <td>左右正确</td>
              <td rowspan="5" colspan="2">子母扣钉子处不能有毛刺，要平整</td>
            </tr>
            <tr>
              <td rowspan="3" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="4">水平面</td>
              <td>长短、高低一致</td>
              <td>子母扣长短合适</td>
            </tr>
            <tr>
              <td rowspan="2">两腿型一致</td>
              <td>形状对称</td>
              <td>支条长短、孔距一致</td>
              <td>子母扣平整</td>
            </tr>
            <tr>
              <td rowspan="2">粗细一致</td>
              <td>支条边缘光滑</td>
              <td>方扣六个</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>单侧左右相符</td>
              <td>内孔无毛刺</td>
              <td>带子六根</td>
            </tr>
            <tr>
              <td class="border-b background-y">尺寸要求</td>
              <td>髂嵴--大转子减2cm</td>
              <td>大转子-髌中心加2cm</td>
              <td>髌中心-踝上</td>
              <td>会阴到髌中心</td>
              <td>膝关节宽度增加：1-1.5cm</td>
              <td>围长增加：3-7cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
              <td rowspan="2" class="border-b background-y">角度</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
              <td rowspan="2">角度符合订单要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_26">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="4">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="14">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="14">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>小腿最粗围长</td>
              <td>{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>股骨中段围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>会阴围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
              <td>膝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td colspan="4">膝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td colspan="2">踝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子--踝上</td>
              <td colspan="2">{{printFormDataMap["高度"]["大转子--踝上"]}}</td>
              <td colspan="2">会阴--髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["会阴--髌中心"]}}</td>
              <td>大转子--髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["大转子--髌中心"]}}</td>
              <td rowspan="2" colspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="5">膝关节屈曲5度</td>
              <td colspan="5">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">膝关节</td>
            </tr>
            <tr>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td rowspan="3">形状符合</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>单侧左右相符</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>翻边一致</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td class="background-y">尺寸要求</td>
              <td>围长增加：2-5cm</td>
              <td>宽度增加：0.5-1cm</td>
              <td colspan="2">膝关节宽度增加：0.5-1cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="4">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="14">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="14">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>小腿最粗围长</td>
              <td>{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>股骨中段围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>会阴围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>踝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
              <td>膝关节围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["膝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td colspan="4">膝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td colspan="2">踝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子--踝上</td>
              <td colspan="2">{{printFormDataMap["高度"]["大转子--踝上"]}}</td>
              <td colspan="2">会阴--髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["会阴--髌中心"]}}</td>
              <td>大转子--髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["大转子--髌中心"]}}</td>
              <td rowspan="2" colspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="5">膝关节屈曲5度</td>
              <td colspan="5">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="3" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">铰链</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y" colspan="2">螺丝</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="2">额状面</td>
              <td>表面光滑，平顺</td>
              <td>髋关节、膝关节铰链高低一致</td>
              <td>方扣、带子位置合适</td>
              <td colspan="2">内侧螺丝不要过长</td>
            </tr>
            <tr>
              <td>左右脚正确</td>
              <td>无凸凹不平</td>
              <td>内外平行</td>
              <td>结实</td>
              <td colspan="2">螺丝长短合适，上紧</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td rowspan="2">矢状面</td>
              <td>横线直、弧线顺</td>
              <td>上下垂直</td>
              <td>齐全</td>
              <td colspan="2">内侧螺丝不要过长</td>
            </tr>
            <tr>
              <td rowspan="2">支具与订单姓名一致</td>
              <td>无毛刺</td>
              <td rowspan="2">锁开闭灵活、同轴</td>
              <td>左右正确</td>
              <td rowspan="5" colspan="2">子母扣钉子处不能有毛刺，要平整</td>
            </tr>
            <tr>
              <td rowspan="3" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="4">水平面</td>
              <td>长短、高低一致</td>
              <td>子母扣长短合适</td>
            </tr>
            <tr>
              <td rowspan="2">两腿型一致</td>
              <td>形状对称</td>
              <td>支条长短、孔距一致</td>
              <td>子母扣平整</td>
            </tr>
            <tr>
              <td rowspan="2">粗细一致</td>
              <td>支条边缘光滑</td>
              <td>方扣六个</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>单侧左右相符</td>
              <td>内孔无毛刺</td>
              <td>带子六根</td>
            </tr>
            <tr>
              <td class="border-b background-y">尺寸要求</td>
              <td>髂嵴--大转子减2cm</td>
              <td>大转子-髌中心加2cm</td>
              <td>髌中心-踝上</td>
              <td>会阴到髌中心</td>
              <td>膝关节宽度增加：1-1.5cm</td>
              <td>围长增加：3-7cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
              <td rowspan="2" class="border-b background-y">角度</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
              <td rowspan="2">角度符合订单要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_27">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="4">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="14">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="14">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>腰围</td>
              <td>{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>髋围</td>
              <td>{{printFormDataMap["围长"]["髋围"]}}</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td>{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td>{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>髋宽</td>
              <td colspan="3">{{printFormDataMap["宽度"]["髋宽"]}}</td>
              <td>膝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子髌中心</td>
              <td>{{printFormDataMap["高度"]["大转子--髌中心 "]}}</td>
              <td>髂嵴大转子</td>
              <td colspan="2">{{printFormDataMap["高度"]["髂嵴--大转子"]}}</td>
              <td>髌中心踝上</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--踝上"]}}</td>
              <td>会阴髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["会阴--髌中心"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="5">膝关节角度</td>
              <td colspan="6">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="2" class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">腿型</td>
              <td class="border-b background-y">膝关节</td>
            </tr>
            <tr>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>两腿型一致</td>
              <td rowspan="3">形状符合、角度符合订单要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合腿型要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>单侧左右相符</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>翻边一致</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td class="background-y">尺寸要求</td>
              <td>围长增加：2-5cm</td>
              <td>宽度增加：0.5-1cm</td>
              <td colspan="2">膝关节宽度增加：0.5-1cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td>平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚均匀</td>
              <td>板材薄厚均匀</td>
              <td colspan="2">捏缝直</td>
            </tr>
          </table>
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="4">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="14">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="14">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>腰围</td>
              <td>{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>髋围</td>
              <td>{{printFormDataMap["围长"]["髋围"]}}</td>
              <td>会阴围长</td>
              <td>{{printFormDataMap["围长"]["会阴围长"]}}</td>
              <td>股骨中段围长</td>
              <td>{{printFormDataMap["围长"]["股骨中段围长"]}}</td>
              <td>膝关节围长</td>
              <td>{{printFormDataMap["围长"]["膝关节围长"]}}</td>
              <td>小腿最粗围长</td>
              <td>{{printFormDataMap["围长"]["小腿最粗围长"]}}</td>
              <td>踝关节围长</td>
              <td>{{printFormDataMap["围长"]["踝关节围长"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>髋宽</td>
              <td colspan="3">{{printFormDataMap["宽度"]["髋宽"]}}</td>
              <td>膝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["膝关节宽度"]}}</td>
              <td>踝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>大转子髌中心</td>
              <td>{{printFormDataMap["高度"]["大转子--髌中心 "]}}</td>
              <td>髂嵴大转子</td>
              <td colspan="2">{{printFormDataMap["高度"]["髂嵴--大转子"]}}</td>
              <td>髌中心踝上</td>
              <td colspan="2">{{printFormDataMap["高度"]["髌中心--踝上"]}}</td>
              <td>会阴髌中心</td>
              <td colspan="2">{{printFormDataMap["高度"]["会阴--髌中心"]}}</td>
              <td rowspan="2">取型人员</td>
              <td rowspan="2" colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="5">膝关节角度</td>
              <td colspan="6">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td rowspan="3" class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y" colspan="2">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">铰链</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y" colspan="2">螺丝</td>
            </tr>
            <tr>
              <td>保留部分要足够</td>
              <td rowspan="2" colspan="2">额状面</td>
              <td>表面光滑，平顺</td>
              <td>膝关节铰链高低一样</td>
              <td>方扣、带子位置合适</td>
              <td colspan="2">内侧螺丝不要过长</td>
            </tr>
            <tr>
              <td>左右脚正确</td>
              <td>无凸凹不平</td>
              <td>内外平行</td>
              <td>结实</td>
              <td colspan="2">螺丝长短合适，上紧</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td rowspan="2" colspan="2">矢状面</td>
              <td>横线直、弧线顺</td>
              <td>上下垂直</td>
              <td>齐全</td>
              <td colspan="2">内侧螺丝不要过长</td>
            </tr>
            <tr>
              <td rowspan="2">支具与订单姓名一致</td>
              <td>无毛刺</td>
              <td>锁开闭灵活</td>
              <td>左右正确</td>
              <td rowspan="5" colspan="2">子母扣钉子处不能有毛刺，要平整</td>
            </tr>
            <tr>
              <td rowspan="3" class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="4" colspan="2">水平面</td>
              <td>长短、高低一致</td>
              <td>同轴</td>
              <td>子母扣长短合适</td>
            </tr>
            <tr>
              <td>两腿型一致</td>
              <td>形状对称</td>
              <td>支条长短、孔距一致</td>
              <td>子母扣平整</td>
            </tr>
            <tr>
              <td>两足型一致</td>
              <td rowspan="2">粗细一致</td>
              <td>支条边缘光滑</td>
              <td>方扣四个</td>
            </tr>
            <tr>
              <td rowspan="2" class="border-b first-tr"></td>
              <td>单侧左右相符</td>

              <td>内孔无毛刺</td>
              <td>带子四根</td>
            </tr>
            <tr>
              <td class="border-b background-y">尺寸要求</td>
              <td>大转子-髌中心</td>
              <td>髌中心-地面</td>
              <td>会阴到髌中心</td>
              <td>膝关节宽度增加：1-1.5cm</td>
              <td>踝关节宽度增加：1-1.5cm</td>
              <td>足长增加：1-1.5cm</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
              <td rowspan="2" class="border-b background-y">角度</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">结实、位置上对</td>
              <td rowspan="2">角度符合订单要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_28">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td colspan="3">踝关节围长</td>
              <td colspan="4">{{printFormDataMap["围长"]["踝关节围长"]}}</td>
              <td>取型人员</td>
              <td colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>踝关节宽度</td>
              <td colspan="4">{{printFormDataMap["宽度"]["踝关节宽度"]}}</td>
              <td colspan="2">肩宽</td>
              <td colspan="4">{{printFormDataMap["宽度"]["肩宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">足部</td>
              <td>足长</td>
              <td colspan="4">{{printFormDataMap["足部"]["足长"]}}</td>
              <td colspan="2">足宽</td>
              <td colspan="4">{{printFormDataMap["足部"]["足宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="3">足内外翻中立位</td>
              <td colspan="3">踝关节90度</td>
              <td colspan="3">内外旋中立位</td>
              <td colspan="2">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y" colspan="2">足部要求</td>
              <td class="border-b background-y">尺寸要求</td>
              <td class="border-b background-y">腿型</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>足型一致</td>
              <td>脚面形状一致</td>
              <td>踝关节宽度增加：0.5-1cm</td>
              <td>两腿型一致</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>矢状面</td>
              <td>两腿长短、高低一致</td>
              <td>翘度一致</td>
              <td>1cm≤翘度≤1.5cm</td>
              <td>足长增加：1-1.5cm</td>
              <td rowspan="2">翻边一致</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合腿型要求</td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>受力点合适</td>
              <td>足弓位置一致</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="2">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">姓名一致</td>
              <td>高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>板材薄厚要均匀</td>
              <td>捏缝要直</td>
              <td>脚面板材不能厚</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y" colspan="2">基本要求</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y" colspan="2">外观</td>
              <td class="border-b background-y" colspan="2">方扣、带子</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>保留部分要足够</td>
              <td>支具与订单姓名一致</td>
              <td>额状面</td>
              <td>表面光滑，平顺</td>
              <td>长短、高低一致</td>
              <td>方扣、带子位置合适</td>
              <td>子母扣平整</td>
              <td>踝关节宽度增加：1-1.5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>脚面板材薄厚合适</td>
              <td>两腿型一致</td>
              <td>矢状面</td>
              <td>无凸凹不平</td>
              <td>形状对称、粗细一致</td>
              <td>结实、齐全</td>
              <td>方扣三个</td>
              <td>足长增加：1-1.5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>两足型一致</td>
              <td>水平面</td>
              <td>横线直、弧线顺</td>
              <td>无毛刺</td>
              <td>子母扣长短合适</td>
              <td>带子三根</td>
              <td>足宽增加：0-0.3cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">结实、位置上对</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
              <td rowspan="2">脚大小一致（0.3cm以内）</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_29">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td colspan="3">腰围</td>
              <td colspan="4">{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>取型人员</td>
              <td colspan="3">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td colspan="5">从髂后嵴绕到大腿外侧再绕到足外侧第五跖趾关节处</td>
              <td colspan="6">{{printFormDataMap["高度"]["从髂后嵴绕到大腿外侧再绕到足外侧第五跖趾关节处"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="6">尺寸准确</td>
              <td colspan="5">方向绕正确</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                产品
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">信息</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y" colspan="2">方扣、带子</td>
              <td rowspan="2" class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>支具与订单姓名一致</td>
              <td>针线平整，不跳针</td>
              <td>带子长短合适</td>
              <td>位置合适</td>
              <td>腰围尺寸加15CM</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>内外旋相符</td>
              <td>方扣一个</td>
              <td>带子三个</td>
              <td>高度按原尺寸加12CM</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_30">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>胸围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["胸围长"]}}</td>
              <td>腰围</td>
              <td colspan="2">{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>髋围</td>
              <td colspan="2">{{printFormDataMap["围长"]["髋围"]}}</td>
              <td>取型人员</td>
              <td colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>胸宽</td>
              <td colspan="3">{{printFormDataMap["宽度"]["胸宽"]}}</td>
              <td>腰宽</td>
              <td colspan="3">{{printFormDataMap["宽度"]["腰宽"]}}</td>
              <td>髋宽</td>
              <td colspan="3">{{printFormDataMap["宽度"]["髋宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>锁骨--髂嵴连线</td>
              <td>{{printFormDataMap["高度"]["锁骨--髂嵴连线"]}}</td>
              <td>颈7--头顶</td>
              <td>{{printFormDataMap["高度"]["颈7--头顶"]}}</td>
              <td>颈7--髂嵴连线</td>
              <td>{{printFormDataMap["高度"]["颈7--髂嵴连线"]}}</td>
              <td>腋下--髂嵴</td>
              <td>{{printFormDataMap["高度"]["腋下--髂嵴"]}}</td>
              <td>髂嵴连线--耻骨联合</td>
              <td>{{printFormDataMap["高度"]["髂嵴连线--耻骨联合"]}}</td>
              <td>髂嵴连线--骶骨</td>
              <td>{{printFormDataMap["高度"]["髂嵴连线--骶骨"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="2">骨盆轴线与身体轴线水平</td>
              <td colspan="2">腰椎无过伸</td>
              <td colspan="2">塑出下颚形状</td>
              <td colspan="2">塑出髂脊形状</td>
              <td colspan="2">头部力线矫枉过正</td>
              <td colspan="2">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">力点</td>
              <td class="border-b background-y">形状</td>
              <td class="border-b background-y">尺寸要求</td>
              <td class="border-b background-y">骨盆</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>压力点位置合适</td>
              <td>下颌骨形状合适</td>
              <td>胸围增加:3-5cm</td>
              <td>髂嵴左右对称</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>矢状面</td>
              <td>形状符合</td>
              <td>受力点合适</td>
              <td rowspan="2">头部形状合适</td>
              <td rowspan="2">宽度增加：0-1cm</td>
              <td rowspan="2">形状符合</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>斜颈左右相符</td>
              <td>水平面</td>
              <td>腋下高低对称</td>
              <td>释放空间要够</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：5-8cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>前开口</td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">力点</td>
              <td class="border-b background-y" colspan="2">方扣、带子</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>支具与订单姓名一致</td>
              <td>表面平整，无凹凸不平</td>
              <td>压力点位置合适</td>
              <td>带子长短合适</td>
              <td>位置合适</td>
              <td>胸围增加:3-5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>符合订单要求</td>
              <td>形状符合</td>
              <td>受力点合适</td>
              <td>方扣三个</td>
              <td>结实、齐全</td>
              <td rowspan="2">宽度增加：0-1cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>斜颈左右相符</td>
              <td>无毛刺</td>
              <td>腋下高低对称</td>
              <td>带子三个</td>
              <td>子母扣平整</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">结实、位置上对</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_31">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td>胸围长</td>
              <td colspan="2">{{printFormDataMap["围长"]["胸围长"]}}</td>
              <td>腰围</td>
              <td colspan="2">{{printFormDataMap["围长"]["腰围"]}}</td>
              <td>髋围</td>
              <td colspan="2">{{printFormDataMap["围长"]["髋围"]}}</td>
              <td>取型人员</td>
              <td colspan="2">{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">宽度</td>
              <td>胸宽</td>
              <td colspan="3">{{printFormDataMap["宽度"]["胸宽"]}}</td>
              <td>腰宽</td>
              <td colspan="3">{{printFormDataMap["宽度"]["腰宽"]}}</td>
              <td>髋宽</td>
              <td colspan="3">{{printFormDataMap["宽度"]["髋宽"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>锁骨--髂嵴连线</td>
              <td>{{printFormDataMap["高度"]["锁骨--髂嵴连线"]}}</td>
              <td>颈7--髂嵴连线</td>
              <td>{{printFormDataMap["高度"]["颈7--髂嵴连线"]}}</td>
              <td>腋下--髂嵴</td>
              <td>{{printFormDataMap["高度"]["腋下--髂嵴"]}}</td>
              <td>髂嵴连线--耻骨联合</td>
              <td colspan="2">{{printFormDataMap["高度"]["髂嵴连线--耻骨联合"]}}</td>
              <td>髂嵴连线--骶骨</td>
              <td colspan="2">{{printFormDataMap["高度"]["髂嵴连线--骶骨"]}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="3">骨盆轴线与身体轴线水平</td>
              <td colspan="3">腰椎无过伸</td>
              <td colspan="3">塑出髂脊形状</td>
              <td colspan="3">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                修型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">力点</td>
              <td class="border-b background-y">尺寸要求</td>
              <td class="border-b background-y">骨盆</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>模型与订单姓名一致</td>
              <td>额状面</td>
              <td>表面平整，无凹凸不平</td>
              <td>压力点位置合适</td>
              <td>胸围增加:3-5cm</td>
              <td>髂嵴左右对称</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">符合订单要求</td>
              <td>矢状面</td>
              <td>形状符合</td>
              <td>受力点合适</td>
              <td>宽度增加：0-1cm</td>
              <td rowspan="2">形状符合</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>水平面</td>
              <td>高低位置合适</td>
              <td>释放空间要够</td>
              <td>髋围增加：5-6cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                成型
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">板材</td>
              <td class="border-b background-y">烘箱</td>
              <td class="border-b background-y">真空泵</td>
              <td class="border-b background-y">纱套</td>
              <td class="border-b background-y">接缝</td>
              <td class="border-b background-y">外观</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合订单要求</td>
              <td>围长增加：2-3cm</td>
              <td rowspan="3">180&lt;温度&lt;200</td>
              <td rowspan="3">服帖</td>
              <td>不掉色</td>
              <td>平整无褶皱</td>
              <td rowspan="3">成型表面平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td>姓名一致</td>
              <td>高度增加：2cm</td>
              <td rowspan="2">平整无褶皱</td>
              <td>保留部分要充足</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>后开口</td>
              <td>板材薄厚均匀</td>
              <td>捏缝直</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">信息</td>
              <td class="border-b background-y">外观</td>
              <td class="border-b background-y">力点</td>
              <td class="border-b background-y" colspan="2">方扣、带子</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>支具与订单姓名一致</td>
              <td>表面平整，无凹凸不平</td>
              <td>压力点位置合适</td>
              <td>带子长短合适</td>
              <td>位置合适</td>
              <td>髋围增加:5-6cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">符合订单要求</td>
              <td>形状符合</td>
              <td>受力点合适</td>
              <td>方扣三个</td>
              <td>结实、齐全</td>
              <td>胸围增加：3-5cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>无毛刺</td>
              <td>腋下高低对称</td>
              <td>带子三个</td>
              <td>子母扣平整</td>
              <td>高度±1cm</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td rowspan="2" class="border-b background-y">基本要求</td>
              <td rowspan="2" class="border-b background-y">外观要求</td>
              <td rowspan="2" class="border-b background-y">方扣、带子</td>
              <td rowspan="2" class="border-b background-y">交付时间</td>
              <td rowspan="2" class="border-b background-y">铆钉要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">打透气孔，无毛刺</td>
              <td rowspan="2">表面洁净，光滑</td>
              <td rowspan="2">结实、位置上对</td>
              <td rowspan="2">20~30分钟</td>
              <td rowspan="2">结实、平整</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_32">
          <h3
            class="title"
          >{{productTitle.baseProductName}}[{{productTitle.baseProductNickname}}-{{productTitle.baseProductModel}}]</h3>
          <table class="border">
            <tr>
              <td rowspan="8" class="border-b first-tr">取型</td>
              <td>姓名</td>
              <td>{{printFormData.memberName}}</td>
              <td>年龄</td>
              <td>{{printFormData.age}}</td>
              <td>是否加急</td>
              <td>{{printFormData.quickly}}</td>
              <td>X光片</td>
              <td>{{printFormData.xRay}}</td>
              <td>医院名称</td>
              <td>{{printFormData.hospitalName}}</td>
              <td>交货日期</td>
              <td colspan="2">{{printFormData.deliveryTime}}</td>
            </tr>
            <tr>
              <td class="border-b">病情</td>
              <td colspan="12">{{printFormData.condition}}，{{printFormData.illness}}</td>
            </tr>
            <tr>
              <td class="border-b">特殊要求</td>
              <td colspan="12">{{printFormData.demand}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">围长</td>
              <td colspan="1">大臂围</td>
              <td colspan="1">{{printFormDataMap["围长"]["大臂围"]}}</td>
              <td colspan="1">前臂围</td>
              <td colspan="2">{{printFormDataMap["围长"]["前臂围"]}}</td>

              <td >腕关节围</td>
              <td >{{printFormDataMap["围长"]["腕关节围"]}}</td>
              <td >虎口围</td>
              <td >{{printFormDataMap["围长"]["虎口围"]}}</td>

              <td>取型人员</td>
              <td>{{printFormData.user}}</td>
            </tr>
            <tr>
              <td class="border-b background-y">高度</td>
              <td>肩峰--鹰嘴</td>
              <td colspan="2">{{printFormDataMap["高度"]["肩峰--鹰嘴"]}}</td>
              <td>腋下--鹰嘴</td>
              <td colspan="1">{{printFormDataMap["高度"]["腋下--鹰嘴"]}}</td>
              <td>鹰嘴--尺骨</td>
              <td colspan="1">{{printFormDataMap["高度"]["鹰嘴--尺骨"]}}</td>

              <td>尺骨--掌心</td>
              <td >{{printFormDataMap["高度"]["尺骨--掌心"]}}</td>
              <td>掌心--指尖</td>
              <td>{{printFormDataMap["高度"]["掌心--指尖"]}}</td>

            </tr>
            <tr>
              <td class="border-b background-y">要求</td>
              <td colspan="10">角度符合要求</td>
              <td colspan="1">阴型无变形</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                半成品
                <br />(工号)
              </td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y">铰链</td>
              <td class="border-b background-y">力线</td>
              <td class="border-b background-y" colspan="2">基本要求</td>
              <td class="border-b background-y">尺寸要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>方扣、带子位置合适</td>
              <td>铰链高低一致</td>
              <td rowspan="3">水平面</td>
              <td>支具与订单姓名一致</td>
              <td>子母扣处无毛刺</td>
              <td>足长：髂嵴--大转子减2cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
              <td rowspan="2">子母扣长短合适</td>
              <td>内外平行</td>

              <td rowspan="2">长短、高低一致</td>
              <td rowspan="2">子母扣要平整</td>
              <td rowspan="2">足宽：大转子-髌中心加2cm</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>

              <td>上下垂直</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                铆接
                <br />(工号)
              </td>
              <td class="border-b background-y">基本要求</td>
              <td class="border-b background-y">外观要求</td>
              <td class="border-b background-y">方扣、带子</td>
              <td class="border-b background-y">交付时间</td>
              <td class="border-b background-y">铆钉要求</td>
              <td class="border-b background-y">尺寸要求</td>
              <td class="border-b background-y">角度</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td rowspan="3">打透气孔，无毛刺</td>
              <td rowspan="3">表面洁净，光滑</td>
              <td rowspan="3">结实、位置上对</td>
              <td rowspan="3">20~30分钟</td>
              <td rowspan="3">结实、平整</td>
              <td rowspan="3">脚大小一致（0.3cm内）</td>
              <td rowspan="3">角度符合订单要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr">
                检验
                <br />(签字)
              </td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                入库检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>符合以上全部工序要求</td>
            </tr>
          </table>
          <table class="border margin-t-20">
            <tr>
              <td class="border-b first-tr">
                终检
                <br />(签字)
              </td>
              <td class="border-b background-y">基本要求</td>
            </tr>
            <tr>
              <td class="border-b first-tr"></td>
              <td>产品表面整洁，光滑；各部件安装牢靠；包装完好、说明书内信息填写完整</td>
            </tr>
          </table>
        </div>
        <div v-if="product.product_kaifa" class="center">该产品暂无模板，工作人员正在添加中...</div>
      </div>
  </div>
</template>
<script>
import fuyinProduct from "../../utils/fuyinProduct";
export default {
  data() {
    return {   
      product: fuyinProduct.isShow,
    };
  },
  props: {
    productTitle: {
      type: Object
    },
    printFormData: {
      type: Object
    },
    printFormDataMap: {
      type: Object
    },
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
    width: 80px;
  }
}
.margin-t-20 {
  margin-top: 20px;
}
</style>


