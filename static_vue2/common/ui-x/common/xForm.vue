<script lang="ts">
export default async function () {
	const { useDynamicStyle } = await _.$importVue("/common/utils/hooks.vue");
	const TOP = "top";
	const FULL = "full";

	return {
		props: ["col"],
		setup(props, { slots, attrs }) {
			const { setStyle, styleId } = useDynamicStyle({ vm: this });
			const cptCol = computed(() => {
				return Number(props.col || 2);
			});
			let fullCount = [];
			let _old_colNum = 0;
			const updateStyle = colNum => {
				if (_old_colNum !== colNum) {
					_old_colNum = colNum;
					setStyle(`
					.xForm[data-style-id="${styleId}"]{
						--xForm-col: repeat(${cptCol.value}, 1fr);
						display: grid;
						grid-template-columns: var(--xForm-col);

						${_.map(new Array(colNum), (v, i) => {
							const isNeedTop = fullCount[i] === TOP;
							if (isNeedTop) {
								return "";
							} else {
								return `.xFormItem:nth-of-type(${i + 1}) {  }`;
							}
						}).join("")}}`);
				}
			};
			watch(() => cptCol.value, updateStyle, { immediate: true });
			return function () {
				const slotsVNode = this.renderSlot("default");
				fullCount = [];
				const itemChildren = _.map(slotsVNode, (slotVNode, index) => {
					fullCount[index] = TOP;

					if (slotVNode.data) {
						const { span, classString } = (() => {
							if (_.$val(slotVNode, "data.attrs.span") === FULL) {
								fullCount[index] = FULL;
								return { span: cptCol.value, classString: " full" };
							}

							if (index > 0) {
								if (fullCount[index - 1] === FULL) {
									fullCount[index] = TOP;
								}
							}

							return {
								span: Number(_.$val(slotVNode, "data.attrs.span") || 1),
								classString: ""
							};
						})();

						return hDiv({ class: `xFormItem grid-column-${span}` + classString }, [
							h("Transition", {}, [slotVNode])
						]);
					}
					return slotVNode;
				});
				updateStyle(cptCol.value);
				const formProps = {
					ref: "xForm",
					class: "xForm",
					attrs: {
						"data-col": cptCol.value,
						"data-style-id": styleId,
						...attrs
					},
					props
				};

				return hDiv(formProps, itemChildren);
			};
		}
	};
}
</script>
<style lang="less">
.xForm {
	@listFlex: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12;
	.xFormItem:empty {
		display: none;
	}
	width: 100%;
	// height: 100%;
	display: flex;
	flex-flow: row nowrap;

	&.no-gap {
		> .xFormItem {
			margin-right: 0;
		}
	}
	> .xFormItem {
		display: flex;
		align-items: baseline;
		margin-top: var(--ui-one);
		margin-right: var(--ui-one);

		> .xItem-wrapper,
		> .xItemDesc-wrapper {
			--xItem-wrapper-width: var(--xForm-xItem-wrapper-width, 100%);
		}
	}

	each(@listFlex, {
		.grid-column-@{value} {
			overflow: hidden;
			grid-column: span @value;
		}
	});
}
</style>
