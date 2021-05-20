import {debug} from './debug.js';

export interface PresetData {
	/**
	 * The page loading state.
	 *
	 */
	$loading: boolean;
	/**
	 * The page error information.
	 */
	$error: undefined | Record<string, unknown>;
}

export interface PresetMethods {
	/**
	 * Call `wx.showLoading`
	 */
	$showLoading(title: string, mask: boolean): void;

	/**
	 * Call `wx.hideLoading`
	 */
	$hideLoading(): void;

	/**
	 * Call `wx.navigateTo`
	 */
	$goto(url: string): void;
}

const presetData: PresetData = {
	$loading: true,
	$error: undefined
};
const presetMethods: PresetMethods = {
	$showLoading: async (title = '', mask = true) => {
		return wx.showLoading({title, mask});
	},
	$hideLoading: async () => {
		return wx.hideLoading();
	},
	$goto: async (url: string) => {
		return wx.navigateTo({url});
	}
};

// Override from `WechatMiniprogram.Page`'s `Options` & Instance
type PageOptions<
	TData extends MP.Page.DataOption,
	TCustom extends MP.Page.CustomOption
> = (TCustom & Partial<MP.Page.Data<TData & Partial<PresetData>>> & Partial<MP.Page.ILifetime> & Partial<PresetMethods>) &
ThisType<PageInstance<TData, TCustom>>;
type PageInstance<
	TData extends MP.Page.DataOption,
	TCustom extends MP.Page.CustomOption
> = MP.OptionalInterface<MP.Page.ILifetime & PresetMethods> &
MP.Page.InstanceProperties &
MP.Page.InstanceMethods<TData & PresetData> &
MP.Page.Data<TData & PresetData> &
TCustom;
type PageQuery = Record<string, string | undefined>;

/**
 * The enhancer for MiniPorgram Page constructor
 *
 * @param options - See: https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html
 */
export function pageEnhancer<
	TData extends MP.Page.DataOption,
	TCustom extends MP.Page.CustomOption
>(
	options: PageOptions<TData, TCustom>
): void {
	const originOnLoad = options.onLoad;

	options = {
		...presetMethods,
		...options,
		onLoad(query: PageQuery) {
			debug('Enhancer', 'onLoad', this.route, {query});

			return originOnLoad?.call(this, query);
		},
		data: {
			...presetData,
			...options.data
		}
	};

	Page(options);
}

// TODO: componentEnhancer
