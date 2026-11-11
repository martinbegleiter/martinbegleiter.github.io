import type { Dictionary } from './index';

export const sv: Dictionary = {
	nav: {
		home: 'HEM',
		expertise: 'EXPERTIS',
		timeline: 'TIDSLINJE',
		contact: 'KONTAKT',
		viewBlog: 'SE_BLOGG'
	},
	hero: {
		role: 'AI- & SÄKERHETSARKITEKT // SENIOR UTVECKLARE'
	},
	expertise: {
		title: 'Expertisnoder',
		subtitle: 'Kärnkompetenser'
	},
	timeline: {
		title: 'Operativ Historia',
		subtitle: 'Händelselogg'
	},
	contact: {
		title: 'Samarbetsparametrar',
		subtitle: 'Uplink Redo',
		strategicCommunication: 'Strategisk_Kommunikation',
		intro: 'Jag utvärderar för närvarande nya möjligheter till samarbete inom fullstack- eller mobilutveckling med fokus på säkerhet, mjukvaruarkitektur och AI/ML. Om du har ett intressant projekt, initiera uplinken nedan.',
		directAccess: 'Direkt_Åtkomst',
		email: 'E-post'
	},
	form: {
		uplinkLabel: 'UPPLÄNKSFÄLT_FÖR_MEDDELANDE',
		fieldName: 'IDENTITET (NAMN)',
		fieldEmail: 'RETURKOORDINATER (E-POST)',
		fieldMessage: 'TRANSMISSIONSPAKET (MEDDELANDE)',
		submit: 'EXEKVERA_TRANSMISSION',
		sending: 'SÄNDER...',
		successTitle: 'TRANSMISSION_LYCKADES',
		successText: 'Ditt meddelande har tagits emot.',
		errorTitle: 'TRANSMISSION_MISSLYCKADES',
		errorText: 'Meddelandet kunde inte skickas. Försök igen eller använd direktkontakt.',
		networkError: 'Nätverksfel. Försök igen eller använd direktkontakt.',
		honeypotLabel: 'Fyll inte i detta fält'
	},
	footer: {
		email: 'E-POST'
	},
	blog: {
		title: 'Terminalloggar',
		subtitle: 'Dataarkiv',
		prefix: 'LOGG',
		intro: 'En samling tekniska loggar, arkitekturmönster och rön från skärningspunkten mellan artificiell intelligens och säkerhetsteknik.',
		emptyTitle: 'Inga_loggar_hittades',
		emptyText: 'Databasen innehåller för närvarande inga krypterade transmissionsloggar. Vänta på synkronisering.',
		returnToBase: 'TILLBAKA_TILL_BASEN',
		backToList: 'TILLBAKA_TILL_LOGG_LISTAN',
		topOfFile: 'FILENS_BÖRJAN',
		sentinelLogs: 'Sentinel_Loggar'
	}
};
