<template>
	<div class="el-breadcrumb inline flex middle" aria-label="Breadcrumb" role="navigation">
		<slot>
			<xRender :render="renderBreadcrumbItem" />
		</slot>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		name: "xBreadcrumb",
		props: {
			items: {
				type: [Array, Boolean],
				default: false
			},
			separator: {
				type: [String, Object],
				default: "/"
			},
			separatorClass: {
				type: String,
				default: ""
			},
			itemRender: Function
		},
		provide() {
			return {
				xBreadcrumb: this
			};
		},
		mounted() {
			if (!this.items) {
				const items = this.$el.querySelectorAll(".el-breadcrumb__item");
				if (items.length) {
					items[items.length - 1].setAttribute("aria-current", "page");
				}
			}
		},
		computed: {
			cptSeparator() {
				if (this.separator?.TYPE_IS_VNODE) {
					return this.separator;
				}
				return h(
					"span",
					{
						role: "presentation",
						class: "el-breadcrumb__separator"
					},
					"/"
				);
			}
		},
		methods: {
			defaultRender(target, item, index) {
				const isLastItem = index === this.items.length - 1;

				const itemProps = {
					class: ["x-breadcrumb__item", isLastItem ? "is-last" : ""],
					role: "link"
				};
				const innerProps = {
					class: ["x-breadcrumb__inner", item.href && !isLastItem ? "is-link" : ""],
					role: "link"
				};
				const linkProps = { attrs: isLastItem ? null : { href: item.href } };

				target.push(
					h("span", itemProps, [h("span", innerProps, [h("a", linkProps, [item.label])])])
				);

				if (!isLastItem) {
					target.push(this.cptSeparator);
				}
				return target;
			},
			renderBreadcrumbItem() {
				if (!_.$isArrayFill(this.items)) {
					return null;
				}
				return _.reduce(
					this.items,
					(target, item, index) => {
						if (this.itemRender) {
							return this.itemRender({ target, item, index, items: this.items });
						}
						return this.defaultRender(target, item, index);
					},
					[]
				);
			}
		}
	};
}
</script>

<style lang="less">
.x-breadcrumb__item {
	&.is-last {
		font-weight: 700;
	}
	& + svg {
		margin-left: var(--ui-half);
		margin-right: var(--ui-half);
	}
}
.x-breadcrumb__inner {
	text-decoration: none;
	transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
	&.is-link {
		a {
			&:hover {
				color: var(--el-color-primary);
				cursor: pointer;
			}
		}
	}
	a {
		color: var(--el-text-color-primary);
		&:hover {
			cursor: default;
		}
	}
}
</style>
