<template>
	<div>
		<xMd :md="md" />
		<xForm col="2" style="--xItem-label-position: flex-start">
			<!-- <xItemWrapper label="输入的信息" :rules="rules" span="full">
				<template #controller>
					<xBlock>
						{{ xItemInput.value }}
					</xBlock>
					<xBlock>
						{{ xItemInput }}
					</xBlock>
				</template>
			</xItemWrapper>
			<xItem :configs="itemType" /> -->
			<xItem :configs="xItemInput" />
			<div>{{ xItemInputValue }}</div>
		</xForm>

		<xBtn :configs="btnSubmit" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			const vm = this;
			return {
				xItemInputValue: "",
				itemType: {
					value: "xItemInput",
					label: "itemType",
					itemType: "xItemSelect",
					options: [
						{
							label: "xItemInput",
							value: "xItemInput"
						},
						{
							label: "xItemSelect",
							value: "xItemSelect"
						}
					],
					onEmitValue({ val }) {
						vm.xItemInput.itemType = val;
					}
				},
				xItemInput: {
					value: "",
					label: "xItemInput",
					itemType: "xItemSelect",
					options: [
						{
							label: "选项1",
							value: "1"
						},
						{
							label: "选项2",
							value: "2"
						}
					],
					placeholder: "请输入",
					// value: "1
					tips: "提示信息",
					msg() {
						return h("div", [h("xTag", ["msg"]), "提示信息"]);
					},
					onEnter() {
						_.$msgSuccess("enter 事件");
					},
					onFocus() {
						vm.xItemInputValue = "onFocus";
					},
					onBlur() {
						vm.xItemInputValue = "onBlur";
					},
					onEmitValue({ val }) {
						vm.xItemInputValue = val;
					},
					rules: [_rules.required()]
				},
				md: `### 基本用法
- itemType:"xItemInput",如果是xItemInput，可以不填。(按照自定义方法，可以实现各种符合业务需要的xItem类组件)
- 组件的属性和方法可以直接以configs对象的属性形式添加，跟h函数的用法一致。

#### configs.value
 - 在\`configs\`里面直接添加\`value\`属性，即可实现双向绑定。
 - \`value\`值**不可**为\`undefined\`，否则无效。
 - 也可以使用\`v-model\`，用于\`configs\`复用，\`value\`值不相同的情况，比如在table的cell中。
`
			};
		},
		computed: {
			btnSubmit() {
				const vm = this;
				return {
					label: "提交",
					preset: "blue",
					async onClick() {
						const [atLestOne] = await _.$validateForm(vm.$el);
						if (atLestOne) {
							_.$msgError("校验未通过");
						} else {
							_.$msgSuccess("成功");
						}
					}
				};
			}
		}
	});
}
</script>
