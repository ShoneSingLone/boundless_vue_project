<template>
	<div>
		<xForm>
			<xItem :configs="xItemInput" />
			<xItem :configs="xItemSelect" />
			<xItem :configs="xItemInput3" />
			<xItem :configs="xItemInput3" />
			<xItem :configs="xItemInput3" />
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
			return {
				xItemInputValue: "",
				xItemInput: {
					value: "",
					label: "xItemInput",
					tips: "asdfasdf",
					msg: "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfas\ndfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfapn\nsdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf",
					onFocus() {
						vm.xItemInputValue = "onFocus";
					},
					onBlur() {
						vm.xItemInputValue = "onBlur";
					},
					rules: [_rules.required()]
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
						vm.xItemInputValue = "onFocus";
					},
					onBlur() {
						vm.xItemInputValue = "onBlur";
					}
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
						vm.xItemInputValue = "onFocus";
					},
					onBlur() {
						vm.xItemInputValue = "onBlur";
					}
				},
				xItemInput3: {
					value: "",
					label: "label3",
					msg: "提示",
					$vSlots: {
						prepend() {
							return h("xItem", { configs: vm.xItemSelectSub, style: `--xItem-wrapper-width:80px` });
						}
					},
					onFocus() {
						vm.xItemInputValue = "onFocus";
					},
					onBlur() {
						vm.xItemInputValue = "onBlur";
					},
					rules: [_rules.required()]
				}
			};
		}
	});
}
</script>
<style lang="less"></style>
