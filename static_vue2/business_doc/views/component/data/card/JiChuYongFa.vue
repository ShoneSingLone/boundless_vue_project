<template>
	<div class="card-JiChuYongFa">
		<xMd :md="mdTitle" />
		<xCard class="box-card">
			<div slot="header" class="flex middle">
				<span class="flex1">卡片名称</span>
				<xBtn preset="text">操作按钮</xBtn>
			</div>
			<div v-for="o in 4" :key="o" class="text item">
				{{ "列表内容 " + o }}
			</div>
		</xCard>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle:
					"Card 组件包括`header`和`body`部分，`header`部分需要有显式具名 slot 分发，同时也是可选的。"
			};
		}
	});
}
</script>
<style lang="less">
.card-JiChuYongFa {
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.box-card {
		width: 480px;
	}
}
</style>
