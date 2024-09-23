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
		[GET]: { type: "", color: "green", default_tab: QUERY },
		[HEAD]: { type: "warning", color: "purple", default_tab: QUERY },
		[OPTIONS]: { type: "info", color: "default", default_tab: QUERY },
		[POST]: {
			type: "success",
			color: "pink",
			request_body: true,
			default_tab: BODY
		},
		[PUT]: { type: "", color: "orange", request_body: true, default_tab: BODY },
		[DELETE]: {
			type: "danger",
			color: "red",
			request_body: true,
			default_tab: BODY
		},
		[PATCH]: { type: "", color: "blue", request_body: true, default_tab: BODY }
	};

	if (!window._opts.yapi) {
		/*枚举选项*/
		window._opts.yapi = {
			httpMethod: _.map(HTTP_METHOD, (item, prop) => ({
				label: prop,
				value: prop,
				color: item.color,
				type: item.type
			}))
		};
	}
	return window._opts.yapi;
}
</script>
