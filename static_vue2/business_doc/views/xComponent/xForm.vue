<template>
	<div>
		<xForm>
			<xItem :configs="xItemInput" />
			<xItem :configs="xItemInput2" />
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
				xItemInput2: {
					value: "",
					label: "2",
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
					onFocus() {
						vm.xItemInputValue = "onFocus";
					},
					onBlur() {
						vm.xItemInputValue = "onBlur";
					}
				}
			};
		}
	});
}
</script>
<style lang="less"></style>
