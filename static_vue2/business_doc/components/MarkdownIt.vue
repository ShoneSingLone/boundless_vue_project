<template>
	<div :class="['markdown-wrapper', itemConfits.value]">
		<xItem :configs="itemConfits" />
		<div class="markdown-wrapper_description mt10" v-html="html"></div>
	</div>
</template>

<script>
export default async function ({ code }) {
	const [hljs, marked] = await Promise.all([_.$importVue("/common/libs/highlight.vue"), _.$importVue("/common/libs/marked.vue")]);

	return {
		props: ["md" /* md text content */],
		data() {
			return {
				originHTML: "",
				html: "",
				itemConfits: {
					value: localStorage.MarkdownItCssName || "a11y-dark",
					itemType: "xItemSelect",
					onEmitValue({ val }) {
						localStorage.MarkdownItCssName = val;
					},
					options: [
						"a11y-dark",
						"a11y-light",
						"agate",
						"an-old-hope",
						"androidstudio",
						"arduino-light",
						"arta",
						"ascetic",
						"atelier-cave-dark",
						"atelier-cave-light",
						"atelier-dune-dark",
						"atelier-dune-light",
						"atelier-estuary-dark",
						"atelier-estuary-light",
						"atelier-forest-dark",
						"atelier-forest-light",
						"atelier-heath-dark",
						"atelier-heath-light",
						"atelier-lakeside-dark",
						"atelier-lakeside-light",
						"atelier-plateau-dark",
						"atelier-plateau-light",
						"atelier-savanna-dark",
						"atelier-savanna-light",
						"atelier-seaside-dark",
						"atelier-seaside-light",
						"atelier-sulphurpool-dark",
						"atelier-sulphurpool-light",
						"atom-one-dark-reasonable",
						"atom-one-dark",
						"atom-one-light",
						"brown-paper",
						"codepen-embed",
						"color-brewer",
						"darcula",
						"dark",
						"default",
						"docco",
						"dracula",
						"far",
						"foundation",
						"github-gist",
						"github",
						"gml",
						"googlecode",
						"gradient-dark",
						"gradient-light",
						"grayscale",
						"gruvbox-dark",
						"gruvbox-light",
						"hopscotch",
						"hybrid",
						"idea",
						"ir-black",
						"isbl-editor-dark",
						"isbl-editor-light",
						"kimbie.dark",
						"kimbie.light",
						"lightfair",
						"lioshi",
						"magula",
						"mono-blue",
						"monokai-sublime",
						"monokai",
						"night-owl",
						"nnfx-dark",
						"nnfx",
						"nord",
						"obsidian",
						"ocean",
						"paraiso-dark",
						"paraiso-light",
						"pojoaque",
						"purebasic",
						"qtcreator_dark",
						"qtcreator_light",
						"railscasts",
						"rainbow",
						"routeros",
						"school-book",
						"shades-of-purple",
						"solarized-dark",
						"solarized-light",
						"srcery",
						"stackoverflow-dark",
						"stackoverflow-light",
						"sunburst",
						"tomorrow-night-blue",
						"tomorrow-night-bright",
						"tomorrow-night-eighties",
						"tomorrow-night",
						"tomorrow",
						"vs",
						"vs2015",
						"xcode",
						"xt256",
						"zenburn"
					].map(i => ({ label: i, value: i }))
				}
			};
		},
		async mounted() {
			this.init();
		},
		watch: {
			md() {
				this.init();
			}
		},
		methods: {
			init() {
				this.originHTML = this.md || this.$slots.default[0].text;
				const { Renderer } = marked;
				marked.options = { langClass: "hljs" };
				const renderer = new Renderer();
				this.html = marked(this.originHTML, {
					renderer,
					highlight: code => hljs.highlightAuto(code).value
				});
			}
		}
	};
}
</script>
