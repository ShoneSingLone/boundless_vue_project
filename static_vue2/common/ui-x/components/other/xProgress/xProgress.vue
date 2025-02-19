<style lang="less">
.el-progress {
	position: relative;
	line-height: 1;
}

.el-progress__text {
	font-size: 14px;
	color: #606266;
	display: inline-block;
	vertical-align: middle;
	margin-left: 10px;
	line-height: 1;
}

.el-progress__text i {
	vertical-align: middle;
	display: block;
}

.el-progress--circle,
.el-progress--dashboard {
	display: inline-block;
}

.el-progress--circle .el-progress__text,
.el-progress--dashboard .el-progress__text {
	position: absolute;
	top: 50%;
	left: 0;
	width: 100%;
	text-align: center;
	margin: 0;
	-webkit-transform: translate(0, -50%);
	transform: translate(0, -50%);
}

.el-progress--circle .el-progress__text i,
.el-progress--dashboard .el-progress__text i {
	vertical-align: middle;
	display: inline-block;
}

.el-progress--without-text .el-progress__text {
	display: none;
}

.el-progress--without-text .el-progress-bar {
	padding-right: 0;
	margin-right: 0;
	display: block;
}

.el-progress-bar,
.el-progress-bar__inner::after,
.el-progress-bar__innerText,
.el-spinner {
	display: inline-block;
	vertical-align: middle;
}

.el-progress--text-inside .el-progress-bar {
	padding-right: 0;
	margin-right: 0;
}

.el-progress.is-success .el-progress-bar__inner {
	background-color: var(--el-color-success);
}

.el-progress.is-success .el-progress__text {
	color: var(--el-color-success);
}

.el-progress.is-warning .el-progress-bar__inner {
	background-color: var(--el-color-warning);
}

.el-progress.is-warning .el-progress__text {
	color: var(--el-color-warning);
}

.el-progress.is-exception .el-progress-bar__inner {
	background-color: var(--el-color-error);
}

.el-progress.is-exception .el-progress__text {
	color: var(--el-color-error);
}

.el-progress-bar {
	padding-right: 50px;
	width: 100%;
	margin-right: -55px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.el-progress-bar__outer {
	height: 6px;
	border-radius: 100px;
	background-color: var(--el-border-color-lighter);
	overflow: hidden;
	position: relative;
	vertical-align: middle;
}

.el-progress-bar__inner {
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	background-color: var(--el-color-primary);
	text-align: right;
	border-radius: 100px;
	line-height: 1;
	white-space: nowrap;
	-webkit-transition: width 0.6s ease;
	transition: width 0.6s ease;
}

.el-progress-bar__inner::after {
	height: 100%;
}

.el-progress-bar__innerText {
	color: #fff;
	font-size: 12px;
	margin: 0 5px;
}
</style>
<template>
	<div
		class="el-progress"
		:class="[
			'el-progress--' + type,
			status ? 'is-' + status : '',
			{
				'el-progress--without-text': !showText,
				'el-progress--text-inside': textInside
			}
		]"
		role="progressbar"
		:aria-valuenow="percentage"
		aria-valuemin="0"
		aria-valuemax="100">
		<div class="el-progress-bar" v-if="type === 'line'">
			<div class="el-progress-bar__outer" :style="cptStyleProgressBar">
				<div class="el-progress-bar__inner" :style="barStyle">
					<div
						class="el-progress-bar__innerText"
						:style="{ color: textColor }"
						v-if="showText && textInside">
						{{ content }}
					</div>
				</div>
			</div>
		</div>
		<div
			class="el-progress-circle"
			:style="{ height: width + 'px', width: width + 'px' }"
			v-else>
			<svg viewBox="0 0 100 100">
				<path
					class="el-progress-circle__track"
					:d="trackPath"
					:stroke="defineBackColor"
					:stroke-width="relativeStrokeWidth"
					fill="none"
					:style="trailPathStyle"></path>
				<path
					class="el-progress-circle__path"
					:d="trackPath"
					:stroke="stroke"
					fill="none"
					:stroke-linecap="strokeLinecap"
					:stroke-width="percentage ? relativeStrokeWidth : 0"
					:style="circlePathStyle"></path>
			</svg>
		</div>
		<div class="el-progress__text" v-if="showText && !textInside" :style="cptStyleProgressText">
			<template v-if="!status">{{ content }}</template>
			<i v-else :class="iconClass" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "ElProgress",
		props: {
			type: {
				type: String,
				default: "line",
				validator: val => ["line", "circle", "dashboard"].indexOf(val) > -1
			},
			percentage: {
				type: Number,
				default: 0,
				required: true,
				validator: val => val >= 0 && val <= 100
			},
			status: {
				type: String,
				validator: val => ["success", "exception", "warning"].indexOf(val) > -1
			},
			strokeWidth: {
				type: Number,
				default: 6
			},
			strokeLinecap: {
				type: String,
				default: "round"
			},
			textInside: {
				type: Boolean,
				default: false
			},
			width: {
				type: Number,
				default: 126
			},
			showText: {
				type: Boolean,
				default: true
			},
			color: {
				type: [String, Array, Function],
				default: ""
			},
			defineBackColor: {
				type: [String, Array, Function],
				default: "#ebeef5"
			},
			textColor: {
				type: [String, Array, Function],
				default: ""
			},
			format: Function
		},
		computed: {
			cptStyleProgressBar({ strokeWidth, defineBackColor }) {
				return {
					height: `${strokeWidth}px`,
					backgroundColor: defineBackColor
				};
			},
			cptStyleProgressText({ progressTextSize, textColor }) {
				return {
					fontSize: `${progressTextSize}px`,
					color: textColor
				};
			},
			barStyle() {
				const style = {};
				style.width = this.percentage + "%";
				style.backgroundColor = this.getCurrentColor(this.percentage);
				return style;
			},
			relativeStrokeWidth() {
				return ((this.strokeWidth / this.width) * 100).toFixed(1);
			},
			radius() {
				if (this.type === "circle" || this.type === "dashboard") {
					return parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);
				} else {
					return 0;
				}
			},
			trackPath() {
				const radius = this.radius;
				const isDashboard = this.type === "dashboard";
				return `
          M 50 50
          m 0 ${isDashboard ? "" : "-"}${radius}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? "-" : ""}${radius * 2}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? "" : "-"}${radius * 2}
          `;
			},
			perimeter() {
				return 2 * Math.PI * this.radius;
			},
			rate() {
				return this.type === "dashboard" ? 0.75 : 1;
			},
			strokeDashoffset() {
				const offset = (-1 * this.perimeter * (1 - this.rate)) / 2;
				return `${offset}px`;
			},
			trailPathStyle() {
				return {
					strokeDasharray: `${this.perimeter * this.rate}px, ${this.perimeter}px`,
					strokeDashoffset: this.strokeDashoffset
				};
			},
			circlePathStyle() {
				return {
					strokeDasharray: `${this.perimeter * this.rate * (this.percentage / 100)}px, ${this.perimeter}px`,
					strokeDashoffset: this.strokeDashoffset,
					transition: "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease"
				};
			},
			stroke() {
				let ret;
				if (this.color) {
					ret = this.getCurrentColor(this.percentage);
				} else {
					switch (this.status) {
						case "success":
							ret = "var(--el-color-success)";
							break;
						case "exception":
							ret = "var(--el-color-danger)";
							break;
						case "warning":
							ret = "var(--el-color-warning)";
							break;
						default:
							ret = "var(--el-color-primary)";
					}
				}
				return ret;
			},
			iconClass() {
				if (this.status === "warning") {
					return "el-icon-warning";
				}
				if (this.type === "line") {
					return this.status === "success"
						? "el-icon-circle-check"
						: "el-icon-circle-close";
				} else {
					return this.status === "success" ? "el-icon-check" : "el-icon-close";
				}
			},
			progressTextSize() {
				return this.type === "line"
					? 12 + this.strokeWidth * 0.4
					: this.width * 0.111111 + 2;
			},
			content() {
				if (typeof this.format === "function") {
					return this.format(this.percentage) || "";
				} else {
					return `${this.percentage}%`;
				}
			}
		},
		methods: {
			getCurrentColor(percentage) {
				if (typeof this.color === "function") {
					return this.color(percentage);
				} else if (typeof this.color === "string") {
					return this.color;
				} else {
					return this.getLevelColor(percentage);
				}
			},
			getLevelColor(percentage) {
				const colorArray = this.getColorArray().sort((a, b) => a.percentage - b.percentage);

				for (let i = 0; i < colorArray.length; i++) {
					if (colorArray[i].percentage > percentage) {
						return colorArray[i].color;
					}
				}
				return colorArray[colorArray.length - 1].color;
			},
			getColorArray() {
				const color = this.color;
				const span = 100 / color.length;
				return color.map((seriesColor, index) => {
					if (typeof seriesColor === "string") {
						return {
							color: seriesColor,
							percentage: (index + 1) * span
						};
					}
					return seriesColor;
				});
			}
		}
	});
}
</script>
