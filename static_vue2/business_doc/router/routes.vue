<script>
export default async function () {
	const ComponentPageRouterView = {
		render(h) {
			return h("div", { class: "page-view" }, [h("xPageContent", [h("router-view")])]);
		}
	};
	const ComponentRouterView = {
		render(h) {
			return h("router-view");
		}
	};

	return [
		_.$newRoute("/all-project", "@/views/ViewAllProject.vue"),
		/* 指令 */
		_.$newRoute("/directive", ComponentPageRouterView, {
			children: [_.$newRoute("/directive/ripple", "@/views/directive/directive/ripple.vue")]
		}),
		/* 聚合类 */
		_.$newRoute("/x-component", ComponentPageRouterView, {
			children: [_.$newRoute("/x-component/x-item", "@/views/xComponent/xItem.vue")]
		}),
		/* base */
		_.$newRoute("/base", ComponentPageRouterView, {
			children: [_.$newRoute("/base/button", "@/views/base/button/button.vue")]
		}),
		/* 组件 */
		_.$newRoute("/component", ComponentPageRouterView, {
			children: [
				_.$newRoute("/component/form", ComponentRouterView, {
					children: [
						_.$newRoute("/component/form/input", "@/views/component/form/input/input.vue"),
						_.$newRoute("/component/form/input-number", "@/views/component/form/inputNumber/inputNumber.vue"),
						_.$newRoute("/component/form/checkbox", "@/views/component/form/checkbox/checkbox.vue"),
						_.$newRoute("/component/form/select", "@/views/component/form/select/select.vue"),
						_.$newRoute("/component/form/ip-address", "@/views/component/form/ipAddress/ipAddress.vue")
					]
				}),
				_.$newRoute("/component/data", ComponentRouterView, {
					children: [
						_.$newRoute("/component/data/icon", "@/views/component/data/icon/icon.vue"),
						_.$newRoute("/component/data/card", "@/views/component/data/card/card.vue"),
						_.$newRoute("/component/data/tag", "@/views/component/data/tag/tag.vue"),
						_.$newRoute("/component/data/virtualized-table", "@/views/component/data/virtualizedTable/virtualizedTable.vue")
					]
				}),
				/* Navigation */
				_.$newRoute("/component/navigation", ComponentRouterView, {
					children: [
						_.$newRoute("/component/navigation/tabs", "@/views/component/navigation/tabs/tabs.vue"),
						_.$newRoute("/component/navigation/dropdown", "@/views/component/navigation/dropdown/dropdown.vue")
					]
				})
			]
		}),
		/* other */
		_.$newRoute("/other", ComponentPageRouterView, {
			children: [
				_.$newRoute("/other/popover", "@/views/other/popover/popover.vue"),
				_.$newRoute("/other/open_window", "@/views/other/OpenWindow.vue"),
				_.$newRoute("/other/x-form-item-wrapper", "@/views/other/xFormItemWrapper/xFormItemWrapper.vue"),
				_.$newRoute("/other/card", "@/views/other/xFormItemWrapper/xFormItemWrapper.vue")
			]
		}),
		_.$newRoute("/dev", ComponentPageRouterView, {
			children: [
				_.$newRoute("/dev/template", "@/views/dev/template.vue"),
				_.$newRoute("/dev/render", "@/views/dev/render.vue"),
				_.$newRoute("/dev/io", "@/views/dev/io.vue"),
				_.$newRoute("/dev/rule", "@/views/dev/testRule.vue")
			]
		}),
		_.$newRoute("/template", ComponentPageRouterView, {
			children: [_.$newRoute("/template/list", "@/views/template/list/list.vue")]
		}),
		{
			/* 本来应该是NotFound，但是没有必要 */
			path: "*",
			redirect: "/base/button"
		}
	];
}
</script>
