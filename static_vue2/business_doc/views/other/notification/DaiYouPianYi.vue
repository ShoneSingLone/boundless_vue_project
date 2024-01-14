<template>
	<div>
		<xMd :md="desc" />
		<xBtn @click="open"> 偏移的消息 </xBtn>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				desc: "让 Notification 偏移一些位置\nNotification 提供设置偏移量的功能，通过设置 `offset` 字段，可以使弹出的消息距屏幕边缘偏移一段距离。注意在同一时刻，所有的 Notification 实例应当具有一个相同的偏移量。"
			};
		},
		methods: {
			open() {
				_.$notify({
					title: "偏移",
					message: "这是一条带有偏移的提示消息",
					offset: 100
				});
			}
		}
	});
}
</script>
