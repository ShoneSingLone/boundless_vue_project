<template>
	<div class="el-checkbox-group" role="group" aria-label="checkbox-group">
		<slot></slot>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "ElCheckboxGroup",

		componentName: "ElCheckboxGroup",

		inject: {
			elFormItem: {
				default: ""
			}
		},

		props: {
			value: {},
			disabled: Boolean,
			min: Number,
			max: Number,
			size: String,
			fill: String,
			textColor: String
		},

		computed: {
			_elFormItemSize() {
				return (this.elFormItem || {}).elFormItemSize;
			},
			checkboxGroupSize() {
				return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
			}
		},

		watch: {
			value(value) {
				this.dispatch("ElFormItem", "el.form.change", [value]);
			}
		}
	});
}
</script>
<style lang="less"></style>
