<template>
	<div>
		<xMd :md="md" />
		<xRadioGroup v-model="isCollapse" style="margin-bottom: 20px">
			<xRadioButton :label="false">展开</xRadioButton>
			<xRadioButton :label="true">收起</xRadioButton>
		</xRadioGroup>
		<xMenu
			default-active="1-4-1"
			class="el-menu-vertical-demo"
			@open="handleOpen"
			@close="handleClose"
			:collapse="isCollapse">
			<xSubMenu index="1">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span slot="title">导航一</span>
				</template>
				<xMenuItemGroup>
					<span slot="title">分组一</span>
					<xMenuItem index="1-1">选项1</xMenuItem>
					<xMenuItem index="1-2">选项2</xMenuItem>
				</xMenuItemGroup>
				<xMenuItemGroup title="分组2">
					<xMenuItem index="1-3">选项3</xMenuItem>
				</xMenuItemGroup>
				<xSubMenu index="1-4">
					<span slot="title">选项4</span>
					<xMenuItem index="1-4-1">选项1</xMenuItem>
				</xSubMenu>
			</xSubMenu>
			<xMenuItem index="2">
				<i class="el-icon-menu"></i>
				<span slot="title">导航二</span>
			</xMenuItem>
			<xMenuItem index="3" disabled>
				<i class="el-icon-document"></i>
				<span slot="title">导航三</span>
			</xMenuItem>
			<xMenuItem index="4">
				<i class="el-icon-setting"></i>
				<span slot="title">导航四</span>
			</xMenuItem>
		</xMenu>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: ` `,
				isCollapse: true
			};
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
				_.$msgSuccess(`${key} + ${keyPath}`);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
				_.$msgSuccess(`${key} + ${keyPath}`);
			},
			handleSelect(key, keyPath) {
				_.$msgSuccess(`${key} + ${keyPath}`);
			}
		}
	});
}
</script>
<style lang="less"></style>
