<template>
	<div>
		<div class="flex vertical">
			<xMd :md="'> 推荐通过工具函数 `_.$previewImgs` 调用'" />
			<div class="flex">
				<xBtn @click="openImgPreviewer">index下标</xBtn>
				<xGap r />
				<xBtn @click="openImgPreviewerCurrentUrl">currentUrl</xBtn>
			</div>
		</div>
		<div class="flex vertical x-margin">
			<xMd :md="mdTitle" />
			<xImg style="width: 100px; height: 100px" :src="url" :preview-src-list="srcList" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle: "可通过 `previewSrcList` 开启预览大图的功能。",
				url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
				srcList: [
					"https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
					"https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
					"https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
					"https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
					"https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
					"https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
					"https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
					"https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
					"https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
				]
			};
		},
		methods: {
			openImgPreviewer() {
				_.$previewImgs({
					urlList: this.srcList,
					index: 3
				});
			},
			openImgPreviewerCurrentUrl() {
				_.$previewImgs({
					urlList: this.srcList,
					currentUrl: `https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg`
				});
			}
		}
	});
}
</script>
<style lang="less"></style>
