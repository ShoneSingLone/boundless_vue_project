<template>
	<xSelect multiple filterable remote remote-show-suffix v-model="mixin_value" :remoteMethod="onSearch" placeholder="请输入用户名">
		<xOption :key="item.uid" :value="item.uid" :label="item.username" v-for="item in optionArray"> {{ item.username }} </xOption>
	</xSelect>
</template>

<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");

	return {
		inject: ["APP"],
		mixins: [mixins],
		props: ["value", "options", "configs"],
		data() {
			const vm = this;
			vm.doSearch = _.debounce(async params => {
				try {
					const { data } = await _api.yapi.getUserSearch(params);
					this.optionArray = data;
				} catch (error) {
					console.error(error);
				} finally {
					this.isFetching = false;
				}
			}, 600);

			return {
				optionArray: [],
				isFetching: false
			};
		},
		mounted() {
			this.doSearch();
		},
		computed: {
			cptClassName() {
				return {
					YapiItemUac: true,
					flex: true,
					horizontal: true,
					middle: true,
					isShowInput: this.isShowInput
				};
			},
			cptShortName() {
				return this.APP.applySystemInfo?.shortName || "";
			},
			cptSelectedItem() {
				return _.find(this.select.options, { value: this.select.value }) || {};
			},
			isShowInput() {
				return this.cptSelectedItem?.showInput;
			}
		},
		methods: {
			onSearch(value) {
				const params = { q: value };
				this.isFetching = true;
				this.doSearch(params);
			}
		}
	};
}
</script>

<style lang="less"></style>
