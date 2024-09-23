<template>
	<div id="view-login">
		<div class="bg"></div>
		<div class="loginBoxMain">
			<div class="loginBoxMainLeft">
				<div class="loginBoxMainLeftTitle">X-DAS <br />数据库审计管理系统</div>
				<div class="loginBoxMainLeftBg"></div>
			</div>
			<div class="loginBoxMainRight">
				<div class="loginBoxMainRightTitle">
					<span class="text_1">用户登录</span>
					<span class="text_2">USER&nbsp;LOGIN</span>
				</div>
				<div class="loginBoxMainRightUserType">
					<xTabs v-model="username">
						<xTabPane label="审计管理员" name="审计管理员"> </xTabPane>
						<xTabPane label="系统管理员" name="系统管理员"> </xTabPane>
						<xTabPane label="安全管理员" name="安全管理员"> </xTabPane>
					</xTabs>
				</div>
				<xGap t="16" />
				<div class="loginBoxMainRightForm">
					<span class="title mb4">用户名</span>
					<xGap t="8" />
					<xInput
						class="loginBoxMainRightFormItem"
						v-model="username"
						placeholder="请输入用户名" />
					<xGap t="36" />
					<span class="title mb4">密码</span>
					<xGap t="8" />
					<xInput
						class="loginBoxMainRightFormItem"
						v-model="password"
						type="password"
						placeholder="请输入密码" />
					<xGap t="36" />
					<div class="codeMess flex middle">
						<xInput
							style="width: 240px"
							class="loginBoxMainRightFormItem"
							v-model="code"
							placeholder="请输入右侧验证码" />
						<div
							class="image flex middle center pointer flex1"
							@click="handleGetXdsVerifyCode">
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
	position: relative;
	overflow: hidden;
	width: 100vw;
	min-height: 100vh;
	background:
		url(/@/views/Login/img/psodqgbwyrmri01buc3xotiqtqmd3yak5e2d027cec-4db7-4494-abdc-35440c41f02d.png)
			100% no-repeat,
		url(/@/views/Login/img/psdad3w5tz8pax40kyj14twmv2gp68dh93o34d25324-193a-473f-8dbe-430177e80fa2.png)
			0px 0px no-repeat;
	background-size: 100% 100%;
	.bg {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 540px;
		background: url(/@/views/Login/img/psuojf45paoenz8bkjpc5efcdwv1dwhy6c71df2c-fd12-4015-9214-be3417679d46.png) -734px
			0px no-repeat;
		//background-size: 3389px 771px;
	}
	.loginBoxMain {
		position: relative;
		overflow: hidden;
		display: flex;
		z-index: 4;
		box-sizing: border-box;
		margin: 75px auto 0;
		box-shadow: 0px 3px 12px 0px rgba(255, 255, 255, 0.31);
		background-color: rgba(255, 255, 255, 1);
		border-radius: 10px;
		width: 1510px;
		height: 779px;
		.loginBoxMainLeft {
			overflow: hidden;
			position: relative;
			width: 1000px;
			//height: 771px;
			height: 100%;
			background: url(/@/views/Login/img/psgxhiuqx0fyuh6ociuvj1q76ym1ot0e87d484792-1ede-49a4-95fa-a7fab56be7ab.png)
				100% no-repeat;
			background-size: 100% 100%;
			.loginBoxMainLeftTitle {
				width: 347px;
				height: 78px;
				overflow-wrap: break-word;
				color: #2a383e;
				font-size: 42px;
				font-family: PangMenZhengDao;
				text-align: left;
				white-space: nowrap;
				line-height: 49px;
				margin: 46px 0 0 58px;
			}
			.loginBoxMainLeftBg {
				position: absolute;
				bottom: 22px;
				width: 789px;
				height: 658px;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				background-image: url(/@/views/Login/img/psglusiogupzahdkh1is3rj96z40i4uq9if3119d37b-e53c-4a49-bfc5-f9fdbbcaac9f.png);
			}
		}
		.loginBoxMainRight {
			overflow: hidden;
			margin-top: 100px;
			.loginBoxMainRightTitle {
				text-align: center;
				.text_1 {
					margin-right: 5px;
					//background-image: linear-gradient(
					//	180deg,
					//	rgba(16, 140, 127, 1) 0,
					//	rgba(16, 140, 127, 1) 0,
					//	rgba(55, 216, 201, 1) 100%,
					//	rgba(55, 216, 201, 1) 100%
					//);
					background-color: #4d657b;
					width: 158px;
					height: 38px;
					overflow-wrap: break-word;
					color: #4d657b;
					font-size: 40px;
					font-family: SourceHanSansCN-Bold;
					font-weight: 700;
					text-align: center;
					white-space: nowrap;
					line-height: 58px;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
				.text_2 {
					width: 118px;
					height: 17px;
					overflow-wrap: break-word;
					color: rgba(169, 183, 196, 1);
					font-size: 21px;
					font-family: SourceHanSansCN-Regular;
					text-align: center;
					white-space: nowrap;
					line-height: 58px;
					margin-top: 22px;
				}
			}
			.loginBoxMainRightUserType {
				margin-top: 35px;
			}
			.loginBoxMainRightForm {
				.codeMess {
					.image {
						box-sizing: border-box;
						width: 170px;
						// height: 40px;
						//background: #edf8fb;
						//border-radius: 6px;
						//border: 1px solid #b4b4b4;
						img {
							width: 100%;
							height: 100%;
						}
					}
				}
				//margin-top: 50px;
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
				text-align: center;
				box-sizing: border-box;
				margin-top: 15px;
				width: 447px;
				height: 51px;
				line-height: 51px;
				background: linear-gradient(0deg, #428cee, #2ee2e9);
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
