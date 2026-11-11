import { locales } from '$lib/i18n/locales';
import type { EntryGenerator } from './$types';

/** Ensure every locale variant of the home page is statically generated. */
export const entries: EntryGenerator = () => locales.map((lang) => ({ lang }));
