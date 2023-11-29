<script>
export default async function () {
	return defineComponent({
		name: "xGap",
		/* a:all,top left right bottom;class flex1,2,3,4 */
		// props: ["t", "l", "r", "b", "a", "f"],
		computed: {
			gapClass: {
				set() {},
				get() {
					let basic = "x-gap";
					const { f } = this.$attrs;

					if (f) {
						if (_.isBoolean(f)) {
							basic += ` flex1`;
						} else {
							basic += ` flex${f}`;
						}
					}
					return basic;
				}
			},
			gapStyle: {
				set() {},
				get() {
					const POSITION_MAP = {
						t: "top",
						r: "right",
						b: "bottom",
						l: "left"
					};

					const attrs = this.$attrs;
					const gapStyle = {};

					if (attrs.a !== undefined) {
						if (attrs.a?.length) {
							gapStyle.margin = `${attrs.a}px`;
						} else {
							gapStyle.margin = `var(--app-padding)`;
						}
					}

					_.each(POSITION_MAP, (prop, position) => {
						const value = attrs[position];
						if (value !== undefined) {
							if (value?.length) {
								//@ts-ignore
								gapStyle[`margin-${prop}`] = `${value}px`;
							} else {
								gapStyle[`margin-${prop}`] = `var(--app-padding)`;
							}
						}
					});
					return gapStyle;
				}
			}
		},
		render(h) {
			return h("div", {
				style: this.gapStyle,
				class: this.gapClass
			});
		}
	});
}
</script>
