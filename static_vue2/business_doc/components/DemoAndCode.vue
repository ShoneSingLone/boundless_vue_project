<script>
export default async function () {
	return defineComponent({
		props: ["path", "title", "payload"],
		computed: {
			styleContainer() {
				return {
					position: "relative",
					overflow: this.isFold ? "hidden" : "unset",
					height: this.isFold ? "48px" : "unset",
					"padding-top": this.isFold ? "24px" : 0
				};
			}
		},
		data() {
			return {
				isInitDone: false,
				isFold: true,
				isLoading: true,
				BussinessComponent: false,
				BussinessComponentSourceCode: ""
			};
		},
		mounted() {
			if (hasOwn(this.$attrs, "unfold")) {
				this.toggleFold();
			}
		},
		methods: {
			toggleFold() {
				this.isFold = !this.isFold;
				if (!this.isInitDone) {
					this.getBussinessComponent();
				}
			},
			async rerun() {
				/* TODO: 弹窗修改加载的代码 */
				/* 重新运行 */
				const { scritpSourceCode, templateSourceCode } = this.BussinessComponentSourceCode;
				/* script and template*/
				const BussinessComponent = await _.$GenComponentOptions(this.path, {
					scritpSourceCode,
					templateSourceCode,
					payload: this.payload
				});
				this.BussinessComponent = markRaw(BussinessComponent);
				this.isLoading = false;
			},
			async getBussinessComponent() {
				this.BussinessComponentSourceCode = await _.$SourceCode_SFC(_.$resolvePath(this.path));
				this.rerun();
			},
			async showSourceCodeDialog() {
				const WindowImageModify = await _.$importVue("@/components/WindowSourceCode.vue", {
					parent: this,
					code: this.BussinessComponentSourceCode,
					componentPath: this.path
				});
				_.$openWindow(i18n("SourceCode"), WindowImageModify);
			}
		},
		render() {
			/* const vLoading = {
        name: "xloading",
        rawName: "v-xloading",
        value: (this.isLoading),
        expression: "this.isLoading"
      }; */
			const style = {
				width: "16px",
				height: "16px",
				zIndex: 1
			};
			return h("div", { staticClass: "padding10", style: this.styleContainer }, [
				h(
					"div",
					{
						class: "pointer",
						style: `color: rgba(0, 0, 0, 0.85); font-weight: 600; font-size:18px;`,
						"data-path": this.path
					},
					[
						this.title,
						h("xIcon", {
							icon: this.isFold ? "_icon_fold" : "_icon_unfold",
							staticClass: "ml10",
							onClick: this.toggleFold
						}),
						h("xIcon", {
							vIf: this.BussinessComponent,
							icon: "_icon_rerun",
							staticClass: "pointer ml10",
							onClick: this.getBussinessComponent,
							style
						}),
						h("xIcon", {
							vIf: this.BussinessComponent,
							icon: "_icon_sourcecode",
							staticClass: "pointer ml10",
							onClick: this.showSourceCodeDialog,
							style
						}),
						h(this.BussinessComponent, { vIf: this.BussinessComponent })
					]
				)
			]);
		}
	});
}
</script>
