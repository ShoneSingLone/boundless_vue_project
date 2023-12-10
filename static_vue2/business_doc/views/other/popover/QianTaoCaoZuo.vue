<template>
	<div class="card-JiChuYongFa">
		<Md :md="mdTitle" />
		<Md :md="'### 推荐使用v-xtips'" />
		<xBtn v-xtips="manual" @click="manual.visible = true">click 激活</xBtn>
		<Md :md="'#### 普通dom\n\n'" />
		<elPopover placement="top" width="160" v-model="visible">
			<p>这是一段内容这是一段内容确定删除吗？</p>
			<div style="text-align: right; margin: 0">
				<xBtn size="mini" type="text" @click="visible = false">取消</xBtn>
				<xBtn preset="primary" size="mini" @click="visible = false">确定</xBtn>
			</div>
			<xBtn slot="reference">删除</xBtn>
		</elPopover>
	</div>
</template>
<script>
export default async function () {
	const DemoTips = await _.$importVue("@/views/other/popover/QianTaoCaoZuo.confirm.vue");
	return defineComponent({
		data() {
			const vm = this;
			return {
				mdTitle: `还可以嵌套操作，这相比 Dialog 更为轻量`,
				visible: false,
				manual: {
					content() {
						return h(DemoTips, {
							onSelected({ isOk }) {
								_.$msgSuccess(isOk ? "操作成功" : "操作失败");
								vm.manual.visible = false;
							}
						});
					},
					trigger: "manual",
					visible: false,
					placement: "top"
				}
			};
		}
	});
}
</script>
<style lang="less"></style>
