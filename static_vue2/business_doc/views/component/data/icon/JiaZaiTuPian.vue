<template>
	<div class="icon-demo">
		<Md :md="'>用img属性加载图片\n\n地址支持`@`符号，表示相对`businness_xxx`目录'" />
		<xIcon img="@/assets/img/like.png" class="empty img" />
	</div>
</template>
<script>
export default async function () {
	return defineComponent({});
}
</script>
<style lang="less">
.icon-demo {
	.empty {
		width: 64px;
		height: 64px;

		&.img {
			width: 100px;
			height: auto;
		}
	}
}
</style>
