<template>
	<div class="xItem-ip-part">
		<table class="page_table">
			<thead>
				<tr>
					<th>
						{{ i18n("startIP") }}
					</th>
					<th>
						{{ i18n("endIP") }}
					</th>
					<th style="width: 48px">
						<xBtn icon="el-icon-plus" @click="addIpPort()"></xBtn>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, index) in mixin_value" :key="index">
					<td>
						<xItem :configs="c_beginIp" :value="row.beginIp" @change="handleRowValuechange({ row, $index: index }, 'beginIp', $event)" />
					</td>
					<td>
						<xItem :configs="c_endIp" :value="row.endIp" @change="handleRowValuechange({ row, $index: index }, 'endIp', $event)" />
					</td>
					<td>
						<xBtn icon="el-icon-delete" @click="delIpPart({ row, $index: index })"></xBtn>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	const RULES = await _.$importVue("/common/utils/rules.vue");
	return {
		mixins: [mixins],
		props: ["value", "options", "configs"],
		data() {
			return {
				c_beginIp: {
					rules: [RULES.ipV4()]
				},
				c_endIp: {
					rules: [RULES.ipV4()]
				}
			};
		},
		methods: {
			handleRowValuechange(scope, prop, val) {
				scope.row[prop] = val;
				const { row } = scope;
				this.value.splice(scope.$index, 1, row);
			},
			delIpPart(scope) {
				let index = _.findIndex(this.value, scope.row);
				this.value.splice(index, 1);
			},
			addIpPort() {
				this.value.push({
					beginIp: "",
					endIp: ""
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
