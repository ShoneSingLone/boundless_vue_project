<script lang="ts">
export default async function () {
	return defineComponent({
		name: "ElTimeline",
		props: {
			reverse: {
				type: Boolean,
				default: false
			}
		},
		provide() {
			return {
				timeline: this
			};
		},
		render() {
			const reverse = this.reverse;
			const classes = {
				xTimeline: true,
				"el-timeline": true,
				"is-reverse": reverse
			};
			let slots = this.$slots.default || [];
			if (reverse) {
				slots = slots.reverse();
			}
			return h(
				"ul",
				{
					class: classes
				},
				slots
			);
		}
	});
}
</script>
<style lang="less">
.el-timeline {
	margin: 0;
	font-size: 14px;
	list-style: none;
}

.el-timeline .el-timeline-item:last-child .el-timeline-item__tail {
	display: none;
}

.el-timeline-item {
	position: relative;
	padding-bottom: 20px;
}

.el-timeline-item__wrapper {
	position: relative;
	padding-left: 28px;
	top: -3px;
}

.el-timeline-item__tail {
	position: absolute;
	left: 4px;
	height: 100%;
	border-left: 2px solid #e4e7ed;
}

.el-timeline-item__icon {
	color: #fff;
	font-size: 13px;
}

.el-timeline-item__node {
	position: absolute;
	background-color: #e4e7ed;
	border-radius: 50%;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.el-timeline-item__node--normal {
	left: -1px;
	width: 12px;
	height: 12px;
}

.el-timeline-item__node--large {
	left: -2px;
	width: 14px;
	height: 14px;
}

.el-timeline-item__node--primary {
	background-color: var(--el-color-primary);
}

.el-timeline-item__node--success {
	background-color: var(--el-color-success);
}

.el-timeline-item__node--warning {
	background-color: var(--el-color-warning);
}

.el-timeline-item__node--danger {
	background-color: var(--el-color-error);
}

.el-timeline-item__node--info {
	background-color: var(--el-text-color-secondary);
}

.el-timeline-item__dot {
	position: absolute;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.el-timeline-item__content {
	color: var(--el-text-color-primary);
}

.el-timeline-item__timestamp {
	color: var(--el-text-color-secondary);
	line-height: 1;
	font-size: 13px;
}

.el-timeline-item__timestamp.is-top {
	margin-bottom: 8px;
	padding-top: 4px;
}

.el-timeline-item__timestamp.is-bottom {
	margin-top: 8px;
}
</style>
