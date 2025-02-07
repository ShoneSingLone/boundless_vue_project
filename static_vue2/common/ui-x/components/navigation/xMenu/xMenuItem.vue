<style lang="less"></style>
<template>
	<xRender :render="itemRender" v-if="itemRender" />
	<li
		v-else
		role="menuitem"
		tabindex="-1"
		:style="cptStyle"
		:class="cptClass"
		@click="handleClick"
		@mouseenter="onMouseEnter"
		@focus="onMouseEnter"
		@blur="onMouseLeave"
		@mouseleave="onMouseLeave">
		<xTooltip
			v-if="
				parentMenu.$options.componentName === 'ElMenu' && rootMenu.collapse && $slots.title
			"
			effect="dark"
			placement="right">
			<div slot="content">
				<slot name="title"></slot>
			</div>
			<div
				style="
					position: absolute;
					left: 0;
					top: 0;
					height: 100%;
					width: 100%;
					display: inline-block;
					box-sizing: border-box;
					padding: 0 20px;
				">
				<slot></slot>
			</div>
		</xTooltip>
		<template v-else>
			<slot></slot>
			<slot name="title"></slot>
			<xRender :render="titleRender" />
		</template>
	</li>
</template>
<script lang="ts">
export default async function () {
	const xMenuMixin = await _.$importVue(
		"/common/ui-x/components/navigation/xMenu/xMenuMixin.vue"
	);

	return defineComponent({
		name: "ElMenuItem",
		componentName: "ElMenuItem",
		mixins: [xMenuMixin],
		props: {
			itemRender: {
				type: Function,
				default: null
			},
			titleRender: {
				type: Function,
				default: null
			},
			index: {
				default: null,
				validator: val => typeof val === "string" || val === null
			},
			route: [String, Object],
			disabled: Boolean,
			item: {
				type: Object,
				default: () => ({})
			}
		},
		computed: {
			cptStyle() {
				return [
					this.paddingStyle,
					this.itemStyle,
					{ backgroundColor: this.backgroundColor }
				];
			},
			cptClass() {
				return {
					"xMenuItem el-menu-item": true,
					"is-active": this.active,
					"is-disabled": this.disabled
				};
			},
			active() {
				if (this.item?.href) {
					return this.item.href === this.rootMenu.defaultActive;
				}
				return this.index === this.rootMenu.activeIndex;
			},
			hoverBackground() {
				console.log("this.rootMenu.hoverBackground", this.rootMenu.hoverBackground);
				return this.rootMenu.hoverBackground;
			},
			backgroundColor() {
				return this.rootMenu.backgroundColor || "";
			},
			activeTextColor() {
				return this.rootMenu.activeTextColor || "";
			},
			textColor() {
				return this.rootMenu.textColor || "";
			},
			mode() {
				return this.rootMenu.mode;
			},
			itemStyle() {
				const style = {
					color: this.active ? this.activeTextColor : this.textColor
				};
				if (this.mode === "horizontal" && !this.isNested) {
					style.borderBottomColor = this.active
						? this.rootMenu.activeTextColor
							? this.activeTextColor
							: ""
						: "transparent";
				}
				return style;
			},
			isNested() {
				return this.parentMenu !== this.rootMenu;
			}
		},
		watch: {
			active: {
				immediate: true,
				handler(val) {
					this.$emit("activechange", {
						index: this.index,
						isActive: val
					});
				}
			}
		},
		methods: {
			onMouseEnter() {
				if (this.mode === "horizontal" && !this.rootMenu.backgroundColor) return;
				this.$el.style.backgroundColor = this.hoverBackground;
			},
			onMouseLeave() {
				if (this.mode === "horizontal" && !this.rootMenu.backgroundColor) return;
				this.$el.style.backgroundColor = this.backgroundColor;
			},
			handleClick() {
				if (!this.disabled) {
					this.dispatch("ElMenu", "item-click", this);
					this.$emit("click", this);
				}
			}
		},
		mounted() {
			this.parentMenu.addItem(this);
			this.rootMenu.addItem(this);
		},
		beforeDestroy() {
			this.parentMenu.removeItem(this);
			this.rootMenu.removeItem(this);
		}
	});
}
</script>
