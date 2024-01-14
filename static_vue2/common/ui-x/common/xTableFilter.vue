<template>
	<el-dropdown trigger="click" :hide-on-click="false">
		<div class="loader-wrapper">
			<xIcon icon="icon_table_filter" style="width: 24px; height: 24px; color: var(--ui-base-color-5)" class="pointer ml4" />
		</div>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item v-for="item in items" :key="item.label">
				<el-checkbox v-model="item.isShow">{{ item.label }}</el-checkbox>
			</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script lang="ts">
export default async function () {
	/* xPagination  后台是以0开始，注意current的加减*/
	return {
		model: {
			prop: "value",
			event: "change"
		},
		props: ["configs"],
		data() {
			return {
				pagination: {}
			};
		},
		mounted() {},
		watch: {},
		methods: {},
		computed: {
			items() {
				return _.filter(this.configs?.colInfo, (col, prop) => {
					const isCol = /COL_/.test(prop);
					return !isCol;
				});
			}
		}
	};
}
</script>

<style lang="less"></style>
