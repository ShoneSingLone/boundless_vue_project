<template>
	<div class="oprations-tab">
		<div class="oprations-tab_btns">
			<slot name="left" />
		</div>
		<div class="oprations-tab_search">
			<slot />
			<xBtn :configs="cptQueryBtnConfigs" />
			<xBtn :configs="cptResetBtnConfigs" />
			<slot name="right" />
			<xTableFilter v-if="isShowFilter" :configs="configs" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		props: ["configs"],
		computed: {
			cptQueryBtnConfigs() {
				const vm = this;

				return {
					label: i18n("search"),
					preset: "primary",
					isHide() {
						return !vm.isShowInquire;
					},
					onClick() {
						return vm.configs.onQuery({ page: 1 });
					}
				};
			},
			cptResetBtnConfigs() {
				const vm = this;

				return {
					label: i18n("reset_action"),
					isHide() {
						return !vm.isShowReset;
					},
					onClick() {
						_.$resetFormValues(vm.$el);
						return vm.configs.onQuery({ page: 1 });
					}
				};
			},
			isShowReset() {
				return !!_.$val(this, "configs.isShowReset");
			},
			isShowInquire() {
				return !_.$val(this, "configs.isHideQuery");
			},
			isShowFilter() {
				return !_.$val(this, "configs.isHideFilter");
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
