<style lang="less"></style>
<template>
	<xAutoResizer :onResize="onResize">
		<template #default="{ width, height }">
			<div
				:key="_uid"
				class="x-chart flex flex1 center middle x-loading"
				:width="width"
				:height="height"
				:style="{
					width: width + 'px',
					height: height + 'px'
				}" />
		</template>
	</xAutoResizer>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "xCharts",
		props: {
			/*任一附带信息*/
			payload: {
				required: false,
				type: [Object, String],
				default: ""
			},
			/**
			 * 一个js文件名，里面有显示echart需要的配置信息和接口数据的处理方法
			 * 或者一个对象CONFIGS_MAP
			 */
			configs: {
				type: [String, Object],
				required: true,
				validator(value) {
					// ["initOptions", "updateOptions"];
					return true;
				}
			},
			dataset: {
				type: [Array, Object],
				/* 接口返回的数据，通过对应的handler来处理数据 */
				default() {
					return [];
				}
			}
		},
		setup() {
			const vm = this;
			vm.onResize = _.debounce(function () {
				if (vm.myChart) {
					vm.myChart.resize();
					_.$execfnify(vm?.helper?.onResize, {
						instance: vm.myChart,
						chartVM: vm
					});
				}
			}, 100);

			vm.update = _.debounce(async function () {
				if (!vm.myChart) {
					const [echarts] = await Promise.all([
						_.$appendScript("/common/libs/echarts/echarts.min.js", "echarts"),
						_.$ensure(() => vm.$el)
					]);
					// vm.myChart.dispose();
					vm.myChart = markRaw(echarts.init(vm.$el));
				}

				vm.myChart.showLoading();

				const options = vm.helper.initOptions(vm.$props);

				vm.options = vm.helper.updateOptions(options, vm.dataset);

				await _.$execfnify(vm?.helper?.afterInit, { instance: vm.myChart });

				vm.myChart.setOption(vm.options);
				vm.myChart.hideLoading();
			}, 500);
			return { myChart: false };
		},
		computed: {
			helper() {
				if (_.isPlainObject(this.configs)) {
					return this.configs;
				}
				// return CONFIGS_MAP[this.configs];
			}
		},
		watch: {
			dataset() {
				this.update();
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			async init() {
				this.update();
			}
		}
	});
}
</script>
