<script lang="ts">
export default async function () {
	return defineComponent({
		props: ["path", "title", "payload"],
		computed: {
			styleContainer() {
				return {
					position: "relative"
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
				const BussinessComponent = await _.$GenComponentOptions({
					resolvedURL: _.$resolvePath(this.path),
					scritpSourceCode,
					templateSourceCode,
					payload: this.payload
				});
				this.BussinessComponent = markRaw(BussinessComponent);
				this.isLoading = false;
			},
			async getBussinessComponent() {
				this.BussinessComponentSourceCode = await _.$sourceCodeSFC({ resolvedURL: _.$resolvePath(this.path) });
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
			const vm = this;
			return h("xBlock", {
				staticClass: "padding margin16",
				style: vm.styleContainer,
				$vSlots: {
					default() {
						return h(vm.BussinessComponent, { vIf: vm.BussinessComponent && !vm.isFold });
					},
					header() {
						return h(
							"div",
							{
								class: "pointer",
								style: `color: rgba(0, 0, 0, 0.85); font-weight: 600; font-size:18px;`,
								"data-path": vm.path
							},
							[
								vm.title,
								h("xIcon", {
									icon: vm.isFold ? "_icon_fold" : "_icon_unfold",
									staticClass: "ml10",
									onClick: vm.toggleFold
								}),
								h("xIcon", {
									vIf: vm.BussinessComponent,
									icon: "_icon_rerun",
									staticClass: "pointer ml10",
									onClick: vm.getBussinessComponent,
									style
								}),
								h("xIcon", {
									vIf: vm.BussinessComponent,
									icon: "_icon_sourcecode",
									staticClass: "pointer ml10",
									onClick: vm.showSourceCodeDialog,
									style
								})
							]
						);
					}
				}
			});
		}
	});
}
</script>
