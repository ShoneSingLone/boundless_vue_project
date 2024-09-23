<template>
	<div class="page flex-col" id="view-login">
		<div class="group_1 flex-col">
			<div class="section_1 flex-col">
				<div class="box_1 flex-col"><div class="section_2 flex-col"></div></div>
			</div>
		</div>
		<div class="group_2 flex-row">
			<div class="login-form-wrapper flex-col">
				<div class="text-wrapper_7 flex-row justify-between">
					<span class="text_1">用户登录</span>
					<span class="text_2">User&nbsp;login</span>
				</div>
				<div class="text-wrapper_8 flex-row justify-between">
					<xTabs v-model="loginWrapActiveKey">
						<xTabPane label="系统管理员" name="系统管理员"> </xTabPane>
						<xTabPane label="安全管理员" name="安全管理员"> </xTabPane>
					</xTabs>
				</div>
				<div class="text-wrapper_3 flex-col"><span class="text_5">请输入用户名</span></div>
				<div class="text-wrapper_4 flex-col"><span class="text_6">请输入密码</span></div>
				<div class="text-wrapper_5">
					<span class="text_7">我已阅读并同意</span>
					<span class="text_8">隐私权政策</span>
				</div>
				<div class="text-wrapper_6 flex-col"><span class="text_9">登&nbsp;录</span></div>
			</div>
			<div class="group_4 flex-row">
				<span class="paragraph_1">
					X-DAS
					<br />
					数据库审计管理系统
				</span>
				<div class="group_5 flex-col"></div>
				<span class="text_10">审计管理员</span>
				<img class="image_1" referrerpolicy="no-referrer" :src="cptImgSrc" />
				<div class="group_6 flex-col"><div class="section_3 flex-col"></div></div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function ({}) {
	return defineComponent({
		computed: {
			cptImgSrc() {
				return _.$resolvePath(
					"@/views/Login/img/psglusiogupzahdkh1is3rj96z40i4uq9if3119d37b-e53c-4a49-bfc5-f9fdbbcaac9f.png"
				);
			}
		}
	});
}
</script>
<style lang="less">
#view-login {
	background:
		url(/@/views/Login/img/psodqgbwyrmri01buc3xotiqtqmd3yak5e2d027cec-4db7-4494-abdc-35440c41f02d.png)
			100% no-repeat,
		url(/@/views/Login/img/psdad3w5tz8pax40kyj14twmv2gp68dh93o34d25324-193a-473f-8dbe-430177e80fa2.png)
			0px 0px no-repeat;
	background-size: 100% 100%;

	&.page {
		overflow: hidden;
		position: relative;
		width: 100vw;
		height: 100vh;
	}

	.group_1 {
		height: 1080px;
		// background: url("/@/views/Login/img/pszca955miuf4s1wnkhkkvg9y0o4fd2nbd1de6ec2-fc39-445b-a004-83f76797cff5.png") 100% no-repeat;
		background-size: 100% 100%;
		width: 1920px;
	}

	.section_1 {
		height: 1080px;
		width: 1920px;
	}

	.box_1 {
		height: 1080px;
		width: 1920px;
	}

	.section_2 {
		box-shadow: 0px 3px 12px 0px rgba(255, 255, 255, 0.31);
		background-color: rgba(255, 255, 255, 1);
		border-radius: 10px;
		width: 1515px;
		height: 779px;
		margin: 75px auto 0;
		//margin: 151px 0 0 203px;
	}

	.group_2 {
		position: absolute;
		left: 0;
		top: 242px;
		width: 1920px;
		height: 763px;
		background: url(/@/views/Login/img/psuojf45paoenz8bkjpc5efcdwv1dwhy6c71df2c-fd12-4015-9214-be3417679d46.png) -734px
			0px no-repeat;
		background-size: 3389px 771px;
	}

	.login-form-wrapper {
		width: 448px;
		height: 497px;
		margin: -62px 0 0 1165px;
	}

	.text-wrapper_7 {
		width: 289px;
		height: 39px;
		margin-left: 82px;
	}

	.text_1 {
		background-image: linear-gradient(
			180deg,
			rgba(16, 140, 127, 1) 0,
			rgba(16, 140, 127, 1) 0,
			rgba(55, 216, 201, 1) 100%,
			rgba(55, 216, 201, 1) 100%
		);
		width: 158px;
		height: 38px;
		overflow-wrap: break-word;
		color: rgba(77, 101, 123, 1);
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
		font-weight: NaN;
		text-align: center;
		white-space: nowrap;
		line-height: 58px;
		margin-top: 22px;
	}

	.text-wrapper_8 {
		width: 211px;
		height: 16px;
		margin: 67px 0 0 186px;
	}

	.text_3 {
		width: 79px;
		height: 15px;
		overflow-wrap: break-word;
		color: rgba(77, 101, 123, 1);
		font-size: 16px;
		font-family: SourceHanSansCN-Regular;
		font-weight: NaN;
		text-align: center;
		white-space: nowrap;
		line-height: 58px;
		margin-top: 1px;
	}

	.text_4 {
		width: 79px;
		height: 16px;
		overflow-wrap: break-word;
		color: rgba(77, 101, 123, 1);
		font-size: 16px;
		font-family: SourceHanSansCN-Regular;
		font-weight: NaN;
		text-align: center;
		white-space: nowrap;
		line-height: 58px;
	}

	.text-wrapper_3 {
		background-color: rgba(246, 247, 251, 1);
		border-radius: 32px;
		height: 64px;
		width: 444px;
		margin: 69px 0 0 4px;
	}

	.text_5 {
		width: 125px;
		height: 21px;
		overflow-wrap: break-word;
		color: rgba(180, 180, 180, 1);
		font-size: 21px;
		font-family: SourceHanSansCN-Regular;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 23px;
		margin: 21px 0 0 31px;
	}

	.text-wrapper_4 {
		background-color: rgba(246, 247, 251, 1);
		border-radius: 32px;
		height: 64px;
		width: 444px;
		margin: 36px 0 0 4px;
	}

	.text_6 {
		width: 105px;
		height: 21px;
		overflow-wrap: break-word;
		color: rgba(180, 180, 180, 1);
		font-size: 21px;
		font-family: SourceHanSansCN-Regular;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 23px;
		margin: 21px 0 0 31px;
	}

	.text-wrapper_5 {
		width: 173px;
		height: 14px;
		overflow-wrap: break-word;
		font-size: 0;
		font-family: SourceHanSansCN-Regular;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin: 63px 0 0 33px;
	}

	.text_7 {
		width: 173px;
		height: 14px;
		overflow-wrap: break-word;
		color: rgba(113, 113, 113, 1);
		font-size: 13px;
		font-family: SourceHanSansCN-Regular;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
	}

	.text_8 {
		width: 173px;
		height: 14px;
		overflow-wrap: break-word;
		color: rgba(29, 151, 255, 1);
		font-size: 13px;
		font-family: SourceHanSansCN-Regular;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
	}

	.text-wrapper_6 {
		height: 51px;
		background: url(/@/views/Login/img/pscxgnslc9d9jhpe2thhsgi8qb80x21958a9536575-6352-4ff8-b533-ae0e7efd58e1.png) -6px
			0px no-repeat;
		background-size: 464px 68px;
		margin-top: 14px;
		width: 447px;
	}

	.text_9 {
		width: 44px;
		height: 19px;
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 19px;
		font-family: SourceHanSansCN-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 26px;
		margin: 16px 0 0 199px;
	}

	.group_4 {
		position: absolute;
		left: 202px;
		top: -167px;
		width: 1087px;
		height: 771px;
		background: url(/@/views/Login/img/psgxhiuqx0fyuh6ociuvj1q76ym1ot0e87d484792-1ede-49a4-95fa-a7fab56be7ab.png)
			100% no-repeat;
		background-size: 100% 100%;
	}

	.paragraph_1 {
		width: 347px;
		height: 78px;
		overflow-wrap: break-word;
		color: rgba(42, 56, 62, 1);
		font-size: 42px;
		font-family: PangMenZhengDao;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 49px;
		margin: 46px 0 0 58px;
	}

	.group_5 {
		background-color: rgba(255, 255, 255, 1);
		border-radius: 50%;
		width: 17px;
		height: 17px;
		border: 1px solid rgba(147, 147, 147, 1);
		margin: 521px 0 0 563px;
	}

	.text_10 {
		width: 91px;
		height: 17px;
		overflow-wrap: break-word;
		color: rgba(0, 150, 255, 1);
		font-size: 18px;
		font-family: SourceHanSansCN-Regular;
		font-weight: NaN;
		text-align: center;
		white-space: nowrap;
		line-height: 58px;
		margin: 209px -11px 0 22px;
	}

	.image_1 {
		position: absolute;
		left: 18px;
		top: 79px;
		width: 786px;
		height: 658px;
	}

	.group_6 {
		background-color: rgba(216, 243, 246, 1);
		height: 1px;
		width: 580px;
		position: absolute;
		left: 899px;
		top: 242px;
	}

	.section_3 {
		background-color: rgba(0, 150, 255, 1);
		width: 146px;
		height: 3px;
		margin: -2px 0 0 80px;
	}
}
</style>
