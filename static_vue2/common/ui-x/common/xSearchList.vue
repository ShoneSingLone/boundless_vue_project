<template>
	<xCard class="xSearchList">
		<template #header>
			<div class="flex middle">
				<label class="form-check-label">
					<ElCheckbox :value="isSelectAll" :indeterminate="!isSelectAll && value.length > 0" @change="setSelectAll">
						{{ title }}
					</ElCheckbox>
				</label>
				<span class="flex1"></span>
				<div v-if="slotSearchForm" :is="slotSearchForm" :vm-search-list="vmSearchList"></div>
				<div v-else class="flex middle">
					<xItem v-model="searchForm.field" :configs="configsSearchForm.field" />
					<span />
					<xItem v-model="searchForm.value" :configs="configsSearchForm.value" />
					<span class="mr10" />
					<xInquire @click="onQuery" />
				</div>
			</div>
		</template>
		<div class="wrapper">
			<div class="form-check flex" v-for="item in items" :key="item.key">
				<label class="ml10 form-check-label flex1 ellipsis" :title="item.label">
					<ElCheckbox :value="value.includes(item.key)" @change="handleValueChange(item.key)">
						{{ item.label }}
					</ElCheckbox>
				</label>
			</div>
		</div>
	</xCard>
</template>
<script>
export default async function () {
	return {
		name: "x-search-list",
		props: ["items", "value", "title", "onQuery", "slotSearchForm"],
		model: {
			prop: "value",
			event: "change"
		},
		data() {
			const vmSearchList = this;
			return {
				vmSearchList,
				searchForm: {
					field: "",
					value: ""
				},
				configsSearchForm: {
					field: {
						isHide: false,
						itemType: "xItemSelect",
						options: []
					},
					value: {
						isHide: false,
						options: []
					}
				}
			};
		},
		computed: {
			isSelectAll() {
				if (this.items.length === 0) return false;
				return this.value.length === this.items.length;
			}
		},
		methods: {
			handleValueChange(key) {
				const _value = _.cloneDeep(this.value);
				const index = _.findIndex(_value, i => i === key);
				if (index >= 0) {
					_value.splice(index, 1);
				} else {
					_value.push(key);
				}
				this.$emit("change", _value);
			},
			setSelectAll() {
				let _value = _.cloneDeep(this.value);
				if (_value.length === this.items.length) {
					_value = [];
				} else {
					_value = this.items.map(i => i.key);
				}
				this.$emit("change", _value);
			}
		}
	};
}
</script>

<style lang="less">
.x-search-list_wrapper .card-body .form-check label.ellipsis {
	font-weight: unset;
}

.xSearchList {
	.form-check {
		label.el-checkbox {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
		}

		.form-check-label {
			&:hover {
				.el-checkbox__label {
					color: var(--ui-primary);
				}
			}
		}
	}

	.wrapper {
		min-height: 300px;
		max-height: 400px;
		overflow: auto;
	}
}
</style>
