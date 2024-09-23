<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" />
		<span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
		<xDivider />
		<span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return { md: "对不同章节的文本段落进行分割。" };
		}
	});
}
</script>
