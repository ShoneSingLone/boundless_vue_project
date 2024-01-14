<template>
	<div>
		<xMd :md="mdTitle" />
		<xIcon icon="icon_no_data" class="empty" />
		<xIcon icon="arrow_triangle-left" class="empty" />
		<xIcon icon="x-loading" class="empty" />
		<xIcon icon="icon_table_filter" class="empty" />
		<xMd :md="'>业务相关的svg资源放在business_xxxxxx/assets/svg 文件夹下\n\n在svg的名字前加上下划线`_`'" />
		<xIcon icon="icon_report" class="empty" />
		<xIcon icon="_icon_fold" class="empty" />
		<xIcon icon="_icon_rerun" class="empty" />
		<xIcon icon="_icon_sourcecode" class="empty" />
		<xIcon icon="_icon_unfold" class="empty" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle: ">通用的资源放在commonn/assets/svg 文件夹下\n\n直接使用svg的名字作为icon\n"
			};
		}
	});
}
</script>
<style lang="less"></style>
