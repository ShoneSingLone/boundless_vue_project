<template>
	<div class="avatar-uploader flex middle YapiItemAvatar" v-bind="$attrs">
		<xIcon
			:img="cptAvatarUrl"
			iscache="true"
			@click.native="handleClick"
			:class="cptClassAvatar" />
	</div>
</template>

<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	async function getBase64(img) {
		return new Promise(resolve => {
			const reader = new FileReader();
			reader.addEventListener("load", () => resolve(reader.result));
			reader.readAsDataURL(img);
		});
	}

	return {
		componentName: "YapiItemAvatar",
		inject: ["APP"],
		mixins: [mixins],
		props: ["value", "options", "configs"],
		mounted() {
			this.$on("updateAvatar", this.updateAvatar);
		},
		computed: {
			cptClassAvatar() {
				return {
					pointer: !this.cptDisabled,
					"project-avatar": true
				};
			},
			cptDisabled() {
				return (
					this.$attrs.readonly || this.$attrs.disabled || this.configs.disabled || false
				);
			},
			cptUsedBy() {
				return this.configs.usedBy || "";
			},
			cptAvatarUrl() {
				return (
					this.imageUrl ||
					Vue._common_utils.appendToken(
						`${window._AJAX_URL_PREFIX || ""}/api/user/avatar?uid=${this.value}&usedBy=${this.cptUsedBy}`
					)
				);
			}
		},
		data() {
			return {
				imageUrl: ""
			};
		},
		methods: {
			syncAllItem(imageUrl) {
				this.$root.broadcast("YapiItemAvatar", "updateAvatar", {
					uid: this.value,
					imageUrl
				});
			},
			updateAvatar({ uid, imageUrl }) {
				if (uid === this.value) {
					this.imageUrl = imageUrl;
				}
			},
			handleClick: _.debounce(async function (event) {
				if (this.cptDisabled) {
					return;
				}
				event.stopPropagation();
				event.preventDefault();
				const [file] = await _.$openFileSelector({ accept: "image/*" });
				try {
					if (file) {
						// Get this url from response in real world.
						const basecode = await getBase64(file);
						this.imageUrl = basecode;
						await this.uploadAvatar(basecode);
						this.syncAllItem(this.imageUrl);
					}
				} catch (error) {
					_.$msgError(error);
				}
			}, 300),
			async uploadAvatar(basecode) {
				_.$loading(true);
				try {
					await _api.yapi.uploadAvatar({
						basecode: basecode,
						uid: this.value,
						usedBy: this.configs.usedBy || ""
					});
				} catch (error) {
					_.$msgError(error);
					this.imageUrl = "";
				} finally {
					_.$loading(false);
				}
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === "image/jpeg";
				const isPNG = file.type === "image/png";
				if (!isJPG && !isPNG) {
					_.$msgError("图片的格式只能为 jpg、png！");
				}
				const isLt2M = file.size / 1024 / 1024 < 0.2;
				if (!isLt2M) {
					_.$msgError("图片必须小于 200kb!");
				}
				return (isPNG || isJPG) && isLt2M;
			}
		}
	};
}
</script>

<style lang="less">
.YapiItemAvatar {
	.project-avatar {
		width: 32px;
		height: 32px;
	}

	.xItem-wrapper[data-form-item-type="YapiItemAvatar"] {
		// width: var(--xitem-avatar-width, 32px);
		// height: var(--xitem-avatar-height, 32px);
		span.el-avatar {
			display: inline-block;
			width: var(--xitem-avatar-width, 32px);
			height: var(--xitem-avatar-height, 32px);
		}
	}
}
</style>
