<style lang="less">
.mainBox {
	overflow: auto;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-around;
	.mainBoxLeft {
		text-align: center;
		margin-top: 40px;
		.headerClass {
			position: relative;
			width: 315px;
			height: 381px;
			background: #f8f8f8;
			border-radius: 8px;
			.uploadBtn {
				position: absolute;
				bottom: 24px;
				left: 50%;
				transform: translateX(-50%);
			}
		}
		.name {
			margin-top: 15px;
			margin-bottom: 80px;
			text-align: center;
			font-weight: 500;
			font-size: 18px;
			color: #333333;
		}
	}
	.mainBoxRight {
		margin-top: 40px;
		padding-left: 75px;
		.title {
			margin-bottom: 10px;
			font-weight: bold;
			font-size: 16px;
			color: #333333;
		}
		.infoMess {
			padding-left: 75px;
			box-sizing: border-box;
			margin-bottom: 35px;
			background: #f8f8f8;
			//box-shadow: 1px 4px 6px 0px #DFE9F1;
			border-radius: 10px;
		}
	}
}
</style>
<template>
	<div class="x-page-view">
		<xPageHeader @back="goBack" style="margin: 15px 20px 0" />
		<xPageContent>
			<div class="mainBox">
				<div class="mainBoxRight flex vertical">
					<div class="title flex middle">
						基本信息
						<xGap f />
						<xBtn preset="primary" icon="edit" @click="handleJump">编辑个人资料</xBtn>
					</div>
					<div class="infoMess flex1">
						<table-cell :limit="1">
							<table-cell-item
								v-for="item of infoList"
								:key="item.key"
								:label="item.label">
								{{ item.value }}
							</table-cell-item>
						</table-cell>
					</div>
					<div class="width100 flex center">
						<xBtn preset="primary" @click="modifyPwd">修改密码</xBtn>
					</div>
				</div>
			</div>
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		data(vm) {
			return {
				imageUrl: "",
				infoList: [
					{ label: "账号", value: "", key: "name" },
					{ label: "昵称", value: "", key: "userName" },
					{ label: "性别", value: "", key: "sex" },
					{ label: "角色", value: "", key: "roleName" },
					{ label: "部门", value: "", key: "deptName" },
					{ label: "电话", value: "", key: "phone" },
					{ label: "账号有效时间", value: "", key: "" },
					{ label: "状态", value: "", key: "status" }
				]
			};
		},
		mounted() {
			this.handleGetUserInfo();
		},
		methods: {
			async handleGetUserInfo() {
				let { data } = await _api.admin_db_audit.xdsLoginInfo();
				this.infoList.forEach(item => {
					if (item.key === "sex") {
						item.value = _.$val2L(data.user[item.key], _opts.admin_db_audit.sex);
					} else {
						item.value = data.user[item.key];
					}
				});
				console.log("data", data.user);
			},
			async handleUpload() {
				let json, res;
				const [file] = await _.$openFileSelector();
				if (!file) {
					return;
				}
				json = await _.$readFileAsText(file);
				console.log("json", json, "res", res);
			},
			beforeAvatarUpload() {},
			goBack() {
				this.$router.push({
					path: "/home"
				});
			},
			handleJump() {
				this.$router.push({
					path: "/my/edit"
				});
			},
			modifyPwd() {
				_.$openModal({
					title: `修改密码`,
					url: "@/views/my/my_pwd.dialog.vue",
					parent: this
				});
			}
		}
	});
}
</script>
