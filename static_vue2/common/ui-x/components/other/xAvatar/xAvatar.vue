<style lang="less">
.el-avatar {
	display: inline-block;
	box-sizing: border-box;
	text-align: center;
	color: #fff;
	background: var(--el-text-color-disabled);
	width: 40px;
	height: 40px;
	line-height: 40px;
	font-size: 14px;
}

.el-avatar > img {
	display: block;
	height: 100%;
	vertical-align: middle;
}

.el-avatar--circle {
	border-radius: 50%;
}

.el-avatar--square {
	border-radius: var(--border-radius);
}

.el-avatar--icon {
	font-size: 18px;
}

.el-avatar--large {
	width: 40px;
	height: 40px;
	line-height: 40px;
}

.el-avatar--medium {
	width: 36px;
	height: 36px;
	line-height: 36px;
}

.el-avatar--small {
	width: 28px;
	height: 28px;
	line-height: 28px;
}
</style>
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

			return hSpan({
				class: avatarClass,
				style: sizeStyle,
				children: this.renderAvatar()
			});
		}
	});
}
</script>
