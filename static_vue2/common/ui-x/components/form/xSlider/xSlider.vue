<style lang="less">
.el-slider__button,
.el-slider__button-wrapper {
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
}

.el-slider::after,
.el-slider::before {
	display: table;
}

.el-slider__button-wrapper .el-tooltip,
.el-slider__button-wrapper::after {
	vertical-align: middle;
	display: inline-block;
}

.el-slider::after {
	clear: both;
}

.el-slider__runway {
	width: 100%;
	height: 6px;
	margin: 16px 0;
	background-color: #e4e7ed;
	border-radius: var(--border-radius--small);
	position: relative;
	cursor: pointer;
	vertical-align: middle;
}

.el-slider__runway.show-input {
	margin-right: 160px;
	width: auto;
}

.el-slider__runway.disabled {
	cursor: default;
}

.el-slider__runway.disabled .el-slider__bar {
	background-color: var(--el-text-color-disabled);
}

.el-slider__runway.disabled .el-slider__button {
	border-color: var(--el-text-color-disabled);
}

.el-slider__runway.disabled .el-slider__button-wrapper.dragging,
.el-slider__runway.disabled .el-slider__button-wrapper.hover,
.el-slider__runway.disabled .el-slider__button-wrapper:hover {
	cursor: not-allowed;
}

.el-slider__runway.disabled .el-slider__button.dragging,
.el-slider__runway.disabled .el-slider__button.hover,
.el-slider__runway.disabled .el-slider__button:hover {
	-webkit-transform: scale(1);
	transform: scale(1);
	cursor: not-allowed;
}

.el-slider__button-wrapper,
.el-slider__stop {
	-webkit-transform: translateX(-50%);
	position: absolute;
}

.el-slider__input {
	float: right;
	margin-top: 3px;
	width: 130px;
}

.el-slider__input.el-input-number--mini {
	margin-top: 5px;
}

.el-slider__input.el-input-number--medium {
	margin-top: 0;
}

.el-slider__input.el-input-number--large {
	margin-top: -2px;
}

.el-slider__bar {
	height: 6px;
	background-color: var(--el-color-primary);
	border-top-left-radius: 3px;
	border-bottom-left-radius: 3px;
	position: absolute;
}

.el-slider__button-wrapper {
	height: 36px;
	width: 36px;
	// z-index: 1001;
	top: -15px;
	transform: translateX(-50%);
	background-color: transparent;
	text-align: center;
	user-select: none;
	line-height: normal;
}

.el-slider__button-wrapper::after {
	height: 100%;
}

.el-slider__button-wrapper.hover,
.el-slider__button-wrapper:hover {
	cursor: -webkit-grab;
	cursor: grab;
}

.el-slider__button-wrapper.dragging {
	cursor: -webkit-grabbing;
	cursor: grabbing;
}

.el-slider__button {
	width: 16px;
	height: 16px;
	border: 2px solid var(--el-color-primary);
	background-color: #fff;
	border-radius: 50%;
	-webkit-transition: 0.2s;
	transition: 0.2s;
	user-select: none;
}
.el-slider__button.dragging,
.el-slider__button.hover,
.el-slider__button:hover {
	-webkit-transform: scale(1.2);
	transform: scale(1.2);
}

.el-slider__button.hover,
.el-slider__button:hover {
	cursor: -webkit-grab;
	cursor: grab;
}

.el-slider__button.dragging {
	cursor: -webkit-grabbing;
	cursor: grabbing;
}

.el-slider__stop {
	height: 6px;
	width: 6px;
	border-radius: 100%;
	background-color: #fff;
	transform: translateX(-50%);
}

.el-slider__marks {
	top: 0;
	left: 12px;
	width: 18px;
	height: 100%;
}

.el-slider__marks-text {
	position: absolute;
	-webkit-transform: translateX(-50%);
	transform: translateX(-50%);
	font-size: 14px;
	color: var(--el-text-color-secondary);
	margin-top: 15px;
}

.el-slider.is-vertical {
	position: relative;
}

.el-slider.is-vertical .el-slider__runway {
	width: 6px;
	height: 100%;
	margin: 0 16px;
}

.el-slider.is-vertical .el-slider__bar {
	width: 6px;
	height: auto;
	border-radius: 0 0 3px 3px;
}

.el-slider.is-vertical .el-slider__button-wrapper {
	top: auto;
	left: -15px;
	-webkit-transform: translateY(50%);
	transform: translateY(50%);
}

.el-slider.is-vertical .el-slider__stop {
	-webkit-transform: translateY(50%);
	transform: translateY(50%);
}

.el-slider.is-vertical.el-slider--with-input {
	padding-bottom: 58px;
}

.el-slider.is-vertical.el-slider--with-input .el-slider__input {
	overflow: visible;
	float: none;
	position: absolute;
	bottom: 22px;
	width: 36px;
	margin-top: 15px;
}

.el-slider.is-vertical.el-slider--with-input .el-slider__input .el-input__inner {
	text-align: center;
	padding-left: 5px;
	padding-right: 5px;
}

.el-slider.is-vertical.el-slider--with-input .el-slider__input .el-input-number__decrease,
.el-slider.is-vertical.el-slider--with-input .el-slider__input .el-input-number__increase {
	top: 32px;
	margin-top: -1px;
	border: 1px solid #dcdfe6;
	line-height: 20px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	-webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.el-slider.is-vertical.el-slider--with-input .el-slider__input .el-input-number__decrease {
	width: 18px;
	right: 18px;
	border-bottom-left-radius: 4px;
}

.el-slider.is-vertical.el-slider--with-input .el-slider__input .el-input-number__increase {
	width: 19px;
	border-bottom-right-radius: 4px;
}

.el-slider.is-vertical.el-slider--with-input
	.el-slider__input
	.el-input-number__increase
	~ .el-input
	.el-input__inner {
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}

.el-slider.is-vertical.el-slider--with-input .el-slider__input:hover .el-input-number__decrease,
.el-slider.is-vertical.el-slider--with-input .el-slider__input:hover .el-input-number__increase {
	border-color: var(--el-text-color-disabled);
}

.el-slider.is-vertical.el-slider--with-input .el-slider__input:active .el-input-number__decrease,
.el-slider.is-vertical.el-slider--with-input .el-slider__input:active .el-input-number__increase {
	border-color: var(--el-color-primary);
}

.el-slider.is-vertical .el-slider__marks-text {
	margin-top: 0;
	left: 15px;
	-webkit-transform: translateY(50%);
	transform: translateY(50%);
}
</style>
<template>
	<div
		class="xSlider el-slider"
		:class="{ 'is-vertical': vertical, 'el-slider--with-input': showInput }"
		role="slider"
		:aria-valuemin="min"
		:aria-valuemax="max"
		:aria-orientation="vertical ? 'vertical' : 'horizontal'"
		:aria-disabled="sliderDisabled">
		<xInputNumber
			v-model="firstValue"
			v-if="showInput && !range"
			class="el-slider__input"
			ref="input"
			@change="emitChange"
			:step="step"
			:disabled="sliderDisabled"
			:controls="showInputControls"
			:min="min"
			:max="max"
			:debounce="debounce"
			:size="inputSize">
		</xInputNumber>
		<div
			class="el-slider__runway"
			:class="{ 'show-input': showInput, disabled: sliderDisabled }"
			:style="runwayStyle"
			@click="onSliderClick"
			ref="slider">
			<div class="el-slider__bar" :style="barStyle"></div>
			<xSliderButton
				:vertical="vertical"
				v-model="firstValue"
				:tooltip-class="tooltipClass"
				ref="button1">
			</xSliderButton>
			<xSliderButton
				:vertical="vertical"
				v-model="secondValue"
				:tooltip-class="tooltipClass"
				ref="button2"
				v-if="range">
			</xSliderButton>
			<div
				class="el-slider__stop"
				v-for="(item, key) in stops"
				:key="key"
				:style="getStopStyle(item)"
				v-if="showStops"></div>
			<template v-if="markList.length > 0">
				<div>
					<div
						v-for="(item, key) in markList"
						:style="getStopStyle(item.position)"
						class="el-slider__stop el-slider__marks-stop"
						:key="key"></div>
				</div>
				<div class="el-slider__marks">
					<xSliderMarker
						:mark="item.mark"
						v-for="(item, key) in markList"
						:key="key"
						:style="getStopStyle(item.position)">
					</xSliderMarker>
				</div>
			</template>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "ElSlider",
		inject: {
			elForm: {
				default: ""
			}
		},
		props: {
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 100
			},
			step: {
				type: Number,
				default: 1
			},
			value: {
				type: [Number, Array],
				default: 0
			},
			showInput: {
				type: Boolean,
				default: false
			},
			showInputControls: {
				type: Boolean,
				default: true
			},
			inputSize: {
				type: String,
				default: "small"
			},
			showStops: {
				type: Boolean,
				default: false
			},
			showTooltip: {
				type: Boolean,
				default: true
			},
			formatTooltip: Function,
			disabled: {
				type: Boolean,
				default: false
			},
			range: {
				type: Boolean,
				default: false
			},
			vertical: {
				type: Boolean,
				default: false
			},
			height: {
				type: String
			},
			debounce: {
				type: Number,
				default: 300
			},
			label: {
				type: String
			},
			tooltipClass: String,
			marks: Object
		},

		components: {
			xSliderButton: () =>
				_.$importVue("/common/ui-x/components/form/xSlider/xSliderButton.vue"),
			xSliderMarker: {
				name: "ElMarker",
				props: {
					mark: {
						type: [String, Object]
					}
				},
				render() {
					let label = typeof this.mark === "string" ? this.mark : this.mark.label;

					return hDiv({
						class: "el-slider__marks-text",
						style: this.mark.style || {},
						children: label
					});
				}
			}
		},

		data() {
			return {
				firstValue: null,
				secondValue: null,
				oldValue: null,
				dragging: false,
				sliderSize: 1
			};
		},

		watch: {
			value(val, oldVal) {
				if (
					this.dragging ||
					(Array.isArray(val) &&
						Array.isArray(oldVal) &&
						val.every((item, index) => item === oldVal[index]))
				) {
					return;
				}
				this.setValues();
			},

			dragging(val) {
				if (!val) {
					this.setValues();
				}
			},

			firstValue(val) {
				if (this.range) {
					this.$emit("input", [this.minValue, this.maxValue]);
				} else {
					this.$emit("input", val);
				}
			},

			secondValue() {
				if (this.range) {
					this.$emit("input", [this.minValue, this.maxValue]);
				}
			},

			min() {
				this.setValues();
			},

			max() {
				this.setValues();
			}
		},

		methods: {
			valueChanged() {
				if (this.range) {
					return ![this.minValue, this.maxValue].every(
						(item, index) => item === this.oldValue[index]
					);
				} else {
					return this.value !== this.oldValue;
				}
			},
			setValues() {
				if (this.min > this.max) {
					console.error("[Element Error][Slider]min should not be greater than max.");
					return;
				}
				const val = this.value;
				if (this.range && Array.isArray(val)) {
					if (val[1] < this.min) {
						this.$emit("input", [this.min, this.min]);
					} else if (val[0] > this.max) {
						this.$emit("input", [this.max, this.max]);
					} else if (val[0] < this.min) {
						this.$emit("input", [this.min, val[1]]);
					} else if (val[1] > this.max) {
						this.$emit("input", [val[0], this.max]);
					} else {
						this.firstValue = val[0];
						this.secondValue = val[1];
						if (this.valueChanged()) {
							this.dispatch("ElFormItem", "el.form.change", [
								this.minValue,
								this.maxValue
							]);
							this.oldValue = val.slice();
						}
					}
				} else if (!this.range && typeof val === "number" && !isNaN(val)) {
					if (val < this.min) {
						this.$emit("input", this.min);
					} else if (val > this.max) {
						this.$emit("input", this.max);
					} else {
						this.firstValue = val;
						if (this.valueChanged()) {
							this.dispatch("ElFormItem", "el.form.change", val);
							this.oldValue = val;
						}
					}
				}
			},

			setPosition(percent) {
				const targetValue = this.min + (percent * (this.max - this.min)) / 100;
				if (!this.range) {
					this.$refs.button1.setPosition(percent);
					return;
				}
				let button;
				if (Math.abs(this.minValue - targetValue) < Math.abs(this.maxValue - targetValue)) {
					button = this.firstValue < this.secondValue ? "button1" : "button2";
				} else {
					button = this.firstValue > this.secondValue ? "button1" : "button2";
				}
				this.$refs[button].setPosition(percent);
			},

			onSliderClick(event) {
				if (this.sliderDisabled || this.dragging) return;
				this.resetSize();
				if (this.vertical) {
					const sliderOffsetBottom = this.$refs.slider.getBoundingClientRect().bottom;
					this.setPosition(
						((sliderOffsetBottom - event.clientY) / this.sliderSize) * 100
					);
				} else {
					const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;
					this.setPosition(((event.clientX - sliderOffsetLeft) / this.sliderSize) * 100);
				}
				this.emitChange();
			},

			resetSize() {
				if (this.$refs.slider) {
					this.sliderSize =
						this.$refs.slider[`client${this.vertical ? "Height" : "Width"}`];
				}
			},

			emitChange() {
				this.$nextTick(() => {
					this.$emit("change", this.range ? [this.minValue, this.maxValue] : this.value);
				});
			},

			getStopStyle(position) {
				return this.vertical ? { bottom: position + "%" } : { left: position + "%" };
			}
		},

		computed: {
			stops() {
				if (!this.showStops || this.min > this.max) return [];
				if (this.step === 0) {
					process.env.NODE_ENV !== "production" &&
						console.warn("[Element Warn][Slider]step should not be 0.");
					return [];
				}
				const stopCount = (this.max - this.min) / this.step;
				const stepWidth = (100 * this.step) / (this.max - this.min);
				const result = [];
				for (let i = 1; i < stopCount; i++) {
					result.push(i * stepWidth);
				}
				if (this.range) {
					return result.filter(step => {
						return (
							step < (100 * (this.minValue - this.min)) / (this.max - this.min) ||
							step > (100 * (this.maxValue - this.min)) / (this.max - this.min)
						);
					});
				} else {
					return result.filter(
						step => step > (100 * (this.firstValue - this.min)) / (this.max - this.min)
					);
				}
			},

			markList() {
				if (!this.marks) {
					return [];
				}

				const marksKeys = Object.keys(this.marks);
				return marksKeys
					.map(parseFloat)
					.sort((a, b) => a - b)
					.filter(point => point <= this.max && point >= this.min)
					.map(point => ({
						point,
						position: ((point - this.min) * 100) / (this.max - this.min),
						mark: this.marks[point]
					}));
			},

			minValue() {
				return Math.min(this.firstValue, this.secondValue);
			},

			maxValue() {
				return Math.max(this.firstValue, this.secondValue);
			},

			barSize() {
				return this.range
					? `${(100 * (this.maxValue - this.minValue)) / (this.max - this.min)}%`
					: `${(100 * (this.firstValue - this.min)) / (this.max - this.min)}%`;
			},

			barStart() {
				return this.range
					? `${(100 * (this.minValue - this.min)) / (this.max - this.min)}%`
					: "0%";
			},

			precision() {
				let precisions = [this.min, this.max, this.step].map(item => {
					let decimal = ("" + item).split(".")[1];
					return decimal ? decimal.length : 0;
				});
				return Math.max.apply(null, precisions);
			},

			runwayStyle() {
				return this.vertical ? { height: this.height } : {};
			},

			barStyle() {
				return this.vertical
					? {
							height: this.barSize,
							bottom: this.barStart
						}
					: {
							width: this.barSize,
							left: this.barStart
						};
			},

			sliderDisabled() {
				return this.disabled || (this.elForm || {}).disabled;
			}
		},

		mounted() {
			let valuetext;
			if (this.range) {
				if (Array.isArray(this.value)) {
					this.firstValue = Math.max(this.min, this.value[0]);
					this.secondValue = Math.min(this.max, this.value[1]);
				} else {
					this.firstValue = this.min;
					this.secondValue = this.max;
				}
				this.oldValue = [this.firstValue, this.secondValue];
				valuetext = `${this.firstValue}-${this.secondValue}`;
			} else {
				if (typeof this.value !== "number" || isNaN(this.value)) {
					this.firstValue = this.min;
				} else {
					this.firstValue = Math.min(this.max, Math.max(this.min, this.value));
				}
				this.oldValue = this.firstValue;
				valuetext = this.firstValue;
			}
			this.$el.setAttribute("aria-valuetext", valuetext);

			// label screen reader
			this.$el.setAttribute(
				"aria-label",
				this.label ? this.label : `slider between ${this.min} and ${this.max}`
			);

			this.resetSize();
			window.addEventListener("resize", this.resetSize);
		},

		beforeDestroy() {
			window.removeEventListener("resize", this.resetSize);
		}
	});
}
</script>
