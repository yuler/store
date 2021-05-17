// Alias to `MP`
import MP = WechatMiniprogram;

declare interface IApp {
	globalData: {
		debug: boolean;
	};

	$system: undefined | MP.SystemInfo;
	$db: undefined | DB.Database;
}

interface Banner {
	id: string;
	name?: string;
	imageURL: string;
	imageHref?: string;
}
