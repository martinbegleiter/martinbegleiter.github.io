import { error } from '@sveltejs/kit';
import { getPosts } from '$lib/utils/posts';
import { isLocale, locales, type Locale } from '$lib/i18n/locales';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = async () => {
	const all = await Promise.all(
		locales.map(async (lang) => (await getPosts(lang)).map((post) => ({ lang, slug: post.slug })))
	);
	return all.flat();
};

export const load: PageLoad = async ({ params }) => {
	if (!isLocale(params.lang)) {
		throw error(404, 'Unknown locale');
	}
	try {
		const post = await import(
			`../../../../lib/content/posts/${params.lang}/${params.slug}.md`
		);

		return {
			content: post.default,
			meta: post.metadata,
			lang: params.lang as Locale
		};
	} catch (e) {
		throw error(404, `Could not find log entry: ${params.slug}`);
	}
};

// Keep SPA-fallback behavior until posts are added - REMOVE THIS WHEN YOU HAVE POSTS
export const prerender = false;
