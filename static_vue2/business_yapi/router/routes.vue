<script lang="ts">
export default async function () {
	const ComponentRouterView = {
		render(h) {
			return h("router-view");
		}
	};
	return [
		_.$newRoute("/demo_test", "@/views/demo/test.vue"),
		_.$newRoute("/user", "@/views/User/ViewUser.vue"),
		_.$newRoute("/i18n", "@/views/I18n/I18nLayout.vue", {
			redirect: "/i18n/all",
			children: [_.$newRoute("/i18n/all", "@/views/I18n/I18n.vue")]
		}),
		_.$newRoute("/note", "@/views/Note/Note.vue"),
		_.$newRoute("/im", "@/views/im/Im.vue"),
		_.$newRoute("/rtc", "@/views/Rtc/ViewRtc.vue", {
			children: [
				_.$newRoute("/rtc/demo", "@/views/Rtc/ViewRtcDemo.vue"),
				_.$newRoute("/rtc/peer_connection", "@/views/Rtc/ViewRtcPeerConnection.vue"),
				_.$newRoute(
					"/rtc/peer_connection_canvas",
					"@/views/Rtc/ViewRtcPeerConnectionCanvas.vue"
				),
				_.$newRoute("/rtc/data_channel", "@/views/Rtc/ViewRtcDataChannel.vue"),
				_.$newRoute("/rtc/data_channel_file", "@/views/Rtc/ViewRtcDataChannelFile.vue"),
				_.$newRoute("/rtc/p2p", "@/views/Rtc/ViewRtcP2PLogin.vue")
			]
		}),
		_.$newRoute("/hoppscotch", "@/views/hoppscotch/ViewHoppscotch.vue"),
		_.$newRoute("/explore", "@/views/explore/ViewExplore.vue"),
		_.$newRoute("/login", "@/views/Login/Login.vue"),
		_.$newRoute("/api", "@/views/Api/Api.vue", {
			children: [
				_.$newRoute("/api/group", "@/views/Api/Group/Group.vue"),
				_.$newRoute("/api/project", "@/views/Api/Project/Project.vue")
			]
		}),
		{
			/* 本来应该是NotFound，但是没有必要 */
			path: "*",
			redirect: "/login"
		}
	];
}
</script>
