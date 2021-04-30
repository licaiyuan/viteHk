<template>
  <div class="loginMain">
    <div class="loginBox">
      <!-- <div class="box-con">
        <span><img src="../static/qrCode.jpeg" /></span>
      </div> -->
      <h class="platformTitle" style="font-size: 15px">业务管理系统</h>
      <h class="platformTitle">企业微信安全登录</h>
      <p>请使用企业微信扫二维码登录</p>
      <div id="wx_qrcode"></div>
      {{ count }}
      <!-- <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="phone" label-width="0px">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item
          prop="verificationCode"
          label-width="0px"
          style="position: relative"
          v-if="codeType == 'verificationCode'"
        >
          <el-input
            v-model="form.verificationCode"
            placeholder="请输入短信验证码"
          ></el-input>
          <span class="sendCode">发送验证码</span>
        </el-form-item>
        <el-form-item
          prop="verificationCode"
          label-width="0px"
          style="position: relative"
          v-if="codeType == 'picVerificationCode'"
        >
          <el-input
            v-model="form.picVerificationCode"
            placeholder="请输入图形验证码"
          ></el-input>
          <span class="sendCode">
            <img src="../static/code.jpeg" />
          </span>
        </el-form-item>
        <el-form-item label-width="0px" prop="passWord">
          <el-input v-model="form.passWord" placeholder="请输入密码"></el-input>
        </el-form-item>
        <h class="forgetPassword" @click="forgetPassword">忘记密码？</h>
        <el-button type="primary" @click="login" style="width: 100%"
          >登录</el-button
        >
      </el-form> -->
    </div>
  </div>
</template>

<script >
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  onMounted,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
} from "vue";
import * as wx from "jwecom";
import { ElMessage } from "element-plus";
import { configRequest, userInform, meauListData } from "../api/account/login";
import { useRouter } from "vue-router";
import { useStore, mapMutations, mapState } from "vuex";
import axios from "axios";
export default {
  name: "App",
  components: {},
  mounted() {},
  methods: {
    ...mapMutations("user", ["changeUserInfor"]),
  },
  computed: {
    ...mapState({}),
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    onMounted(async () => {
      wxconfig();
      meauList();
    });
    let meauList = async () => {
      // console.log("xxx");
      let data = await meauListData();
      console.log(data);
    };
    let wxconfig = async () => {
      configRequest().then((data) => {
        console.log(data.data);
        let { agentId, appId, redirectUri, state } = data.data;
        window.WwLogin({
          id: "wx_qrcode", // 登录页面显示二维码的容器id
          appid: appId, // 企业微信的CorpID，在企业微信管理端查看
          agentid: agentId, // 授权方的网页应用id，在具体的网页应用中查看
          redirect_uri: "https://bg.dev.daaokeji.com", // 重定向的地址，需要进行encode
          state: state,
          href: "", // 自定义样式链接，只支持https协议的资源地址
        });
      });
      var url = window.location.search;
      console.log(url);
      //    alert(url.length);

      //    alert(url.lastIndexOf('='));

      var code = url.substring(url.indexOf("=") + 1, url.indexOf("&"));
      var state = url.substring(url.indexOf("te=") + 3, url.indexOf("&a"));
      if (code) {
        let data = await userInform({ code: code, state: state });
        console.log(data);
        router.push("/hkapp/user/list");
      }

      // alert(wx.VERSION);
    };
    let form = ref({ phone: "", verificationCode: "", passWord: "" });
    var reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{8,15}$/;
    var phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    let checkPassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (reg.test(value)) {
        callback();
      } else {
        callback(
          new Error("密码只能为大写字母+小写字母+数字的8至15位字符组合")
        );
      }
    };
    let checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!phoneReg.test(value)) {
        callback(new Error("手机号码有误，请重填"));
      } else {
        callback();
      }
    };

    let codeType = ref("verificationCode");
    let rules = ref({
      phone: [{ validator: checkPhone, trigger: "blur" }],
      verificationCode: [
        { required: true, message: "请输入验证码", trigger: "blur" },
      ],
      passWord: [{ validator: checkPassWord, trigger: "blur" }],
    });
    let forgetPassword = () => {
      ElMessage({
        message: "请联系管理员重置密码",
        type: "warning",
      });
    };
    let login = () => {
      console.log(form.value.phone);
    };
    return { form, login, rules, forgetPassword, codeType };
  },
};
</script>
<style>
/* .loginMain {
  background-image: url("../static/background.jpeg");
  background-position: 0 0;
  background-repeat: no-repeat;
  background-attachment: scroll;
  width: 100%;
  height: 100%;
} */

.loginMain {
  width: 100%;
  height: 100%;
  background: url("../static/background.jpeg") 0% 0%;
  background-size: 100% 100%;
}
.sendCode {
  position: absolute;
  width: 75px;
  right: 6px;
  cursor: pointer;
  font-size: 10px;
}
.box-con {
  width: 100px;
  height: 100px;
  position: absolute;

  top: -50px;
  right: -50px;
  transform: rotate(45deg);
}
.box-con span {
  position: absolute;
  bottom: 0;
  display: block;
  width: 100px;
  text-align: center;
}

.loginBox {
  height: 530px;
  width: 300px;
  background: white;
  position: absolute;
  top: 50%;
  margin-top: -265px;
  right: 10%;
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 36px;
  align-items: center;
  overflow: hidden;
}
.platformTitle {
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 20px;
}
.forgetPassword {
  padding-left: 10px;
  /* padding-bottom: 16px; */
  margin-bottom: 10px;
  color: rgb(128 128 128 / 60%);
  cursor: pointer;
  float: right;
  /* position: relative;
  bottom: 5px; */
}
.demo-ruleForm {
  width: 100%;
}
</style>
