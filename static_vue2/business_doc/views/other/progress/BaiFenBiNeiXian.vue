<style lang="less">
.BaiFenBiNeiXian {
	.el-progress {
		margin-top: 8px;
	}
}
</style>
<template>
	<div class="BaiFenBiNeiXian">
		<xMd :md="md" />
		<xProgress :text-inside="true" :stroke-width="26" :percentage="70" />
		<xProgress :text-inside="true" :stroke-width="24" :percentage="100" status="success" />
		<xProgress :text-inside="true" :stroke-width="22" :percentage="80" status="warning" />
		<xProgress :text-inside="true" :stroke-width="20" :percentage="50" status="exception" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "百分比不占用额外控件，适用于文件上传等场景。\r\rProgress 组件可通过 `stroke-width` 属性更改进度条的高度，并可通过 `text-inside` 属性来将进度条描述置于进度条内部。"
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
