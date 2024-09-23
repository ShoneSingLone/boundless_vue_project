<template>
	<div>
		<xMd :md="desc" />
		<xBtn preset="success" @click="open1"> 成功 </xBtn>
		<xBtn preset="warning" @click="open2"> 警告 </xBtn>
		<xMd :md="md2" />
		<xBtn preset="info" @click="open3"> 消息 </xBtn>
		<xBtn preset="danger" @click="open4"> 错误 </xBtn>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				desc: `带有 icon，常用来显示「成功、警告、消息、错误」类的系统消息\n
xUI 为 Notification 准备了四种通知类型：\`success\`, \`warning\`, \`info\`, \`error\`。\n
通过\`type\`字段来设置，除此以外的值将被忽略。`,
				md2: `同时，我们也为每个 type 定义了各自的方法，如 \`_.$notify.success(options)\`，可以在不传入\`type\`字段的情况下像**消息**\`open3\`和**错误**\`open4\`那样直接调用。`
			};
		},
		methods: {
			open1() {
				_.$notify({
					title: "成功",
					message: "这是一条成功的提示消息",
					type: "success"
				});
			},

			open2() {
				_.$notify({
					title: "警告",
					message: "这是一条警告的提示消息",
					type: "warning"
				});
			},

			open3() {
				_.$notify.info({
					title: "消息",
					message: "这是一条消息的提示消息"
				});
			},

			open4() {
				_.$notify.error({
					title: "错误",
					message: "这是一条错误的提示消息"
				});
			}
		}
	});
}
</script>
