<template>
	<div class="xItem-ip-part">
		<table class="page_table">
			<thead>
				<tr>
					<th>
						{{ i18n("name") }}
					</th>
					<th>
						{{ i18n("URL") }}
					</th>
					<th style="width: 48px" class="flex middle center">
						<xIcon class="pointer" icon="icon_plus" @click="addNewItem" />
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, index) in mixin_value" :key="index">
					<td>
						<xItem :configs="c_name" :value="row.name" @change="handleRowValuechange({ row, $index: index }, 'name', $event)" />
					</td>
					<td>
						<xItem :configs="c_url" :value="row.url" @change="handleRowValuechange({ row, $index: index }, 'url', $event)" />
					</td>
					<td class="flex middle center">
						<xIcon class="pointer" icon="icon_delete" @click="delIpPart({ row, $index: index })" />
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	const RULES = await _.$importVue("/common/utils/rules.vue");

	return {
		mixins: [mixins],
		props: ["value", "options", "configs"],
		data() {
			return {
				c_name: {
					rules: [RULES.required()]
				},
				c_url: {
					rules: [RULES.required(), RULES.inetUrl()]
				}
			};
		},
		methods: {
			handleRowValuechange(scope, prop, val) {
				scope.row[prop] = val;
				const { row } = scope;
				this.value.splice(scope.$index, 1, row);
				this.xItem.onEmitValue({ val: this.value });
			},
			delIpPart(scope) {
				let index = _.findIndex(this.value, scope.row);
				this.value.splice(index, 1);
				this.xItem.onEmitValue({ val: this.value });
			},
			addNewItem() {
				this.value.push({
					name: "",
					url: ""
				});
			}
		}
	};
}
</script>

<style lang="less">
.xItem-ip-part {
	.page_table {
		th {
			width: 220px;
		}

		th,
		td {
			padding: 4px;
		}

		td {
			vertical-align: baseline;
		}
	}
}
</style>
