<template>
	<div
		class="xSwitch el-switch"
		:class="{ 'is-disabled': switchDisabled, 'is-checked': checked }"
		role="switch"
		:aria-checked="checked"
		:aria-disabled="switchDisabled"
		@click.prevent="switchValue">
		<input
			class="el-switch__input"
			type="checkbox"
			@change="handleChange"
			ref="input"
			:id="id"
			:name="name"
			:true-value="activeValue"
			:false-value="inactiveValue"
			:disabled="switchDisabled"
			@keydown.enter="switchValue" />
		<!-- label -->
		<span
			:class="['el-switch__label', 'el-switch__label--left', { 'is-active': !checked }]"
			v-if="inactiveIconClass || inactiveText">
			<i :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
			<span v-if="!inactiveIconClass && inactiveText" :aria-hidden="checked">{{
				inactiveText
			}}</span>
		</span>
		<!-- bar -->
		<div class="xSwitch__core-wrapper">
			<span class="el-switch__core" ref="core" :style="{ width: coreWidth + 'px' }" />
			<span class="xSwitch__core-bar" />
		</div>
		<!-- bar -->
		<!-- label -->
		<span
			:class="['el-switch__label', 'el-switch__label--right', { 'is-active': checked }]"
			v-if="activeIconClass || activeText">
			<i :class="[activeIconClass]" v-if="activeIconClass"></i>
			<span v-if="!activeIconClass && activeText" :aria-hidden="!checked">{{
				activeText
			}}</span>
		</span>
	</div>
</template>
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const [{ useFocus }] = await Promise.all([_.$importVue("/common/utils/hooks.vue")]);

	return defineComponent({
		name: "xSwitch",
		setup() {
			const { focus } = useFocus(this, "input");
			return { focus };
		},
		inject: {
			elForm: {
				default: ""
			}
		},
		props: {
			value: {
				type: [Boolean, String, Number],
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			width: {
				type: Number
			},
			activeIconClass: {
				type: String,
				default: ""
			},
			inactiveIconClass: {
				type: String,
				default: ""
			},
			activeText: String,
			inactiveText: String,
			activeColor: {
				type: String,
				default: ""
			},
			inactiveColor: {
				type: String,
				default: ""
			},
			activeValue: {
				type: [Boolean, String, Number],
				default: true
			},
			inactiveValue: {
				type: [Boolean, String, Number],
				default: false
			},
			name: {
				type: String,
				default: ""
			},
			validateEvent: {
				type: Boolean,
				default: true
			},
			id: String
		},
		data() {
			return {
				coreWidth: 40
			};
		},
		created() {
			if (!~[this.activeValue, this.inactiveValue].indexOf(this.value)) {
				this.$emit("input", this.inactiveValue);
			}
		},
		computed: {
			checked() {
				return this.value === this.activeValue;
			},
			switchDisabled() {
				return this.disabled || (this.elForm || {}).disabled;
			}
		},
		watch: {
			checked() {
				this.$refs.input.checked = this.checked;
				if (this.activeColor || this.inactiveColor) {
					this.setBackgroundColor();
				}
				if (this.validateEvent) {
					this.dispatch("ElFormItem", "el.form.change", [this.value]);
				}
			}
		},
		methods: {
			handleChange(event) {
				const val = this.checked ? this.inactiveValue : this.activeValue;
				this.$emit("input", val);
				this.$emit("change", val);
				this.$nextTick(() => {
					// set input's checked property
					// in case parent refuses to change component's value
					if (this.$refs.input) {
						this.$refs.input.checked = this.checked;
					}
				});
			},
			setBackgroundColor() {
				let newColor = this.checked ? this.activeColor : this.inactiveColor;
				this.$refs.core.style.borderColor = newColor;
				this.$refs.core.style.backgroundColor = newColor;
			},
			switchValue() {
				!this.switchDisabled && this.handleChange();
			}
		},
		mounted() {
			/* istanbul ignore if */
			this.coreWidth = this.width || PRIVATE_GLOBAL.x_switch_width;
			if (this.activeColor || this.inactiveColor) {
				this.setBackgroundColor();
			}
			this.$refs.input.checked = this.checked;
		}
	});
}
</script>
<style lang="less">
.xSwitch.el-switch {
	display: -webkit-inline-box;
	display: -ms-inline-flexbox;
	display: inline-flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	position: relative;
	font-size: 14px;
	line-height: 20px;
	height: 20px;
	vertical-align: middle;

	.el-switch__input {
		position: absolute;
		width: 0;
		height: 0;
		opacity: 0;
		margin: 0;
	}

	.xSwitch__core-wrapper {
		display: inline-block;
		position: relative;
		.el-switch__core {
			margin: 0;
			position: relative;
			width: 40px;
			height: 20px;
			border: 1px solid #dcdfe6;
			outline: 0;
			border-radius: 10px;
			box-sizing: border-box;
			background: #dcdfe6;
			transition:
				border-color 0.3s,
				background-color 0.3s;
			vertical-align: middle;
		}
		.xSwitch__core-bar {
			content: "";
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 1px;
			border-radius: 100%;
			transition: all 0.3s;
			width: 16px;
			height: 16px;
			background-color: #fff;
		}
	}

	.el-switch__core,
	.el-switch__label {
		display: inline-block;
		cursor: pointer;
		position: relative;
	}

	.el-switch__label {
		* {
			line-height: 1;
			font-size: 14px;
			display: inline-block;
		}

		-webkit-transition: 0.2s;
		transition: 0.2s;
		height: 20px;
		font-size: 14px;
		font-weight: 500;
		vertical-align: middle;

		color: var(--el-text-color-primary);
		&.is-active {
			color: var(--el-color-primary);
		}
	}

	.el-switch__label--left {
		margin-right: 10px;
	}

	.el-switch__label--right {
		margin-left: 10px;
	}

	.el-switch--wide {
		.el-switch__label.el-switch__label--left {
			span {
				left: 10px;
			}
		}

		.el-switch__label.el-switch__label--right {
			span {
				right: 10px;
			}
		}
	}

	.label-fade-enter,
	.label-fade-leave-active {
		opacity: 0;
	}

	&.is-disabled {
		opacity: 0.6;
		.el-switch__core,
		.el-switch__label {
			cursor: not-allowed;
		}
	}

	&.is-checked {
		.xSwitch__core-wrapper {
			.el-switch__core {
				border-color: var(--el-color-primary);
				background-color: var(--el-color-primary);
			}

			.xSwitch__core-bar {
				left: 100%;
				margin-left: -18px;
			}
		}
	}
}
</style>
