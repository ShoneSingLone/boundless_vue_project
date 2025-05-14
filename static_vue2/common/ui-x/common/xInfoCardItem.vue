<template>
	<div data-role="cell" :data-span="cpt_span" class="el-descriptions-row flex cell">
		<div class="el-descriptions-item__label is-bordered-label">
			<span :style="labelStyle">
				{{ cpt_label }}
			</span>
		</div>
		<div class="el-descriptions-item__content flex1">
			<span :style="contentStyle">
				{{ cpt_content }}
			</span>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return {
		props: ["item", "unitWidth", "span"],
		async mounted() {},
		computed: {
			labelStyle() {
				if (this.cpt_label === "___") {
					return {
						opacity: 0
					};
				}
				return {};
			},
			contentStyle() {
				if (this.cpt_content === "___") {
					return {
						opacity: 0
					};
				}
				return {};
			},
			cpt_span() {
				return this.item.span || 1;
			},
			cpt_label() {
				if (_.isFunction(this.item.label)) {
					return this.item.label();
				}
				return this.item.label || "___";
			},
			cpt_content() {
				if (_.isFunction(this.item.content)) {
					return this.item.content();
				}
				return this.item.content || "___";
			}
		},
		watch: {},
		data() {
			return {};
		},
		methods: {}
	};
}
</script>
<style lang="less">
.el-descriptions {
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	font-size: 14px;
	color: var(--el-text-color-primary);
}

.el-descriptions__header {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	margin-bottom: 20px;
}

.el-descriptions__title {
	font-size: 16px;
	font-weight: 700;
}

.el-descriptions--mini,
.el-descriptions--small {
	font-size: 12px;
}

.el-descriptions__body {
	color: #606266;
	background-color: #fff;
}

.el-descriptions__body .el-descriptions__table {
	border-collapse: collapse;
	width: 100%;
	table-layout: fixed;
}

.el-descriptions__body .el-descriptions__table .el-descriptions-item__cell {
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	text-align: left;
	font-weight: 400;
	line-height: 1.5;
}

.el-descriptions__body .el-descriptions__table .el-descriptions-item__cell.is-left {
	text-align: left;
}

.el-descriptions__body .el-descriptions__table .el-descriptions-item__cell.is-center {
	text-align: center;
}

.el-descriptions__body .el-descriptions__table .el-descriptions-item__cell.is-right {
	text-align: right;
}

.el-descriptions .is-bordered {
	table-layout: auto;
}

.el-descriptions .is-bordered .el-descriptions-item__cell {
	border: 1px solid var(--el-border-color-lighter);
	padding: 12px 10px;
}

.el-descriptions :not(.is-bordered) .el-descriptions-item__cell {
	padding-bottom: 12px;
}

.el-descriptions--medium.is-bordered .el-descriptions-item__cell {
	padding: 10px;
}

.el-descriptions--medium:not(.is-bordered) .el-descriptions-item__cell {
	padding-bottom: 10px;
}

.el-descriptions--small.is-bordered .el-descriptions-item__cell {
	padding: 8px 10px;
}

.el-descriptions--small:not(.is-bordered) .el-descriptions-item__cell {
	padding-bottom: 8px;
}

.el-descriptions--mini.is-bordered .el-descriptions-item__cell {
	padding: 6px 10px;
}

.el-descriptions--mini:not(.is-bordered) .el-descriptions-item__cell {
	padding-bottom: 6px;
}

.el-descriptions-item__container {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
}

.el-descriptions-item__label.has-colon::after {
	content: ":";
	position: relative;
	top: -0.5px;
}

.el-descriptions-item__label.is-bordered-label {
	font-weight: 700;
	color: var(--el-text-color-secondary);
	background: var(--el-fill-color-lighter);
}

.el-descriptions-item__label:not(.is-bordered-label) {
	margin-right: 10px;
}
</style>
