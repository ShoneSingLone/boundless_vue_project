<style lang="less"></style>
<template>
	<li class="xTimelineItem el-timeline-item">
		<div class="el-timeline-item__tail"></div>

		<div
			v-if="!$slots.dot"
			class="el-timeline-item__node"
			:class="cptNodeClass"
			:style="cptNodeStyle">
			<i v-if="icon" class="el-timeline-item__icon" :class="icon"></i>
		</div>
		<div v-if="$slots.dot" class="el-timeline-item__dot">
			<slot name="dot"></slot>
		</div>

		<div class="el-timeline-item__wrapper">
			<div
				v-if="!hideTimestamp && placement === 'top'"
				class="el-timeline-item__timestamp is-top">
				{{ timestamp }}
			</div>

			<div class="el-timeline-item__content">
				<slot></slot>
			</div>

			<div
				v-if="!hideTimestamp && placement === 'bottom'"
				class="el-timeline-item__timestamp is-bottom">
				{{ timestamp }}
			</div>
		</div>
	</li>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		name: "ElTimelineItem",
		inject: ["timeline"],
		props: {
			timestamp: String,

			hideTimestamp: {
				type: Boolean,
				default: false
			},

			placement: {
				type: String,
				default: "bottom"
			},

			type: String,

			color: String,

			size: {
				type: String,
				default: "normal"
			},

			icon: String
		},
		computed: {
			cptNodeClass() {
				return [
					`el-timeline-item__node--${this.size || ""}`,
					`el-timeline-item__node--${this.type || ""}`
				];
			},
			cptNodeStyle() {
				return {
					backgroundColor: this.color
				};
			}
		}
	});
}
</script>
