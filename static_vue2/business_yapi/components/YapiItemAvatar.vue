<template>
	<div class="avatar-uploader flex middle" v-bind="$attrs">
		<elAvatar :src="cptAvatarUrl" @click.native="handleClick" />
		<input type="file" accept="image/*" ref="uploader" style="display: none" @change="handleChange" />
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
			cptDisabled() {
				return this.$attrs.disabled || this.configs.disabled || false;
			},
			cptUsedBy() {
				return this.configs.usedBy || "";
			},
			cptAvatarUrl() {
				return this.imageUrl || Vue._yapi_utils.appendToken(`${window._URL_PREFIX_4_DEV || ""}/api/user/avatar?uid=${this.value}&usedBy=${this.cptUsedBy}`);
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
			handleClick: _.debounce(function (event) {
				if (this.$attrs.readonly) {
					return;
				}
				event.stopPropagation();
				event.preventDefault();
				if (this.cptDisabled) {
					return;
				}
				$(this.$refs.uploader).click();
			}, 300),
			async handleChange(event) {
				if (this.cptDisabled) {
					return;
				}
				try {
					if (event.target.files[0]) {
						// Get this url from response in real world.
						const basecode = await getBase64(_.first(event.target.files));
						this.imageUrl = basecode;
						await this.uploadAvatar(basecode);
						this.syncAllItem(this.imageUrl);
					}
				} catch (error) {
					_.$msgError(error);
				}
			},
			async uploadAvatar(basecode) {
				_.$loading(true);
				try {
					await _api.yapi.uploadAvatar({ basecode: basecode, uid: this.value, usedBy: this.configs.usedBy || "" });
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
.xItem-wrapper[data-form-item-type="YapiItemAvatar"] {
	--xitem-avatar-width: 32px;
	--xitem-avatar-height: 32px;
	width: var(--xitem-avatar-width);
	height: var(--xitem-avatar-height);
	span.el-avatar {
		display: inline-block;
		width: var(--xitem-avatar-width);
		height: var(--xitem-avatar-height);
	}
}
</style>
