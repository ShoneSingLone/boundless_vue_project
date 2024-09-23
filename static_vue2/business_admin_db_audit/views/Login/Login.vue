<template>
	<div id="view-login">
		<div class="loginMainBox">
			<div class="loginMainBoxLeft">
				<div class="title">
					X-DAS<br />
					数据库审计管理系统
				</div>
			</div>
			<div class="loginMainBoxRight">
				<div class="text">
					<span class="title">用户登录</span>
					<span class="mess">User login</span>
				</div>
				<div class="loginBoxMainRightUserType">
					<xTabs v-model="username">
						<xTabPane label="审计管理员" name="admin"> </xTabPane>
						<xTabPane label="系统管理员" name="系统管理员"> </xTabPane>
						<xTabPane label="安全管理员" name="安全管理员"> </xTabPane>
					</xTabs>
				</div>
				<div class="loginBoxMainRightForm">
					<xInput
						class="loginBoxMainRightFormItem"
						v-model="username"
						placeholder="请输入用户名" />
					<xGap t="36" />
					<xInput
						class="loginBoxMainRightFormItem"
						v-model="password"
						type="password"
						placeholder="请输入密码" />
					<xGap t="36" />
					<div class="codeMess flex">
						<xInput
							class="loginBoxMainRightFormItem loginBoxMainRightFormItemCode"
							v-model="code"
							placeholder="请输入右侧验证码" />
						<span style="width: 20px"></span>
						<div class="image" @click="handleGetXdsVerifyCode">
							<xIcon :img="codeImgUrl" icon="loading" style="width: 100%" />
						</div>
					</div>
				</div>
				<div class="loginBoxMainRightRules">
					<span class="check"></span>
					<span class="text_7">我已阅读并同意</span>
					<span class="text_8">隐私权政策</span>
				</div>
				<xBtn class="loginBoxMainRightBtn" @click="submit">登 录</xBtn>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function ({}) {
	return defineComponent({
		inject: ["APP"],
		data() {
			return {
				codeImgUrl: "",
				username: "admin",
				password: "xds#123",
				code: ""
			};
		},
		computed: {},
		mounted() {
			this.handleGetXdsVerifyCode();
		},
		methods: {
			async handleGetXdsVerifyCode() {
				const url = await _api.admin_db_audit.xdsVerifyCode();
				this.codeImgUrl = url;
			},
			async submit() {
				// this.$router.push({
				// 	path: "/home"
				// });
				// return;
				const { MD5 } = await _.$appendScript("/common/libs/crypto-js.min.js", "CryptoJS");
				const params = {
					username: this.username,
					password: MD5(this.password).toString(),
					code: this.code
				};
				const { data, msg } = await _api.admin_db_audit.xdsLogin(params);
				_.$lStorage["token"] = `xds ${data}`;
				this.APP.refreshStatus();
				_.$msg(msg);
			}
		}
	});
}
</script>
<style lang="less">
#view-login {
	overflow: hidden;
	width: 100vw;
	height: 100%;
	position: relative;
	background-image: url(/@/views/Login/img/bg.png);
	background-size: 100% 100%;
	background-repeat: no-repeat;
	.loginMainBox {
		display: flex;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-sizing: border-box;
		width: 1250px;
		height: 660px;
		background: #ffffff;
		box-shadow: 0px 3px 12px 0px rgba(255, 255, 255, 0.31);
		border-radius: 10px;
		.loginMainBoxLeft {
			overflow: hidden;
			width: 879px;
			height: 660px;
			background-image: url(/@/views/Login/img/left@2x.png);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			.title {
				margin-left: 80px;
				margin-top: 77px;
				font-weight: 400;
				font-size: 41px;
				color: #2a383e;
				line-height: 48px;
			}
		}
		.loginMainBoxRight {
			text-align: center;
			position: absolute;
			right: 0;
			height: 100%;
			width: 500px;
			.text {
				margin-top: 74px;
				font-family: Source Han Sans CN;
				font-weight: bold;
				font-size: 35px;
				color: #000000;
				line-height: 57px;
				.mess {
					font-family: Source Han Sans CN;
					font-weight: 400;
					font-size: 18px;
					color: #a9b7c4;
					line-height: 57px;
				}
			}
			.loginBoxMainRightForm {
				margin-top: 35px;
				.codeMess {
					display: flex;
					.image {
						width: 165px;
						height: 40px;
						img {
							cursor: pointer;
							width: 100%;
							height: 100%;
						}
					}
					.loginBoxMainRightFormItemCode {
						width: 240px;
						height: 52px;
						background: #ffffff;
					}
				}
				.title {
					font-weight: 500;
					font-size: 16px;
					color: #333333;
					line-height: 24px;
				}

				.el-input__inner {
					display: inline-block;
					width: 444px;
					height: 50px;
					background: #ffffff;
					box-shadow: 1px 4px 8px 0px rgba(138, 138, 138, 0.21);
					border-radius: 10px;
				}
			}
			.loginBoxMainRightRules {
				text-align: left;
				margin-top: 63px;
				.check {
					display: inline-block;
					width: 17px;
					height: 17px;
					background: #ffffff;
					border-radius: 50%;
					border: 1px solid #939393;
					vertical-align: middle;
					margin-right: 10px;
				}
				.text_7 {
					width: 173px;
					height: 14px;
					overflow-wrap: break-word;
					color: rgba(113, 113, 113, 1);
					font-family: SourceHanSansCN-Regular;
					text-align: left;
					white-space: nowrap;
					font-size: 13px;
					line-height: 13px;
				}
				.text_8 {
					width: 173px;
					height: 14px;
					overflow-wrap: break-word;
					color: rgba(29, 151, 255, 1);
					font-family: SourceHanSansCN-Regular;
					text-align: left;
					white-space: nowrap;
					font-size: 13px;
					line-height: 13px;
				}
			}
			.loginBoxMainRightBtn {
				text-align: left !important;
				box-sizing: border-box;
				margin-top: 15px;
				width: 440px !important;
				height: 50px;
				background: linear-gradient(0deg, #00695e, #46dfcb);
				box-shadow: 2px 8px 9px 0px rgba(138, 138, 138, 0.12);
				border-radius: 24px;
				font-weight: 500;
				font-size: 20px;
				color: #ffffff;

				&.el-button,
				&.el-button:focus,
				&.el-button:hover {
					text-align: center;
					width: 100%;
					color: #ffffff;
					border-color: unset;
					background-color: transparent;
					transform: scale(1);
					> .flex {
						line-height: 24px;
						width: 100%;
						display: block;
						text-align: center;
					}
				}
			}
		}
	}
}
</style>
