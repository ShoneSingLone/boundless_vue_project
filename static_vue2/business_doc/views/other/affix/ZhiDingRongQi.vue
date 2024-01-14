<style lang="less">
.affix-container {
	text-align: center;
	height: 400px;
	border-radius: 4px;
	background: var(--ui-primary-light-9);
}
</style>
<template>
	<div>
		<xMd :md="md" />
		<div class="affix-container">
			<xAffix target=".affix-container" :offset="80">
				<xBtn preset="success">Target container</xBtn>
			</xAffix>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: `通过设置 \`target\` 属性，让固钉始终保持在容器内， 超过范围则隐藏。
> 请注意容器避免出现滚动条。`
			};
		}
	});
}
</script>
