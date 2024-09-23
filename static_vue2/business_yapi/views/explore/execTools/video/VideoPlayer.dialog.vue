<template>
	<xDialog>
		<video ref="refVideo" controls="true" style="max-width: 600px; width: 100%; margin: auto" />
	</xDialog>
</template>
<script lang="ts">
export default async function ({ item, id }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		mounted() {
			this.setErrorHandler();
		},
		data() {
			return {};
		},
		computed: {
			uri() {
				return "";
			},
			videoSrc() {
				/* `https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4` */
				return Vue._common_utils.appendToken(
					_.$ajax.urlWrapper(`/api/resource/video?id=${id}`)
				);
			}
		},
		methods: {
			async setErrorHandler() {
				await _.$ensure(() => this.$refs.refVideo);
				const video = this.$refs.refVideo;

				video.addEventListener("error", event => {
					_.$msgError(`${item.name}: ${this.videoSrc}`);
				});

				video.setAttribute("src", this.videoSrc);
			}
		}
	});
}
</script>
<style lang="less"></style>
