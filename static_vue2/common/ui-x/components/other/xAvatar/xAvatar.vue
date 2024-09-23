<style lang="less"></style>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "ElAvatar",
		props: {
			size: {
				type: [Number, String],
				validator(val) {
					if (typeof val === "string") {
						return ["large", "medium", "small"].includes(val);
					}
					return typeof val === "number";
				}
			},
			shape: {
				type: String,
				default: "circle",
				validator(val) {
					return ["circle", "square"].includes(val);
				}
			},
			icon: String,
			src: String,
			alt: String,
			srcSet: String,
			error: Function,
			fit: {
				type: String,
				default: "cover"
			}
		},

		data() {
			return {
				isImageExist: true
			};
		},

		computed: {
			avatarClass() {
				const { size, icon, shape } = this;
				let classList = ["el-avatar"];

				if (size && typeof size === "string") {
					classList.push(`el-avatar--${size}`);
				}

				if (icon) {
					classList.push("el-avatar--icon");
				}

				if (shape) {
					classList.push(`el-avatar--${shape}`);
				}

				return classList.join(" ");
			}
		},

		methods: {
			handleError() {
				const { error } = this;
				const errorFlag = error ? error() : undefined;
				if (errorFlag !== false) {
					this.isImageExist = false;
				}
			},
			renderAvatar() {
				const { icon, src, alt, isImageExist, srcSet, fit } = this;
				if (isImageExist && src) {
					return h("img", {
						onError: this.handleError,
						attrs: {
							src: src,
							alt: alt,
							srcSet: srcSet
						},
						style: {
							"object-fit": fit
						}
					});
				}
				if (icon) {
					return h("i", {
						class: icon
					});
				}
				return this.$slots.default;
			}
		},

		render() {
			const { avatarClass, size } = this;

			const sizeStyle =
				typeof size === "number"
					? {
							height: `${size}px`,
							width: `${size}px`,
							lineHeight: `${size}px`
						}
					: {};

			return h("span", {
				class: avatarClass,
				style: sizeStyle,
				children: this.renderAvatar()
			});
		}
	});
}
</script>
