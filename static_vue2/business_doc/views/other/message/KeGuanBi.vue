<template>
	<div class="message-JiChuYongFa">
		<xMd :md="md" />
		<div class="x-margin"><xBtn @click="closeAll" preset="blue">CLOSE_ALL</xBtn></div>
		<xBtn :plain="true" @click="open1">消息</xBtn>
		<xBtn :plain="true" @click="open2">成功</xBtn>
		<xBtn :plain="true" @click="open3">警告</xBtn>
		<xBtn :plain="true" @click="open4">错误</xBtn>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: `可以添加关闭按钮。
                
默认的 Message 是不可以被人工关闭的，如果需要可手动关闭的 Message，可以使用\`showClose\`字段。此外，和 Notification 一样，Message 拥有可控的\`duration\`，设置\`0\`为不会被自动关闭，默认为 3000 毫秒。
`
			};
		},
		methods: {
			closeAll() {
				_.$msg.closeAll();
			},
			open1() {
				_.$msg({
					duration: 0,
					showClose: true,
					message: "这是一条消息提示"
				});
			},

			open2() {
				_.$msg({
					duration: 0,
					showClose: true,
					message: "恭喜你，这是一条成功消息",
					type: "success"
				});
			},

			open3() {
				_.$msg({
					duration: 0,
					showClose: true,
					message: "警告哦，这是一条警告消息",
					type: "warning"
				});
			},

			open4() {
				_.$msg({
					duration: 0,
					showClose: true,
					message: "错了哦，这是一条错误消息",
					type: "error"
				});
			}
		}
	});
}
</script>
<style lang="less"></style>
