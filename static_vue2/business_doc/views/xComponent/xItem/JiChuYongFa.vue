<template>
	<div>
		<xMd :md="md" />
		<div>xItemInput.value: {{ xItemInput.value }}</div>
		<xItem :configs="xItemInput" />
		<div>{{ xItemInputValue }}</div>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			const vm = this;
			return {
				xItemInputValue: "",
				xItemInput: {
					value: "",
					label: "xItemInput",
					tips: "asdfasdf",
					onFocus() {
						vm.xItemInputValue = "onFocus";
					},
					onBlur() {
						vm.xItemInputValue = "onBlur";
					}
				},
				md: `### 基本用法
- itemType:"xItemInput",如果是xItemInput，可以不填。(按照自定义方法，可以实现各种符合业务需要的xItem类组件)
- 组件的属性和方法可以直接以configs对象的属性形式添加，跟h函数的用法一致。
                
#### configs.value
 - 在\`configs\`里面直接添加\`value\`属性，即可实现双向绑定。\`value\`值不可为\`undefined\`，否则无效。
 - 也可以使用\`v-model\`，用于\`configs\`复用，\`value\`值不相同的情况，比如在table的cell中。
\`\`\`js
{
        value: "",
        label: "xItemInput",
        onFocus() {
            vm.xItemInputValue = "onFocus";
        },
        onBlur() {
            vm.xItemInputValue = "onBlur";
        }
}
\`\`\`

`
			};
		}
	});
}
</script>
<style lang="less">
.MUST_MODIFY {
	color: red;
}
</style>
