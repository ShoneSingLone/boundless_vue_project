<script>
export default async function () {
	return {
		props: ["header"],
		data() {
			return {
				isLoading: false
			};
		},
		computed: {
			vDomHeader() {
				if (this.$scopedSlots.header) {
					return this.$scopedSlots.header("heheheh");
				}
				if (this.header) {
					return h("span", { class: "card__header" }, [i18n(this.header)]);
				}
				return "";
			},
			cpt_footer() {
				if (this.header) {
					return i18n(this.header);
				}
				return "";
			}
		},
		methods: {
			getClass(classObject) {
				if (hasOwn(this.$attrs, "card-no-border")) {
					classObject["el-card"] = false;
					classObject["card-no-border"] = true;
				}
				if (hasOwn(this.$attrs, "bg-is-gray")) {
					classObject["bg-is-gray"] = true;
				}
				return { class: classObject };
			}
		},
		render() {
			return h("div", this.getClass({ xCard: true, "el-card": true }), [
				h("div", this.getClass({ "el-card__header": true }), [this.vDomHeader]),
				h("div", this.getClass({ "el-card__body": true }), [
					this.$slots.default
				])
			]);
		}
	};
}
</script>

<style lang="less">
.xCard {
	&.bg-is-gray {
		background: var(--el-fill-color-light);
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
	}

	.el-card__header + .el-card__body {
		padding-top: 0;
	}
}

.xCard + .xCard {
	margin-top: var(--ui-one);
}
</style>
