import type { Handle } from '@sveltejs/kit';
import { localeFromPathname } from '$lib/i18n/locales';

export const handle: Handle = async ({ event, resolve }) => {
	const lang = localeFromPathname(event.url.pathname);

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('__APP_HTML_LANG__', lang)
	});
};
