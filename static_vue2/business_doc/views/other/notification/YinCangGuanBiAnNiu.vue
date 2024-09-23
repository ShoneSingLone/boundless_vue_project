<template>
	<div>
		<xMd :md="desc" />
		<xBtn @click="open"> 隐藏关闭按钮 </xBtn>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				desc: "可以不显示关闭按钮\n将`showClose`属性设置为`false`即可隐藏关闭按钮。"
			};
		},
		methods: {
			open() {
				_.$notify.success({
					title: "Info",
					message: "这是一条没有关闭按钮的消息",
					showClose: false
				});
			}
		}
	});
}
</script>
