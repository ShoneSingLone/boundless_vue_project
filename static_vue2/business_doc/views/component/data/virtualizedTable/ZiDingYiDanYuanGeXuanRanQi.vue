<template>
	<xTableVir :columns="columns" :data="data" :width="700" :height="400" fixed />
</template>
<script>
export default async function () {
	return defineComponent({
		setup() {
			const dataGenerator = (_, index) => ({
				id: `random-id-${++index}`,
				name: "Tom",
				date: "2020" + index
			});

			const columns = [
				{
					prop: "date",
					label: "Date",
					width: 150,
					fixed: "left",
					cellRenderer: ({ cellData: date }) =>
						h(
							"ElTooltip",
							{
								content: dayjs(date).format("YYYY/MM/DD"),
								placement: "top"
							},
							[h("span", { class: "flex items-center" }, [h("xIcon", { icon: "el-icon-timer" }), dayjs(date).format("YYYY/MM/DD")])]
						)
				},
				{
					prop: "name",
					label: "Name",
					width: 150,
					align: "center",
					cellRenderer: ({ cellData: name }) => h("xTag", [name])
				},
				{
					prop: "operations",
					label: "Operations",
					cellRenderer: ({ cellData }) => [h("xBtn", { type: "primary" }, ["Edit"]), h("xBtn", { type: "primary" }, ["Delete"])],
					width: 150,
					align: "center"
				}
			];

			const data = ref(Array.from({ length: 200 }).map(dataGenerator));

			return {
				columns,
				data
			};
		}
	});
}
</script>
<style lang="less"></style>
