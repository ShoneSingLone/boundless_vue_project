<template>
	<div class="card-JianDanKaPian">
		<xMd :md="mdTitle" />
		<xCard class="box-card">
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
				mdTitle: "卡片可以只有内容区域。"
			};
		}
	});
}
</script>
<style lang="less">
.card-JianDanKaPian {
	.text {
		font-size: 14px;
	}

	.item {
		padding: 18px 0;
	}

	.box-card {
		width: 480px;
	}
}
</style>
