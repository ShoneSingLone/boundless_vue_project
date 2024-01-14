<template>
	<xDialog>
		<div class="flex xTransfer center" v-if="slotSearchForm" :is="slotSearchForm" ref="slotSearchForm" :vm="vm"></div>
		<div class="flex">
			<xSearchList class="flex1" :items="originItems" v-model="originValue" :title="originTitle" :on-query="queryOrigin" ref="origin" :slotSearchForm="slotSearchFormOrigin" />
			<div class="flex vertical middle center padding16">
				<xBtn :configs="btnLeft" />
				<xBtn :configs="btnRight" />
			</div>
			<xSearchList class="flex1" :items="targetItems" v-model="targetValue" :title="targetTitle" :on-query="queryTarget" ref="target" :slotSearchForm="slotSearchFormTarget" />
		</div>
	</xDialog>
</template>

<script lang="ts">
export default async function () {
	return {
		props: ["configs"],
		async mounted() {
			await _.$ensure(() => this.$refs.origin && this.$refs.target);
			this.configs.mounted && this.configs.mounted(this, this.$refs.origin, this.$refs.target);
		},
		data() {
			const vm = this;
			return {
				vm,
				/**/
				originTitle: "originTitle",
				originItems: [],
				originValue: [],
				/**/
				targetTitle: "targetTitle",
				targetItems: [],
				targetValue: []
			};
		},
		computed: {
			btnLeft() {
				const vm = this;
				return {
					label: "<",
					preset: "blue",
					disabled() {
						return vm.targetValue.length === 0;
					},
					onClick() {
						vm.deleteRes();
					}
				};
			},
			btnRight() {
				const vm = this;
				return {
					label: ">",
					preset: "blue",
					disabled() {
						return vm.originValue.length === 0;
					},
					onClick() {
						vm.addRes();
					}
				};
			},
			slotSearchFormOrigin() {
				return this.configs.slotSearchFormOrigin;
			},
			slotSearchFormTarget() {
				return this.configs.slotSearchFormTarget;
			},
			slotSearchForm() {
				return this.configs.slotSearchForm;
			}
		},
		methods: {
			query() {
				this.configs.query && this.configs.query(this);
			},
			queryOrigin() {
				this.configs.queryOrigin(this, this.$refs.origin);
			},
			queryTarget() {
				this.configs.queryTarget(this, this.$refs.target);
			},
			addRes() {
				if (!_.$isArrayFill(this.originValue)) return;
				this.configs.addRes(this);
			},
			deleteRes() {
				if (!_.$isArrayFill(this.targetValue)) return;
				this.configs.deleteRes(this);
			}
		}
	};
}
</script>

<style lang="less"></style>
