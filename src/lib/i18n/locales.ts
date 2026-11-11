export const locales = ['en', 'sv', 'pl'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** localStorage key used to persist the user's language override. */
export const STORAGE_KEY = 'locale';

export function isLocale(value: unknown): value is Locale {
	return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

/**
 * Resolves the locale from a pathname like `/en`, `/sv/blog/...` or `/`.
 * Falls back to the default locale when no valid prefix is present.
 */
export function localeFromPathname(pathname: string): Locale {
	const segment = pathname.split('/').find((part) => isLocale(part));
	return isLocale(segment) ? segment : defaultLocale;
}

/** Resolves the preferred locale from the browser's language list. */
export function localeFromNavigator(languages: readonly string[]): Locale {
	for (const tag of languages) {
		const base = tag.toLowerCase().split('-')[0];
		if (isLocale(base)) return base;
	}
	return defaultLocale;
}

/** Reads a previously persisted language override, if any. */
export function localeFromStorage(storage: Storage | null): Locale | null {
	try {
		const value = storage?.getItem(STORAGE_KEY);
		return isLocale(value) ? value : null;
	} catch {
		return null;
	}
}
