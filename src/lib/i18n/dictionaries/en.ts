import type { Dictionary } from './index';

export const en: Dictionary = {
	nav: {
		home: 'HOME',
		expertise: 'EXPERTISE',
		timeline: 'TIMELINE',
		contact: 'CONTACT',
		viewBlog: 'VIEW_BLOG'
	},
	hero: {
		role: 'AI & SECURITY ARCHITECT // SENIOR DEVELOPER'
	},
	expertise: {
		title: 'Expertise Nodes',
		subtitle: 'Core Competencies'
	},
	timeline: {
		title: 'Operational History',
		subtitle: 'Timeline Logs'
	},
	contact: {
		title: 'Engagement Parameters',
		subtitle: 'Uplink Ready',
		strategicCommunication: 'Strategic_Communication',
		intro: 'I am currently evaluating new opportunities for collaboration in fullstack or mobile development with a focus on security, software architecture and AI/ML. If you have an interesting project initialize the uplink below.',
		directAccess: 'Direct_Access',
		email: 'Email'
	},
	form: {
		uplinkLabel: 'UPLINK_MESSAGE_FIELD',
		fieldName: 'IDENTITY_IDENTIFIER (NAME)',
		fieldEmail: 'RETURN_COORDINATES (EMAIL)',
		fieldMessage: 'TRANSMISSION_PAYLOAD (MESSAGE)',
		submit: 'EXECUTE_TRANSMISSION',
		sending: 'TRANSMITTING...',
		successTitle: 'TRANSMISSION_SUCCESSFUL',
		successText: 'Your message has been received.',
		errorTitle: 'TRANSMISSION_FAILED',
		errorText: 'The transmission could not be sent. Please try again or use direct contact.',
		networkError: 'Network error. Please try again or use direct contact.',
		honeypotLabel: 'Do not fill this field'
	},
	footer: {
		email: 'EMAIL'
	},
	blog: {
		title: 'Terminal Logs',
		subtitle: 'Data Archive',
		prefix: 'LOG',
		intro: 'A collection of technical logs, architectural patterns, and findings from the intersection of artificial intelligence and security engineering.',
		emptyTitle: 'No_Logs_Found',
		emptyText: 'The database currently contains no encrypted transmission logs. Please stand by for synchronization.',
		returnToBase: 'RETURN_TO_BASE',
		backToList: 'BACK_TO_LOG_LIST',
		topOfFile: 'TOP_OF_FILE',
		sentinelLogs: 'Sentinel_Logs'
	}
};
