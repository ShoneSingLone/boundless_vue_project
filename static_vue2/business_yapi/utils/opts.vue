<script lang="ts">
export default async function () {
	const FOLDER = "folder";
	const ARTICLE = "article";
	const GET = "GET";
	const HEAD = "HEAD";
	const OPTIONS = "OPTIONS";
	const POST = "POST";
	const PUT = "PUT";
	const DELETE = "DELETE";
	const PATCH = "PATCH";
	const QUERY = "query";
	const BODY = "body";

	const HTTP_METHOD = {
		[GET]: { type: "", textColor: "#00008B", color: "#：#F0F8", default_tab: QUERY },
		[POST]: {
			type: "success",
			textColor: "#006400",
			color: "#E0FFFF",
			request_body: true,
			default_tab: BODY
		},
		[PUT]: {
			type: "",
			textColor: "#8B4513",
			color: "#FFFFE0",
			request_body: true,
			default_tab: BODY
		},
		[DELETE]: {
			type: "danger",
			textColor: "#8B0000",
			color: "#FFE4E1",
			request_body: true,
			default_tab: BODY
		},
		[PATCH]: {
			type: "",
			textColor: "#A52A2A",
			color: "#FFE4B5",
			request_body: true,
			default_tab: BODY
		},
		[HEAD]: { type: "warning", textColor: "#696969", color: "#D3D3D3", default_tab: QUERY },
		[OPTIONS]: { type: "info", textColor: "#4B0082", color: "#E6E6FA", default_tab: QUERY }
	};

	if (!window._opts.yapi) {
		/*枚举选项*/
		window._opts.yapi = {
			httpMethod: _.map(HTTP_METHOD, (item, prop) => ({
				label: prop,
				value: prop,
				color: item.color,
				textColor: item.textColor,
				type: item.type
			})),
			role: [
				{ label: "管理员", value: "admin" },
				{ label: "会员", value: "member" }
			]
		};
	}
	return window._opts.yapi;
}
</script>
