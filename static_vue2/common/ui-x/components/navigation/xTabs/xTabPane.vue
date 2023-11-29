<template>
	<div class="el-tab-pane" v-if="!lazy || loaded || active" v-show="active" role="tabpanel" :aria-hidden="!active" :id="cptId" :aria-labelledby="cptLabeledby">
		<slot></slot>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		name: "xTabPane",
		componentName: "xTabPane",
		props: {
			label: String,
			labelContent: Function,
			name: String,
			closable: Boolean,
			disabled: Boolean,
			lazy: Boolean
		},
		data() {
			return {
				index: null,
				loaded: false
			};
		},
		computed: {
			cptLabeledby() {
				return `tab-${this.paneName}`;
			},
			cptId() {
				return `pane-${this.paneName}`;
			},
			isClosable() {
				return this.closable || this.$parent.closable;
			},
			active() {
				const active = this.$parent.currentName === (this.name || this.index);
				if (active) {
					this.loaded = true;
				}
				return active;
			},
			paneName() {
				return this.name || this.index;
			}
		},

		updated() {
			this.$parent.$emit("tab-nav-update");
		}
	});
}
</script>
