<template>
	<div :class="cptPaginationClass" v-if="isShowXPagination">
		<component
			:is="currentPaginationComponent"
			background
			@size-change="size => handleChange({ page: 1, size })"
			@current-change="page => handleChange({ page })"
			:current-page="privateValue.page"
			:page-sizes="cptPageSizes"
			:page-size="privateValue.size"
			layout="total, sizes, prev, pager, next, jumper"
			:total="privateValue.total">
		</component>
	</div>
	<PrivatePagination v-else-if="isShowElPagination" v-bind="$attrs" />
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	/* xPagination  后台是以0开始，注意current的加减*/
	return {
		name: "xPagination",
		components: {
			PrivatePagination: () =>
				_.$importVue("/common/ui-x/components/data/xPagination/PrivatePagination.vue")
		},
		model: {
			prop: "value",
			event: "change"
		},
		/* page,size,total */
		props: ["value", "options", "configs", "position"],
		data(vm) {
			return {
				pagination: {},
				currentPaginationComponent: PRIVATE_GLOBAL.x_pagination_pagination_component
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
			cptPaginationClass() {
				let position = this.position || PRIVATE_GLOBAL.x_pagination_position;
				return ["xPagination flex", position];
			},
			isShowElPagination() {
				return !this.privateValue;
			},
			isShowXPagination() {
				if (!this.privateValue) {
					return false;
				}
				return !!this.privateValue.total;
			},
			cptPageSizes() {
				return this.configs?.pagination?.pageSizes || [10, 20, 30];
			},
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
