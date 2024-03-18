<script lang="ts">
export default async function () {
	return defineComponent({
		render(h) {
			return h("xCheckbox", this.$vnode.data);
		}
	});
}
</script>
<style lang="less"></style>
