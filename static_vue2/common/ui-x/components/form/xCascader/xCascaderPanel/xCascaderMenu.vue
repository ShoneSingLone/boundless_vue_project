<style lang="less"></style>
<template>
	<div>{{ THIS_FILE_URL }}</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		name: "ElCascaderMenu",
		inject: ["panel"],
		components: {
			xCascaderNode: () =>
				_.$importVue(
					"/common/ui-x/components/form/xCascader/xCascaderPanel/xCascaderNode.vue"
				)
		},
		props: {
			nodes: {
				type: Array,
				required: true
			},
			index: Number
		},
		data() {
			return {
				activeNode: null,
				hoverTimer: null,
				id: _.$genId()
			};
		},
		computed: {
			isEmpty() {
				return !this.nodes.length;
			},
			menuId() {
				return `cascader-menu-${this.id}-${this.index}`;
			}
		},
		methods: {
			handleExpand(e) {
				this.activeNode = e.target;
			},
			handleMouseMove(e) {
				const { activeNode, hoverTimer } = this;
				const { hoverZone } = this.$refs;
				if (!activeNode || !hoverZone) return;
				if (activeNode.contains(e.target)) {
					clearTimeout(hoverTimer);
					const { left } = this.$el.getBoundingClientRect();
					const startX = e.clientX - left;
					const { offsetWidth, offsetHeight } = this.$el;
					const top = activeNode.offsetTop;
					const bottom = top + activeNode.offsetHeight;
					hoverZone.innerHTML = `
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${top} L${offsetWidth} 0 V${top} Z" />
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${bottom} L${offsetWidth} ${offsetHeight} V${bottom} Z" />
        `;
				} else if (!hoverTimer) {
					this.hoverTimer = setTimeout(
						this.clearHoverZone,
						this.panel.config.hoverThreshold
					);
				}
			},
			clearHoverZone() {
				const { hoverZone } = this.$refs;
				if (!hoverZone) return;
				hoverZone.innerHTML = "";
			},
			renderEmptyText(h) {
				return h("div", {
					class: "el-cascader-menu__empty-text",
					children: i18n("el.cascader.noData")
				});
			},
			renderNodeList(h) {
				const { menuId } = this;
				const { isHoverMenu } = this.panel;
				const events = {
					on: {}
				};
				if (isHoverMenu) {
					events.on.expand = this.handleExpand;
				}
				const nodes = _.map(this.nodes, (node, index) => {
					const { hasChildren } = node;
					return h(
						"xCascaderNode",
						{
							node: node,
							"node-id": `${menuId}-${index}`,
							"aria-haspopup": hasChildren,
							"aria-owns": hasChildren ? menuId : null,
							...events
						},
						node.uid
					);
				});
				return [
					...nodes,
					isHoverMenu
						? h("svg", {
								ref: "hoverZone",
								class: "el-cascader-menu__hover-zone"
							})
						: null
				];
			}
		},
		render(h) {
			const { isEmpty, menuId } = this;
			const events = {
				nativeOn: {}
			};

			// optimize hover to expand experience (#8010)
			if (this.panel.isHoverMenu) {
				events.nativeOn.mousemove = this.handleMouseMove;
				// events.nativeOn.mouseleave = this.clearHoverZone;
			}
			return h("xScrollbar", {
				tag: "ul",
				role: "menu",
				id: menuId,
				class: "el-cascader-menu",
				"wrap-class": "el-cascader-menu__wrap",
				"view-class": {
					"el-cascader-menu__list": true,
					"is-empty": isEmpty
				},
				...events,
				children: isEmpty ? this.renderEmptyText(h) : this.renderNodeList(h)
			});
		}
	});
}
</script>
