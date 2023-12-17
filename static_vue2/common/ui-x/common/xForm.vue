<script>
export default async function () {
	return {
		props: ["col"],
		setup(props, { slots, attrs }) {
			const cpt_col = computed(() => {
				return Number(props.col || 2);
			});
			return function () {
				const slotsVNode = this.renderSlot("default");
				return h(
					"div",
					{
						ref: "xForm",
						class: "xForm",
						style: {
							"--xForm-col": ` repeat(${cpt_col.value}, 1fr)`
						},
						attrs,
						props
					},
					_.map(slotsVNode, slotVNode => {
						if (slotVNode.data) {
							const span = (() => {
								if (slotVNode.data?.attrs?.span === "full") {
									return cpt_col.value;
								}
								return Number(slotVNode.data?.attrs?.span || 1);
							})();

							return h("div", { class: "xFormItem grid-column" + span }, [slotVNode]);
						}
						return slotVNode;
					})
				);
			};
		}
	};
}
</script>

<style lang="less">
.xForm {
	//outline: 1px solid red;
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: var(--xForm-col);

	.xFormItem {
		display: flex;
		align-items: baseline;
		margin-top: var(--ui-one);

		> div {
			width: 100%;
		}
	}

	@listFlex: 1, 2, 3, 4, 5, 6, 7, 8;

	each(@listFlex, {
		.grid-column@{value} {
			grid-column: span @value;
		}
	});
}
</style>
