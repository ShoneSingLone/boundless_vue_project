<template>
	<div>
		<xMd :md="md" />
		<xSelect v-model="value" multiple filterable allow-create default-first-option placeholder="请选择文章标签">
			<xOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </xOption>
		</xSelect>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "可以创建并选中选项中不存在的条目\n\n使用`allow-create`属性即可通过在输入框中输入文字来创建新的条目。注意此时`filterable`必须为真。本例还使用了`default-first-option`属性，在该属性打开的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。",
				options: [
					{
						value: "HTML",
						label: "HTML"
					},
					{
						value: "CSS",
						label: "CSS"
					},
					{
						value: "JavaScript",
						label: "JavaScript"
					}
				],
				value: []
			};
		}
	});
}
</script>
<style lang="less"></style>
