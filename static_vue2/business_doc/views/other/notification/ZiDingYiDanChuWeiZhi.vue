<template>
	<div>
		<xMd :md="desc" />
		<xBtn @click="open1"> 右上角 </xBtn>
		<xBtn @click="open2"> 右下角 </xBtn>
		<xBtn @click="open3"> 左下角 </xBtn>
		<xBtn @click="open4"> 左上角 </xBtn>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				desc: "可以让 Notification 从屏幕四角中的任意一角弹出\n使用`position`属性定义 Notification 的弹出位置，支持四个选项：`top-right`、`top-left`、`bottom-right`、`bottom-left`，默认为`top-right`。"
			};
		},
		methods: {
			open1() {
				_.$notify({
					title: "自定义位置",
					message: "右上角弹出的消息"
				});
			},

			open2() {
				_.$notify({
					title: "自定义位置",
					message: "右下角弹出的消息",
					position: "bottom-right"
				});
			},

			open3() {
				_.$notify({
					title: "自定义位置",
					message: "左下角弹出的消息",
					position: "bottom-left"
				});
			},

			open4() {
				_.$notify({
					title: "自定义位置",
					message: "左上角弹出的消息",
					position: "top-left"
				});
			}
		}
	});
}
</script>
