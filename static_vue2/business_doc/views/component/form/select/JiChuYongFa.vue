<template>
	<div>
		<Md :md="md" />
		<xSelect v-model="value" placeholder="请选择">
			<xOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </xOption>
		</xSelect>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "`v-model`的值为当前被选中的`el-option`的 value 属性值",
				options: [
					{
						value: "选项1",
						label: "黄金糕"
					},
					{
						value: "选项2",
						label: "双皮奶"
					},
					{
						value: "选项3",
						label: "蚵仔煎"
					},
					{
						value: "选项4",
						label: "龙须面"
					},
					{
						value: "选项5",
						label: "北京烤鸭"
					}
				],
				value: ""
			};
		}
	});
}
</script>
<style lang="less"></style>
