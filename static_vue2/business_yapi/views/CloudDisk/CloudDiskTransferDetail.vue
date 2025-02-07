<style lang="less">
.CloudDiskTransferDetail {
	width: 100%;
	margin: auto;
	max-height: 200px;
	.CloudDiskTransferDetail-cell {
		display: inline-block;
		width: 4px;
		height: 4px;
		margin: 2px;
		outline: 1px solid #f3f3f3;
		&.uploaded {
			background: red;
		}
	}
}
</style>
<template>
	<div class="CloudDiskTransferDetail flex vertical">
		<div class="pl pr flex middle">
			<xProgress :percentage="cptValue" disabled class="flex1 mr" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		props: ["item"],
		data() {
			return {};
		},
		computed: {
			cptLabel() {
				return `${this.item.name}`;
			},
			cptProcess() {
				if (this.cptValue === 100) {
					return `${this.total}/${this.total}`;
				}
				return `${this.uploadedLength}/${this.total}`;
			},
			cptValue() {
				if (!this.total) {
					return 0;
				} else if (this.item.isMerged) {
					return 100;
				} else {
					const num = this.uploadedLength / this.total;
					if (num) {
						return Math.floor(num * 100);
					} else {
						return 0;
					}
				}
			},
			uploadedLength() {
				return Object.keys(this.item?.uploaded || {}).length;
			},
			total() {
				return this.item?.chunkTotal || 0;
			}
		},
		methods: {
			isUploaded(i) {
				return this.item?.uploaded?.[i];
			}
		}
	});
}
</script>
