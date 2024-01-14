<template>
	<div>
		<xMd :md="md" />
		<xInput type="textarea" autosize placeholder="请输入内容" v-model="textarea1"> </xInput>
		<div style="margin: 20px 0"></div>
		<xInput type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入内容" v-model="textarea2"> </xInput>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				textarea1: "",
				textarea2: "",
				md: "通过设置 `autosize` 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 `autosize` 还可以设定为一个对象，指定最小行数和最大行数。"
			};
		}
	});
}
</script>
<style lang="less"></style>
