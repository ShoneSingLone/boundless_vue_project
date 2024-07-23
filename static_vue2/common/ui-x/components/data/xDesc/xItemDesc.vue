<style lang="less">
.xItemDesc-wrapper {
	overflow: hidden;
	width: var(--xItem-wrapper-width, 320px);
	height: var(--xItem-wrapper-height);
	.xItemDesc-wrapper_label {
		width: var(--xItem-label-width, 120px);
	}
	padding: 10px 15px;
	// border-bottom: 1px solid #eee;
	&:hover {
		background-color: var(--xItemDesc-hover-bg, transparent);
	}
	&:last-child {
		border-bottom: none;
	}
	&:first-child {
		// border-top: 1px solid #eee;
	}

	.xItemDesc-wrapper_content {
		word-break: break-all;
		width: 1px;
		overflow: auto;
	}
}
</style>
<template>
	<div class="xItemDesc-wrapper flex middle" v-if="cptIsEmpty"></div>
	<div class="xItemDesc-wrapper flex middle" v-else-if="cptIsShow">
		<div class="xItemDesc-wrapper_label">
			<xRender :render="cptLabel" />
		</div>
		<div class="xItemDesc-wrapper_content flex1">
			<xRender :render="calContent" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		inject: {
			X_DESC: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		props: ["item"],
		data() {
			return { THIS_FILE_URL };
		},
		computed: {
			cptIsShow() {
				if (_.isFunction(this.item.isHide)) {
					return !this.item.isHide();
				}
				if (_.isBoolean(this.item.isHide)) {
					return !this.item.isHide;
				}
				return true;
			},
			cptIsEmpty() {
				return !!this.item.isEmpty;
			},
			cptLabel() {
				let label = this.item.label;
				if (_.isFunction(label)) {
					label = label();
				}
				return label;
			}
		},
		methods: {
			calContent() {
				let content = this.item.value;
				let itemType = (() => {
					/*  如果有其他自定义的类型，但是readonly的显示效果是一样的 */
					if (_.isString(this.item?.xItemRender)) {
						return this.item?.xItemRender;
					}
					return this.item?.itemType;
				})();
				/* TODO:这种API...有待商榷 */
				if (itemType === "xItemSelect") {
					let options = this.item.options;
					if (_.isFunction(options)) {
						options = options();
					}
					content = _.find(options, { value: this.item?.value })?.label;
				} else if (_.isBoolean(content)) {
					content = content ? i18n("是") : i18n("否");
				} else if (_.isFunction(this.item?.xItemRender)) {
					content = this.item.xItemRender.call(this.item, { xItemDesc: this });
				} else if (_.isPlainObject(content)) {
					content = "";
				}

				return content || "--";
			}
		}
	});
}
</script>
