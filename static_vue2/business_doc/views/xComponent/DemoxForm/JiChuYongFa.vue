<template>
	<div>
		<xForm>
			<div span="full">trigger eventName:{{ tipsString }}</div>
			<xItem :configs="xItemInput" @change="tipsString = 'event change'" />
			<xItem :configs="xItemSelect" />
			<xItem :configs="xItemCheck" />
			<xItem :configs="xItemInput3" />
		</xForm>
		<xBtn :configs="xBtnConfigs" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		computed: {
			xBtnConfigs() {
				const vm = this;
				return {
					label: "提交",
					type: "primary",
					onClick() {
						_.$validateForm(vm.$el);
					}
				};
			}
		},
		data() {
			const vm = this;
			const msg =
				"asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfas\ndfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfapn\nsdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf";

			return {
				tipsString: "",
				xItemInput: {
					value: "",
					label: "xItemInput",
					tips: "asdfasdf",
					msg,
					onFocus() {
						vm.tipsString = "onFocus";
					},
					onBlur() {
						vm.tipsString = "onBlur";
					},
					onEnter() {
						vm.tipsString = "onEnter";
					},
					onEmitValue() {
						// vm.tipsString = "change";
					},
					rules: [_rules.required()],
					itemSlots: {
						afterController() {
							return hSpan({ class: "ml8" }, ["台"]);
						}
					}
				},
				xItemSelect: {
					value: "",
					label: "xItemSelect",
					itemType: "xItemSelect",
					options: [
						{
							label: "1",
							value: "1"
						},
						{
							label: "2",
							value: "2"
						}
					],
					onFocus() {
						vm.tipsString = "onFocus";
					},
					onBlur() {
						vm.tipsString = "onBlur";
					}
				},
				xItemCheck: {
					value: "",
					label: "xItemCheck",
					itemType: "xItemCheck",
					options: ["item"],
					rules: [
						{
							async validator({ val }) {
								return "但凡校验，铁定报错！" + val;
							}
						}
					]
				},
				xItemSelectSub: {
					value: "",
					itemType: "xItemSelect",
					options: [
						{
							label: "1",
							value: "1"
						},
						{
							label: "2",
							value: "2"
						}
					],
					onFocus() {
						vm.tipsString = "onFocus";
					},
					onBlur() {
						vm.tipsString = "onBlur";
					}
				},
				xItemInput3: {
					value: "",
					msg: "没有label",
					$vSlots: {
						prepend() {
							return h("xItem", {
								configs: vm.xItemSelectSub,
								style: `--xItem-wrapper-width:80px`
							});
						}
					},
					onFocus() {
						vm.tipsString = "onFocus";
					},
					onBlur() {
						vm.tipsString = "onBlur";
					},
					rules: [_rules.required()]
				}
			};
		}
	});
}
</script>
<style lang="less"></style>
