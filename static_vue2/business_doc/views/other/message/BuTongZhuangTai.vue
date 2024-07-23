<template>
	<div class="message-JiChuYongFa">
		<xMd :md="md" />
		<xBtn :plain="true" @click="open2">成功</xBtn>
		<xBtn :plain="true" @click="open3">警告</xBtn>
		<xBtn :plain="true" @click="open1">消息</xBtn>
		<xBtn :plain="true" @click="open4">错误</xBtn>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: `用来显示「成功、警告、消息、错误」类的操作反馈。
                
当需要自定义更多属性时，Message 也可以接收一个对象为参数。比如，设置\`type\`字段可以定义不同的状态，默认为\`info\`。此时正文内容以\`message\`的值传入。同时，我们也为 Message 的各种 type 注册了方法，可以在不传入\`type\`字段的情况下像\`open4\`那样直接调用。`
			};
		},
		methods: {
			open1() {
				_.$msg("这是一条消息提示");
			},
			open2() {
				_.$msg({
					message: "恭喜你，这是一条成功消息",
					type: "success"
				});
			},

			open3() {
				_.$msg({
					message: "警告哦，这是一条警告消息",
					type: "warning"
				});
			},

			open4() {
				_.$msg.error("错了哦，这是一条错误消息");
			}
		}
	});
}
</script>
<style lang="less"></style>
