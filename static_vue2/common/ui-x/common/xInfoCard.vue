<template>
	<div class="xInfoCard el-descriptions opacity0" ref="descriptionsBody">
		<div class="el-descriptions__header">
			<div class="el-descriptions__title">
				{{ configs.title }}
				<slot name="title" />
			</div>
			<div class="el-descriptions__extra">
				<!-- {{ contentRect }} -->
				<slot name="extra" />
			</div>
		</div>
		<div class="el-descriptions__body el-descriptions__table is-bordered el-descriptions--small" :style="cellStyle" v-for="(layoutRow, index) in layout" :key="index">
			<xInfoCardItem v-for="prop in layoutRow" :key="prop + index" :item="filterItemPropSpan(prop)" :unitWidth="unitWidth" />
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { useElementSize } = await _.$importVue("/common/utils/hooks.vue");
	const { ref, watch } = Vue;
	return {
		props: ["configs"],
		setup() {
			const unitWidth = ref(100);
			const contentRect = useElementSize({
				vm: this,
				refName: "descriptionsBody"
			});

			watch(
				() => contentRect.width,
				_.debounce(width => {
					unitWidth.value = Math.ceil(width / this.col) - 1;
				}, 300)
			);

			return {
				unitWidth,
				contentRect
			};
		},
		computed: {
			fillItems() {
				return this.configs?.items.length % this.col;
			},
			cellStyle() {
				return {
					// "--columns-count": `repeat(${this.col}, 1fr)`,
					"--cell-label-width": `${this.labelWidth}px`,
					"--cell-width-1": `${this.unitWidth}px`,
					"--cell-width-2": `${this.unitWidth * 2}px`,
					"--cell-width-3": `${this.unitWidth * 3}px`,
					"--cell-width-4": `${this.unitWidth * 4}px`
				};
			},
			labelWidth() {
				if (this.configs.labelWidth) {
					return this.configs.labelWidth;
				}
				return 140;
			},
			items() {
				if (this.configs.items) {
					return this.configs.items;
				}
				return {};
			},
			layout() {
				if (this.configs.layout) {
					return this.configs.layout(this.contentRect);
				} else {
					alert("requrie layout");
				}
				return [];
			},
			col() {
				return this.layout[0].length;
			}
		},
		methods: {
			filterItemPropSpan(propString) {
				const [prop, span] = String(propString).split(":");
				const item = this.items[prop] || {};
				item.span = span || 1;
				return item;
			}
		}
	};
}
</script>

<style lang="less">
.xInfoCard {
	.el-descriptions__body {
		display: flex;
		flex-flow: row wrap;
		border-left: 1px solid var(--el-border-color-lighter);
		border-top: 1px solid var(--el-border-color-lighter);

		+ .el-descriptions__body {
			border-top: unset;
		}

		.el-descriptions-item__label {
			text-align: left;
			font-weight: 400;
			width: var(--cell-label-width);
		}

		.cell {
			border-right: 1px solid var(--el-border-color-lighter);
			border-bottom: 1px solid var(--el-border-color-lighter);

			> div {
				padding: 8px 10px;
			}
		}

		[data-span="1"] {
			width: var(--cell-width-1);
		}

		[data-span="2"] {
			width: var(--cell-width-2);
		}

		[data-span="3"] {
			width: var(--cell-width-3);
		}

		[data-span="4"] {
			width: var(--cell-width-4);
		}
	}
}
</style>
