<template>
	<el-table class="xTable" :data="dataList" ref="xTable" v-bind="$attrs">
		<el-table-column v-for="prop in displayProps" :key="prop" :prop="prop" :width="getWidthBy(prop)" :fixed="getFixedBy(prop)">
			<template #header="{ $index, column, store, _self }">
				<div v-if="isCOL(prop)" class="fixed-right table-header">
					<xTableColSelected slotname="header" :configs="configs" :type="prop" />
				</div>
				<div v-else class="table-header">
					{{ getLabelBy(prop) }}
				</div>
			</template>
			<template #default="{ $index, column, row, store, _self }">
				<div v-if="isCOL(prop)" class="fixed-right">
					<xTableColSelected slotname="default" :configs="configs" :type="prop" :row="row" :index="$index" />
				</div>
				<xRender v-else-if="allColInfo[prop].render" :render="allColInfo[prop].render" :payload="{ row, index: $index }" />
				<component
					v-else-if="isUseComponent(prop)"
					:is="useComponent(prop)"
					:index="$index"
					:row="row"
					:configs="{
						row,
						index: $index,
						col: allColInfo[prop],
						prop
					}">
				</component>
				<xColActions v-else-if="isACTION(prop)" :prop="prop" :row="row" :configs="allColInfo.COL_ACTIONS" />
				<div v-else-if="allColInfo[prop].html" v-html="allColInfo[prop].html(row, $index)">
					{{ row[prop] }}
				</div>
				<div v-else>
					{{ row[prop] }}
				</div>
			</template>
		</el-table-column>
	</el-table>
</template>

<script lang="ts">
export default async function () {
	/**
	 * 如果有COL_MULTIPLE ，就必须有vm.selectedBy:"id", selected：[]
	 */
	return {
		props: ["configs"],
		setup() {
			const setColActionWidthImmediate = () => {
				try {
					if (this?.configs?.data?.list?.length > 0) {
						const $xColActions = $(this.$refs.xTable.$el).find(".xColActions")[0];
						/* TODO: 列表中最长的操作 */
						if ($xColActions && $xColActions.children && $xColActions.children.length > 0) {
							const length = $xColActions.children.length;
							const gap = length * 16;
							let width = _.reduce(
								$xColActions.children,
								(_width, a) => {
									_width += Number(a.offsetWidth) || 0;
									return _width;
								},
								0
							);

							let currentWidth = this.configs.colInfo.COL_ACTIONS.width || 100;
							if (currentWidth <= width + gap) {
								currentWidth = width + gap;
							}

							if (currentWidth !== this.configs.colInfo.COL_ACTIONS.width) {
								_.$val(this, "configs.colInfo.COL_ACTIONS.width", currentWidth);
							}
						}
					}
				} catch (error) {}
			};
			this.setColActionWidthImmediate = setColActionWidthImmediate;
			this.setColActionWidth = _.debounce(setColActionWidthImmediate, 512);
		},
		data() {
			return {
				fixedLeft: false,
				fixedRight: false
			};
		},
		methods: {
			/* ***************** */
			isCOL(prop) {
				return ["COL_MULTIPLE", "COL_SINGLE"].includes(prop);
			},
			isACTION(prop) {
				return ["COL_ACTIONS"].includes(prop);
			},
			/* configs 配置优先级最高 */
			getLabelBy(prop) {
				const configsCol = this.allColInfo[prop];
				if (configsCol) {
					if (configsCol.label) {
						return configsCol.label;
					}
					if (prop === "COL_ACTIONS") {
						return i18n("Operation");
					}
					return "";
				}
				return "";
			},
			getWidthBy(prop) {
				const configsCol = this.allColInfo[prop];
				if (configsCol?.width) {
					return configsCol.width;
				}

				if (["COL_SINGLE", "COL_MULTIPLE"].includes(prop)) {
					return "48";
				}
				return "";
			},
			getFixedBy(prop) {
				const configsCol = this.allColInfo[prop];

				if (configsCol) {
					if (configsCol.fixed) {
						return configsCol.fixed;
					}
				}

				if (["COL_SINGLE", "COL_MULTIPLE"].includes(prop)) {
					return "left";
				}
				if (["COL_ACTIONS"].includes(prop)) {
					return "right";
				}
				return false;
			},
			/* ***************** */
			isUseComponent(prop) {
				const colInfo = this.allColInfo[prop];
				let isUse = !!colInfo?.component;
				if (!isUse) {
					for (const prop in colInfo) {
						if (/^xCell/.test(prop)) {
							isUse = true;
							colInfo.component = prop;
							colInfo.componentOptions = colInfo[prop];
							break;
						}
					}
				}
				return isUse;
			},
			useComponent(prop) {
				const colInfo = this.allColInfo[prop];
				return colInfo?.component || "div";
			},
			log(prop, col) {
				console.log("🚀:xTable log", prop, col);
			}
		},
		computed: {
			allColInfo() {
				return this.configs.colInfo;
			},
			displayProps() {
				return _.reduce(
					this.allColInfo,
					(target, item, prop) => {
						if (["COL_SINGLE", "COL_MULTIPLE", "COL_ACTIONS"].includes(prop) || item.isShow) {
							target.push(prop);
						}
						return target;
					},
					[]
				);
			},
			colLength() {
				return Object.keys(this.configs.colInfo).length;
			},
			dataList() {
				return _.map(this.configs.data.list, i => i);
			},
			isFixBody() {
				return !!this.tbodyHeight.height;
			},
			tbodyHeight() {
				let style = {};
				if (this.configs.tbodyHeight) {
					style = {
						height: this.configs.tbodyHeight + "px",
						"overflow-y": "auto"
					};
				}
				return style;
			}
		},
		updated() {
			this.setColActionWidthImmediate();
		},
		watch: {
			// "configs.data.list"(list) {
			// 	// this.setColActionWidth();
			// }
		}
	};
}
</script>

<style lang="less">
.xTable {
	margin-top: 10px;

	.fixed-right {
		text-align: center;
	}

	&.el-table th.el-table__cell {
		background: var(--el-border-color-lighter);
	}
}
</style>
