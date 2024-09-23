<style lang="less">
.el-steps {
	display: flex;
	position: relative;
	flex-shrink: 1;
}

.el-steps--simple {
	padding: 13px 8%;
	border-radius: 4px;
	background: #f5f7fa;
}

.el-steps--horizontal {
	white-space: nowrap;
}

.el-steps--vertical {
	height: 100%;
	flex-flow: column;
}

.el-step:last-of-type .el-step__line {
	display: none;
}

.el-step:last-of-type.is-flex {
	flex-basis: auto !important;
	flex-shrink: 0;
	flex-grow: 0;
}

.el-step:last-of-type .el-step__description,
.el-step:last-of-type .el-step__main {
	padding-right: 0;
}

.el-step__head {
	position: relative;
	width: 100%;
	&.is-process {
		color: var(--el-text-color-primary);
		border-color: var(--el-text-color-primary);
	}

	&.is-wait {
		color: var(--el-color-info);
		border-color: var(--el-color-info);
	}

	&.is-success {
		color: var(--el-color-success);
		border-color: var(--el-color-success);
	}

	&.is-error {
		color: var(--el-color-error);
		border-color: var(--el-color-error);
	}

	&.is-finish {
		color: var(--el-color-primary);
		border-color: var(--el-color-primary);
	}
}

.el-step__icon {
	position: relative;
	z-index: 1;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: 24px;
	height: 24px;
	font-size: 14px;
	box-sizing: border-box;
	background: #fff;
	transition: 0.15s ease-out;

	&.is-text {
		border-radius: 50%;
		border: 2px solid;
		border-color: inherit;
	}

	&.is-icon {
		width: 40px;
	}
}

.el-step__icon-inner {
	display: inline-block;
	user-select: none;
	text-align: center;
	font-weight: 700;
	line-height: 1;
	color: inherit;
}

.el-step__icon-inner[class*="el-icon"]:not(.is-status) {
	font-size: 25px;
	font-weight: 400;
}

.el-step__icon-inner.is-status {
	transform: translateY(1px);
}

.el-step__line {
	position: absolute;
	border-color: inherit;
	background-color: var(--el-color-info);
}

.el-step__line-inner {
	display: block;
	border: 1px solid;
	border-color: inherit;
	transition: 0.15s ease-out;
	box-sizing: border-box;
	width: 0;
	height: 0;
}

.el-step__main {
	white-space: normal;
	text-align: left;
}

.el-step__title {
	font-size: 16px;
	line-height: 38px;
}

.el-step__title.is-process {
	font-weight: 700;
	color: var(--el-text-color-primary);
}

.el-step__title.is-wait {
	color: var(--el-color-info);
}

.el-step__title.is-success {
	color: var(--el-color-success);
}

.el-step__title.is-error {
	color: var(--el-color-error);
}

.el-step__title.is-finish {
	color: var(--el-color-primary);
}

.el-step__description {
	padding-right: 10%;
	margin-top: -5px;
	font-size: 12px;
	line-height: 20px;
	font-weight: 400;
}

.el-step__description.is-process {
	color: var(--el-text-color-primary);
}

.el-step__description.is-wait {
	color: var(--el-color-info);
}

.el-step__description.is-success {
	color: var(--el-color-success);
}

.el-step__description.is-error {
	color: var(--el-color-error);
}

.el-step__description.is-finish {
	color: var(--el-color-primary);
}

.el-step.is-horizontal {
	display: inline-block;
}

.el-step.is-horizontal .el-step__line {
	height: 2px;
	top: 11px;
	left: 0;
	right: 0;
}

.el-step.is-vertical {
	display: flex;
}

.el-step.is-vertical .el-step__head {
	flex-grow: 0;
	width: 24px;
}

.el-step.is-vertical .el-step__main {
	padding-left: 10px;
	flex-grow: 1;
}

.el-step.is-vertical .el-step__title {
	line-height: 24px;
	padding-bottom: 8px;
}

.el-step.is-vertical .el-step__line {
	width: 2px;
	top: 0;
	bottom: 0;
	left: 11px;
}

.el-step.is-vertical .el-step__icon.is-icon {
	width: 24px;
}

.el-step.is-center .el-step__head,
.el-step.is-center .el-step__main {
	text-align: center;
}

.el-step.is-center .el-step__description {
	padding-left: 20%;
	padding-right: 20%;
}

.el-step.is-center .el-step__line {
	left: 50%;
	right: -50%;
}

.el-step.is-simple {
	display: flex;
	align-items: center;
}

.el-step.is-simple .el-step__head {
	width: auto;
	font-size: 0;
	padding-right: 10px;
}

.el-step.is-simple .el-step__icon {
	background: transparent;
	width: 16px;
	height: 16px;
	font-size: 12px;
}

.el-step.is-simple .el-step__icon-inner[class*="el-icon"]:not(.is-status) {
	font-size: 18px;
}

.el-step.is-simple .el-step__icon-inner.is-status {
	transform: scale(0.8) translateY(1px);
}

.el-step.is-simple .el-step__main {
	position: relative;
	display: flex;
	align-items: stretch;
	flex-grow: 1;
}

.el-step.is-simple .el-step__title {
	font-size: 16px;
	line-height: 20px;
}

.el-step.is-simple:not(:last-of-type) .el-step__title {
	max-width: 50%;
	word-break: break-all;
}

.el-step.is-simple .el-step__arrow {
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}

.el-step.is-simple .el-step__arrow:after,
.el-step.is-simple .el-step__arrow:before {
	content: "";
	display: inline-block;
	position: absolute;
	height: 15px;
	width: 1px;
	background: var(--el-color-info);
}

.el-step.is-simple .el-step__arrow:before {
	transform: rotate(-45deg) translateY(-4px);
	transform-origin: 0 0;
}

.el-step.is-simple .el-step__arrow:after {
	transform: rotate(45deg) translateY(4px);
	transform-origin: 100% 100%;
}

.el-step.is-simple:last-of-type .el-step__arrow {
	display: none;
}
</style>
<template>
	<div class="el-steps" :class="cptStepsClass">
		<slot></slot>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "ElSteps",
		props: {
			space: [Number, String],
			active: Number,
			direction: {
				type: String,
				default: "horizontal"
			},
			alignCenter: Boolean,
			simple: Boolean,
			finishStatus: {
				type: String,
				default: "finish"
			},
			processStatus: {
				type: String,
				default: "process"
			}
		},
		data() {
			return {
				steps: [],
				stepOffset: 0
			};
		},
		methods: {},
		watch: {
			active(newVal, oldVal) {
				this.$emit("change", newVal, oldVal);
			},

			steps(steps) {
				steps.forEach((child, index) => {
					child.index = index;
				});
			}
		},
		computed: {
			cptStepsClass() {
				const { simple, direction } = this;
				return [!simple && "el-steps--" + direction, simple && "el-steps--simple"];
			}
		}
	});
}
</script>
