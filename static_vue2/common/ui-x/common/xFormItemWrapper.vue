<script>
export default async function () {
	return defineComponent({
		props: ["label", "rules"],
		setup(props) {
			const vm = this;
			Vue._X_ITEM_VM_S = Vue._X_ITEM_VM_S || {};
			onMounted(() => {
				$(window).on("click.xFormItemWrapper", () => {
					if (this.errorTips) {
						vm.validate();
					}
				});
				Vue._X_ITEM_VM_S[this.cpt_id] = this;
			});
			onBeforeUnmount(() => {
				$(window).off("click.xFormItemWrapper", vm.validate);
				delete Vue._X_ITEM_VM_S[this.cpt_id];
			});
		},
		data() {
			return {
				errorTips: "",
				msg: ""
			};
		},
		computed: {
			cpt_id() {
				return `x_form_id_${this._uid}`;
			},
			cpt_isRequired() {
				try {
					return _.some(this.rules, rule => rule.name === "required");
				} catch (error) {}
				return false;
			}
		},
		methods: {
			async validate() {
				if (this.rules && this.rules.length > 0) {
					for await (const rule of this.rules) {
						const msg = await rule.validator();
						if (msg) {
							this.errorTips = msg;
							break;
						} else {
							this.errorTips = "";
						}
					}
				}
				return this.errorTips;
			}
		},
		render(h) {
			const vm = this;
			return h(
				"div",
				{
					staticClass: "xItem-wrapper flex middle xFormItemWrapper",
					attrs: {
						"data-form-item-id": vm.cpt_id
					}
				},
				[
					h(
						"label",
						{
							vIf: vm.label,
							staticClass: "xItem_label"
						},
						[
							h(
								"span",
								{
									vIf: vm.cpt_isRequired,
									staticClass: "xItem_label-required"
								},
								["*"]
							),
							h("span", { staticClass: "xItem_label-text" }, [vm.label])
						]
					),
					h(
						"div",
						{
							staticClass: "xItem_controller"
						},
						[
							vm.$scopedSlots.controller?.call(),
							h(
								"span",
								{
									vIf: !!vm.msg,
									staticClass: "xItem_msg"
								},
								[vm.msg]
							),
							h(
								"span",
								{
									vIf: vm.errorTips,
									staticClass: "xItem_error-msg"
								},
								[vm.errorTips]
							)
						]
					)
				]
			);
		}
	});
}
</script>
<style lang="less">
.xItem-wrapper.flex.middle {
	.xItem_controller {
		> .xCard {
			margin-left: 0;
			margin-right: 0;
		}
	}
}
</style>
