<template>
	<xDropdown trigger="click" :hide-on-click="false">
		<div class="loader-wrapper">
			<xIcon
				icon="icon_table_filter"
				style="width: 24px; height: 24px; color: var(--ui-base-color-5)"
				class="pointer ml4" />
		</div>
		<xDropdownMenu slot="dropdown">
			<xDropdownItem v-for="item in cptColumnsForShow" :key="item.label">
				<xCheckbox :value="isShow(item)" @change="$event => setIsShow(item, $event)">{{
					item.label
				}}</xCheckbox>
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
				if (_.$val(this, "configs.columns")) {
					const columns = _.filter(_.$val(this, "configs.columns"), col => {
						if (!col.label) {
							return false;
						}
						const isCol = /COL_/.test(col.prop);
						return !isCol;
					});
					return columns;
				}

				/* xTable colInfo 配置项*/
				return _.filter(_.$val(this, "configs.colInfo"), (col, prop) => {
					const isCol = /COL_/.test(prop);
					return !isCol;
				});
			}
		}
	};
}
</script>
