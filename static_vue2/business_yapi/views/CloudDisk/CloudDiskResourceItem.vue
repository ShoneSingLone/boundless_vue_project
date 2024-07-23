<style lang="less">
.resource-wrapper {
	background-color: white;
	width: 100%;

	.resource-icon {
		font-size: 32px;
		padding: 8px;
		svg {
			height: 32px;
			width: 32px;
		}
	}

	.resource-name-wrapper {
		width: 1px;
	}

	.resource-name {
		font-size: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-right: 16px;
	}

	.resource-update-date {
		font-size: 12px;
	}

	.resource-opr {
		transform: scale(0.99);
	}
}
</style>
<template>
	<div
		class="resource-wrapper flex middle"
		v-ripple="{ color: 'var(--el-color-primary)', duration: 300, delay: 300 }">
		<div class="resource-icon flex middle center" @click="preview">
			<xIcon :icon="cptIcon" />
		</div>
		<div class="resource-name-wrapper flex vertical flex1 pr">
			<div class="resource-name">{{ item.name }}</div>
			<div class="flex">
				<div class="resource-update-date">{{ cptDate }}</div>
				<xGap f />
				<div class="resource-update-date" v-if="!cptIsDir">{{ cptSize }}</div>
			</div>
		</div>
		<div class="resource-opr mr pointer" @click="toggle">
			<xIcon
				icon="_cloud_select_resource"
				style="color: var(--el-color-primary)"
				v-if="checked" />
			<xIcon icon="_cloud_unselect_resource" style="color: var(--el-border-color)" v-else />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		props: ["item", "checked"],
		data() {
			return {};
		},
		computed: {
			cptIsDir() {
				return this.item.type === "dir";
			},
			cptIcon() {
				if (this.cptIsDir) {
					return "_cloud_item_dir";
				}
				if (this.item.type === "image") {
					return "_cloud_item_image";
				}
				if (this.item.type === "video") {
					return "_cloud_item_video";
				}
				if (this.item.type === "audio") {
					return "_cloud_item_audio";
				}
				return "_cloud_item_unknow";
			},
			cptDate() {
				return _.$dateFormat(this.item.add_time);
			},
			cptSize() {
				return _.$bytesToSize(this.item.size);
			}
		},
		methods: {
			preview() {
				this.$emit("preview", this.item);
			},
			toggle() {
				this.$emit("toggle", this.item);
			}
		}
	});
}
</script>
