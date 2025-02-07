<template>
	<xTableVir :columns="columns" :data="data" :height="400" fixed />
</template>
<script lang="ts">
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
					width: 250,
					fixed: "left",
					cellRenderer: ({ cellData: date }) =>
						h(
							"xTooltip",
							{
								content: _.$dateFormat(date),
								placement: "top"
							},
							[
								hSpan({ class: "flex" }, [
									h("xIcon", { icon: "msg", staticClass: "mr" }),
									_.$dateFormat(date)
								])
							]
						)
				},
				{
					prop: "name",
					label: "Name",
					align: "center",
					cellRenderer: ({ cellData: name }) => {
						return h("xTag", [name]);
					}
				},
				{
					prop: "operations",
					label: "Operations",
					cellRenderer: ({ cellData }) => [
						hxBtn({ preset: "blue" }, ["Edit"]),
						hxBtn({ preset: "blue" }, ["Delete"])
					],
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
