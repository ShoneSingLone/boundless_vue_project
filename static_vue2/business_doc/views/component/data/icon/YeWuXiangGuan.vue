<template>
	<div>
		<md :md="'>业务相关的svg资源放在business_xxxxxx/assets/svg 文件夹下\n\n在svg的名字前加上下划线`_`'" />
		<xIcon icon="_icon_report" class="empty" />
		<xIcon icon="_icon_fold" class="empty" />
		<xIcon icon="_icon_rerun" class="empty" />
		<xIcon icon="_icon_sourcecode" class="empty" />
		<xIcon icon="_icon_unfold" class="empty" />
	</div>
</template>
<script>
export default async function () {
	return defineComponent({});
}
</script>
<style lang="less"></style>
