<template>
	<transition name="fade">
		<div class="toast-bg-wrapper" v-show="visible" @click.prevent>
			<div class="toast-bg">
				<div class="toast-wrapper">
					<div class="toast" v-html="showText"></div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
export default async function () {
	return {
		name: "toast",
		props: {
			text: [String, Number],
			timeout: {
				type: Number,
				default: 1500
			}
		},
		data() {
			return {
				visible: false,
				showText: ""
			};
		},
		methods: {
			hide() {
				this.visible = false;
			},
			show() {
				this.updateText(this.text);
				clearTimeout(this.task);
				this.task = null;
				this.visible = true;
				this.task = setTimeout(() => {
					this.visible = false;
				}, this.timeout);
			},
			continueShow() {
				clearTimeout(this.task);
				this.task = null;
				this.visible = true;
			},
			updateText(text) {
				this.showText = text;
			}
		}
	};
}
</script>
