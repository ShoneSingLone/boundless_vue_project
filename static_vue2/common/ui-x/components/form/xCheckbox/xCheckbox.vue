<template>
	<label
		class="el-checkbox"
		:class="[
			border && checkboxSize ? 'el-checkbox--' + checkboxSize : '',
			{ 'is-disabled': isDisabled },
			{ 'is-bordered': border },
			{ 'is-checked': isChecked }
		]"
		:id="id">
		<span
			class="el-checkbox__input"
			:class="{
				'is-disabled': isDisabled,
				'is-checked': isChecked,
				'is-indeterminate': indeterminate,
				'is-focus': focus
			}"
			:tabindex="indeterminate ? 0 : false"
			:role="indeterminate ? 'checkbox' : false"
			:aria-checked="indeterminate ? 'mixed' : false">
			<span class="el-checkbox__inner"></span>
			<input
				v-if="trueLabel || falseLabel"
				class="el-checkbox__original"
				type="checkbox"
				:aria-hidden="indeterminate ? 'true' : 'false'"
				:name="name"
				:disabled="isDisabled"
				:true-value="trueLabel"
				:false-value="falseLabel"
				v-model="model"
				@change="handleChange"
				@focus="focus = true"
				@blur="focus = false" />
			<input
				v-else
				class="el-checkbox__original"
				type="checkbox"
				:aria-hidden="indeterminate ? 'true' : 'false'"
				:disabled="isDisabled"
				:value="label"
				:name="name"
				v-model="model"
				@change="handleChange"
				@focus="focus = true"
				@blur="focus = false" />
		</span>
		<span class="el-checkbox__label" v-if="$slots.default || label">
			<slot></slot>
			<template v-if="!$slots.default">{{ label }}</template>
		</span>
	</label>
</template>
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return defineComponent({
		name: "ElCheckbox",
		inject: {
			elForm: {
				default: ""
			},
			elFormItem: {
				default: ""
			}
		},
		componentName: "ElCheckbox",
		data() {
			return {
				selfModel: false,
				focus: false,
				isLimitExceeded: false
			};
		},

		computed: {
			model: {
				get() {
					return this.isGroup
						? this.store
						: this.value !== undefined
							? this.value
							: this.selfModel;
				},

				set(val) {
					if (this.isGroup) {
						this.isLimitExceeded = false;
						this._checkboxGroup.min !== undefined &&
							val.length < this._checkboxGroup.min &&
							(this.isLimitExceeded = true);

						this._checkboxGroup.max !== undefined &&
							val.length > this._checkboxGroup.max &&
							(this.isLimitExceeded = true);

						this.isLimitExceeded === false &&
							this.dispatch("ElCheckboxGroup", "input", [val]);
					} else {
						this.$emit("input", val);
						this.selfModel = val;
					}
				}
			},

			isChecked() {
				if ({}.toString.call(this.model) === "[object Boolean]") {
					return this.model;
				} else if (Array.isArray(this.model)) {
					return this.model.indexOf(this.label) > -1;
				} else if (this.model !== null && this.model !== undefined) {
					return this.model === this.trueLabel;
				}
			},

			isGroup() {
				let parent = this.$parent;
				while (parent) {
					if (parent.$options.componentName !== "ElCheckboxGroup") {
						parent = parent.$parent;
					} else {
						this._checkboxGroup = parent;
						return true;
					}
				}
				return false;
			},

			store() {
				return this._checkboxGroup ? this._checkboxGroup.value : this.value;
			},

			/* used to make the isDisabled judgment under max/min props */
			isLimitDisabled() {
				const { max, min } = this._checkboxGroup;
				return (
					(!!(max || min) && this.model.length >= max && !this.isChecked) ||
					(this.model.length <= min && this.isChecked)
				);
			},

			isDisabled() {
				return this.isGroup
					? this._checkboxGroup.disabled ||
							this.disabled ||
							(this.elForm || {}).disabled ||
							this.isLimitDisabled
					: this.disabled || (this.elForm || {}).disabled;
			},

			_elFormItemSize() {
				return (this.elFormItem || {}).elFormItemSize;
			},

			checkboxSize() {
				const temCheckboxSize =
					this.size || this._elFormItemSize || PRIVATE_GLOBAL.x_ui.size;
				return this.isGroup
					? this._checkboxGroup.checkboxGroupSize || temCheckboxSize
					: temCheckboxSize;
			}
		},

		props: {
			value: {},
			label: {},
			indeterminate: Boolean,
			disabled: Boolean,
			checked: Boolean,
			name: String,
			trueLabel: [String, Number],
			falseLabel: [String, Number],
			id: String /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/,
			controls:
				String /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/,
			border: Boolean,
			size: String
		},

		methods: {
			addToStore() {
				if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
					this.model.push(this.label);
				} else {
					this.model = this.trueLabel || true;
				}
			},
			handleChange(ev) {
				if (this.isLimitExceeded) return;
				let value;
				if (ev.target.checked) {
					value = this.trueLabel === undefined ? true : this.trueLabel;
				} else {
					value = this.falseLabel === undefined ? false : this.falseLabel;
				}
				this.$emit("change", value, ev);
				this.$nextTick(() => {
					if (this.isGroup) {
						this.dispatch("ElCheckboxGroup", "change", [this._checkboxGroup.value]);
					}
				});
			}
		},

		created() {
			this.checked && this.addToStore();
		},
		mounted() {
			// 为indeterminate元素 添加aria-controls 属性
			if (this.indeterminate) {
				this.$el.setAttribute("aria-controls", this.controls);
			}
		},

		watch: {
			value(value) {
				this.dispatch("ElFormItem", "el.form.change", value);
			}
		}
	});
}
</script>
<style lang="less">
.el-checkbox,
.el-checkbox__input {
	display: inline-block;
	position: relative;
	white-space: nowrap;
}

.el-checkbox {
	color: #606266;
	font-weight: 500;
	font-size: 14px;
	cursor: pointer;
	user-select: none;
	margin-right: 30px;
}

.el-checkbox.is-bordered {
	padding: 9px 20px 9px 10px;
	border-radius: var(--border-radius);
	border: 1px solid #dcdfe6;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	line-height: normal;
	height: 40px;
}

.el-checkbox.is-bordered.is-checked {
	border-color: var(--el-color-primary);
}

.el-checkbox.is-bordered.is-disabled {
	border-color: var(--el-border-color-lighter);
	cursor: not-allowed;
}

.el-checkbox.is-bordered + .el-checkbox.is-bordered {
	margin-left: 10px;
}

.el-checkbox.is-bordered.el-checkbox--medium {
	padding: 7px 20px 7px 10px;
	border-radius: var(--border-radius);
	height: 36px;
}

.el-checkbox.is-bordered.el-checkbox--medium .el-checkbox__label {
	line-height: 17px;
	font-size: 14px;
}

.el-checkbox.is-bordered.el-checkbox--medium .el-checkbox__inner {
	height: 14px;
	width: 14px;
}

.el-checkbox.is-bordered.el-checkbox--small {
	padding: 5px 15px 5px 10px;
	border-radius: var(--border-radius--small);
	height: var(--ui-height);
}

.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__label {
	line-height: 15px;
	font-size: 12px;
}

.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner {
	height: 12px;
	width: 12px;
}

.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner::after {
	height: 6px;
	width: 2px;
}

.el-checkbox.is-bordered.el-checkbox--mini {
	padding: 3px 15px 3px 10px;
	border-radius: var(--border-radius--small);
	height: 28px;
}

.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__label {
	line-height: 12px;
	font-size: 12px;
}

.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__inner {
	height: 12px;
	width: 12px;
}

.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__inner::after {
	height: 6px;
	width: 2px;
}

.el-checkbox__input {
	cursor: pointer;
	outline: 0;
	line-height: 1;
	vertical-align: middle;
}

.el-checkbox__input.is-disabled .el-checkbox__inner {
	background-color: #edf2fc;
	border-color: #dcdfe6;
	cursor: not-allowed;
}

.el-checkbox__input.is-disabled .el-checkbox__inner::after {
	cursor: not-allowed;
	border-color: var(--el-text-color-disabled);
}

.el-checkbox__input.is-disabled .el-checkbox__inner + .el-checkbox__label {
	cursor: not-allowed;
}

.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
	background-color: #f2f6fc;
	border-color: #dcdfe6;
}

.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
	border-color: var(--el-text-color-disabled);
}

.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner {
	background-color: #f2f6fc;
	border-color: #dcdfe6;
}

.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner::before {
	background-color: var(--el-text-color-disabled);
	border-color: var(--el-text-color-disabled);
}

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
	background-color: var(--el-color-primary);
	border-color: var(--el-color-primary);
}

.el-checkbox__input.is-disabled + span.el-checkbox__label {
	color: var(--el-text-color-disabled);
	cursor: not-allowed;
}

.el-checkbox__input.is-checked .el-checkbox__inner::after {
	-webkit-transform: rotate(45deg) scaleY(1);
	transform: rotate(45deg) scaleY(1);
}

.el-checkbox__input.is-checked + .el-checkbox__label {
	color: var(--el-color-primary);
}

.el-checkbox__input.is-focus .el-checkbox__inner {
	border-color: var(--el-color-primary);
}

.el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
	content: "";
	position: absolute;
	display: block;
	background-color: #fff;
	height: 2px;
	-webkit-transform: scale(0.5);
	transform: scale(0.5);
	left: 0;
	right: 0;
	top: 5px;
}

.el-checkbox__input.is-indeterminate .el-checkbox__inner::after {
	display: none;
}

.el-checkbox__inner {
	display: inline-block;
	position: relative;
	border: 1px solid #dcdfe6;
	border-radius: var(--border-radius--mini);
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	width: 14px;
	height: 14px;
	background-color: #fff;
	z-index: 1;
	-webkit-transition:
		border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
		background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
	transition:
		border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
		background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
}

.el-checkbox__inner:hover {
	border-color: var(--el-color-primary);
}

.el-checkbox__inner::after {
	-webkit-box-sizing: content-box;
	box-sizing: content-box;
	content: "";
	border: 1px solid #fff;
	border-left: 0;
	border-top: 0;
	height: 7px;
	left: 4px;
	position: absolute;
	top: 1px;
	-webkit-transform: rotate(45deg) scaleY(0);
	transform: rotate(45deg) scaleY(0);
	width: 3px;
	-webkit-transition: -webkit-transform 0.15s ease-in 0.05s;
	transition: -webkit-transform 0.15s ease-in 0.05s;
	transition: transform 0.15s ease-in 0.05s;
	transition:
		transform 0.15s ease-in 0.05s,
		-webkit-transform 0.15s ease-in 0.05s;
	-webkit-transform-origin: center;
	transform-origin: center;
}

.el-checkbox__original {
	opacity: 0;
	outline: 0;
	position: absolute;
	margin: 0;
	width: 0;
	height: 0;
	z-index: -1;
}

.el-checkbox-button,
.el-checkbox-button__inner {
	display: inline-block;
	position: relative;
}

.el-checkbox__label {
	display: inline-block;
	padding-left: 10px;
	line-height: 19px;
	font-size: 14px;
}

.el-checkbox:last-of-type {
	margin-right: 0;
}

.el-checkbox-button__inner {
	line-height: 1;
	font-weight: 500;
	white-space: nowrap;
	vertical-align: middle;
	cursor: pointer;
	background: #fff;
	border: 1px solid #dcdfe6;
	border-left: 0;
	color: #606266;
	-webkit-appearance: none;
	text-align: center;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	outline: 0;
	margin: 0;
	-webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	padding: 12px 20px;
	font-size: 14px;
	border-radius: 0;
}

.el-checkbox-button__inner.is-round {
	padding: 12px 20px;
}

.el-checkbox-button__inner:hover {
	color: var(--el-color-primary);
}

.el-checkbox-button__inner [class*="el-icon-"] {
	line-height: 0.9;
}

.el-checkbox-button__inner [class*="el-icon-"] + span {
	margin-left: 5px;
}

.el-checkbox-button__original {
	opacity: 0;
	outline: 0;
	position: absolute;
	margin: 0;
	z-index: -1;
}

.el-checkbox-button.is-checked .el-checkbox-button__inner {
	color: #fff;
	background-color: var(--el-color-primary);
	border-color: var(--el-color-primary);
	-webkit-box-shadow: -1px 0 0 0 #8cc5ff;
	box-shadow: -1px 0 0 0 #8cc5ff;
}

.el-checkbox-button.is-checked:first-child .el-checkbox-button__inner {
	border-left-color: var(--el-color-primary);
}

.el-checkbox-button.is-disabled .el-checkbox-button__inner {
	color: var(--el-text-color-disabled);
	cursor: not-allowed;
	background-image: none;
	background-color: #fff;
	border-color: var(--el-border-color-lighter);
	-webkit-box-shadow: none;
	box-shadow: none;
}

.el-checkbox-button.is-disabled:first-child .el-checkbox-button__inner {
	border-left-color: var(--el-border-color-lighter);
}

.el-checkbox-button:first-child .el-checkbox-button__inner {
	border-left: 1px solid #dcdfe6;
	border-radius: 4px 0 0 4px;
	-webkit-box-shadow: none !important;
	box-shadow: none !important;
}

.el-checkbox-button.is-focus .el-checkbox-button__inner {
	border-color: var(--el-color-primary);
}

.el-checkbox-button:last-child .el-checkbox-button__inner {
	border-radius: 0 4px 4px 0;
}

.el-checkbox-button--medium .el-checkbox-button__inner {
	padding: 10px 20px;
	font-size: 14px;
	border-radius: 0;
}

.el-checkbox-button--medium .el-checkbox-button__inner.is-round {
	padding: 10px 20px;
}

.el-checkbox-button--small .el-checkbox-button__inner {
	padding: 9px 15px;
	font-size: 12px;
	border-radius: 0;
}

.el-checkbox-button--small .el-checkbox-button__inner.is-round {
	padding: 9px 15px;
}

.el-checkbox-button--mini .el-checkbox-button__inner {
	padding: 7px 15px;
	font-size: 12px;
	border-radius: 0;
}

.el-checkbox-button--mini .el-checkbox-button__inner.is-round {
	padding: 7px 15px;
}

.el-checkbox-group {
	font-size: 0;
}
</style>
