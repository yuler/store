// Alias to `MP`
import MP = WechatMiniprogram

declare interface IApp {
	globalData: {
		debug: boolean
	}

	$system?: MP.SystemInfo

	$cloud?: WxCloud
	$db?: DB.Database

	// Goto debug page
	gotoDebug?: () => void
}
