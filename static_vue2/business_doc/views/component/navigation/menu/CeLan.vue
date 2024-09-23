<template>
	<div>
		<xMd :md="md" />
		<el-row class="tac">
			<el-col :span="12">
				<h5>默认颜色</h5>
				<xMenu
					default-active="2"
					class="el-menu-vertical-demo"
					@open="handleOpen"
					@close="handleClose">
					<xSubMenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>导航一</span>
						</template>
						<xMenuItemGroup>
							<template slot="title">分组一</template>
							<xMenuItem index="1-1">选项1</xMenuItem>
							<xMenuItem index="1-2">选项2</xMenuItem>
						</xMenuItemGroup>
						<xMenuItemGroup title="分组2">
							<xMenuItem index="1-3">选项3</xMenuItem>
						</xMenuItemGroup>
						<xSubMenu index="1-4">
							<template slot="title">选项4</template>
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
			</el-col>
			<el-col :span="12">
				<h5>自定义颜色</h5>
				<xMenu
					default-active="2"
					class="el-menu-vertical-demo"
					@open="handleOpen"
					@close="handleClose"
					background-color="#545c64"
					text-color="#fff"
					active-text-color="#ffd04b">
					<xSubMenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>导航一</span>
						</template>
						<xMenuItemGroup>
							<template slot="title">分组一</template>
							<xMenuItem index="1-1">选项1</xMenuItem>
							<xMenuItem index="1-2">选项2</xMenuItem>
						</xMenuItemGroup>
						<xMenuItemGroup title="分组2">
							<xMenuItem index="1-3">选项3</xMenuItem>
						</xMenuItemGroup>
						<xSubMenu index="1-4">
							<template slot="title">选项4</template>
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
			</el-col>
		</el-row>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: `### 侧栏
垂直菜单，可内嵌子菜单。

通过\`xMenuItemGroup\`组件可以实现菜单进行分组，分组名可以通过\`title\`属性直接设定，也可以通过具名 slot 来设定。
                `,
				activeIndex: "1",
				activeIndex2: "1"
			};
		},
		methods: {
			handleOpen(key, keyPath) {
				_.$msgSuccess(`${key} + ${keyPath}`);
			},
			handleClose(key, keyPath) {
				_.$msgSuccess(`${key} + ${keyPath}`);
			}
		}
	});
}
</script>
<style lang="less"></style>
