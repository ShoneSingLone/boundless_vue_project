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
	return {
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
						xCellSelect: {
							options: [],
							cpt_options({ vm }) {
								if (vm.configs.payload.index === 0) {
									return [
										{ label: "foo", value: "foo" },
										{ label: "bar", value: "bar" },
										{ label: "fiz", value: "fiz" }
									];
								} else {
									return [
										{ label: "foo", value: "foo" },
										{ label: "fiz", value: "fiz" }
									];
								}
							},
							onEmitValue: ({ val, index }) => {
								handleRowValuechange(index, "COL_云服务类型", val);
							}
						},
						isShow: true
					},
					COL_a: {
						label: i18n("input"),
						xCellInput: {
							onEmitValue({ val, index }) {
								handleRowValuechange(index, "COL_a", val);
							}
						},
						isShow: true
					}
				}
			});

			return {
				configs
			};
		}
	};
}
</script>

<style lang="less"></style>
