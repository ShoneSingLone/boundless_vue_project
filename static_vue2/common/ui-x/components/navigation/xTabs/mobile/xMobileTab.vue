<template>
	<div class="x-mobile-tab" :class="{ 'x-mobile-tab_active': isActive }" @click="handleClick">
		<slot name="icon">
			<xIcon :icon="icon" />
		</slot>
		<slot>
			<div v-html="label"></div>
		</slot>
	</div>
</template>
<script lang="ts">
export default async function () {
	const COMPONENT_NAME = "x-mobile-tab";

	return defineComponent({
		name: COMPONENT_NAME,
		props: {
			label: {
				type: [String, Number],
				required: true
			},
			value: {
				type: [String, Number],
				default() {
					return this.label;
				}
			},
			icon: {
				type: [String],
				default: ""
			}
		},
		mounted() {
			this.$parent.addTab(this);
		},
		destroyed() {
			this.$parent.removeTab(this);
		},
		computed: {
			isActive() {
				return this.$parent.value === this.value;
			}
		},
		methods: {
			handleClick(item) {
				this.$parent.trigger(this.value);
			}
		}
	});
}
</script>
