<template>
	<component
		:is="_elTag"
		class="el-radio-group xRadioGroup"
		role="radiogroup"
		@keydown="handleKeydown">
		<slot></slot>
	</component>
</template>
<script lang="ts">
export default async function () {
	const keyCode = Object.freeze({
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40
	});

	return defineComponent({
		name: "xRadioGroup",

		componentName: "xRadioGroup",

		inject: {
			elFormItem: {
				default: ""
			}
		},

		props: {
			value: {},
			size: String,
			fill: String,
			textColor: String,
			disabled: Boolean
		},

		computed: {
			_elFormItemSize() {
				return (this.elFormItem || {}).elFormItemSize;
			},
			_elTag() {
				let tag = (this.$vnode.data || {}).tag;
				if (!tag || tag === "component") tag = "div";
				return tag;
			},
			radioGroupSize() {
				return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
			}
		},

		created() {
			this.$on("handleChange", value => {
				this.$emit("change", value);
			});
		},
		mounted() {
			// 当radioGroup没有默认选项时，第一个可以选中Tab导航
			const radios = this.$el.querySelectorAll("[type=radio]");
			const firstLabel = this.$el.querySelectorAll("[role=radio]")[0];
			if (![].some.call(radios, radio => radio.checked) && firstLabel) {
				firstLabel.tabIndex = 0;
			}
		},
		methods: {
			handleKeydown(e) {
				// 左右上下按键 可以在radio组内切换不同选项
				const target = e.target;
				const className = target.nodeName === "INPUT" ? "[type=radio]" : "[role=radio]";
				const radios = this.$el.querySelectorAll(className);
				const length = radios.length;
				const index = [].indexOf.call(radios, target);
				const roleRadios = this.$el.querySelectorAll("[role=radio]");
				switch (e.keyCode) {
					case keyCode.LEFT:
					case keyCode.UP:
						e.stopPropagation();
						e.preventDefault();
						if (index === 0) {
							roleRadios[length - 1].click();
							roleRadios[length - 1].focus();
						} else {
							roleRadios[index - 1].click();
							roleRadios[index - 1].focus();
						}
						break;
					case keyCode.RIGHT:
					case keyCode.DOWN:
						if (index === length - 1) {
							e.stopPropagation();
							e.preventDefault();
							roleRadios[0].click();
							roleRadios[0].focus();
						} else {
							roleRadios[index + 1].click();
							roleRadios[index + 1].focus();
						}
						break;
					default:
						break;
				}
			}
		},
		watch: {
			value(value) {
				this.dispatch("ElFormItem", "el.form.change", [this.value]);
			}
		}
	});
}
</script>
