<template>
	<div class="flex vertical mr">
		<xMd :md="'当只有一页时，通过设置 `hide-on-single-page` 属性来隐藏分页。'" />
		<xSwitch v-model="value"> </xSwitch>
		<xPagination :hide-on-single-page="value" :total="5" layout="prev, pager, next">
		</xPagination>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				value: false
			};
		}
	});
}
</script>
<style lang="less"></style>
