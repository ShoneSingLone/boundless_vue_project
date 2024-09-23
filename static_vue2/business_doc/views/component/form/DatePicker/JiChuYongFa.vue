<template>
	<div>
		<xMd :md="md" />
		<div class="demo-input-size">
			<xInput placeholder="请输入内容" suffix-icon="el-icon-date" v-model="input1"> </xInput>
			<xInput
				size="medium"
				placeholder="请输入内容"
				suffix-icon="el-icon-date"
				v-model="input2">
			</xInput>
			<xInput
				size="small"
				placeholder="请输入内容"
				suffix-icon="el-icon-date"
				v-model="input3">
			</xInput>
			<xInput
				size="mini"
				placeholder="请输入内容"
				suffix-icon="el-icon-date"
				v-model="input4">
			</xInput>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				input1: "",
				input2: "",
				input3: "",
				input4: "",
				md: "可通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 medium、small 和 mini 三种尺寸。"
			};
		}
	});
}
</script>
<style lang="less"></style>
