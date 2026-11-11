import { error } from '@sveltejs/kit';
import { getPosts } from '$lib/utils/posts';
import { isLocale, type Locale } from '$lib/i18n/locales';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	if (!isLocale(params.lang)) {
		throw error(404, 'Unknown locale');
	}
	const posts = await getPosts(params.lang);
	return { posts, lang: params.lang as Locale };
};
