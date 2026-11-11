import type { Locale } from '$lib/i18n/locales';

export interface TimelineItem {
	id: string;
	period: string;
	role: string;
	company: string;
	type: 'work' | 'education';
	description: string;
	achievements: string[];
	tags: string[];
	status: 'active' | 'completed';
}

const en: TimelineItem[] = [
	{
		id: 'yabank-lead-dev',
		period: 'Feb 2021 - May 2026',
		role: 'Lead Fullstack Developer & Security Responsible',
		company: 'Resurs Bank AB',
		type: 'work',
		description: 'Lead fullstack developer on the Norwegian YaBank platform, responsible for backend and frontend development and DevOps automation. Worked with Spring Boot (Java/Kotlin) microservices, React frontends, and integrations with third-party banking and regulatory systems. Served as Security Responsible for the platform, coordinating penetration tests and implementing secure coding practices. Designed and implemented a custom Infrastructure-as-Code framework using ArgoCD and Kubernetes Kustomize. Led development of the new web onboarding platform as a modular React npm library integrated into WordPress.',
		achievements: [
			'Led backend and frontend development for Norwegian YaBank platform serving thousands of users',
			'Reduced security vulnerabilities through comprehensive penetration testing coordination and remediation',
			'Designed custom Infrastructure-as-Code framework using ArgoCD and Kubernetes Kustomize',
			'Architected modular React npm library for web onboarding platform integrated into WordPress',
			'Championed GitHub Copilot adoption and conducted team training sessions on AI-assisted development'
		],
		tags: ['Spring Boot', 'Java', 'Kotlin', 'React', 'DevOps', 'ArgoCD', 'Kubernetes', 'Security', 'Microservices'],
		status: 'active'
	},
	{
		id: 'berendsen-android',
		period: 'Jan 2020 - Ongoing',
		role: 'Senior Android Developer',
		company: 'Berendsen AB',
		type: 'work',
		description: 'Developed a new Android application from scratch to replace third-party web solution. Handled planning, requirements specification, design and implementation. Ensured deployment through internal EMM system (InTune). Implementation used Kotlin, SQLite database with Android Room, and third-party barcode scanning libraries. Utilized Android Jetpack architectural components including Data Binding, Room, LiveData, ViewModels and WorkManager. Used OkHttp for server communication with SOAP protocol integration.',
		achievements: [
			'Developed Android application from scratch using Kotlin',
			'Implemented SQLite database with Android Room and third-party integrations',
			'Deployed application through internal EMM system (InTune)',
			'Utilized modern Android Jetpack components for robust architecture'
		],
		tags: ['Android', 'Kotlin', 'SQLite', 'Room', 'Android Jetpack', 'EMM'],
		status: 'active'
	},
	{
		id: 'relatable-fullstack',
		period: 'Feb 2020 - Dec 2020',
		role: 'Fullstack Developer',
		company: 'Relatable AB',
		type: 'work',
		description: 'Developed Relatables internal web tools across a dozen Heroku applications deployed via GitHub pipeline. Worked with PostgreSQL and Redis databases. Backend used Node.js and Express with migration from REST to GraphQL using Apollo integration. Used Hasura on top of PostgreSQL. Frontend development with React and TypeScript for newer parts, Handlebars for legacy parts. Led Dockerization of servers running in EC2 instances. Integrated with third-party services including Facebook, Instagram, Youtube, Google Drive, Hubspot, and Auth0.',
		achievements: [
			'Developed internal web tools across multiple Heroku applications',
			'Led migration from REST-based architecture to GraphQL using Apollo and Hasura',
			'Implemented Docker containerization for server deployment on EC2',
			'Integrated with multiple third-party services and authentication systems',
			'Maintained test coverage using Jest for unit tests and Cypress for integration tests'
		],
		tags: ['Node.js', 'Express', 'GraphQL', 'Apollo', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Heroku'],
		status: 'completed'
	},
	{
		id: 'hejmo-fullstack',
		period: 'Feb 2019 - Aug 2019',
		role: 'Fullstack Developer',
		company: 'Hejmo AB',
		type: 'work',
		description: 'Fullstack development using SparkJava backend with Kotlin. Frontend development with jQuery, HTML, CSS3, Sass and FreeMarker templating. Utilized Kotlin\'s Reflection API, lambdas, and async/await patterns. Developed connections to third-party services such as Amazon S3, Scrive, BankID, Billecta, UC and Tink using JSON-based REST and XML-based communication. Application deployed on Heroku with MongoDB mLab database.',
		achievements: [
			'Developed fullstack web application using SparkJava and Kotlin',
			'Integrated with 7+ third-party banking and financial services APIs',
			'Implemented complex REST and XML-based communication protocols',
			'Utilized advanced Kotlin features including Reflection API and functional programming patterns'
		],
		tags: ['SparkJava', 'Kotlin', 'MongoDB', 'jQuery', 'HTML', 'CSS3', 'REST', 'XML'],
		status: 'completed'
	},
	{
		id: 'ec-utbildning-teacher',
		period: 'Jan 2019 - Mar 2019',
		role: 'Course Instructor',
		company: 'EC Utbildning',
		type: 'work',
		description: 'Taught Android development in Kotlin as the final course in a two-year programmer education program. Created all course material including exercises and examination projects. Covered Android fundamentals, Kotlin essentials, Google Firebase, REST communication libraries, and RxJava for thread and callback handling. Students built applications integrating REST APIs with Firebase authentication and data persistence.',
		achievements: [
			'Created comprehensive Android development course curriculum',
			'Designed examination project requiring REST API integration and Firebase authentication',
			'Taught 30+ students advanced Android and Kotlin concepts',
			'Developed practical exercises covering Firebase and RxJava patterns'
		],
		tags: ['Android', 'Kotlin', 'Firebase', 'Teaching', 'REST', 'RxJava'],
		status: 'completed'
	},
	{
		id: 'tunstall-senior-dev',
		period: '2016 - 2018',
		role: 'Senior Developer',
		company: 'Tunstall Nordic AB',
		type: 'work',
		description: 'Senior developer programming alarm servers and Android applications with prototyping responsibilities. Used Java, Kotlin, and Node.js for core development. Created Python scripts for CI/CD environment management and configuration management server using PHP. Prototyped applications in Electron with Bootstrap UI and Xamarin. Responsible for team\'s CI/CD environment using Jenkins, Gitlab, Python scripting and Docker. Led rewriting of server and app software to use REST communication instead of socket-based messaging. Developed new monitoring server in Docker container using Node.js/Express backend and React/Material UI frontend.',
		achievements: [
			'Architected migration from socket-based to REST-based communication architecture',
			'Developed monitoring server using Node.js, Express, React, and Material UI',
			'Managed team\'s CI/CD infrastructure using Jenkins, Gitlab, Python, and Docker',
			'Prototyped multiple applications using Electron, Xamarin, and Bootstrap',
			'Implemented Raspberry Pi platform migrations for server software'
		],
		tags: ['Java', 'Kotlin', 'Node.js', 'Python', 'Electron', 'Xamarin', 'Docker', 'Jenkins', 'REST', 'React'],
		status: 'completed'
	},
	{
		id: 'sony-messaging-app',
		period: '2014 - 2016',
		role: 'Developer',
		company: 'Sony Mobile Communications',
		type: 'work',
		description: 'Worked on messaging application development, starting with regular messaging and transitioning to new applications using JOYN/RCS communication standards.',
		achievements: [
			'Developed messaging application features for Sony Mobile platform',
			'Implemented JOYN/RCS communication standards',
			'Maintained backwards compatibility with legacy messaging systems'
		],
		tags: ['Android', 'Java', 'Messaging', 'JOYN', 'RCS'],
		status: 'completed'
	},
	{
		id: 'sony-graphics-ui',
		period: '2013 - 2014',
		role: 'Developer',
		company: 'Sony Mobile Communications',
		type: 'work',
		description: 'Worked on patches to the Google Android platform, primarily in window handling and rendering systems. Developed new graphical components for applications. Led development of Sony\'s Bidirectionality patch, mirroring the entire user interface for right-to-left language markets. This was the largest and most complex patch to the Android platform that Sony had developed.',
		achievements: [
			'Led development of comprehensive Bidirectionality patch for RTL language support',
			'Implemented patches to Android window handling and rendering systems',
			'Developed reusable graphical components for Android applications',
			'Managed one of Sony\'s most complex Android platform modifications'
		],
		tags: ['Android', 'Java', 'C++', 'Graphics', 'UI', 'Bidirectionality'],
		status: 'completed'
	},
	{
		id: 'sony-ericsson-media',
		period: '2010 - 2013',
		role: 'Developer',
		company: 'Sony Ericsson',
		type: 'work',
		description: 'Worked in the Media Center team responsible for handling all media content on phones. Programmed in C using an in-house framework on phones using OSE (Eneas real-time operating system).',
		achievements: [
			'Developed media management features for Sony Ericsson phones',
			'Worked with real-time operating system (OSE/Eneas)',
			'Implemented using C and in-house framework for embedded systems'
		],
		tags: ['C', 'Embedded Systems', 'OSE', 'Real-time OS', 'Media Center'],
		status: 'completed'
	},
	{
		id: 'ut-austin-ai-darpa',
		period: '2001 - 2002',
		role: 'Research Assistant',
		company: 'University of Texas at Austin',
		type: 'work',
		description: 'Worked in an AI project partly financed by DARPA to develop an ontological system originally meant for decision making, later redesigned to contain scientific information. The system was developed in LISP.',
		achievements: [
			'Contributed to DARPA-funded AI ontological system development',
			'Implemented complex knowledge representation systems in LISP',
			'Participated in transition from decision-making to scientific information system'
		],
		tags: ['AI', 'LISP', 'Ontology', 'DARPA', 'Research'],
		status: 'completed'
	},
	{
		id: 'msc-computer-science',
		period: '2004 - 2011',
		role: 'Master of Science in Computer Science',
		company: 'Lund University',
		type: 'education',
		description: 'Comprehensive computer science education covering mathematics, algorithm theory, operating systems, database systems, formal languages and automata, Java, C++, embedded systems, web development, and software engineering. Specialized in AI with courses in machine learning and knowledge-based systems.',
		achievements: [
			'Completed specialization in Artificial Intelligence',
			'Studied advanced algorithm theory and operating systems',
			'Gained expertise in multiple programming languages and paradigms',
			'Covered full-stack development from embedded systems to web technologies'
		],
		tags: ['Computer Science', 'AI', 'Algorithms', 'Operating Systems', 'Database', 'Java', 'C++'],
		status: 'completed'
	},
	{
		id: 'msc-bioinformatics',
		period: '2002 - 2003',
		role: 'Master in Bioinformatics',
		company: 'Lund University / Technical University of Denmark',
		type: 'education',
		description: 'Education in techniques for analysis of biological data including Principal Component Analysis, Hidden Markov Models, clustering techniques, dynamical programming (Viterbi algorithm), and statistical analysis. Master thesis at the Technical University of Denmark on using information theory measures to preprocess protein sequence data before feeding into artificial neural networks. Programming done in Perl with neural network implementation in Fortran.',
		achievements: [
			'Mastered advanced statistical analysis techniques for biological data',
			'Implemented Hidden Markov Models and clustering algorithms',
			'Completed thesis on information theory applications in protein sequence analysis',
			'Demonstrated proficiency in Perl and Fortran'
		],
		tags: ['Bioinformatics', 'Machine Learning', 'Statistics', 'Perl', 'Fortran', 'Neural Networks'],
		status: 'completed'
	},
	{
		id: 'exchange-student-ut-austin',
		period: '2001 - 2002',
		role: 'Exchange Student',
		company: 'University of Texas at Austin',
		type: 'education',
		description: 'Exchange student studying natural science, computer science, and bioinformatics at University of Texas at Austin through the TASSEP program.',
		achievements: [
			'Studied diverse natural science and computer science courses',
			'Participated in international exchange program',
			'Gained exposure to bioinformatics research and development'
		],
		tags: ['Natural Science', 'Computer Science', 'Bioinformatics', 'Exchange Program'],
		status: 'completed'
	},
	{
		id: 'msc-molecular-biology',
		period: '1996 - 2002',
		role: 'Master of Science in Molecular Biology',
		company: 'Lund University',
		type: 'education',
		description: 'Comprehensive molecular biology education covering chemistry, biochemistry, organic chemistry, mathematics, mathematical statistics, genetics, molecular genetics, cellular biology, microbiology, virology, physiology, faunistics, floristics, plant physiology, and ecology.',
		achievements: [
			'Gained comprehensive knowledge of molecular and cellular biology',
			'Completed advanced chemistry and mathematical statistics courses',
			'Studied diverse ecological and biological disciplines',
			'Built foundation for later bioinformatics specialization'
		],
		tags: ['Molecular Biology', 'Chemistry', 'Genetics', 'Microbiology', 'Ecology'],
		status: 'completed'
	}
];

const sv: TimelineItem[] = [
	{
		id: 'yabank-lead-dev',
		period: 'Feb 2021 - May 2026',
		role: 'Lead Fullstackutvecklare & Säkerhetsansvarig',
		company: 'Resurs Bank AB',
		type: 'work',
		description: 'Lead fullstackutvecklare på den norska YaBank-plattformen med ansvar för backend- och frontendutveckling samt DevOps-automatisering. Arbetade med Spring Boot (Java/Kotlin)-mikrotjänster, React-frontends och integrationer med tredjeparts- och regulatoriska banksystem. Fungerade som säkerhetsansvarig för plattformen, samordnade penetrationstester och implementerade säkra kodningsmetoder. Designade och implementerade ett eget Infrastructure-as-Code-ramverk med ArgoCD och Kubernetes Kustomize. Ledde utvecklingen av den nya webbaserade onboarding-plattformen som ett modulärt React npm-bibliotek integrerat i WordPress.',
		achievements: [
			'Ledd backend- och frontendutveckling för den norska YaBank-plattformen som betjänar tusentals användare',
			'Minskat säkerhetsrisker genom samordnade penetrationstester och åtgärder',
			'Designat ett eget Infrastructure-as-Code-ramverk med ArgoCD och Kubernetes Kustomize',
			'Arkitekterat ett modulärt React npm-bibliotek för web onboarding-plattform integrerat i WordPress',
			'Drivit införandet av GitHub Copilot och hållit teamutbildningar i AI-assisterad utveckling'
		],
		tags: ['Spring Boot', 'Java', 'Kotlin', 'React', 'DevOps', 'ArgoCD', 'Kubernetes', 'Security', 'Microservices'],
		status: 'active'
	},
	{
		id: 'berendsen-android',
		period: 'Jan 2020 - Ongoing',
		role: 'Senior Androidutvecklare',
		company: 'Berendsen AB',
		type: 'work',
		description: 'Utvecklade en ny Android-applikation från grunden för att ersätta en tredjeparts webblösning. Hanterade planering, kravspecifikation, design och implementering. Säkerställde driftsättning genom internt EMM-system (InTune). Implementeringen använde Kotlin, SQLite-databas med Android Room och tredjepartsbibliotek för streckkodsskanning. Använde Android Jetpack-komponenter som Data Binding, Room, LiveData, ViewModels och WorkManager. Använde OkHttp för serverkommunikation med SOAP-protokollsintegration.',
		achievements: [
			'Utvecklat en Android-applikation från grunden i Kotlin',
			'Implementerat SQLite-databas med Android Room och tredjepartsintegrationer',
			'Driftsatt applikationen genom internt EMM-system (InTune)',
			'Använt moderna Android Jetpack-komponenter för robust arkitektur'
		],
		tags: ['Android', 'Kotlin', 'SQLite', 'Room', 'Android Jetpack', 'EMM'],
		status: 'active'
	},
	{
		id: 'relatable-fullstack',
		period: 'Feb 2020 - Dec 2020',
		role: 'Fullstackutvecklare',
		company: 'Relatable AB',
		type: 'work',
		description: 'Utvecklade Relatables interna webbverktyg över ett dussin Heroku-applikationer driftsatta via GitHub-pipeline. Arbetade med PostgreSQL- och Redis-databaser. Backend använde Node.js och Express med migrering från REST till GraphQL via Apollo-integration. Använde Hasura ovanpå PostgreSQL. Frontendutveckling med React och TypeScript för nyare delar, Handlebars för äldre delar. Ledde Dockerisering av servrar som kördes i EC2-instanser. Integrerade med tredjepartstjänster som Facebook, Instagram, Youtube, Google Drive, Hubspot och Auth0.',
		achievements: [
			'Utvecklat interna webbverktyg över flera Heroku-applikationer',
			'Lett migreringen från REST-baserad arkitektur till GraphQL med Apollo och Hasura',
			'Implementerat Docker-containerisering för serverdriftsättning på EC2',
			'Integrerat med flera tredjepartstjänster och autentiseringssystem',
			'Underhållit testtäckning med Jest för enhetstester och Cypress för integrationstester'
		],
		tags: ['Node.js', 'Express', 'GraphQL', 'Apollo', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Heroku'],
		status: 'completed'
	},
	{
		id: 'hejmo-fullstack',
		period: 'Feb 2019 - Aug 2019',
		role: 'Fullstackutvecklare',
		company: 'Hejmo AB',
		type: 'work',
		description: 'Fullstackutveckling med SparkJava-backend i Kotlin. Frontendutveckling med jQuery, HTML, CSS3, Sass och FreeMarker-mallar. Använde Kotlins Reflection API, lambdas och async/await-mönster. Utvecklade kopplingar till tredjepartstjänster som Amazon S3, Scrive, BankID, Billecta, UC och Tink med JSON-baserad REST- och XML-baserad kommunikation. Applikationen driftsattes på Heroku med MongoDB mLab-databas.',
		achievements: [
			'Utvecklat fullstack webbapplikation med SparkJava och Kotlin',
			'Integrerat med 7+ tredjeparts-API:er för bank- och finansiella tjänster',
			'Implementerat komplexa REST- och XML-baserade kommunikationsprotokoll',
			'Använt avancerade Kotlin-funktioner som Reflection API och funktionella programmeringsmönster'
		],
		tags: ['SparkJava', 'Kotlin', 'MongoDB', 'jQuery', 'HTML', 'CSS3', 'REST', 'XML'],
		status: 'completed'
	},
	{
		id: 'ec-utbildning-teacher',
		period: 'Jan 2019 - Mar 2019',
		role: 'Kursinstruktör',
		company: 'EC Utbildning',
		type: 'work',
		description: 'Undervisade i Android-utveckling i Kotlin som avslutande kurs i ett tvåårigt programmerarutbildningsprogram. Skapade allt kursmaterial inklusive övningar och examensprojekt. Täckte Android-grunder, Kotlin-grunder, Google Firebase, REST-kommunikationsbibliotek och RxJava för tråd- och callback-hantering. Studenter byggde applikationer som integrerade REST-API:er med Firebase-autentisering och datapersistens.',
		achievements: [
			'Skapat en omfattande kursplan för Android-utveckling',
			'Designat examensprojekt som krävde REST-API-integration och Firebase-autentisering',
			'Undervisat 30+ studenter i avancerade Android- och Kotlin-koncept',
			'Utvecklat praktiska övningar som täcker Firebase- och RxJava-mönster'
		],
		tags: ['Android', 'Kotlin', 'Firebase', 'Teaching', 'REST', 'RxJava'],
		status: 'completed'
	},
	{
		id: 'tunstall-senior-dev',
		period: '2016 - 2018',
		role: 'Seniorutvecklare',
		company: 'Tunstall Nordic AB',
		type: 'work',
		description: 'Seniorutvecklare som programmerade larmservrar och Android-applikationer med ansvar för prototypframtagning. Använde Java, Kotlin och Node.js för kärnutveckling. Skapade Python-skript för CI/CD-miljöhantering och en konfigurationshanteringsserver i PHP. Prototypade applikationer i Electron med Bootstrap-UI och Xamarin. Ansvarade för teamets CI/CD-miljö med Jenkins, Gitlab, Python-skript och Docker. Ledde omskrivningen av server- och appmjukvara till REST-kommunikation istället för socket-baserad meddelandehantering. Utvecklade en ny övervakningsserver i Docker-container med Node.js/Express-backend och React/Material UI-frontend.',
		achievements: [
			'Arkitekterat migreringen från socket-baserad till REST-baserad kommunikationsarkitektur',
			'Utvecklat övervakningsserver med Node.js, Express, React och Material UI',
			'Hanterat teamets CI/CD-infrastruktur med Jenkins, Gitlab, Python och Docker',
			'Prototypat flera applikationer med Electron, Xamarin och Bootstrap',
			'Implementerat Raspberry Pi-plattformsmigreringar för servermjukvara'
		],
		tags: ['Java', 'Kotlin', 'Node.js', 'Python', 'Electron', 'Xamarin', 'Docker', 'Jenkins', 'REST', 'React'],
		status: 'completed'
	},
	{
		id: 'sony-messaging-app',
		period: '2014 - 2016',
		role: 'Utvecklare',
		company: 'Sony Mobile Communications',
		type: 'work',
		description: 'Arbetade med utveckling av meddelandeapplikationer, från vanlig meddelandehantering till nya applikationer med JOYN/RCS-kommunikationsstandarder.',
		achievements: [
			'Utvecklat funktioner i meddelandeapplikationer för Sony Mobiles plattform',
			'Implementerat JOYN/RCS-kommunikationsstandarder',
			'Underhållit bakåtkompatibilitet med äldre meddelandesystem'
		],
		tags: ['Android', 'Java', 'Messaging', 'JOYN', 'RCS'],
		status: 'completed'
	},
	{
		id: 'sony-graphics-ui',
		period: '2013 - 2014',
		role: 'Utvecklare',
		company: 'Sony Mobile Communications',
		type: 'work',
		description: 'Arbetade med patchar till Google Android-plattformen, främst inom fönsterhantering och renderingssystem. Utvecklade nya grafiska komponenter för applikationer. Ledde utvecklingen av Sonys bidirektionalitetspatch, som speglade hela användargränssnittet för marknader med höger-till-vänster-språk. Detta var den största och mest komplexa patchen till Android-plattformen som Sony utvecklat.',
		achievements: [
			'Lett utvecklingen av en omfattande bidirektionalitetspatch för RTL-språkstöd',
			'Implementerat patchar för Androids fönsterhantering och renderingssystem',
			'Utvecklat återanvändbara grafiska komponenter för Android-applikationer',
			'Hanterat en av Sonys mest komplexa Android-plattformsändringar'
		],
		tags: ['Android', 'Java', 'C++', 'Graphics', 'UI', 'Bidirectionality'],
		status: 'completed'
	},
	{
		id: 'sony-ericsson-media',
		period: '2010 - 2013',
		role: 'Utvecklare',
		company: 'Sony Ericsson',
		type: 'work',
		description: 'Arbetade i Media Center-teamet som ansvarade för all mediahantering på telefoner. Programmerade i C med ett internt ramverk på telefoner med OSE (Eneas realtidsoperativsystem).',
		achievements: [
			'Utvecklat mediahanteringsfunktioner för Sony Ericsson-telefoner',
			'Arbetat med realtidsoperativsystemet (OSE/Eneas)',
			'Implementerat i C med internt ramverk för inbyggda system'
		],
		tags: ['C', 'Embedded Systems', 'OSE', 'Real-time OS', 'Media Center'],
		status: 'completed'
	},
	{
		id: 'ut-austin-ai-darpa',
		period: '2001 - 2002',
		role: 'Forskningsassistent',
		company: 'University of Texas at Austin',
		type: 'work',
		description: 'Arbetade i ett AI-projekt delvis finansierat av DARPA för att utveckla ett ontologiskt system som ursprungligen var avsett för beslutsfattande, senare omdesignat för att innehålla vetenskaplig information. Systemet utvecklades i LISP.',
		achievements: [
			'Bidragit till utvecklingen av ett DARPA-finansierat AI-ontologisystem',
			'Implementerat komplexa kunskapsrepresentationssystem i LISP',
			'Deltagit i övergången från beslutsfattande till vetenskapligt informationssystem'
		],
		tags: ['AI', 'LISP', 'Ontology', 'DARPA', 'Research'],
		status: 'completed'
	},
	{
		id: 'msc-computer-science',
		period: '2004 - 2011',
		role: 'Master of Science i datavetenskap',
		company: 'Lund University',
		type: 'education',
		description: 'Omfattande datavetenskapsutbildning som täcker matematik, algoritmteori, operativsystem, databasesystem, formella språk och automater, Java, C++, inbyggda system, webbutveckling och mjukvaruutveckling. Specialiserade sig på AI med kurser i maskininlärning och kunskapsbaserade system.',
		achievements: [
			'Slutfört specialisering inom artificiell intelligens',
			'Studerat avancerad algoritmteori och operativsystem',
			'Förvärvat expertis i flera programmeringsspråk och paradigm',
			'Täckt fullstack-utveckling från inbyggda system till webbteknologier'
		],
		tags: ['Computer Science', 'AI', 'Algorithms', 'Operating Systems', 'Database', 'Java', 'C++'],
		status: 'completed'
	},
	{
		id: 'msc-bioinformatics',
		period: '2002 - 2003',
		role: 'Master i bioinformatik',
		company: 'Lund University / Technical University of Denmark',
		type: 'education',
		description: 'Utbildning i tekniker för analys av biologiska data inklusive Principal Component Analysis, Hidden Markov-modeller, klustringstekniker, dynamisk programmering (Viterbi-algoritmen) och statistisk analys. Masteruppsats vid Danmarks Tekniska Universitet om att använda informationsteoretiska mått för att förbehandla proteinsekvensdata innan matning till artificiella neurala nätverk. Programmering i Perl med implementering av neurala nätverk i Fortran.',
		achievements: [
			'Bemästrat avancerade statistiska analystekniker för biologiska data',
			'Implementerat Hidden Markov-modeller och klustringsalgoritmer',
			'Slutfört uppsats om informationsteoretiska tillämpningar i proteinsekvensanalys',
			'Visat skicklighet i Perl och Fortran'
		],
		tags: ['Bioinformatics', 'Machine Learning', 'Statistics', 'Perl', 'Fortran', 'Neural Networks'],
		status: 'completed'
	},
	{
		id: 'exchange-student-ut-austin',
		period: '2001 - 2002',
		role: 'Utbytesstudent',
		company: 'University of Texas at Austin',
		type: 'education',
		description: 'Utbytesstudent som studerade naturvetenskap, datavetenskap och bioinformatik vid University of Texas at Austin genom TASSEP-programmet.',
		achievements: [
			'Studerat varierade naturvetenskapliga och datavetenskapliga kurser',
			'Deltagit i internationellt utbytesprogram',
			'Fått exponering mot bioinformatikforskning och utveckling'
		],
		tags: ['Natural Science', 'Computer Science', 'Bioinformatics', 'Exchange Program'],
		status: 'completed'
	},
	{
		id: 'msc-molecular-biology',
		period: '1996 - 2002',
		role: 'Master of Science i molekylärbiologi',
		company: 'Lund University',
		type: 'education',
		description: 'Omfattande molekylärbiologiutbildning som täcker kemi, biokemi, organisk kemi, matematik, matematisk statistik, genetik, molekylärgenetik, cellbiologi, mikrobiologi, virologi, fysiologi, faunistik, floristik, växtfysiologi och ekologi.',
		achievements: [
			'Förvärvat omfattande kunskaper i molekylär- och cellbiologi',
			'Slutfört avancerade kurser i kemi och matematisk statistik',
			'Studerat varierade ekologiska och biologiska discipliner',
			'Byggt grund för senare bioinformatikspecialisering'
		],
		tags: ['Molecular Biology', 'Chemistry', 'Genetics', 'Microbiology', 'Ecology'],
		status: 'completed'
	}
];

const pl: TimelineItem[] = [
	{
		id: 'yabank-lead-dev',
		period: 'Feb 2021 - May 2026',
		role: 'Główny Deweloper Fullstack i Specjalista ds. Bezpieczeństwa',
		company: 'Resurs Bank AB',
		type: 'work',
		description: 'Główny deweloper fullstack platformy norweskiego YaBank, odpowiedzialny za rozwój backendu i frontendu oraz automatyzację DevOps. Pracował z mikrousługami Spring Boot (Java/Kotlin), frontendami React oraz integracjami z zewnętrznymi i regulacyjnymi systemami bankowymi. Pełnił rolę specjalisty ds. bezpieczeństwa platformy, koordynując testy penetracyjne i wdrażając bezpieczne praktyki kodowania. Zaprojektował i wdrożył autorski framework Infrastructure-as-Code z użyciem ArgoCD i Kubernetes Kustomize. Kierował rozwojem nowej platformy onboardingu webowego jako modułowej biblioteki React npm zintegrowanej z WordPress.',
		achievements: [
			'Kierował rozwojem backendu i frontendu norweskiej platformy YaBank obsługującej tysiące użytkowników',
			'Zredukował podatności bezpieczeństwa dzięki kompleksowej koordynacji testów penetracyjnych i napraw',
			'Zaprojektował autorski framework Infrastructure-as-Code z użyciem ArgoCD i Kubernetes Kustomize',
			'Zaprojektował modułową bibliotekę React npm dla platformy onboardingu webowego zintegrowaną z WordPress',
			'Promował adopcję GitHub Copilot i prowadził szkolenia zespołu z programowania wspomaganego AI'
		],
		tags: ['Spring Boot', 'Java', 'Kotlin', 'React', 'DevOps', 'ArgoCD', 'Kubernetes', 'Security', 'Microservices'],
		status: 'active'
	},
	{
		id: 'berendsen-android',
		period: 'Jan 2020 - Ongoing',
		role: 'Senior Android Developer',
		company: 'Berendsen AB',
		type: 'work',
		description: 'Stworzył od podstaw nową aplikację Android zastępującą zewnętrzne rozwiązanie webowe. Odpowiadał za planowanie, specyfikację wymagań, projektowanie i implementację. Zapewnił wdrożenie przez wewnętrzny system EMM (InTune). Implementacja wykorzystywała Kotlin, bazę SQLite z Android Room oraz zewnętrzne biblioteki do skanowania kodów kreskowych. Używał komponentów architektonicznych Android Jetpack, w tym Data Binding, Room, LiveData, ViewModels i WorkManager. Do komunikacji serwerowej stosował OkHttp z integracją protokołu SOAP.',
		achievements: [
			'Stworzył aplikację Android od podstaw w Kotlinie',
			'Zaimplementował bazę SQLite z Android Room i integracjami zewnętrznymi',
			'Wdrożył aplikację przez wewnętrzny system EMM (InTune)',
			'Wykorzystał nowoczesne komponenty Android Jetpack do solidnej architektury'
		],
		tags: ['Android', 'Kotlin', 'SQLite', 'Room', 'Android Jetpack', 'EMM'],
		status: 'active'
	},
	{
		id: 'relatable-fullstack',
		period: 'Feb 2020 - Dec 2020',
		role: 'Deweloper Fullstack',
		company: 'Relatable AB',
		type: 'work',
		description: 'Opracowywał wewnętrzne narzędzia webowe Relatable w kilkunastu aplikacjach Heroku wdrażanych przez pipeline GitHub. Pracował z bazami PostgreSQL i Redis. Backend oparty na Node.js i Express z migracją z REST do GraphQL przez integrację Apollo. Używał Hasury na PostgreSQL. Frontend tworzony w React i TypeScript dla nowszych części oraz Handlebars dla starszych. Kierował dokeryzacją serwerów działających na instancjach EC2. Integrował usługi zewnętrzne, w tym Facebook, Instagram, YouTube, Google Drive, Hubspot i Auth0.',
		achievements: [
			'Opracowywał wewnętrzne narzędzia webowe w wielu aplikacjach Heroku',
			'Kierował migracją z architektury REST do GraphQL z użyciem Apollo i Hasury',
			'Wdrożył konteneryzację Docker dla wdrożeń serwerów na EC2',
			'Zintegrował wiele zewnętrznych usług i systemów uwierzytelniania',
			'Utrzymywał pokrycie testami: Jest dla testów jednostkowych i Cypress dla testów integracyjnych'
		],
		tags: ['Node.js', 'Express', 'GraphQL', 'Apollo', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Heroku'],
		status: 'completed'
	},
	{
		id: 'hejmo-fullstack',
		period: 'Feb 2019 - Aug 2019',
		role: 'Deweloper Fullstack',
		company: 'Hejmo AB',
		type: 'work',
		description: 'Rozwój fullstack z backendem SparkJava w Kotlinie. Frontend z jQuery, HTML, CSS3, Sass i szablonach FreeMarker. Wykorzystywał API refleksji Kotlina, lambdy i wzorce async/await. Tworzył integracje z usługami zewnętrznymi, takimi jak Amazon S3, Scrive, BankID, Billecta, UC i Tink, z komunikacją opartą na REST JSON i XML. Aplikacja wdrażana na Heroku z bazą MongoDB mLab.',
		achievements: [
			'Stworzył aplikację webową fullstack z użyciem SparkJava i Kotlina',
			'Zintegrował się z 7+ zewnętrznymi API bankowymi i finansowymi',
			'Zaimplementował złożone protokoły komunikacyjne oparte na REST i XML',
			'Wykorzystał zaawansowane funkcje Kotlina, w tym API refleksji i wzorce programowania funkcyjnego'
		],
		tags: ['SparkJava', 'Kotlin', 'MongoDB', 'jQuery', 'HTML', 'CSS3', 'REST', 'XML'],
		status: 'completed'
	},
	{
		id: 'ec-utbildning-teacher',
		period: 'Jan 2019 - Mar 2019',
		role: 'Instruktor Kursu',
		company: 'EC Utbildning',
		type: 'work',
		description: 'Prowadził zajęcia z programowania na Androida w Kotlinie jako kurs końcowy dwuletniego programu edukacyjnego dla programistów. Przygotował cały materiał dydaktyczny, w tym ćwiczenia i projekty egzaminacyjne. Obejmował podstawy Androida, podstawy Kotlina, Google Firebase, biblioteki komunikacji REST oraz RxJava do obsługi wątków i wywołań zwrotnych. Studenci tworzyli aplikacje integrujące API REST z uwierzytelnianiem Firebase i trwałym przechowywaniem danych.',
		achievements: [
			'Opracował kompleksowy program nauczania Android Development',
			'Zaprojektował projekt egzaminacyjny wymagający integracji API REST i uwierzytelniania Firebase',
			'Uczył 30+ studentów zaawansowanych koncepcji Androida i Kotlina',
			'Przygotował praktyczne ćwiczenia obejmujące wzorce Firebase i RxJava'
		],
		tags: ['Android', 'Kotlin', 'Firebase', 'Teaching', 'REST', 'RxJava'],
		status: 'completed'
	},
	{
		id: 'tunstall-senior-dev',
		period: '2016 - 2018',
		role: 'Senior Developer',
		company: 'Tunstall Nordic AB',
		type: 'work',
		description: 'Senior developer programujący serwery alarmowe i aplikacje Android z odpowiedzialnością za prototypowanie. Do głównego rozwoju używał Java, Kotlin i Node.js. Tworzył skrypty Python do zarządzania środowiskiem CI/CD oraz serwer zarządzania konfiguracją w PHP. Prototypował aplikacje w Electron z UI Bootstrap i Xamarin. Odpowiadał za środowisko CI/CD zespołu z Jenkins, Gitlabem, skryptami Python i Dockerem. Kierował przepisaniem oprogramowania serwerów i aplikacji na komunikację REST zamiast przesyłania komunikatów przez sockety. Opracował nowy serwer monitorujący w kontenerze Docker z backendem Node.js/Express i frontendem React/Material UI.',
		achievements: [
			'Zaprojektował migrację z architektury komunikacji opartej na socketach do REST',
			'Opracował serwer monitorujący z Node.js, Express, React i Material UI',
			'Zarządzał infrastrukturą CI/CD zespołu z Jenkins, Gitlabem, Pythonem i Dockerem',
			'Prototypował wiele aplikacji z użyciem Electron, Xamarin i Bootstrap',
			'Wdrożył migracje platformy Raspberry Pi dla oprogramowania serwerowego'
		],
		tags: ['Java', 'Kotlin', 'Node.js', 'Python', 'Electron', 'Xamarin', 'Docker', 'Jenkins', 'REST', 'React'],
		status: 'completed'
	},
	{
		id: 'sony-messaging-app',
		period: '2014 - 2016',
		role: 'Developer',
		company: 'Sony Mobile Communications',
		type: 'work',
		description: 'Pracował nad rozwojem aplikacji do przesyłania wiadomości, zaczynając od standardowych wiadomości, a kończąc na nowych aplikacjach wykorzystujących standardy komunikacji JOYN/RCS.',
		achievements: [
			'Opracowywał funkcje aplikacji do przesyłania wiadomości dla platformy Sony Mobile',
			'Wdrożył standardy komunikacji JOYN/RCS',
			'Zachował wsteczną zgodność z systemami przesyłania wiadomości poprzedniej generacji'
		],
		tags: ['Android', 'Java', 'Messaging', 'JOYN', 'RCS'],
		status: 'completed'
	},
	{
		id: 'sony-graphics-ui',
		period: '2013 - 2014',
		role: 'Developer',
		company: 'Sony Mobile Communications',
		type: 'work',
		description: 'Pracował nad poprawkami do platformy Google Android, głównie w systemach obsługi okien i renderowania. Tworzył nowe komponenty graficzne dla aplikacji. Kierował opracowaniem poprawki dwukierunkowości Sony, odwzorowującej cały interfejs użytkownika dla rynków języków pisanych od prawej do lewej. Była to największa i najbardziej złożona poprawka do platformy Android, jaką opracowało Sony.',
		achievements: [
			'Kierował opracowaniem kompleksowej poprawki dwukierunkowości dla obsługi języków RTL',
			'Wdrożył poprawki do systemów obsługi okien i renderowania Androida',
			'Opracował komponenty graficzne wielokrotnego użytku dla aplikacji Android',
			'Zarządzał jedną z najbardziej złożonych modyfikacji platformy Android firmy Sony'
		],
		tags: ['Android', 'Java', 'C++', 'Graphics', 'UI', 'Bidirectionality'],
		status: 'completed'
	},
	{
		id: 'sony-ericsson-media',
		period: '2010 - 2013',
		role: 'Developer',
		company: 'Sony Ericsson',
		type: 'work',
		description: 'Pracował w zespole Media Center odpowiedzialnym za obsługę wszystkich treści multimedialnych w telefonach. Programował w C, używając wewnętrznego frameworka na telefonach z OSE (systemem czasu rzeczywistego Eneas).',
		achievements: [
			'Opracowywał funkcje zarządzania mediami dla telefonów Sony Ericsson',
			'Pracował z systemem czasu rzeczywistego (OSE/Eneas)',
			'Implementował w C z wewnętrznym frameworkiem dla systemów wbudowanych'
		],
		tags: ['C', 'Embedded Systems', 'OSE', 'Real-time OS', 'Media Center'],
		status: 'completed'
	},
	{
		id: 'ut-austin-ai-darpa',
		period: '2001 - 2002',
		role: 'Asystent Badawczy',
		company: 'University of Texas at Austin',
		type: 'work',
		description: 'Pracował nad projektem AI częściowo finansowanym przez DARPA, rozwijając system ontologiczny pierwotnie przeznaczony do podejmowania decyzji, później przeprojektowany na system przechowujący informacje naukowe. System został opracowany w LISP.',
		achievements: [
			'Współtworzył rozwój systemu ontologicznego AI finansowanego przez DARPA',
			'Zaimplementował złożone systemy reprezentacji wiedzy w LISP',
			'Uczestniczył w przejściu od systemu wspomagania decyzji do systemu informacji naukowej'
		],
		tags: ['AI', 'LISP', 'Ontology', 'DARPA', 'Research'],
		status: 'completed'
	},
	{
		id: 'msc-computer-science',
		period: '2004 - 2011',
		role: 'Magister Informatyki',
		company: 'Lund University',
		type: 'education',
		description: 'Kompleksowa edukacja informatyczna obejmująca matematykę, teorię algorytmów, systemy operacyjne, systemy baz danych, języki formalne i automaty, Javę, C++, systemy wbudowane, tworzenie stron internetowych i inżynierię oprogramowania. Specjalizacja w AI z kursami uczenia maszynowego i systemów opartych na wiedzy.',
		achievements: [
			'Ukończył specjalizację w zakresie sztucznej inteligencji',
			'Studiował zaawansowaną teorię algorytmów i systemy operacyjne',
			'Zdobył ekspertyzę w wielu językach i paradygmatach programowania',
			'Opanował rozwój fullstack od systemów wbudowanych po technologie webowe'
		],
		tags: ['Computer Science', 'AI', 'Algorithms', 'Operating Systems', 'Database', 'Java', 'C++'],
		status: 'completed'
	},
	{
		id: 'msc-bioinformatics',
		period: '2002 - 2003',
		role: 'Magister Bioinformatyki',
		company: 'Lund University / Technical University of Denmark',
		type: 'education',
		description: 'Edukacja w zakresie technik analizy danych biologicznych, w tym analizy głównych składowych, ukrytych modeli Markowa, technik klasteryzacji, programowania dynamicznego (algorytm Viterbiego) i analizy statystycznej. Praca magisterska na Duńskim Uniwersytecie Technicznym dotyczyła wykorzystania miar teorii informacji do wstępnego przetwarzania danych sekwencji białek przed podaniem do sztucznych sieci neuronowych. Programowanie w Perl z implementacją sieci neuronowych w Fortranie.',
		achievements: [
			'Opanował zaawansowane techniki analizy statystycznej danych biologicznych',
			'Zaimplementował ukryte modele Markowa i algorytmy klasteryzacji',
			'Ukończył pracę magisterską o zastosowaniach teorii informacji w analizie sekwencji białek',
			'Wykazał biegłość w Perl i Fortranie'
		],
		tags: ['Bioinformatics', 'Machine Learning', 'Statistics', 'Perl', 'Fortran', 'Neural Networks'],
		status: 'completed'
	},
	{
		id: 'exchange-student-ut-austin',
		period: '2001 - 2002',
		role: 'Student Wymiany',
		company: 'University of Texas at Austin',
		type: 'education',
		description: 'Student wymiany studiujący nauki przyrodnicze, informatykę i bioinformatykę na University of Texas at Austin w ramach programu TASSEP.',
		achievements: [
			'Studiował różnorodne kursy z nauk przyrodniczych i informatyki',
			'Uczestniczył w międzynarodowym programie wymiany',
			'Zaznajomił się z badaniami i rozwojem bioinformatyki'
		],
		tags: ['Natural Science', 'Computer Science', 'Bioinformatics', 'Exchange Program'],
		status: 'completed'
	},
	{
		id: 'msc-molecular-biology',
		period: '1996 - 2002',
		role: 'Magister Biologii Molekularnej',
		company: 'Lund University',
		type: 'education',
		description: 'Kompleksowa edukacja z biologii molekularnej obejmująca chemię, biochemię, chemię organiczną, matematykę, statystykę matematyczną, genetykę, genetykę molekularną, biologię komórki, mikrobiologię, wirusologię, fizjologię, faunistykę, floristykę, fizjologię roślin i ekologię.',
		achievements: [
			'Zdobył wszechstronną wiedzę z biologii molekularnej i komórkowej',
			'Ukończył zaawansowane kursy z chemii i statystyki matematycznej',
			'Studiował różnorodne dyscypliny ekologiczne i biologiczne',
			'Zbudował fundament pod późniejszą specjalizację w bioinformatyce'
		],
		tags: ['Molecular Biology', 'Chemistry', 'Genetics', 'Microbiology', 'Ecology'],
		status: 'completed'
	}
];

export const timeline: Record<Locale, TimelineItem[]> = { en, sv, pl };
