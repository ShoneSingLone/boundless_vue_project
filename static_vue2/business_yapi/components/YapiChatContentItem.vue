<style lang="less">
.YapiChatContentItem-wrapper {
	.YapiChatContentItem {
		width: 55%;
	}
}
</style>
<template>
	<div :class="cptClass">
		<div :class="cptItemClass">
			<TuiEditor :value="cptContent" :asRender="true" imgrange=".chat-messages" />
			<xGap t />
			<div :class="['flex width100', { end: cptIsSelf }]">
				<span>{{ cptAddTime }}</span>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		props: ["item"],
		data() {
			return {};
		},
		computed: {
			cptIsSelf({ cptItemUid, cptCurrentUserId }) {
				return cptItemUid === cptCurrentUserId;
			},
			cptClass({ cptIsSelf }) {
				return ["YapiChatContentItem-wrapper width100 flex mb", { end: cptIsSelf }];
			},
			cptItemClass({ cptIsSelf }) {
				return [
					"YapiChatContentItem el-card flex vertical x-padding",
					cptIsSelf ? "message-self" : "message-other"
				];
			},
			cptCurrentUserId() {
				return this.APP.user._id;
			},
			cptItemUid({ item }) {
				return item.uid;
			},
			cptContent({ item }) {
				return { md: item?.markdown || "" };
			},
			cptAddTime() {
				return _.$dateFormat(this.item?.add_time);
			}
		}
	});
}
</script>
