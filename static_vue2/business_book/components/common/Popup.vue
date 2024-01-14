<template>
	<div class="popup" v-if="popupVisible">
		<transition name="fade">
			<div class="popup-bg" @click.stop.prevent="hide" v-show="visible"></div>
		</transition>
		<transition name="popup-slide-up">
			<div class="popup-wrapper" v-show="visible">
				<div class="popup-title" v-if="title && title.length > 0">
					{{ title }}
				</div>
				<div class="popup-btn" v-for="(item, index) in btn" :key="index" :class="{ danger: item.type === 'danger' }" @click="item.click">
					{{ item.text }}
				</div>
			</div></transition
		>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		name: "popup",
		props: {
			title: String,
			btn: Array
		},
		data() {
			return {
				popupVisible: false,
				visible: false
			};
		},
		methods: {
			show() {
				this.popupVisible = true;
				setTimeout(() => {
					this.visible = true;
				});
			},
			hide() {
				this.visible = false;
				this.timer = setTimeout(() => {
					this.popupVisible = false;
				}, 200);
			}
		}
	};
}
</script>
