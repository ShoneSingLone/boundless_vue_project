<script lang="ts">
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

					if (_.isString(f) && !f) {
						basic += ` flex1`;
					} else if (f) {
						basic += ` flex${f}`;
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

					if (attrs.w !== undefined) {
						if (attrs.w?.length) {
							gapStyle.width = `${attrs.w}px`;
						}
					}
					if (attrs.h !== undefined) {
						if (attrs.h?.length) {
							gapStyle.height = `${attrs.h}px`;
						}
					}
					if (attrs.a !== undefined) {
						if (attrs.a?.length) {
							gapStyle.margin = `${attrs.a}px`;
						} else {
							gapStyle.margin = `var(--ui-one)`;
						}
					}

					_.each(POSITION_MAP, (prop, position) => {
						const value = attrs[position];
						if (value !== undefined) {
							if (value?.length) {
								//@ts-ignore
								gapStyle[`margin-${prop}`] = `${value}px`;
							} else {
								gapStyle[`margin-${prop}`] = `var(--ui-one)`;
							}
						}
					});
					return gapStyle;
				}
			}
		},
		render(h) {
			return hDiv({
				style: this.gapStyle,
				class: this.gapClass
			});
		}
	});
}
</script>
