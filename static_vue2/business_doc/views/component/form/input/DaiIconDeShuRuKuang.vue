<template>
	<div>
		<xMd :md="md" />
		<div class="demo-input-suffix flex middle">
			<div style="width: 100px">属性方式：</div>
			<xInput placeholder="请选择日期" suffix-icon="calendar" v-model="input1" />
			<xGap l="8" />
			<xInput placeholder="请输入内容" prefix-icon="search" v-model="input2" />
		</div>
		<div class="demo-input-suffix flex middle mt8">
			slot 方式：
			<xInput placeholder="请选择日期" v-model="input3">
				<i slot="suffix" class="el-input__icon el-icon-date"></i>
			</xInput>
			<xGap l="8" />
			<xInput placeholder="请输入内容" v-model="input4">
				<i slot="prefix" class="el-input__icon el-icon-search"></i>
			</xInput>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "带有图标标记输入类型\n可以通过 `prefix-icon` 和 `suffix-icon` 属性在 input 组件首部和尾部增加显示图标，也可以通过 slot 来放置图标。",
				input1: "",
				input2: "",
				input3: "",
				input4: ""
			};
		}
	});
}
</script>
<style lang="less"></style>
