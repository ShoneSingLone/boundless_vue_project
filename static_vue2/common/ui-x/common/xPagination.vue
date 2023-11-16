<template>
	<div class="xPagination flex end">
		<el-pagination
			v-if="privateValue.count > 0"
			background
			@size-change="pagesize => handleChange({ current: 1, pagesize })"
			@current-change="current => handleChange({ current })"
			:current-page="privateValue.current"
			:page-sizes="[10, 20, 30]"
			:page-size="privateValue.pagesize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="privateValue.count">
		</el-pagination>
	</div>
</template>

<script>
export default async function () {
	/* xPagination  后台是以0开始，注意current的加减*/
	return {
		name: "xPagination",
		model: {
			prop: "value",
			event: "change"
		},
		props: ["value", "options", "configs", "toolbar"],
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
			emitChange({ count, current, pagesize }) {
				/* 给外部查询用 */
				let pagination = {
					count,
					current: (current - 1) * pagesize,
					pagesize
				};

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
				this.emitChange(_.merge({}, this.privateValue, pagination));
			}
		},
		computed: {
			privateValue: {
				get() {
					let { count, current, pagesize } = (() => {
						if (this.configs?.pagination) {
							return this.configs.pagination;
						}
						return this.value;
					})();
					current = Math.ceil((current + 1) / pagesize);
					let pagination = {
						count,
						current,
						pagesize
					};
					/* 在内部给ElPagination使用 */

					return pagination;
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
