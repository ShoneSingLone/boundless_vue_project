<template>
	<div class="tooltip-JiChuYongFa">
		<xMd :md="mdTitle" />
		<xTooltip placement="top">
			<div slot="content">多行信息<br />第二行信息</div>
			<xBtn>Top center</xBtn>
		</xTooltip>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle:
					"展示多行文本或者是设置文本内容的格式" +
					"用具名 slot 分发`content`，替代`tooltip`中的`content`属性。"
			};
		}
	});
}
</script>
<style lang="less"></style>
