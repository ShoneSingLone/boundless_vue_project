<template>
	<div>
		<fieldset>
			<legend>可以直接使用svg的名字作为icon=============commonn/assets/SVG 文件夹下是UI默认的资源地址，</legend>
			<xIcon icon="icon_no_data" class="empty" />
			<xIcon icon="arrow_triangle-left" class="empty" />
			<xIcon icon="x-loading" class="empty" />
			<xIcon icon="icon_table_filter" class="empty" />
		</fieldset>
		<fieldset>
			<legend>业务相关的放在business_xxxxxx/assets/svg 文件夹下,使用时在svg的名字前加上下划线_</legend>
			<xIcon icon="_icon_report" class="empty" />
			<xIcon icon="_icon_fold" class="empty" />
			<xIcon icon="_icon_rerun" class="empty" />
			<xIcon icon="_icon_sourcecode" class="empty" />
			<xIcon icon="_icon_unfold" class="empty" />
		</fieldset>
		<fieldset>
			<legend>用img属性也可以加载图片，地址支持@符号，相对businness_xxx目录</legend>
			<xIcon img="@/assets/img/like.png" class="empty img" />
		</fieldset>
	</div>
</template>

<script>
export default async function () {
	return {
		setup() {}
	};
}
</script>

<style lang="less">
.view-icon {
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
