import type { Locale } from '../locales';
import { en } from './en';
import { sv } from './sv';
import { pl } from './pl';

export interface Dictionary {
	nav: {
		home: string;
		expertise: string;
		timeline: string;
		contact: string;
		viewBlog: string;
	};
	hero: {
		role: string;
	};
	expertise: {
		title: string;
		subtitle: string;
	};
	timeline: {
		title: string;
		subtitle: string;
	};
	contact: {
		title: string;
		subtitle: string;
		strategicCommunication: string;
		intro: string;
		directAccess: string;
		email: string;
	};
	form: {
		uplinkLabel: string;
		fieldName: string;
		fieldEmail: string;
		fieldMessage: string;
		submit: string;
		sending: string;
		successTitle: string;
		successText: string;
		errorTitle: string;
		errorText: string;
		networkError: string;
		honeypotLabel: string;
	};
	footer: {
		email: string;
	};
	blog: {
		title: string;
		subtitle: string;
		prefix: string;
		intro: string;
		emptyTitle: string;
		emptyText: string;
		returnToBase: string;
		backToList: string;
		topOfFile: string;
		sentinelLogs: string;
	};
}

const dictionaries: Record<Locale, Dictionary> = { en, sv, pl };

export function getDictionary(locale: Locale): Dictionary {
	return dictionaries[locale];
}
