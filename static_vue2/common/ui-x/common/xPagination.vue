<template>
	<div class="xPagination flex end">
		<el-pagination
			v-if="!!privateValue.total"
			background
			@size-change="size => handleChange({ page: 1, size })"
			@current-change="page => handleChange({ page })"
			:current-page="privateValue.page"
			:page-sizes="[10, 20, 30]"
			:page-size="privateValue.size"
			layout="total, sizes, prev, pager, next, jumper"
			:total="privateValue.total">
		</el-pagination>
	</div>
</template>

<script lang="ts">
export default async function () {
	/* xPagination  后台是以0开始，注意current的加减*/
	return {
		name: "xPagination",
		model: {
			prop: "value",
			event: "change"
		},
		/* page,size,total */
		props: ["value", "options", "configs"],
		data() {
			return {
				pagination: {}
			};
		},
		mounted() {
			if (this.configs) {
				if (!this.configs?.onQuery) {
					alert("使用configs 作为实参时，pagination 必须有 onQuery 属性");
				}
			}
		},
		methods: {
			emitChange(pagination) {
				if (this.configs?.pagination) {
					this.configs.pagination = pagination;
				}
				this.$emit("change", pagination);
				if (this?.configs?.onQuery) {
					this.$nextTick(() => {
						this.configs.onQuery(pagination);
					});
				}
			},
			handleChange(pagination) {
				this.privateValue = _.merge({}, this.privateValue, pagination);
			}
		},
		computed: {
			privateValue: {
				get() {
					if (this.configs?.pagination) {
						return this.configs.pagination;
					}
					return this.value;
				},
				set(val) {
					this.emitChange(val);
				}
			}
		}
	};
}
</script>

<style lang="less">
.xPagination {
	padding: var(--ui-one);
	overflow: auto;
	width: 100%;
}
</style>
