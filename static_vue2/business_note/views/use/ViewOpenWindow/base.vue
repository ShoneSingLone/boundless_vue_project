<template>
	<div>
		<fieldset>
			<legend>可以直接使用svg的名字作为icon=============commonn/assets/svg 文件夹下是UI默认的资源地址，</legend>
			<xIcon icon="icon_no_data" class="empty" />
			<xIcon icon="arrow_triangle-left" class="empty" />
			<xIcon icon="x-loading" class="empty" />
			<xIcon icon="icon_table_filter" class="empty" />
		</fieldset>
	</div>
</template>

<script lang="ts">
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
