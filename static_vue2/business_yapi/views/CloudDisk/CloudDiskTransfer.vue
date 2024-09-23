<style lang="less"></style>
<template>
	<div class="x-padding">
		<xCard v-for="(item, hash) in APP.fileRecords" :key="hash" class="mb">
			<CloudDiskTransferDetail :item="item" />
		</xCard>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			CloudDiskTransferDetail: () =>
				_.$importVue("@/views/CloudDisk/CloudDiskTransferDetail.vue")
		},
		setup() {
			this.handlerUploadFileChange = _.throttle((event, md5) => {
				console.log(
					"🚀 ~ this.handlerUploadFileChange=_.throttle ~ event, md5:",
					event,
					md5
				);
			}, 1000);

			$(window).on(`UPLOAD_FILE_CHANGE.${this._uid}`, this.handlerUploadFileChange);

			onBeforeUnmount(() => {
				$(window).off(`UPLOAD_FILE_CHANGE.${this._uid}`);
			});
		},
		data() {
			return {
				listData: []
			};
		},
		methods: {
			handleClick(tab, event) {}
		}
	});
}
</script>
