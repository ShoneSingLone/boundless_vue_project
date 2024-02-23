<script lang="ts">
export default async function () {
	if (!_.$previewImgs) {
		let instance;
		let instances = [];

		_.$previewImgs = async function (options) {
			const [PopupManager, ImageViewer] = await _.$importVue(["/common/libs/VuePopper/popupManager.vue", "/common/ui-x/components/data/xImg/ImageViewer.vue"]);

			if (options.currentUrl) {
				options.index = _.findIndex(options.urlList, i => i === options.currentUrl) || 0;
			}
			const ViewerConstructor = Vue.extend(ImageViewer);
			instance = new ViewerConstructor({
				data: options
			});
			instance.$mount();
			document.body.appendChild(instance.$el);
			instance.viewerZIndex = PopupManager.nextZIndex();
			return instance;
		};
	}
}
</script>
<style lang="less"></style>
