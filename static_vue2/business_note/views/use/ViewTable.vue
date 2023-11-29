<template>
	<div class="page-view">
		<xPageContent>
			<div style="height: 40%; overflow: auto">
				<xTableDiv :configs="configs" :data="configs.data.list" />
			</div>
			<div>count: {{ count }}</div>
			<div style="height: 40%; overflow: auto">
				<xTable :configs="configs" />
			</div>
		</xPageContent>
	</div>
</template>

<script>
export default async function () {
	const opts = [
		{ label: "foo", value: "foo" },
		{ label: "bar", value: "bar" },
		{ label: "fiz", value: "fiz" }
	];
	return defineComponent({
		setup() {
			const count = ref(0);
			function handleRowValuechange(index, prop, val) {
				count.value++;
				// configs.data.list[index][prop] = val;
				const item = configs.data.list[index];
				item[prop] = val;
				configs.data.list.splice(index, 1, item);
			}

			const configs = reactive({
				data: {
					list: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
				},
				colInfo: {
					col_a: {
						label: i18n("col_a"),
						xCellSelect({ xCell }) {
							return {
								options() {
									return opts;
								},
								onEmitValue: ({ val, index }) => {
									handleRowValuechange(index, "col_a", val);
								}
							};
						},
						isShow: true
					},
					col_b: {
						label: i18n("col_b"),
						xCellSelect({ xCell }) {
							return {
								options: opts,
								disabled() {
									return this.payload.row.col_a === "foo";
								},
								onEmitValue: ({ val, index }) => {
									handleRowValuechange(index, "col_b", val);
								}
							};
						},
						isShow: true
					},
					col_c: {
						label: i18n("col_c"),
						xCellSelect({ xCell }) {
							return {
								options: opts,
								onEmitValue: ({ val, index }) => {
									handleRowValuechange(index, "col_c", val);
								}
							};
						},
						isShow: true
					},
					col_d: {
						label: i18n("col_d"),
						xCellSelect({ xCell }) {
							return {
								options: opts,
								onEmitValue: ({ val, index }) => {
									handleRowValuechange(index, "col_d", val);
								}
							};
						},
						isShow: true
					},
					col_e: {
						label: i18n("col_e"),
						xCellInput() {
							return {
								onEmitValue({ val, index }) {
									handleRowValuechange(index, "col_e", val);
								}
							};
						},
						isShow: true
					}
				}
			});

			return {
				count,
				configs
			};
		}
	});
}
</script>

<style lang="less"></style>
