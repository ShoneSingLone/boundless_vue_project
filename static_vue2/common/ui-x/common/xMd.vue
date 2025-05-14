<template>
	<div :class="['markdown-wrapper', itemConfits.value]">
		<div ref="refSlot" class="markdown-wrapper_description display-none">
			<slot> </slot>
		</div>
		<!-- <xItem :configs="itemConfits" /> -->
		<div class="markdown-wrapper_description" v-html="html"></div>
	</div>
</template>
<script lang="ts">
export default async function ({ code, PRIVATE_GLOBAL }) {
	const [hljs, marked] = await Promise.all([
		_.$importVue("/common/libs/highlight.vue"),
		_.$importVue("/common/libs/marked.vue")
	]);

	if (!PRIVATE_GLOBAL.isSetXmarkdownListenner) {
		$(document).on("click.xmarkdownmarkdownListenner", "[data-role=xMdItemImg]", function (e) {
			const $img = $(this);
			const src = $img.attr("src");
			let currentIndex = 0;
			const $doc = $(document);
			const imgList = $doc.find(".markdown-wrapper img");
			const urlList = _.map(imgList, (img, index) => {
				if (img.src === src) {
					currentIndex = index;
				}
				return img.src;
			});
			_.$previewImgs({ urlList, index: currentIndex });
		});
		PRIVATE_GLOBAL.isSetXmarkdownListenner = true;
	}

	return {
		props: ["md" /* md text content */, "htmlFilter"],
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
			this.renderHtml();
		},
		watch: {
			md() {
				this.renderHtml();
			}
		},
		methods: {
			renderHtml() {
				const htmlFilter = this.htmlFilter || (text => text);
				let text = $(this.$refs.refSlot).text();
				text = text.replace(/\\`\\`\\`/g, "```");
				this.originHTML = this.md || text;
				const { Renderer } = marked;
				marked.options = { langClass: "hljs" };
				const renderer = new Renderer();
				const html = marked(this.originHTML, {
					renderer,
					highlight: code => hljs.highlightAuto(code).value
				});
				const $html = $(`<div>${html}</div>`);
				$html.find("img").each(function () {
					const $img = $(this);
					let src = $img.attr("src");
					src = _.$resolvePath(src);
					$img.attr("src", src);
				});
				this.html = htmlFilter($html[0].innerHTML);
			}
		}
	};
}
</script>
<style lang="less">
.markdown-wrapper_description {
	ul {
		li {
			margin-left: var(--ui-one);
		}
	}
}
</style>
