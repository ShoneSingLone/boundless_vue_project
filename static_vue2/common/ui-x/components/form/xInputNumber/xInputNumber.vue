<template>
	<div
		@dragstart.prevent
		:class="[
			'el-input-number xInputNumber',
			inputNumberSize ? 'el-input-number--' + inputNumberSize : '',
			{ 'is-disabled': inputNumberDisabled },
			{ 'is-without-controls': !controls },
			{ 'is-controls-right': controlsAtRight }
		]">
		<span
			class="el-input-number__decrease"
			role="button"
			v-if="controls"
			@click="decrease"
			:class="{ 'is-disabled': minDisabled }"
			@keydown.enter="decrease">
			<xIcon :icon="cptDecreaseClass" class="xInputNumber-icon"></xIcon>
		</span>
		<span
			class="el-input-number__increase"
			role="button"
			v-if="controls"
			@click="increase"
			:class="{ 'is-disabled': maxDisabled }"
			@keydown.enter="increase">
			<xIcon :icon="cptIncreaseClass" class="xInputNumber-icon"></xIcon>
		</span>
		<xInput
			class="xInputNumber-input"
			ref="input"
			:value="displayValue"
			:placeholder="placeholder"
			:disabled="inputNumberDisabled"
			:size="inputNumberSize"
			:max="max"
			:min="min"
			:name="name"
			:label="label"
			@keydown.up.native.prevent="increase"
			@keydown.down.native.prevent="decrease"
			@blur="handleBlur"
			@focus="handleFocus"
			@input="handleInput"
			@change="handleInputChange">
		</xInput>
	</div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const { useFocus } = await _.$importVue("/common/utils/hooks.vue");

	return defineComponent({
		name: "xInputNumber",
		setup(props) {
			const { focus } = useFocus(this, "input");
			return { focus };
		},
		inject: {
			elForm: {
				default: ""
			},
			elFormItem: {
				default: ""
			}
		},
		directives: {},
		props: {
			step: {
				type: Number,
				default: 1
			},
			stepStrictly: {
				type: Boolean,
				default: false
			},
			max: {
				type: Number,
				default: Infinity
			},
			min: {
				type: Number,
				default: -Infinity
			},
			value: {},
			disabled: Boolean,
			size: String,
			controls: {
				type: Boolean,
				default: true
			},
			controlsPosition: {
				type: String,
				default: ""
			},
			name: String,
			label: String,
			placeholder: String,
			precision: {
				type: Number,
				validator(val) {
					return val >= 0 && val === parseInt(val, 10);
				}
			}
		},
		data() {
			return {
				currentValue: 0,
				userInput: null
			};
		},
		watch: {
			value: {
				immediate: true,
				handler(value) {
					let newVal = value === undefined ? value : Number(value);
					if (newVal !== undefined) {
						if (isNaN(newVal)) {
							return;
						}

						if (this.stepStrictly) {
							const stepPrecision = this.getPrecision(this.step);
							const precisionFactor = Math.pow(10, stepPrecision);
							newVal =
								(Math.round(newVal / this.step) * precisionFactor * this.step) /
								precisionFactor;
						}

						if (this.precision !== undefined) {
							newVal = this.toPrecision(newVal, this.precision);
						}
					}
					if (newVal >= this.max) newVal = this.max;
					if (newVal <= this.min) newVal = this.min;
					this.currentValue = newVal;
					this.userInput = null;
					this.$emit("input", newVal);
				}
			}
		},
		computed: {
			cptDecreaseClass() {
				return `${this.controlsAtRight ? "arrow-down" : "minus"}`;
			},
			cptIncreaseClass() {
				return `${this.controlsAtRight ? "arrow-up" : "plus"}`;
			},
			minDisabled() {
				return this._decrease(this.value, this.step) < this.min;
			},
			maxDisabled() {
				return this._increase(this.value, this.step) > this.max;
			},
			numPrecision() {
				const { value, step, getPrecision, precision } = this;
				const stepPrecision = getPrecision(step);
				if (precision !== undefined) {
					if (stepPrecision > precision) {
						console.warn(
							"[Element Warn][InputNumber]precision should not be less than the decimal places of step"
						);
					}
					return precision;
				} else {
					return Math.max(getPrecision(value), stepPrecision);
				}
			},
			controlsAtRight() {
				return this.controls && this.controlsPosition === "right";
			},
			_elFormItemSize() {
				return (this.elFormItem || {}).elFormItemSize;
			},
			inputNumberSize() {
				return this.size || this._elFormItemSize || PRIVATE_GLOBAL.x_ui.size;
			},
			inputNumberDisabled() {
				return this.disabled || !!(this.elForm || {}).disabled;
			},
			displayValue() {
				if (this.userInput !== null) {
					return this.userInput;
				}

				let currentValue = this.currentValue;

				if (typeof currentValue === "number") {
					if (this.stepStrictly) {
						const stepPrecision = this.getPrecision(this.step);
						const precisionFactor = Math.pow(10, stepPrecision);
						currentValue =
							(Math.round(currentValue / this.step) * precisionFactor * this.step) /
							precisionFactor;
					}

					if (this.precision !== undefined) {
						currentValue = currentValue.toFixed(this.precision);
					}
				}

				return currentValue;
			}
		},
		methods: {
			toPrecision(num, precision) {
				if (precision === undefined) precision = this.numPrecision;
				return parseFloat(
					Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)
				);
			},
			getPrecision(value) {
				if (value === undefined) return 0;
				const valueString = value.toString();
				const dotPosition = valueString.indexOf(".");
				let precision = 0;
				if (dotPosition !== -1) {
					precision = valueString.length - dotPosition - 1;
				}
				return precision;
			},
			_increase(val, step) {
				if (typeof val !== "number" && val !== undefined) return this.currentValue;

				const precisionFactor = Math.pow(10, this.numPrecision);
				// Solve the accuracy problem of JS decimal calculation by converting the value to integer.
				return this.toPrecision(
					(precisionFactor * val + precisionFactor * step) / precisionFactor
				);
			},
			_decrease(val, step) {
				if (typeof val !== "number" && val !== undefined) return this.currentValue;

				const precisionFactor = Math.pow(10, this.numPrecision);

				return this.toPrecision(
					(precisionFactor * val - precisionFactor * step) / precisionFactor
				);
			},
			increase() {
				if (this.inputNumberDisabled || this.maxDisabled) return;
				const value = this.value || 0;
				const newVal = this._increase(value, this.step);
				this.setCurrentValue(newVal);
			},
			decrease() {
				if (this.inputNumberDisabled || this.minDisabled) return;
				const value = this.value || 0;
				const newVal = this._decrease(value, this.step);
				this.setCurrentValue(newVal);
			},
			handleBlur(event) {
				this.$emit("blur", event);
			},
			handleFocus(event) {
				this.$emit("focus", event);
			},
			setCurrentValue(newVal) {
				const oldVal = this.currentValue;
				if (typeof newVal === "number" && this.precision !== undefined) {
					newVal = this.toPrecision(newVal, this.precision);
				}
				if (newVal >= this.max) newVal = this.max;
				if (newVal <= this.min) newVal = this.min;
				if (oldVal === newVal) return;
				this.userInput = null;
				this.$emit("input", newVal);
				this.$emit("change", newVal, oldVal);
				this.currentValue = newVal;
			},
			handleInput(value) {
				this.userInput = value;
			},
			handleInputChange(value) {
				const newVal = value === "" ? undefined : Number(value);
				if (!isNaN(newVal) || value === "") {
					this.setCurrentValue(newVal);
				}
				this.userInput = null;
			},
			select() {
				this.$refs.input.select();
			}
		},
		async mounted() {
			await _.$ensure(() => this.$refs.input?.$refs?.input);
			let innerInput = this.$refs.input.$refs.input;
			innerInput.setAttribute("role", "spinbutton");
			innerInput.setAttribute("aria-valuemax", this.max);
			innerInput.setAttribute("aria-valuemin", this.min);
			innerInput.setAttribute("aria-valuenow", this.currentValue);
			innerInput.setAttribute("aria-disabled", this.inputNumberDisabled);
		},
		updated() {
			if (!this.$refs || !this.$refs.input) return;
			const innerInput = this.$refs.input.$refs.input;
			innerInput.setAttribute("aria-valuenow", this.currentValue);
		}
	});
}
</script>
<style lang="less">
.el-input-number {
	position: relative;
	display: inline-block;
	width: 180px;
	line-height: 38px;
	.xInputNumber-icon {
		width: 8px;
		height: 8px;
	}

	.xInputNumber-input {
		// position: absolute;
	}
}

.el-input-number .el-input {
	display: block;
}

.el-input-number .el-input__inner {
	-webkit-appearance: none;
	padding-left: 50px;
	padding-right: 50px;
	text-align: center;
}

.el-input-number__decrease,
.el-input-number__increase {
	position: absolute;
	z-index: 1;
	top: 1px;
	width: 40px;
	height: 100%;
	text-align: center;
	background: var(--el-fill-color-light);
	color: var(--el-text-color-regular);
	cursor: pointer;
	font-size: 13px;
}

.el-input-number__decrease:hover,
.el-input-number__increase:hover {
	color: var(--el-color-primary);
}

.el-input-number__decrease:hover:not(.is-disabled) ~ .el-input .el-input__inner:not(.is-disabled),
.el-input-number__increase:hover:not(.is-disabled) ~ .el-input .el-input__inner:not(.is-disabled) {
	border-color: var(--el-color-primary);
}

.el-input-number__decrease.is-disabled,
.el-input-number__increase.is-disabled {
	color: var(--el-text-color-disabled);
	cursor: not-allowed;
}

.el-input-number__increase {
	right: 1px;
	border-radius: 0 4px 4px 0;
	border-left: 1px solid #dcdfe6;
}

.el-input-number__decrease {
	left: 1px;
	border-radius: 4px 0 0 4px;
	border-right: 1px solid #dcdfe6;
}

.el-input-number.is-disabled .el-input-number__decrease,
.el-input-number.is-disabled .el-input-number__increase {
	border-color: #e4e7ed;
	color: #e4e7ed;
}

.el-input-number.is-disabled .el-input-number__decrease:hover,
.el-input-number.is-disabled .el-input-number__increase:hover {
	color: #e4e7ed;
	cursor: not-allowed;
}

.el-input-number--medium {
	width: 200px;
	line-height: 34px;
}

.el-input-number--medium .el-input-number__decrease,
.el-input-number--medium .el-input-number__increase {
	width: 36px;
	font-size: 14px;
}

.el-input-number--medium .el-input__inner {
	padding-left: 43px;
	padding-right: 43px;
}

.el-input-number--small {
	width: 130px;
	line-height: 30px;
}

.el-input-number--small .el-input-number__decrease,
.el-input-number--small .el-input-number__increase {
	width: 32px;
	font-size: 13px;
}

.el-input-number--small .el-input-number__decrease [class*="el-icon"],
.el-input-number--small .el-input-number__increase [class*="el-icon"] {
	-webkit-transform: scale(0.9);
	transform: scale(0.9);
}

.el-input-number--small .el-input__inner {
	padding-left: 39px;
	padding-right: 39px;
}

.el-input-number--mini {
	width: 130px;
	line-height: 26px;
}

.el-input-number--mini .el-input-number__decrease,
.el-input-number--mini .el-input-number__increase {
	width: 28px;
	font-size: 12px;
}

.el-input-number--mini .el-input-number__decrease [class*="el-icon"],
.el-input-number--mini .el-input-number__increase [class*="el-icon"] {
	-webkit-transform: scale(0.8);
	transform: scale(0.8);
}

.el-input-number--mini .el-input__inner {
	padding-left: 35px;
	padding-right: 35px;
}

.el-input-number.is-without-controls .el-input__inner {
	padding-left: 15px;
	padding-right: 15px;
}

.el-input-number.is-controls-right .el-input__inner {
	padding-left: 15px;
	padding-right: 50px;
}

.el-input-number.is-controls-right .el-input-number__decrease,
.el-input-number.is-controls-right .el-input-number__increase {
	height: auto;
	line-height: 19px;
}

.el-input-number.is-controls-right .el-input-number__decrease [class*="el-icon"],
.el-input-number.is-controls-right .el-input-number__increase [class*="el-icon"] {
	-webkit-transform: scale(0.8);
	transform: scale(0.8);
}

.el-input-number.is-controls-right .el-input-number__increase {
	border-radius: 0 4px 0 0;
	border-bottom: 1px solid #dcdfe6;
}

.el-input-number.is-controls-right .el-input-number__decrease {
	right: 1px;
	bottom: 1px;
	top: auto;
	left: auto;
	border-right: none;
	border-left: 1px solid #dcdfe6;
	border-radius: 0 0 4px;
}

.el-input-number.is-controls-right[class*="medium"] [class*="decrease"],
.el-input-number.is-controls-right[class*="medium"] [class*="increase"] {
	line-height: 17px;
}

.el-input-number.is-controls-right[class*="small"] [class*="decrease"],
.el-input-number.is-controls-right[class*="small"] [class*="increase"] {
	line-height: 15px;
}

.el-input-number.is-controls-right[class*="mini"] [class*="decrease"],
.el-input-number.is-controls-right[class*="mini"] [class*="increase"] {
	line-height: 13px;
}
</style>
