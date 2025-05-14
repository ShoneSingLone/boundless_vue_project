<template>
	<div class="flex middle xToggleText">
		<div class="mr8" v-if="isEdit">
			<xItem v-model="newValue" :configs="cptInputConfigs" />
		</div>
		<div class="mr8" v-else>{{ value }}</div>
		<div class="pointer">
			<xIcon icon="save" @click="save" v-if="isEdit" style="color: var(--el-color-primary)" />
			<xIcon
				icon="close"
				@click="cancel"
				v-if="isEdit"
				style="color: var(--el-color-danger)" />
			<xIcon icon="edit" @click="showEditor" v-else />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		props: ["value", "maxlength"],

		data() {
			return {
				newValue: "",
				isEdit: false
			};
		},
		computed: {
			cptInputConfigs() {
				if (this.maxlength) {
					return {
						attrs: {
							maxlength: this.maxlength
						}
					};
				}
				return {};
			}
		},
		methods: {
			cancel() {
				this.newValue = "";
				this.isEdit = false;
			},
			showEditor() {
				this.newValue = _.cloneDeep(this.value);
				this.isEdit = true;
			},
			save() {
				this.$emit("save", {
					val: this.newValue,
					xToggleText: this
				});
			}
		}
	});
}
</script>
