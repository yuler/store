// Alias to `MP`
import MP = WechatMiniprogram;

declare interface IApp {
	globalData: {
		debug: boolean;
	};

	$system: undefined | MP.SystemInfo;

	$cloud: undefined | WxCloud;
	$db: undefined | DB.Database;

	// Goto debug page
	gotoDebug: () => void;
}

interface Banner {
	id: string;
	name?: string;
	imageURL: string;
	imageHref?: string;
}
