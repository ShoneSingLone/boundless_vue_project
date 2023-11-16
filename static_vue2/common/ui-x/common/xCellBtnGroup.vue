<template>
	<xBtnGroup :configs="cpt_btnList" :row="row" class="xCellBtnGroup" />
</template>

<script>
export default async function () {
	return {
		data() {
			return {};
		},
		computed: {
			cpt_btnList() {
				if (this.configs?.col?.componentOptions?.btnList) {
					return this.configs?.col?.componentOptions?.btnList({
						xCellBtnGroup: this,
						configs: this.configs,
						col: this.configs.col,
						index: this.configs.index,
						prop: this.configs.prop,
						row: this.configs.row
					});
				} else {
					return [];
				}
			}
		}
	};
}
</script>

<style lang="less">
td {
	> .btn-group-wrapper.xCellBtnGroup {
		margin-top: -5px;
		margin-left: -8px;

		> button.el-button.xBtn {
			padding: 4px 8px;
		}
	}
}
</style>
