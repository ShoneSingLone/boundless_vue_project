<script lang="ts">
export default async function () {
	return defineComponent({
		render(h) {
			return h("ElCheckbox", this.$vnode.data);
		}
	});
}
</script>
<style lang="less"></style>
