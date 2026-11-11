import type { Locale } from '$lib/i18n/locales';

export interface Stat {
	label: string;
	value: string;
}

export interface ExpertiseItem {
	id: string;
	title: string;
	icon: string;
	iconBg: string;
	description: string;
	gridSize: string;
	tags: string[];
	stats: Stat[];
}

const en: ExpertiseItem[] = [
	{
		id: 'security-architecture',
		title: 'Security & Architecture',
		icon: 'security',
		iconBg: 'security',
		description: 'Lead Security Responsible role at Resurs Bank coordinating penetration testing, implementing secure coding practices, and designing secure infrastructure using zero-trust principles with Kubernetes and cloud hardening.',
		gridSize: 'md:col-span-2',
		tags: ['Security', 'Penetration Testing', 'Kubernetes', 'ArgoCD', 'Cloud Hardening', 'Zero-Trust'],
		stats: [
			{ label: 'Vulnerabilities Remediated', value: '100%' },
			{ label: 'Platforms Secured', value: '8+' }
		]
	},
	{
		id: 'fullstack-development',
		title: 'Full-Stack Development',
		icon: 'code',
		iconBg: 'code',
		description: 'Architecting scalable web applications across multiple tech stacks: Spring Boot/Java/Kotlin backends, React/Svelte frontends, GraphQL APIs, and microservices architectures.',
		gridSize: 'md:col-span-2',
		tags: ['Spring Boot', 'Node.js', 'React', 'Svelte', 'GraphQL', 'Microservices'],
		stats: [
			{ label: 'Projects', value: '12+' },
			{ label: 'Years', value: '12' }
		]
	},
	{
		id: 'devops-infrastructure',
		title: 'DevOps & Infrastructure',
		icon: 'settings',
		iconBg: 'settings',
		description: 'Designing and implementing Infrastructure-as-Code frameworks using ArgoCD, Kubernetes, Kustomize, Docker, and CI/CD pipelines with Jenkins and GitLab.',
		gridSize: 'md:col-span-2',
		tags: ['Kubernetes', 'ArgoCD', 'Docker', 'Jenkins', 'GitLab', 'Terraform', 'CI/CD'],
		stats: [
			{ label: 'Deployment Time', value: '-80%' },
			{ label: 'Infrastructure Codified', value: '100%' }
		]
	},
	{
		id: 'mobile-development',
		title: 'Mobile Development',
		icon: 'phone_iphone',
		iconBg: 'phone_iphone',
		description: 'Senior Android developer building production applications in Kotlin from scratch. Expert in Android Jetpack, Room database, SQLite, Firebase, and third-party integrations.',
		gridSize: 'md:col-span-2',
		tags: ['Android', 'Kotlin', 'Firebase', 'Room', 'Jetpack', 'RxJava'],
		stats: [
			{ label: 'Apps Built', value: '4+' },
			{ label: 'Users', value: '10K+' }
		]
	},
	{
		id: 'ai-machine-learning',
		title: 'AI & Machine Learning',
		icon: 'psychology',
		iconBg: 'psychology',
		description: 'MSc in Bioinformatics with expertise in machine learning algorithms including Hidden Markov Models, neural networks, clustering, and statistical analysis. DARPA-funded AI research and Andrew Ng course intensive study.',
		gridSize: 'md:col-span-2',
		tags: ['Neural Networks', 'Statistical Analysis', 'Hidden Markov Models', 'Python', 'LISP', 'Fortran'],
		stats: [
			{ label: 'Education Depth', value: 'MSc' },
			{ label: 'Projects', value: '5+' }
		]
	},
	{
		id: 'backend-systems',
		title: 'Backend & Systems',
		icon: 'dns',
		iconBg: 'dns',
		description: 'Expert in multiple backend frameworks: Spring Boot, Node.js/Express, SparkJava. Experienced with microservices, real-time systems, embedded development (C, OSE), and socket/REST communication protocols.',
		gridSize: 'md:col-span-2',
		tags: ['Spring Boot', 'Node.js', 'Kotlin', 'Java', 'C', 'REST', 'GraphQL'],
		stats: [
			{ label: 'Languages', value: '8+' },
			{ label: 'Frameworks', value: '12+' }
		]
	},
	{
		id: 'frontend-development',
		title: 'Frontend Development',
		icon: 'palette',
		iconBg: 'palette',
		description: 'Modern frontend development with React, Svelte, and TypeScript. Experience with Material UI, Bootstrap, data binding, and responsive design principles.',
		gridSize: 'md:col-span-2',
		tags: ['React', 'Svelte', 'TypeScript', 'Material UI', 'Bootstrap', 'CSS3'],
		stats: []
	},
	{
		id: 'database-design',
		title: 'Database & Data',
		icon: 'storage',
		iconBg: 'storage',
		description: 'Designing and optimizing database architectures with PostgreSQL, MongoDB, SQLite, and Redis. Expertise in migrations, indexing, and query optimization.',
		gridSize: 'md:col-span-2',
		tags: ['PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'Data Modeling', 'Optimization'],
		stats: []
	},
	{
		id: 'performance-optimization',
		title: 'Performance & Scalability',
		icon: 'query_stats',
		iconBg: 'query_stats',
		description: 'Optimizing throughput and reducing latency in distributed systems. Experience migrating from socket-based to REST architecture, implementing real-time communication, and monitoring systems.',
		gridSize: 'md:col-span-2',
		tags: ['Latency Optimization', 'Throughput', 'Real-time Systems', 'Monitoring', 'Profiling'],
		stats: []
	},
	{
		id: 'team-leadership',
		title: 'Team Leadership & Mentorship',
		icon: 'groups',
		iconBg: 'groups',
		description: 'Led development teams, conducted technical training, designed curriculum for Android development courses, and championed AI-assisted development adoption with GitHub Copilot.',
		gridSize: 'md:col-span-2',
		tags: ['Leadership', 'Teaching', 'Mentorship', 'Training', 'Team Building'],
		stats: []
	}
];

const sv: ExpertiseItem[] = [
	{
		id: 'security-architecture',
		title: 'Säkerhet & Arkitektur',
		icon: 'security',
		iconBg: 'security',
		description: 'Ledande säkerhetsansvarig på Resurs Bank med ansvar för att samordna penetrationstester, implementera säkra kodningsmetoder och designa säker infrastruktur med zero-trust-principer, Kubernetes och molnhärdning.',
		gridSize: 'md:col-span-2',
		tags: ['Security', 'Penetration Testing', 'Kubernetes', 'ArgoCD', 'Cloud Hardening', 'Zero-Trust'],
		stats: [
			{ label: 'Åtgärdade sårbarheter', value: '100%' },
			{ label: 'Säkrade plattformar', value: '8+' }
		]
	},
	{
		id: 'fullstack-development',
		title: 'Fullstackutveckling',
		icon: 'code',
		iconBg: 'code',
		description: 'Arkitektur av skalbara webbapplikationer över flera tech-stackar: Spring Boot/Java/Kotlin-backends, React/Svelte-frontends, GraphQL-API:er och mikrotjänstarkitekturer.',
		gridSize: 'md:col-span-2',
		tags: ['Spring Boot', 'Node.js', 'React', 'Svelte', 'GraphQL', 'Microservices'],
		stats: [
			{ label: 'Projekt', value: '12+' },
			{ label: 'År', value: '12' }
		]
	},
	{
		id: 'devops-infrastructure',
		title: 'DevOps & Infrastruktur',
		icon: 'settings',
		iconBg: 'settings',
		description: 'Design och implementering av Infrastructure-as-Code-ramverk med ArgoCD, Kubernetes, Kustomize, Docker och CI/CD-pipelines med Jenkins och GitLab.',
		gridSize: 'md:col-span-2',
		tags: ['Kubernetes', 'ArgoCD', 'Docker', 'Jenkins', 'GitLab', 'Terraform', 'CI/CD'],
		stats: [
			{ label: 'Distributionstid', value: '-80%' },
			{ label: 'Infrastruktur som kod', value: '100%' }
		]
	},
	{
		id: 'mobile-development',
		title: 'Mobilutveckling',
		icon: 'phone_iphone',
		iconBg: 'phone_iphone',
		description: 'Senior Android-utvecklare som bygger produktionsapplikationer i Kotlin från grunden. Expert på Android Jetpack, Room-databas, SQLite, Firebase och tredjepartsintegrationer.',
		gridSize: 'md:col-span-2',
		tags: ['Android', 'Kotlin', 'Firebase', 'Room', 'Jetpack', 'RxJava'],
		stats: [
			{ label: 'Byggda appar', value: '4+' },
			{ label: 'Användare', value: '10K+' }
		]
	},
	{
		id: 'ai-machine-learning',
		title: 'AI & Maskininlärning',
		icon: 'psychology',
		iconBg: 'psychology',
		description: 'MSc i bioinformatik med expertis inom maskininlärningsalgoritmer som Hidden Markov-modeller, neurala nätverk, klustring och statistisk analys. DARPA-finansierad AI-forskning och intensiva studier av Andrew Ng:s kurser.',
		gridSize: 'md:col-span-2',
		tags: ['Neural Networks', 'Statistical Analysis', 'Hidden Markov Models', 'Python', 'LISP', 'Fortran'],
		stats: [
			{ label: 'Utbildningsdjup', value: 'MSc' },
			{ label: 'Projekt', value: '5+' }
		]
	},
	{
		id: 'backend-systems',
		title: 'Backend & System',
		icon: 'dns',
		iconBg: 'dns',
		description: 'Expert inom flera backend-ramverk: Spring Boot, Node.js/Express, SparkJava. Erfarenhet av mikrotjänster, realtidssystem, inbyggd utveckling (C, OSE) samt socket-/REST-kommunikationsprotokoll.',
		gridSize: 'md:col-span-2',
		tags: ['Spring Boot', 'Node.js', 'Kotlin', 'Java', 'C', 'REST', 'GraphQL'],
		stats: [
			{ label: 'Språk', value: '8+' },
			{ label: 'Ramverk', value: '12+' }
		]
	},
	{
		id: 'frontend-development',
		title: 'Frontendutveckling',
		icon: 'palette',
		iconBg: 'palette',
		description: 'Modern frontendutveckling med React, Svelte och TypeScript. Erfarenhet av Material UI, Bootstrap, databindning och responsiv design.',
		gridSize: 'md:col-span-2',
		tags: ['React', 'Svelte', 'TypeScript', 'Material UI', 'Bootstrap', 'CSS3'],
		stats: []
	},
	{
		id: 'database-design',
		title: 'Databas & Data',
		icon: 'storage',
		iconBg: 'storage',
		description: 'Design och optimering av databasarkitekturer med PostgreSQL, MongoDB, SQLite och Redis. Expertis inom migreringar, indexering och queryoptimering.',
		gridSize: 'md:col-span-2',
		tags: ['PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'Data Modeling', 'Optimization'],
		stats: []
	},
	{
		id: 'performance-optimization',
		title: 'Prestanda & Skalbarhet',
		icon: 'query_stats',
		iconBg: 'query_stats',
		description: 'Optimering av genomströmning och minskad latens i distribuerade system. Erfarenhet av migrering från socket-baserad till REST-arkitektur, implementering av realtidskommunikation och övervakningssystem.',
		gridSize: 'md:col-span-2',
		tags: ['Latency Optimization', 'Throughput', 'Real-time Systems', 'Monitoring', 'Profiling'],
		stats: []
	},
	{
		id: 'team-leadership',
		title: 'Teamledarskap & Mentorskap',
		icon: 'groups',
		iconBg: 'groups',
		description: 'Lett utvecklingsteam, hållit teknisk utbildning, designat kursmaterial för Android-utvecklingskurser och drivit införandet av AI-assisterad utveckling med GitHub Copilot.',
		gridSize: 'md:col-span-2',
		tags: ['Leadership', 'Teaching', 'Mentorship', 'Training', 'Team Building'],
		stats: []
	}
];

const pl: ExpertiseItem[] = [
	{
		id: 'security-architecture',
		title: 'Bezpieczeństwo i Architektura',
		icon: 'security',
		iconBg: 'security',
		description: 'Rola głównego specjalisty ds. bezpieczeństwa w Resurs Bank – koordynacja testów penetracyjnych, wdrażanie bezpiecznych praktyk kodowania oraz projektowanie bezpiecznej infrastruktury w oparciu o zasady zero-trust, Kubernetes i hartowanie chmury.',
		gridSize: 'md:col-span-2',
		tags: ['Security', 'Penetration Testing', 'Kubernetes', 'ArgoCD', 'Cloud Hardening', 'Zero-Trust'],
		stats: [
			{ label: 'Usunięte podatności', value: '100%' },
			{ label: 'Zabezpieczone platformy', value: '8+' }
		]
	},
	{
		id: 'fullstack-development',
		title: 'Rozwój Full-Stack',
		icon: 'code',
		iconBg: 'code',
		description: 'Projektowanie skalowalnych aplikacji webowych w wielu stosach technologicznych: backendy Spring Boot/Java/Kotlin, frontendy React/Svelte, API GraphQL i architektury mikrousługowe.',
		gridSize: 'md:col-span-2',
		tags: ['Spring Boot', 'Node.js', 'React', 'Svelte', 'GraphQL', 'Microservices'],
		stats: [
			{ label: 'Projekty', value: '12+' },
			{ label: 'Lata', value: '12' }
		]
	},
	{
		id: 'devops-infrastructure',
		title: 'DevOps i Infrastruktura',
		icon: 'settings',
		iconBg: 'settings',
		description: 'Projektowanie i wdrażanie frameworków Infrastructure-as-Code przy użyciu ArgoCD, Kubernetes, Kustomize, Docker oraz pipeline’ów CI/CD z Jenkinsem i GitLabem.',
		gridSize: 'md:col-span-2',
		tags: ['Kubernetes', 'ArgoCD', 'Docker', 'Jenkins', 'GitLab', 'Terraform', 'CI/CD'],
		stats: [
			{ label: 'Czas wdrożenia', value: '-80%' },
			{ label: 'Infrastruktura jako kod', value: '100%' }
		]
	},
	{
		id: 'mobile-development',
		title: 'Rozwój Mobilny',
		icon: 'phone_iphone',
		iconBg: 'phone_iphone',
		description: 'Senior Android developer tworzący aplikacje produkcyjne w Kotlinie od podstaw. Ekspert w zakresie Android Jetpack, bazy Room, SQLite, Firebase i integracji z systemami zewnętrznymi.',
		gridSize: 'md:col-span-2',
		tags: ['Android', 'Kotlin', 'Firebase', 'Room', 'Jetpack', 'RxJava'],
		stats: [
			{ label: 'Zbudowane aplikacje', value: '4+' },
			{ label: 'Użytkownicy', value: '10K+' }
		]
	},
	{
		id: 'ai-machine-learning',
		title: 'AI i Uczenie Maszynowe',
		icon: 'psychology',
		iconBg: 'psychology',
		description: 'MSc w bioinformatyce ze specjalizacją w algorytmach uczenia maszynowego, w tym ukrytych modelach Markowa, sieciach neuronowych, klasteryzacji i analizie statystycznej. Badania AI finansowane przez DARPA oraz intensywne studia nad kursami Andrew Nga.',
		gridSize: 'md:col-span-2',
		tags: ['Neural Networks', 'Statistical Analysis', 'Hidden Markov Models', 'Python', 'LISP', 'Fortran'],
		stats: [
			{ label: 'Poziom edukacji', value: 'MSc' },
			{ label: 'Projekty', value: '5+' }
		]
	},
	{
		id: 'backend-systems',
		title: 'Backend i Systemy',
		icon: 'dns',
		iconBg: 'dns',
		description: 'Ekspert w wielu frameworkach backendowych: Spring Boot, Node.js/Express, SparkJava. Doświadczenie w mikrousługach, systemach czasu rzeczywistego, programowaniu wbudowanym (C, OSE) oraz protokołach komunikacyjnych socket/REST.',
		gridSize: 'md:col-span-2',
		tags: ['Spring Boot', 'Node.js', 'Kotlin', 'Java', 'C', 'REST', 'GraphQL'],
		stats: [
			{ label: 'Języki', value: '8+' },
			{ label: 'Frameworki', value: '12+' }
		]
	},
	{
		id: 'frontend-development',
		title: 'Rozwój Frontend',
		icon: 'palette',
		iconBg: 'palette',
		description: 'Nowoczesny rozwój frontendu z React, Svelte i TypeScript. Doświadczenie z Material UI, Bootstrapem, wiązaniem danych i zasadami responsywnego projektowania.',
		gridSize: 'md:col-span-2',
		tags: ['React', 'Svelte', 'TypeScript', 'Material UI', 'Bootstrap', 'CSS3'],
		stats: []
	},
	{
		id: 'database-design',
		title: 'Bazy Danych i Dane',
		icon: 'storage',
		iconBg: 'storage',
		description: 'Projektowanie i optymalizacja architektur baz danych z PostgreSQL, MongoDB, SQLite i Redis. Ekspertyza w migracjach, indeksowaniu i optymalizacji zapytań.',
		gridSize: 'md:col-span-2',
		tags: ['PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'Data Modeling', 'Optimization'],
		stats: []
	},
	{
		id: 'performance-optimization',
		title: 'Wydajność i Skalowalność',
		icon: 'query_stats',
		iconBg: 'query_stats',
		description: 'Optymalizacja przepustowości i redukcja opóźnień w systemach rozproszonych. Doświadczenie w migracji z architektury opartej na socketach do REST, wdrażaniu komunikacji w czasie rzeczywistym i systemach monitorowania.',
		gridSize: 'md:col-span-2',
		tags: ['Latency Optimization', 'Throughput', 'Real-time Systems', 'Monitoring', 'Profiling'],
		stats: []
	},
	{
		id: 'team-leadership',
		title: 'Przywództwo Zespołowe i Mentoring',
		icon: 'groups',
		iconBg: 'groups',
		description: 'Prowadzenie zespołów deweloperskich, przeprowadzanie szkoleń technicznych, projektowanie programów nauczania dla kursów Android oraz propagowanie adopcji programowania wspomaganego AI z GitHub Copilot.',
		gridSize: 'md:col-span-2',
		tags: ['Leadership', 'Teaching', 'Mentorship', 'Training', 'Team Building'],
		stats: []
	}
];

export const expertise: Record<Locale, ExpertiseItem[]> = { en, sv, pl };
