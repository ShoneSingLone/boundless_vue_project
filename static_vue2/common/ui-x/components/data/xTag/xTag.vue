<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return defineComponent({
		name: "ElTag",
		props: {
			text: String,
			closable: Boolean,
			type: String,
			hit: Boolean,
			disableTransitions: Boolean,
			color: String,
			textColor: String,
			size: String,
			effect: {
				type: String,
				default: "light",
				validator(val) {
					return ["dark", "light", "plain", ""].indexOf(val) !== -1;
				}
			}
		},
		methods: {
			handleClose(event) {
				event.stopPropagation();
				this.$emit("close", event);
			},
			handleClick(event) {
				this.$emit("click", event);
			}
		},
		computed: {
			tagSize() {
				return this.size || PRIVATE_GLOBAL.x_ui.size;
			},
			cptStyle() {
				const style = {
					backgroundColor: this.color
				};
				if (this.textColor) {
					style.color = this.textColor;
				}
				return style;
			}
		},
		render(h) {
			let { type, tagSize, hit, effect, cptStyle } = this;
			effect = effect || "empty";
			const classes = [
				"el-tag",
				type ? `el-tag--${type}` : "",
				tagSize ? `el-tag--${tagSize}` : "",
				effect ? `el-tag--${effect}` : "",
				hit && "is-hit"
			];

			const tagEl = h(
				"span",
				{
					class: classes,
					style: cptStyle,
					on: {
						click: this.handleClick
					}
				},
				[
					this.$slots.default,
					hxIcon({
						icon: "close",
						vIf: this.closable,
						class: "el-tag__close el-icon-close",
						on: {
							click: this.handleClose
						}
					})
				]
			);

			return this.disableTransitions
				? tagEl
				: h("transition", { props: { name: "el-zoom-in-center" } }, [tagEl]);
		}
	});
}
</script>
<style lang="less">
.el-tag {
	background-color: #ecf5ff;
	border-color: #d9ecff;
	display: inline-block;
	height: var(--ui-height);
	padding: 0 10px;
	line-height: 30px;
	font-size: 12px;
	color: var(--el-color-primary);
	border-width: 1px;
	border-style: solid;
	border-radius: var(--border-radius);
	box-sizing: border-box;
	white-space: nowrap;
}

.el-tag.is-hit {
	border-color: var(--el-color-primary);
}

.el-tag .el-tag__close {
	color: var(--el-color-primary);
}

.el-tag .el-tag__close:hover {
	color: #fff;
	background-color: var(--el-color-primary);
}

.el-tag.el-tag--info {
	background-color: var(--el-color-info-light-9);
	border-color: #e9e9eb;
	color: var(--el-text-color-secondary);
}

.el-tag.el-tag--info.is-hit {
	border-color: var(--el-text-color-secondary);
}

.el-tag.el-tag--info .el-tag__close {
	color: var(--el-text-color-secondary);
}

.el-tag.el-tag--info .el-tag__close:hover {
	color: #fff;
	background-color: var(--el-text-color-secondary);
}

.el-tag.el-tag--success {
	background-color: #f0f9eb;
	border-color: var(--el-color-success-light-8);
	color: var(--el-color-success);
}

.el-tag.el-tag--success.is-hit {
	border-color: var(--el-color-success);
}

.el-tag.el-tag--success .el-tag__close {
	color: var(--el-color-success);
}

.el-tag.el-tag--success .el-tag__close:hover {
	color: #fff;
	background-color: var(--el-color-success);
}

.el-tag.el-tag--warning {
	background-color: #fdf6ec;
	border-color: var(--el-color-warning-light-8);
	color: var(--el-color-warning);
}

.el-tag.el-tag--warning.is-hit {
	border-color: var(--el-color-warning);
}

.el-tag.el-tag--warning .el-tag__close {
	color: var(--el-color-warning);
}

.el-tag.el-tag--warning .el-tag__close:hover {
	color: #fff;
	background-color: var(--el-color-warning);
}

.el-tag.el-tag--danger {
	background-color: #fef0f0;
	border-color: var(--el-color-error-light-8);
	color: var(--el-color-error);
}

.el-tag.el-tag--danger.is-hit {
	border-color: var(--el-color-error);
}

.el-tag.el-tag--danger .el-tag__close {
	color: var(--el-color-error);
}

.el-tag.el-tag--danger .el-tag__close:hover {
	color: #fff;
	background-color: var(--el-color-error);
}

.el-tag .el-icon-close {
	border-radius: 50%;
	text-align: center;
	position: relative;
	cursor: pointer;
	font-size: 12px;
	height: 16px;
	width: 16px;
	line-height: 16px;
	vertical-align: middle;
	top: -1px;
	right: -5px;
}

.el-tag .el-icon-close::before {
	display: block;
}

.el-tag--dark {
	background-color: var(--el-color-primary);
	border-color: var(--el-color-primary);
	color: #fff;
}

.el-tag--dark.is-hit {
	border-color: var(--el-color-primary);
}

.el-tag--dark .el-tag__close {
	color: #fff;
}

.el-tag--dark .el-tag__close:hover {
	color: #fff;
	background-color: var(--el-color-primary-hover);
}

.el-tag--dark.el-tag--info {
	background-color: var(--el-text-color-secondary);
	border-color: var(--el-text-color-secondary);
	color: #fff;
}

.el-tag--dark.el-tag--info.is-hit {
	border-color: var(--el-text-color-secondary);
}

.el-tag--dark.el-tag--info .el-tag__close {
	color: #fff;
}

.el-tag--dark.el-tag--info .el-tag__close:hover {
	color: #fff;
	background-color: #a6a9ad;
}

.el-tag--dark.el-tag--success {
	background-color: var(--el-color-success);
	border-color: var(--el-color-success);
	color: #fff;
}

.el-tag--dark.el-tag--success.is-hit {
	border-color: var(--el-color-success);
}

.el-tag--dark.el-tag--success .el-tag__close {
	color: #fff;
}

.el-tag--dark.el-tag--success .el-tag__close:hover {
	color: #fff;
	background-color: #85ce61;
}

.el-tag--dark.el-tag--warning {
	background-color: var(--el-color-warning);
	border-color: var(--el-color-warning);
	color: #fff;
}

.el-tag--dark.el-tag--warning.is-hit {
	border-color: var(--el-color-warning);
}

.el-tag--dark.el-tag--warning .el-tag__close {
	color: #fff;
}

.el-tag--dark.el-tag--warning .el-tag__close:hover {
	color: #fff;
	background-color: #ebb563;
}

.el-tag--dark.el-tag--danger {
	background-color: var(--el-color-error);
	border-color: var(--el-color-error);
	color: #fff;
}

.el-tag--dark.el-tag--danger.is-hit {
	border-color: var(--el-color-error);
}

.el-tag--dark.el-tag--danger .el-tag__close {
	color: #fff;
}

.el-tag--dark.el-tag--danger .el-tag__close:hover {
	color: #fff;
	background-color: #f78989;
}

.el-tag--plain {
	background-color: #fff;
	border-color: #b3d8ff;
	color: var(--el-color-primary);
}

.el-tag--plain.is-hit {
	border-color: var(--el-color-primary);
}

.el-tag--plain .el-tag__close {
	color: var(--el-color-primary);
}

.el-tag--plain .el-tag__close:hover {
	color: #fff;
	background-color: var(--el-color-primary);
}

.el-tag--plain.el-tag--info {
	background-color: #fff;
	border-color: #d3d4d6;
	color: var(--el-text-color-secondary);
}

.el-tag--plain.el-tag--info.is-hit {
	border-color: var(--el-text-color-secondary);
}

.el-tag--plain.el-tag--info .el-tag__close {
	color: var(--el-text-color-secondary);
}

.el-tag--plain.el-tag--info .el-tag__close:hover {
	color: #fff;
	background-color: var(--el-text-color-secondary);
}

.el-tag--plain.el-tag--success {
	background-color: #fff;
	border-color: #c2e7b0;
	color: var(--el-color-success);
}

.el-tag--plain.el-tag--success.is-hit {
	border-color: var(--el-color-success);
}

.el-tag--plain.el-tag--success .el-tag__close {
	color: var(--el-color-success);
}

.el-tag--plain.el-tag--success .el-tag__close:hover {
	color: #fff;
	background-color: var(--el-color-success);
}

.el-tag--plain.el-tag--warning {
	background-color: #fff;
	border-color: #f5dab1;
	color: var(--el-color-warning);
}

.el-tag--plain.el-tag--warning.is-hit {
	border-color: var(--el-color-warning);
}

.el-tag--plain.el-tag--warning .el-tag__close {
	color: var(--el-color-warning);
}

.el-tag--plain.el-tag--warning .el-tag__close:hover {
	color: #fff;
	background-color: var(--el-color-warning);
}

.el-tag--plain.el-tag--danger {
	background-color: #fff;
	border-color: #fbc4c4;
	color: var(--el-color-error);
}

.el-tag--plain.el-tag--danger.is-hit {
	border-color: var(--el-color-error);
}

.el-tag--plain.el-tag--danger .el-tag__close {
	color: var(--el-color-error);
}

.el-tag--plain.el-tag--danger .el-tag__close:hover {
	color: #fff;
	background-color: var(--el-color-error);
}

.el-tag--medium {
	height: 28px;
	line-height: 26px;
}

.el-tag--medium .el-icon-close {
	-webkit-transform: scale(0.8);
	transform: scale(0.8);
}

.el-tag--small {
	height: 24px;
	padding: 0 8px;
	line-height: 22px;
}

.el-tag--small .el-icon-close {
	-webkit-transform: scale(0.8);
	transform: scale(0.8);
}

.el-tag--mini {
	height: 20px;
	padding: 0 5px;
	line-height: 19px;
}

.el-tag--mini .el-icon-close {
	margin-left: -3px;
	-webkit-transform: scale(0.7);
	transform: scale(0.7);
}
</style>
