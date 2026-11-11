import { error } from '@sveltejs/kit';
import { isLocale, type Locale } from '$lib/i18n/locales';
import type { LayoutLoad } from './$types';

export const prerender = true;

export const load: LayoutLoad = ({ params }) => {
	if (!isLocale(params.lang)) {
		throw error(404, 'Unknown locale');
	}
	return { lang: params.lang as Locale };
};
