<template>
	<div>
		<Md :md="md" />
		<xSelect v-model="value" placeholder="请选择">
			<xOption-group v-for="group in options" :key="group.label" :label="group.label">
				<xOption v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"> </xOption>
			</el-option-group>
		</xSelect>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "备选项进行分组展示\n\n使用`el-option-group`对备选项进行分组，它的`label`属性为分组名",
				options: [
					{
						label: "热门城市",
						options: [
							{
								value: "Shanghai",
								label: "上海"
							},
							{
								value: "Beijing",
								label: "北京"
							}
						]
					},
					{
						label: "城市名",
						options: [
							{
								value: "Chengdu",
								label: "成都"
							},
							{
								value: "Shenzhen",
								label: "深圳"
							},
							{
								value: "Guangzhou",
								label: "广州"
							},
							{
								value: "Dalian",
								label: "大连"
							}
						]
					}
				],
				value: ""
			};
		}
	});
}
</script>
<style lang="less"></style>
