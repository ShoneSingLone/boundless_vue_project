<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" />
		<xProgress :percentage="50" />
		<xProgress :percentage="100" :format="format" />
		<xProgress :percentage="100" status="success" />
		<xProgress :percentage="100" status="warning" />
		<xProgress :percentage="50" status="exception" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "Progress 组件设置`percentage`属性即可，表示进度条对应的百分比，**必填**，必须在 0-100。通过 `format` 属性来指定进度条文字内容。"
			};
		},
		methods: {
			format(percentage) {
				return percentage === 100 ? "满" : `${percentage}%`;
			}
		}
	});
}
</script>
