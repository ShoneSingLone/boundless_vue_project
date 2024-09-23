<template>
	<div class="detail-title-wrapper" :class="{ 'hide-shadow': ifHideShadow }">
		<div class="title-left-wrapper" @click="back">
			<span class="icon-back"></span>
		</div>
		<div class="title-right-wrapper">
			<span class="icon-shelf icon" v-if="showShelf" @click="showBookShelf"></span>
			<span class="icon-share" v-else></span>
		</div>
		<div class="title-text" v-if="title">
			{{ title }}
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		props: {
			title: String,
			showShelf: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				ifHideShadow: true
			};
		},
		methods: {
			showBookShelf() {
				this.$router.push("/store/shelf");
			},
			showShadow() {
				this.ifHideShadow = false;
			},
			hideShadow() {
				this.ifHideShadow = true;
			},
			back() {
				this.$emit("back");
			}
		}
	};
}
</script>
