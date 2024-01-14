<template>
	<DocContentOfDemo class="demo-input">
		<xMd :md="mdTips" />
		<DemoAndCode title="基础用法" path="@/views/component/form/select/JiChuYongFa.vue" unfold />
		<DemoAndCode title="有禁用选项" path="@/views/component/form/select/YouJinYongXuanXiang.vue" unfold />
		<DemoAndCode title="选择器不可用状态" path="@/views/component/form/select/XuanZeQiBuKeYongZhuangTai.vue" unfold />
		<DemoAndCode title="可清空单选" path="@/views/component/form/select/KeQingKongDanXuan.vue" unfold />
		<DemoAndCode title="基础多选" path="@/views/component/form/select/JiChuDuoXuan.vue" unfold />
		<DemoAndCode title="自定义模板" path="@/views/component/form/select/ZiDingYiMoBan.vue" unfold />
		<DemoAndCode title="分组" path="@/views/component/form/select/FenZu.vue" unfold />
		<DemoAndCode title="可搜索" path="@/views/component/form/select/KeSouSuo.vue" unfold />
		<DemoAndCode title="远程搜索" path="@/views/component/form/select/YuanChengSouSuo.vue" unfold />
		<DemoAndCode title="创建条目" path="@/views/component/form/select/ChuangJianTiaoMu.vue" unfold />
		<xMd :md="apiString" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				mdTips: "当选项过多时，使用下拉菜单展示并选择内容。\n\n>如果 Select 的绑定值为对象类型，请务必指定 `value-key` 作为它的唯一性标识。",
				apiString: ` `
			};
		}
	};
}
</script>

<style lang="less"></style>
