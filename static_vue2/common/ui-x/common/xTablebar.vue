<template>
	<div class="oprations-tab">
		<div class="oprations-tab_btns">
			<slot name="left" />
		</div>
		<div class="oprations-tab_search">
			<slot />
			<xInquire v-if="isShowInquire" @click="configs.onQuery({ current: 0 })" />
			<slot name="right" />
			<xTableFilter v-if="isShowFilter" :configs="configs" />
		</div>
	</div>
</template>

<script>
export default async function () {
	return defineComponent({
		props: ["configs"],
		computed: {
			isShowInquire() {
				return !this?.configs?.isHideQuery;
			},
			isShowFilter() {
				return !this?.configs?.isHideFilter;
			}
		}
	});
}
</script>

<style lang="less">
.oprations-tab {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-end;

	.oprations-tab_btns {
		flex: 1;
	}

	.oprations-tab_search {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;

		.xItem-wrapper + .xItem-wrapper {
			margin-top: 0;
			/* margin-right:10px; */
			margin-left: 10px;
		}
	}
}
</style>
