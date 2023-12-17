<template>
	<div class="margin16 DongTaiBianJiBiaoQian">
		<xMd :md="'动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现'" />
		<xTag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
			{{ tag }}
		</xTag>
		<xInput class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"> </xInput>
		<xBtn v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</xBtn>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				dynamicTags: ["标签一", "标签二", "标签三"],
				inputVisible: false,
				inputValue: ""
			};
		},
		methods: {
			handleClose(tag) {
				this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			},

			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},

			handleInputConfirm() {
				let inputValue = this.inputValue;
				if (inputValue) {
					this.dynamicTags.push(inputValue);
				}
				this.inputVisible = false;
				this.inputValue = "";
			}
		}
	});
}
</script>
<style lang="less">
.DongTaiBianJiBiaoQian {
	.el-tag + .el-tag {
		margin-left: 10px;
	}
	.button-new-tag {
		margin-left: 10px;
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}
	.input-new-tag {
		width: 90px;
		margin-left: 10px;
		vertical-align: bottom;
	}
}
</style>
