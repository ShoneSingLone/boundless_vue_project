//@ts-nocheck
import { defineComponent } from "vue";
import $ from "jquery";
import { MkitCsslist } from "./MkitCsslist";
import { State_UI, xU } from "@ventose/ui";
import { hljs } from "@/assets/libs/highlight";

export const setTheme = async (theme = "") => {
	theme = theme || localStorage.markdownHightlightTheme || "monokai-sublime.css";
	const cssURL = `${State_UI.assetsPath}/highlightstyles/${theme}`;
	localStorage.markdownHightlightTheme = theme;
	const id = `markdonw-hightlight-style`;
	/* 同一个style block 不同的url */
	await xU.asyncLoadStyle(cssURL, { isReplace: true, id });
};

export const MkitTheme = defineComponent({
	setup() {
		return { setTheme };
	},
	computed: {
		cssURL() {
			return;
		}
	},
	watch: {
		theme: {
			immediate: true,
			async handler(theme) {
				this.setTheme(theme);
			}
		}
	},
	data() {
		return {
			theme: localStorage.markdownHightlightTheme || "monokai-sublime.css"
		};
	},
	render() {
		return (
			<select class="markdown-theme" v-model={this.theme}>
				{xU.map(MkitCsslist, i => {
					return (
						<option key={i.value} value={i.value}>
							{i.label}
						</option>
					);
				})}
			</select>
		);
	}
});

export const rightArrow = `<div class="ant-image-preview-switch-right right"><span role="img" aria-label="right" class="anticon anticon-right"><svg focusable="false" class="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg></span></div>`;
export const leftArrow = `<div class="ant-image-preview-switch-left left"><span role="img" aria-label="left" class="anticon anticon-left"><svg focusable="false" class="" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg></span></div>`;

export function newImageDomString(title: any, text: any, href: any, index: number): any {
	return `<div class="ant-image" style="max-width: 600px;" title="${title}" alt="${text}" data-ant-image-index="${index}">
	<img class="ant-image-img" src="${href}">
	<div class="ant-image-mask">
		<div class="ant-image-mask-info">
			<span role="img" aria-label="eye" class="anticon anticon-eye">
				<svg focusable="false" class="" data-icon="eye" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path> </svg>
			</span>
			预览
		</div>
	</div>
</div>`;
}

export class PreprocessHTML {
	constructor(html) {
		this.html = html;
		this.img().a().codejs();
	}

	img() {
		const $html = $(this.html);
		const imgArray = $html.find("img");
		xU.each(imgArray, (img, index) => {
			const { alt, src } = img;
			this.html = this.html.replace(img.outerHTML, newImageDomString(alt, alt, src, index));
		});
		return this;
	}

	a() {
		const $html = $(this.html);
		const aArray = $html.find("a");
		xU.each(aArray, (aDom, index) => {
			const aDomOuterHTML = aDom.outerHTML;
			const outerHTML = $(aDom).attr({
				target: "_blank",
				"data-markdwon-a-index": index
			})[0].outerHTML;
			this.html = this.html.replace(aDomOuterHTML, outerHTML);
		});
		return this;
	}

	codejs() {
		const $html = $(this.html);
		const codeArray = $html.find("code[data-language='js']");
		xU.each(codeArray, (codeDom, index) => {
			const $codeDom = $(codeDom);
			const codeDomOuterHTML = codeDom.outerHTML;
			$codeDom.addClass("hljs");
			let codeDomInnerHTML = String($codeDom[0].innerHTML);
			const innerHTML = hljs.highlightAuto(codeDomInnerHTML).value;
			/* => TODO:解析出问题 实体符的转换*/
			const innerHTMLReplaceGreatThan = innerHTML.replace(/=\&amp;gt;/g, "=>");
			/* => 解析出问题 */
			$codeDom[0].innerHTML = innerHTMLReplaceGreatThan;
			this.html = this.html.replace(codeDomOuterHTML, $codeDom[0].outerHTML);
		});
		return this;
	}
}
