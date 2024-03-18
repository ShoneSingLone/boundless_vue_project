<template>
	<xDropdown trigger="click" :hide-on-click="false">
		<div class="loader-wrapper">
			<xIcon icon="icon_table_filter" style="width: 24px; height: 24px; color: var(--ui-base-color-5)" class="pointer ml4" />
		</div>
		<xDropdownMenu slot="dropdown">
			<xDropdownItem v-for="item in cptColumnsForShow" :key="item.label">
				<xCheckbox :value="isShow(item)" @change="$event => setIsShow(item, $event)">{{ item.label }}</xCheckbox>
			</xDropdownItem>
		</xDropdownMenu>
	</xDropdown>
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
		methods: {
			isShow(item) {
				if (hasOwn(item, "isShow")) {
					return item.isShow;
				} else {
					return true;
				}
			},
			setIsShow(item, val) {
				_.$val(item, "isShow", val);
			}
		},
		computed: {
			cptColumnsForShow() {
				if (this.configs?.columns) {
					return _.filter(this.configs?.columns, col => {
						const isCol = /COL_/.test(col.prop);
						return !isCol;
					});
				}

				/* xTable colInfo 配置项*/
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
