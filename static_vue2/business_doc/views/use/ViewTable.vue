<template>
	<div class="page-view">
		<xPageContent>
			<h1>xCellSelect</h1>
			<div>
				{{ configs.data.list }}
			</div>
			<x-table :configs="configs" />
		</xPageContent>
	</div>
</template>

<script>
export default async function () {
	return defineComponent({
		setup() {
			function handleRowValuechange(index, prop, val) {
				// configs.data.list[index][prop] = val;
				const item = configs.data.list[index];
				item[prop] = val;
				configs.data.list.splice(index, 1, item);
			}

			const configs = reactive({
				data: {
					list: [{}, {}]
				},
				colInfo: {
					COL_云服务类型: {
						label: i18n("云服务类型"),
						options: [
							{ label: "foo", value: "foo" },
							{ label: "bar", value: "bar" },
							{ label: "fiz", value: "fiz" }
						],
						xCellSelect({ xCell }) {
							return {
								options({ xItem }) {
									const _options = (function () {
										if (xItem.configs.payload.index === 0) {
											return xCell.options.map(i => i);
										}

										if (xItem.configs.payload.index === 1) {
											// const row1Value = _.$val(configs, "data.list.0.COL_云服务类型");
											const row1Value = configs.data.list[0].COL_云服务类型;
											return _.filter(xCell.options, i => {
												return i.value !== row1Value;
											});
										}
									})();
									return _options;
								},
								onEmitValue: ({ val, index }) => {
									handleRowValuechange(index, "COL_云服务类型", val);
								}
							};
						},
						isShow: true
					},
					COL_a: {
						label: i18n("input"),
						xCellInput() {
							return {
								onEmitValue({ val, index }) {
									handleRowValuechange(index, "COL_a", val);
								}
							};
						},
						isShow: true
					}
				}
			});

			return {
				configs
			};
		}
	});
}
</script>

<style lang="less"></style>
