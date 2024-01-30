<template>
	<div class="cell-wrap">
		<span class="label" :style="style">
			{{ label }}
		</span>
		<span :class="['value', isShow ? 'hideText' : null]">
			<slot />
			<slot name="tooltip" />
			<!--       <span :title="userinfo.remarks"> {{ userinfo.remarks || '- -' }}</span>-->
		</span>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		name: "TableCellItem",
		props: {
			label: {
				type: String,
				default: ""
			},
			labelWidth: {
				type: String,
				default: "80px"
			},
			isShow: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			cell() {
				return this.$parent;
			},
			style() {
				return `min-width:${this.cell.labelWidth || this.labelWidth}`;
			}
		}
	};
}
</script>

<style lang="less" scoped>
.cell-wrap {
	display: flex;
	align-items: center;
	padding: 4px 0;
	.label {
		font-weight: 500;
		font-size: 14px;
		color: var(--color-text-secondary);
		line-height: 40px;
		padding: 0 12px 0 0;
		flex-shrink: 0;
	}
	.value {
		font-size: 14px;
		line-height: 20px;
		color: var(--color-text-primary);
	}
}
.hideText {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
