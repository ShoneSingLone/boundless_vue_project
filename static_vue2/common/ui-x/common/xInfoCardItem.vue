<template>
	<div data-role="cell" :data-span="cpt_span" class="el-descriptions-row flex cell">
		<div class="el-descriptions-item__label is-bordered-label">
			<span :style="labelStyle">
				{{ cpt_label }}
			</span>
		</div>
		<div class="el-descriptions-item__content flex1">
			<span :style="contentStyle">
				{{ cpt_content }}
			</span>
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		props: ["item", "unitWidth", "span"],
		async mounted() {},
		computed: {
			labelStyle() {
				if (this.cpt_label === "___") {
					return {
						opacity: 0
					};
				}
				return {};
			},
			contentStyle() {
				if (this.cpt_content === "___") {
					return {
						opacity: 0
					};
				}
				return {};
			},
			cpt_span() {
				return this.item.span || 1;
			},
			cpt_label() {
				if (_.isFunction(this.item.label)) {
					return this.item.label();
				}
				return this.item.label || "___";
			},
			cpt_content() {
				if (_.isFunction(this.item.content)) {
					return this.item.content();
				}
				return this.item.content || "___";
			}
		},
		watch: {},
		data() {
			return {};
		},
		methods: {}
	};
}
</script>

<style lang="less"></style>
