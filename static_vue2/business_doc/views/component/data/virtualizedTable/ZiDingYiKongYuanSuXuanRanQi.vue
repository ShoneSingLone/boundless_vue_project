<template>
	<div>
		<xMd :md="md" />
		<xTableVir :columns="columns" :data="data" :height="400" fixed>
			<template #empty>
				<h1 class="flex middle center width100">朴实无华的Empty</h1>
			</template>
		</xTableVir>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		setup() {
			return {
				md: `如果在整个应用使用同一个empty，可以修改默认empty 组件的加载地址`,
				columns: [
					{
						prop: "name",
						label: "Name",
						align: "center"
					},
					{
						prop: "date",
						label: "date",
						align: "center"
					}
				],
				data: []
			};
		}
	});
}
</script>
<style lang="less"></style>
