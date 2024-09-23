<script lang="ts">
export default async function () {
	if (!Vue._yapi_var) {
		const OPEN_BLANK = i18n("新窗口打开");
		const TAB_KEY_PROJECT_WIKI = i18n("项目文档");
		const TAB_KEY_PROJECT_SETTING = i18n("项目设置");
		const TAB_KEY_INTERFACE = i18n("接口");
		const TAB_KEY_PROJECT_LIST = i18n("项目列表");
		const TAB_KEY_MEMBER_LIST = i18n("成员列表");
		const TAB_KEY_GROUP_LOG = i18n("分组动态");
		const TAB_KEY_GROUP_WIKI = i18n("分组文档");
		/* project */
		const TAB_KEY_PROJECT_CONFIGS = i18n("项目配置");
		const TAB_KEY_PROJECT_REQUEST = i18n("请求配置");
		const TAB_KEY_PROJECT_AUTH = i18n("token配置");
		const TAB_KEY_PROJECT_MOCK = i18n("全局mock脚本");
		const TAB_KEY_PROJECT_REQUEST_CODE = i18n("请求代码模板");

		/* type */
		const PUBLIC = "public";

		/* role */
		const GUEST = "guest";
		const DEV = "dev";
		const ADMIN = "admin";
		const PRIVATE = "private";
		const OWNER = "owner";
		const ALL = "all";
		const CATEGORY = "category";
		const INTERFACE = "interface";
		const PREVIEW = "PREVIEW";
		const EDIT = "EDIT";
		const RUN = "RUN";
		const PROJECT = "project";
		const GROUP = "group";
		/* role */
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

		/* 常量 */
		Vue._yapi_var = {
			LOG_TYPE: {
				project: "项目",
				group: "分组",
				interface: "接口",
				interface_col: "接口集",
				user: "用户",
				other: "其他"
			},
			OPEN_BLANK,
			TAB_KEY_PROJECT_WIKI,
			TAB_KEY_PROJECT_SETTING,
			TAB_KEY_INTERFACE,
			TAB_KEY_PROJECT_LIST,
			TAB_KEY_MEMBER_LIST,
			TAB_KEY_GROUP_LOG,
			TAB_KEY_GROUP_WIKI,
			TAB_KEY_PROJECT_CONFIGS,
			TAB_KEY_PROJECT_REQUEST,
			TAB_KEY_PROJECT_AUTH,
			TAB_KEY_PROJECT_MOCK,
			TAB_KEY_PROJECT_REQUEST_CODE,
			PUBLIC,
			GUEST,
			DEV,
			ADMIN,
			PRIVATE,
			OWNER,
			ALL,
			CATEGORY,
			INTERFACE,
			PREVIEW,
			EDIT,
			RUN,
			PROJECT,
			GROUP,
			FOLDER,
			ARTICLE,
			GET,
			HEAD,
			OPTIONS,
			POST,
			PUT,
			DELETE,
			PATCH,
			QUERY,
			BODY,
			stylesLoginFormIcon: {
				color: "rgba(0, 0, 0, 0.25)",
				width: "16px",
				height: "16px",
				margin: "auto"
			}
		};
	}
	return Vue._yapi_var;
}
</script>
