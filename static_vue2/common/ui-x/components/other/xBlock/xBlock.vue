<script lang="ts">
export default async function () {
	return {
		props: {
			bodyClass: {
				type: Object,
				default() {
					return {};
				}
			},
			header: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				isLoading: false
			};
		},
		computed: {
			cpt_footer() {
				if (this.header) {
					return i18n(this.header);
				}
				return "";
			}
		},
		methods: {
			getBodyClass(classObject) {
				return _.merge({}, this.getClass(classObject), this.bodyClass);
			},
			getClass(classObject) {
				if (hasOwn(this.$attrs, "card-no-border")) {
					classObject["el-card"] = false;
					classObject["card-no-border"] = true;
				}
				if (hasOwn(this.$attrs, "card-header-border-left")) {
					classObject["el-card"] = false;
					classObject["card-header-border-left"] = true;
				}
				if (hasOwn(this.$attrs, "bg-is-gray")) {
					classObject["bg-is-gray"] = true;
				}

				return _.merge(classObject);
			},
			vDomHeader() {
				if (this.$scopedSlots.header) {
					return this.$scopedSlots.header();
				}
				if (this.header) {
					const vNode = h("span", { class: "card__header" }, [i18n(this.header)]);
					return vNode;
				}
				return "";
			}
		},
		render() {
			const header = this.vDomHeader();
			return h("div", { class: this.getClass({ xBlock: true, "el-card": true }) }, [
				h("div", { vIf: header, class: this.getClass({ "el-card__header": true }) }, [header]),
				h("div", { class: this.getBodyClass({ "el-card__body": true }) }, [this.$scopedSlots.default?.()])
			]);
		}
	};
}
</script>

<style lang="less">
.el-form-item.is-error {
	> .xBlock.el-card {
		border-color: var(--el-color-error);
	}
}
.xBlock {
	&.bg-is-gray {
		background: var(--el-fill-color-light);
	}

	.el-card__body {
		.el-card {
			margin-top: var(--ui-one);
		}
	}

	.el-card__header {
		&.bg-is-gray {
			border: unset;
		}

		&.card-no-border {
			border: unset;

			.card__header {
				&::before {
					content: " ";
					display: block;
					position: absolute;
					top: 0;
					bottom: var(--ui-half-reverse);
					right: 0;
					left: 0;
					border-bottom: 1px solid var(--el-border-color-lighter);
					z-index: 1;
				}
			}
		}

		.card__header {
			position: relative;
			font-size: var(--ui-one);
			font-weight: 700;
		}

		&.card-header-border-left {
			&.el-card__header {
				padding: 0;
				padding-left: 8px;
			}
			// font-size: 14px;
			font-weight: 400;
			border-left: 4px solid var(--ui-primary);
			border-bottom: unset;

			.card__header {
				position: relative;
				font-size: var(--ui-one);
				font-weight: 500;
			}
		}
	}

	.el-card__header + .el-card__body {
		// padding-top: 0;
	}
}

.xBlock + .xBlock {
	margin-top: var(--ui-one);
}
</style>
