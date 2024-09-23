<template>
	<div class="message-JiChuYongFa">
		<xMd :md="md" />
		<xRadioGroup v-model="direction">
			<xRadio label="ltr">从左往右开</xRadio>
			<xRadio label="rtl">从右往左开</xRadio>
			<xRadio label="ttb">从上往下开</xRadio>
			<xRadio label="btt">从下往上开</xRadio>
		</xRadioGroup>

		<xBtn @click="drawer = true" preset="primary" style="margin-left: 16px"> 点我打开 </xBtn>

		<xDrawer
			title="我是标题"
			:visible.sync="drawer"
			:direction="direction"
			:before-close="handleClose">
			<span>我来啦!</span>
		</xDrawer>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md:
					"呼出一个临时的侧边栏, 可以从多个方向呼出\n\n" +
					"需要设置 `visible` 属性，它的**类型**是 `boolean`,当为 **true** 时显示 Drawer。Drawer 分为两个部分：`title` 和 `body`，`title` 需要具名为 **title** 的 `slot`, 也可以通过 `title` 属性来定义，默认值为空。需要注意的是, Drawer 默认是从右往左打开, 当然可以设置对应的 `direction`, 详细请参考 `direction` 用法 最后，本例还展示了 `before-close` 的用法",
				drawer: false,
				direction: "rtl"
			};
		},
		methods: {
			handleClose(done) {
				_.$confirm("确认关闭？").then(done);
			}
		}
	});
}
</script>
<style lang="less"></style>
