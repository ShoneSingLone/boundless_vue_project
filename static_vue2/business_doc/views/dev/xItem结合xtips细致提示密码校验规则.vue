<template>
	<div class="x-page-view">
		<div>
			<xBtn @click="check">校验</xBtn>
		</div>
		<xCard class="mt10" :header="i18n('xxxxxxxx')">
			<form ref="form">
				<xItem :configs="configs" v-for="(configs, prop) in form" :key="prop" />
			</form>
		</xCard>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		inject: ["APP"],
		beforeDestroy() {},
		components: {},
		async onMounted() {
			_.$ensure(
				() => {
					console.log("try");
					return false;
				},
				1000 * 10,
				1000 * 1
			);
		},
		methods: {
			check() {
				_.$validateForm(this.$el);
			}
		},
		watch: {},
		data(vm) {
			return {
				form: {
					url2: {
						value: "",
						label: i18n("url2"),
						rules: [
							_rules.validator(({ val, xItem }) => {
								return () => {
									xItem.tipsHolder =
										xItem.tipsHolder ||
										h({
											template: `<xIcon icon="exclamationMark" v-xtips="manual" class="ml4"/>`,
											data(vm) {
												return {
													manual: {
														content: () => hDiv([val]),
														visible: true,
														trigger: "manual",
														placement: "right-end",
														onMounted({ popoverVm }) {
															xItem.tipsHolder.instance = popoverVm;
														}
													}
												};
											},
											methods: {}
										});
									if (_.$val(xItem, "tipsHolder.instance")) {
										xItem.tipsHolder.instance.options.content = val;
									}
									return xItem.tipsHolder;
								};
							})
						]
					}
				}
			};
		},
		computed: {}
	};
}
</script>

<style lang="less"></style>
