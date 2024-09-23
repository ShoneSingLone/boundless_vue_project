<template>
	<div>
		<xMd :md="md" />
		<xMenu
			:default-active="activeIndex"
			class="el-menu-demo"
			mode="horizontal"
			@select="handleSelect">
			<xMenuItem index="1">处理中心</xMenuItem>
			<xSubMenu index="2">
				<template slot="title">我的工作台</template>
				<xMenuItem index="2-1">选项1</xMenuItem>
				<xMenuItem index="2-2">选项2</xMenuItem>
				<xMenuItem index="2-3">选项3</xMenuItem>
				<xSubMenu index="2-4">
					<template slot="title">选项4</template>
					<xMenuItem index="2-4-1">选项1</xMenuItem>
					<xMenuItem index="2-4-2">选项2</xMenuItem>
					<xMenuItem index="2-4-3">选项3</xMenuItem>
				</xSubMenu>
			</xSubMenu>
			<xMenuItem index="3" disabled>消息中心</xMenuItem>
			<xMenuItem index="4"
				><a href="https://www.ele.me" target="_blank">订单管理</a></xMenuItem
			>
		</xMenu>
		<div class="line"></div>
		<xMenu
			:default-active="activeIndex2"
			class="el-menu-demo"
			mode="horizontal"
			@select="handleSelect"
			background-color="#545c64"
			text-color="#fff"
			active-text-color="#ffd04b">
			<xMenuItem index="1">处理中心</xMenuItem>
			<xSubMenu index="2">
				<template slot="title">我的工作台</template>
				<xMenuItem index="2-1">选项1</xMenuItem>
				<xMenuItem index="2-2">选项2</xMenuItem>
				<xMenuItem index="2-3">选项3</xMenuItem>
				<xSubMenu index="2-4">
					<template slot="title">选项4</template>
					<xMenuItem index="2-4-1">选项1</xMenuItem>
					<xMenuItem index="2-4-2">选项2</xMenuItem>
					<xMenuItem index="2-4-3">选项3</xMenuItem>
				</xSubMenu>
			</xSubMenu>
			<xMenuItem index="3" disabled>消息中心</xMenuItem>
			<xMenuItem index="4"
				><a href="https://www.ele.me" target="_blank">订单管理</a></xMenuItem
			>
		</xMenu>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: `### 顶栏

导航菜单默认为垂直模式，通过\`mode\`属性可以使导航菜单变更为水平模式。另外，在菜单中通过\`submenu\`组件可以生成二级菜单。Menu 还提供了\`background-color\`、\`text-color\`和\`active-text-color\`，分别用于设置菜单的背景色、菜单的文字颜色和当前激活菜单的文字颜色。
                `,
				activeIndex: "1",
				activeIndex2: "1"
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				_.$msgSuccess(`${key} + ${keyPath}`);
			}
		}
	});
}
</script>
<style lang="less"></style>
