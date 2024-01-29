<style lang="less">
.xDescItem {
	overflow: hidden;
	.xDescItem-label {
		width: var(--xdesc-item-width);
	}
	padding: 10px 15px;
	// border-bottom: 1px solid #eee;
	&:hover {
		background-color: #eee;
	}
	&:last-child {
		border-bottom: none;
	}
	&:first-child {
		// border-top: 1px solid #eee;
	}

	.xDescItem-content {
		word-break: break-all;
	}
}
</style>
<template>
	<div class="xDescItem flex middle" v-if="cptIsShow">
		<div class="xDescItem-label mr">
			<xRender :render="cptLabel" />
		</div>
		<div class="xDescItem-content flex1">
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
					if (_.isString(this.item?.readonlyAs)) {
						return this.item?.readonlyAs;
					}
					return this.item?.itemType;
				})();
				if (itemType === "xItemSelect") {
					let options = this.item.options;
					if (_.isFunction(options)) {
						options = options();
					}
					content = _.find(options, { value: this.item.value })?.label;
				}

				if (_.isBoolean(content)) {
					content = content ? i18n("是") : i18n("否");
				}

				if (_.isFunction(this.item?.readonlyAs)) {
					content = this.item.readonlyAs.call(this);
				}
				return content || "--";
			}
		}
	});
}
</script>
