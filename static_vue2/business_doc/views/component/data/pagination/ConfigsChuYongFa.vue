<template>
	<div class="flex vertical mr">
		<xMd :md="md" />
		<div class="mt">
			{{ configsTable.pagination }}
		</div>
		<xPagination :configs="configsTable" @change="handleChange" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			const vm = this;
			return {
				md: `- configs需要有\`pagination\`属性
- 提供\`onQuery\`方法,在pagination变动后调用
- 提供\`change\`事件,在pagination变动后调用
- 默认靠右
`,
				pagination: "",
				configsTable: defTable({
					onQuery(pagination) {
						setTimeout(() => {
							_.$msgSuccess("触发onQuery方法", JSON.stringify(pagination, null, 2));
						}, 300);
					},
					pagination: { page: 1, total: 1000, size: 10 },
					data: {
						set: undefined,
						selected: [],
						list: []
					},
					columns: []
				})
			};
		},
		methods: {
			handleChange(pagination) {
				_.$msgSuccess("触发change事件", JSON.stringify(pagination, null, 2));
			}
		}
	});
}
</script>
<style lang="less"></style>
