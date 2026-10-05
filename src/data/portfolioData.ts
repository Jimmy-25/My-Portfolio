import { UserProfile, ProjectCaseStudy, SkillCategory, ExperienceItem, CertificationItem } from '../types/portfolio';

export const initialProfile: UserProfile = {
  fullName: 'Jimmy Munyangabe',
  headline: 'Business Analyst & Quantitative Specialist | 1st Place CFA Local Research Challenge Winner',
  institution: 'Kepler College',
  degree: 'Bachelor of Science in Business Analytics',
  status: 'Business Analyst · Kepler College',
  email: 'munyangabej25@gmail.com',
  phone: '+250 791 837 351',
  location: 'Rwanda, Kigali',
  bioIntro: 'Motivated and detail-oriented Business Analyst with a Bachelor of Science in Business Analytics from Kepler College, with hands-on experience in field-based data collection, community engagement, and team coordination. Skilled in tracking performance, analyzing data, and turning insights into clear, evidence-based recommendations.',
  bioDetailed: [
    'I am a professional Business Analyst with a Bachelor of Science in Business Analytics from Kepler College. I bridge quantitative modeling with hands-on field operations, whether engineering interactive Power BI dashboards, building financial valuation models, or leading field-based data collection.',
    'Recently, I led my team to achieve 1st place at the local level in the CFA Institute Research Challenge (2025–2026), conducting in-depth company valuation, ratio analysis, and strategic investment presentations before senior industry judges.',
    'My professional experience includes supporting Monitoring, Evaluation, Accountability, and Learning (MEAL) at World Vision Rwanda, tracking student progress data at IEE Rwanda (TAP Project), and ensuring clinical data integrity with Save the Children at Mahama Refugee Camp Hospital. I also spearheaded a community giveback at GS Gasaka in Nyamagabe District, training 50 participants in digital skills, email communication, and higher education opportunities.'
  ],
  linkedinUrl: 'https://www.linkedin.com/in/jimmymunyangabe',
  githubUrl: 'https://github.com/jimmymunyangabe',
  stats: [
    { value: '1st Place', label: 'CFA Local Challenge', context: 'Financial modeling & equity valuation' },
    { value: '50', label: 'Community Beneficiaries', context: 'GS Gasaka Digital Literacy Initiative' },
    { value: '4+', label: 'Field & Analyst Engagements', context: 'World Vision, IEE, Save the Children' },
    { value: '3', label: 'Languages Spoken', context: 'Kinyarwanda, English, Kiswahili' }
  ]
};

export const initialProjects: ProjectCaseStudy[] = [
  {
    id: 'cfa-research-challenge',
    title: 'CFA Institute Research Challenge: Equity Valuation & Financial Modeling Dashboard',
    subtitle: '1st Place Local Level Winner — Financial Statement Analysis & Investment Valuation',
    category: 'finance',
    categoryLabel: 'Financial Modeling & Valuation',
    date: '2025 – 2026',
    featured: true,
    datasetSize: '5 Years of Financial Statements & Market Comparables',
    liveUrl: 'https://www.cfainstitute.org/en/societies/challenge',
    summary: 'Conducted rigorous financial statement analysis, discounted cash flow (DCF) modeling, and comparative multiple valuation for an industry target. Achieved 1st place at the local level for analytical precision, defensible valuation models, and executive pitch to a panel of investment judges.',
    problem: 'Evaluating investment potential and forecasting future earnings under macroeconomic uncertainty, requiring a defensible valuation model and sensitivity analysis for institutional investors.',
    approach: 'Built integrated three-statement financial models, performed multi-scenario DCF valuations, computed WACC and liquidity ratios, and synthesized findings into an executive dashboard and investment presentation.',
    tools: ['Power BI', 'Advanced Excel (Financial Modeling)', 'DCF Valuation', 'Python', 'Ratio Analysis', 'Sensitivity Tables'],
    impactMetrics: [
      { metric: '1st Place', label: 'Local Level CFA Challenge Winner', changeType: 'positive' },
      { metric: '3 Scenarios', label: 'Bull / Base / Bear Stress Testing', changeType: 'positive' },
      { metric: '100%', label: 'Panel Defense Approval', changeType: 'positive' }
    ],
    visualType: 'bar',
    chartData: [
      { label: 'DCF Intrinsic Valuation', value: 88, baseline: 75 },
      { label: 'Peer Multiples EV/EBITDA', value: 82, baseline: 70 },
      { label: 'Dividend Discount Model', value: 79, baseline: 72 },
      { label: 'Historical Book Value', value: 65, baseline: 65 }
    ],
    keyTakeaways: [
      'Engineered a financial model reconciling historical 5-year financials with forward cash flow forecasts.',
      'Presented findings clearly to a panel of seasoned finance professionals, defending valuation assumptions and terminal growth rates.',
      'Earned 1st place recognition locally for financial modeling, rigorous valuation, and strategic communication.'
    ]
  },
  {
    id: 'world-vision-meal',
    title: 'World Vision Rwanda: MEAL Programme Performance & Indicator Dashboard',
    subtitle: 'Monitoring, Evaluation, Accountability and Learning (MEAL) Data Quality & Reporting',
    category: 'meal',
    categoryLabel: 'Monitoring & Evaluation (MEAL)',
    date: 'July 2026 – Sept 2026',
    featured: true,
    datasetSize: 'Multi-Community Programme Beneficiary Records',
    summary: 'Cleaned and analysed community development programme data to support MEAL operations at World Vision Rwanda. Transformed raw spreadsheet logs into structured reports and dashboard views that empowered programme officers to make timely interventions.',
    problem: 'Field data gathered across varied regional programmes suffered from inconsistencies, formatting mismatches, and delayed reporting turnaround.',
    approach: 'Applied advanced Excel data validation, pivot table aggregations, and cleaning routines. Designed scannable summary trackers showing performance against quarterly project targets and flagged data anomalies.',
    tools: ['Power BI', 'Advanced Excel (Pivot Tables, Functions)', 'SQL Querying', 'Data Cleaning', 'Indicator Tracking'],
    impactMetrics: [
      { metric: '100%', label: 'Programme Data Quality Audited', changeType: 'positive' },
      { metric: '-40%', label: 'Reporting Turnaround Time', changeType: 'positive' },
      { metric: 'Zero', label: 'Critical Discrepancies in MEAL Reports', changeType: 'positive' }
    ],
    visualType: 'bar',
    chartData: [
      { label: 'Health & Nutrition Indicators', value: 96, baseline: 72 },
      { label: 'Child Protection Records', value: 98, baseline: 80 },
      { label: 'Community Livelihoods Data', value: 94, baseline: 76 },
      { label: 'Quarterly Output Verification', value: 99, baseline: 82 }
    ],
    keyTakeaways: [
      'Maintained high data integrity standards across multi-sector community initiatives.',
      'Collaborated closely with MEAL specialists to convert raw field data into actionable insights for leadership.',
      'Identified reporting bottlenecks early, facilitating proactive field corrections.'
    ]
  },
  {
    id: 'gs-gasaka-community-giveback',
    title: 'Community Uplift & Digital Literacy Dashboard: GS Gasaka',
    subtitle: 'Trained 50 Participants in Basic Computer Skills, Google Workspace & Higher Ed Pathways',
    category: 'community',
    categoryLabel: 'Community Leadership & Education',
    date: 'June 2026',
    featured: true,
    datasetSize: '50 Youth Beneficiaries (30 Senior Six & 20 High School Graduates)',
    summary: 'Personally conceived, planned, and implemented a community giveback initiative at former primary school GS Gasaka in Nyamagabe District. Trained 50 participants in digital literacy, Google Drive, professional email etiquette, and navigating university scholarships.',
    problem: 'Secondary school graduates in rural Nyamagabe District lacked basic computer literacy, email writing skills, and knowledge of available higher education and scholarship pathways.',
    approach: 'Designed a practical curriculum covering computer basics, professional Gmail writing, Google Drive collaboration, and MS Word. Mentored participants individually on university admissions and online opportunity portals.',
    tools: ['Streamlit / Dashboard Tracking', 'Google Workspace (Gmail, Drive)', 'MS Excel & Word', 'Curriculum Design', 'Youth Mentorship'],
    impactMetrics: [
      { metric: '50', label: 'Participants Trained & Mentored', changeType: 'positive' },
      { metric: '100%', label: 'Learners Created Professional Email', changeType: 'positive' },
      { metric: 'Awarded', label: 'Community Uplifter Certificate', changeType: 'positive' }
    ],
    visualType: 'bar',
    chartData: [
      { label: 'Email Creation & Etiquette', value: 50, baseline: 6 },
      { label: 'Google Drive Document Sharing', value: 48, baseline: 4 },
      { label: 'MS Word Document Formatting', value: 47, baseline: 11 },
      { label: 'Scholarship / College Navigation', value: 50, baseline: 8 }
    ],
    keyTakeaways: [
      'Mobilized community stakeholders and school administrators to host the training successfully.',
      'Equipped 50 youth with fundamental digital tools required for modern university applications and workplace communication.',
      'Recognized with official Community Uplifter certification for selfless civic engagement.'
    ]
  },
  {
    id: 'save-the-children-mahama',
    title: 'Mahama Refugee Camp Hospital: Clinical Laboratory Data Integrity',
    subtitle: 'Clinical records management & laboratory data quality assurance in humanitarian field setting',
    category: 'healthcare',
    categoryLabel: 'Field Operations & Health Data',
    date: 'Nov – Dec 2023',
    featured: false,
    datasetSize: 'Daily Outpatient & Inpatient Lab Encounters',
    summary: 'Assisted medical laboratory technicians at Save the Children Hospital in Mahama Refugee Camp, recording diagnostic test results and ensuring strict compliance with humanitarian clinical record-keeping standards.',
    problem: 'High daily patient volumes in a refugee camp clinic required meticulous tracking to prevent sample misidentification or delayed diagnostic results.',
    approach: 'Maintained standardized laboratory logbooks and digital records, cross-referencing patient IDs with specimen records and flagging anomalies for laboratory supervisors.',
    tools: ['Clinical Logbooks', 'Excel Data Entry & Validation', 'Record Integrity Protocols', 'Field Patient Verification'],
    impactMetrics: [
      { metric: '100%', label: 'Specimen-to-Record Match Accuracy', changeType: 'positive' },
      { metric: 'Daily', label: 'Real-Time Result Logging', changeType: 'positive' },
      { metric: 'Compliance', label: 'Met Humanitarian Quality Standards', changeType: 'positive' }
    ],
    visualType: 'bar',
    chartData: [
      { label: 'Hematology Records', value: 99, baseline: 90 },
      { label: 'Parasitology Logs', value: 98, baseline: 88 },
      { label: 'Emergency Triage Results', value: 100, baseline: 92 }
    ],
    keyTakeaways: [
      'Gained valuable firsthand experience operating in sensitive, fast-paced humanitarian field environments.',
      'Demonstrated high attention to detail in high-stakes clinical data entry and patient record confidentiality.'
    ]
  },
  {
    id: 'iee-rwanda-tap',
    title: 'IEE Rwanda (TAP Project): Academic Progress Tracking & Learning Analytics',
    subtitle: 'Analyzing progress data to diagnose learning gaps and tailor remediation',
    category: 'education',
    categoryLabel: 'Educational Progress Analytics',
    date: 'Jan 2024 – June 2024',
    featured: false,
    datasetSize: 'Cohort Learning Assessments',
    summary: 'As Teacher Assistant on the Teaching Assistant Preparation (TAP) Project with IEE Rwanda, monitored and analyzed student performance data to pinpoint learning gaps and provide structured recommendations to teachers.',
    problem: 'Educators struggled to track individual student comprehension across multi-week modules without structured data summaries.',
    approach: 'Organized and reviewed assessment results using spreadsheet tools, identifying specific subject concepts where learners needed reinforcement and generating structured progress reports.',
    tools: ['Microsoft Excel', 'Data Tracking & Analytics', 'Formative Assessment Analysis', 'Instructor Collaboration'],
    impactMetrics: [
      { metric: 'Weekly', label: 'Student Data Reviews Conducted', changeType: 'positive' },
      { metric: 'Evidence-Based', label: 'Actionable Teaching Recommendations', changeType: 'positive' },
      { metric: 'Improved', label: 'Targeted Student Learning Outcomes', changeType: 'positive' }
    ],
    visualType: 'bar',
    chartData: [
      { label: 'Baseline Assessment', value: 68, baseline: 60 },
      { label: 'Mid-Term Progress', value: 81, baseline: 65 },
      { label: 'Final Module Evaluation', value: 92, baseline: 70 }
    ],
    keyTakeaways: [
      'Helped teachers transition from subjective impressions to data-backed student evaluations.',
      'Coached learners needing individualized support based on quantitative assessment indicators.'
    ]
  }
];

export const initialSkills: SkillCategory[] = [
  {
    id: 'core-ba-tools',
    name: 'Primary Analytical & Business Intelligence Tools',
    description: 'Industry-standard analytics and BI platforms actively used for dashboarding, reporting, and modeling.',
    skills: [
      { name: 'Python', level: 'Advanced', experience: '3+ years', appliedIn: 'Data cleaning, Pandas, NumPy, Scikit-learn, exploratory analysis & automation' },
      { name: 'Power BI', level: 'Advanced', experience: '3 years', appliedIn: 'DAX measures, Power Query, dimensional data modeling, executive interactive dashboards' },
      { name: 'Advanced Excel', level: 'Advanced', experience: '4+ years', appliedIn: 'Pivot tables, complex nested formulas, financial modeling, what-if analysis, Solver' },
      { name: 'SQL', level: 'Advanced', experience: '3 years', appliedIn: 'Relational querying (PostgreSQL, MySQL), window functions, CTEs, joins, data extraction' },
      { name: 'Streamlit', level: 'Proficient', experience: '2 years', appliedIn: 'Building interactive Python web apps, fast data dashboard prototypes, predictive app interfaces' },
      { name: 'SPSS', level: 'Proficient', experience: '2 years', appliedIn: 'Statistical analysis, hypothesis testing, regression models, cross-tabulation, survey analytics' },
      { name: 'Big Data & Cloud Warehousing', level: 'Proficient', experience: '2 years', appliedIn: 'Google BigQuery, querying large-scale datasets, partitioning, schema optimization' },
      { name: 'Google Sheets', level: 'Advanced', experience: '3+ years', appliedIn: 'Collaborative data tracking, automated formula workflows, importrange, stakeholder sharing' }
    ]
  },
  {
    id: 'analytical-modeling',
    name: 'Analytical & Valuation Competencies',
    description: 'Financial modeling, quantitative problem solving, and evidence-based decision support.',
    skills: [
      { name: 'Financial Modeling & Valuation', level: 'Advanced', experience: '2+ years', appliedIn: 'Discounted Cash Flow (DCF), ratio analysis, equity research (1st Place CFA Winner)' },
      { name: 'Business Data Analysis', level: 'Advanced', experience: '3 years', appliedIn: 'Interpreting trends, operational variance, KPI formulation, executive storytelling' },
      { name: 'Structured Data Organization', level: 'Advanced', experience: '3 years', appliedIn: 'Record-keeping, data standardization, quality audits, operational support' },
      { name: 'Performance Tracking & Risk Flagging', level: 'Advanced', experience: '2+ years', appliedIn: 'Monitoring targets, early warning alerts, and informed management decision support' }
    ]
  },
  {
    id: 'leadership-field',
    name: 'Field Operations & Leadership',
    description: 'Planning initiatives, training participants, and executing reliably in field settings.',
    skills: [
      { name: 'Community Initiative Planning & Leadership', level: 'Advanced', experience: '2+ years', appliedIn: 'Planned & executed GS Gasaka digital skills giveback for 50 participants' },
      { name: 'Field Work & Independent Execution', level: 'Advanced', experience: '2+ years', appliedIn: 'Operating effectively in field environments (World Vision MEAL, Mahama Refugee Camp)' },
      { name: 'Relationship Building & Stakeholder Engagement', level: 'Advanced', experience: '3 years', appliedIn: 'Communicating with community members, school leaders, and multi-sector partners' },
      { name: 'Team Productivity & Quality Orientation', level: 'Advanced', experience: '3 years', appliedIn: 'Driving thoroughness, accurate record-keeping, and shared organizational goals' }
    ]
  },
  {
    id: 'languages-skills',
    name: 'Languages & Professional Communication',
    description: 'Multilingual fluency for seamless stakeholder communication across local and global teams.',
    skills: [
      { name: 'Kinyarwanda', level: 'Advanced', experience: 'Native', appliedIn: 'Native fluency in community dialogue, local stakeholder engagement' },
      { name: 'English', level: 'Advanced', experience: 'Fluent', appliedIn: 'Professional corporate, academic, presentation, and written fluency' },
      { name: 'Kiswahili', level: 'Proficient', experience: 'Conversational', appliedIn: 'Conversational communication across regional East African contexts' }
    ]
  }
];

export const initialExperience: ExperienceItem[] = [
  {
    id: 'exp-worldvision',
    role: 'MEAL Intern',
    organization: 'World Vision Rwanda',
    location: 'Rwanda',
    period: 'July 2026 – Sept 2026',
    isCurrent: false,
    type: 'Professional',
    description: 'Supported the Monitoring, Evaluation, Accountability, and Learning (MEAL) team with programme data cleaning, verification, and analytical reporting.',
    achievements: [
      'Cleaned and analysed programme data to support ongoing monitoring, evaluation, and reporting activities across initiatives.',
      'Utilized Microsoft Excel and data analysis techniques to organize, review, and interpret complex programme information.',
      'Collaborated closely with the MEAL team to elevate data quality standards and generate actionable insights for programme decision-making.'
    ],
    technologies: ['Microsoft Excel', 'Data Cleaning', 'MEAL Frameworks', 'Indicator Tracking', 'Reporting']
  },
  {
    id: 'exp-cfa',
    role: 'CFA Institute Research Challenge — Participant & 1st Place Winner',
    organization: 'Kepler College',
    location: 'Kigali, Rwanda',
    period: '2025 – 2026',
    isCurrent: false,
    type: 'Professional',
    description: 'Represented Kepler College in the global CFA Institute Research Challenge, conducting thorough company valuation and financial modeling.',
    achievements: [
      'Conducted in-depth company valuation and financial statement analysis, building multi-scenario financial models and performing comprehensive ratio analysis.',
      'Presented rigorous investment findings to an esteemed panel of senior finance and industry judges, demonstrating high analytical reasoning, teamwork, and executive presentation skills.',
      'Achieved 1st place at the local level, reflecting excellence in financial modeling, valuation, and strategic communication.'
    ],
    technologies: ['Financial Modeling', 'DCF Valuation', 'Ratio Analysis', 'Executive Presentation', 'Team Leadership']
  },
  {
    id: 'exp-iee',
    role: 'Teacher Assistant (TAP Project)',
    organization: 'IEE Rwanda (Inspiring Ethnic Education)',
    location: 'Kigali, Rwanda',
    period: 'Jan 2024 – June 2024',
    isCurrent: false,
    type: 'Academic',
    description: 'Served as Teacher Assistant on the TAP Project, monitoring learner progress metrics and collaborating with educators to enhance academic outcomes.',
    achievements: [
      'Monitored and analyzed student progress data to identify learning gaps and provide evidence-based recommendations to instructors.',
      'Collaborated with teachers to design measurable improvements to learning outcomes through structured data tracking and reporting.',
      'Facilitated academic remediation sessions targeting specific competency areas identified through performance data.'
    ],
    technologies: ['Student Progress Analytics', 'Structured Reporting', 'Collaborative Mentoring', 'Excel Tracking']
  },
  {
    id: 'exp-savechildren',
    role: 'Lab Assistant',
    organization: 'Save the Children – Hospital in Mahama Refugee Camp',
    location: 'Mahama Refugee Camp, Rwanda',
    period: 'Nov 2023 – Dec 2023',
    isCurrent: false,
    type: 'Professional',
    description: 'Assisted medical laboratory technicians with clinical data entry, diagnostic specimen documentation, and record-keeping integrity in a humanitarian setting.',
    achievements: [
      'Assisted lab technicians in accurately recording patient results and other clinical data, ensuring strict data integrity.',
      'Maintained adherence to standard operating procedures and healthcare compliance with record-keeping standards under high patient volume.',
      'Ensured patient confidentiality and organized physical and electronic laboratory logs for timely clinical care.'
    ],
    technologies: ['Clinical Data Entry', 'Record-Keeping Compliance', 'Data Integrity', 'Field Coordination']
  }
];

export const initialVolunteering = {
  role: 'Project Lead',
  projectTitle: 'Higher Education Opportunities Info Session and Basic Computer Skills',
  organization: 'GS Gasaka',
  location: 'Nyamagabe District, Rwanda',
  period: 'June 2026 (Ongoing impact)',
  beneficiaries: '50 Participants (30 Senior Six Students & 20 High School Graduates)',
  highlights: [
    'Planned, led, and implemented a community giveback initiative at former primary school GS Gasaka, directly reaching 50 ambitious youth.',
    'Facilitated hands-on basic computer skills training in professional email creation, Google Drive document management, and Microsoft Word formatting.',
    'Mentored participants individually and provided practical guidance on navigating higher education opportunities, university admissions, and scholarships.',
    'Awarded official recognition certificate as a Community Uplifter for driving local youth empowerment.'
  ]
};

export const initialCertifications: CertificationItem[] = [
  {
    id: 'cert-cfa-challenge',
    name: 'CFA Institute Research Challenge Certificate (1st Place Local Winner)',
    issuer: 'CFA Institute / CFA Society',
    issuedDate: '2025 – 2026',
    credentialId: 'CFA-RC-2026-LOC1',
    credentialUrl: 'https://www.cfainstitute.org/en/societies/challenge',
    status: 'Verified',
    skillsValidated: ['Financial Modeling', 'Company Valuation', 'Ratio Analysis', 'Equity Research', 'Executive Presentation'],
    description: 'Conferred for achieving 1st place at the local level in the CFA Institute Research Challenge 2025–2026. Recognizes excellence in in-depth company valuation, financial statement analysis, building valuation models, and presenting investment theses to industry judges.'
  },
  {
    id: 'cert-uofc-3rd',
    name: 'Certificate of Participation: 3rd Annual Conference',
    issuer: 'University of Calgary (Hosted by Andy Asare)',
    issuedDate: '2025 / 2026',
    credentialId: 'UCalgary-CONF-3RD-JM',
    credentialUrl: 'https://www.ucalgary.ca',
    status: 'Verified',
    skillsValidated: ['International Research', 'Academic Discourse', 'Business Innovation', 'Global Perspectives'],
    description: 'Awarded for active participation in the prestigious 3rd Annual Conference hosted by Andy Asare at the University of Calgary, contributing to high-level discussions on business analytics, leadership, and economic development.'
  },
  {
    id: 'cert-uofc-2nd',
    name: 'Certificate of Participation: 2nd Annual Conference',
    issuer: 'University of Calgary (Hosted by Andy Asare)',
    issuedDate: '2024 / 2025',
    credentialId: 'UCalgary-CONF-2ND-JM',
    credentialUrl: 'https://www.ucalgary.ca',
    status: 'Verified',
    skillsValidated: ['Academic Research', 'Quantitative Methods', 'Cross-Border Collaboration', 'Leadership'],
    description: 'Awarded for active participation in the 2nd Annual Conference hosted by Andy Asare at the University of Calgary, engaging with international scholars and practitioners.'
  },
  {
    id: 'cert-community-uplifter',
    name: 'Community Uplifter Recognition Certificate',
    issuer: 'GS Gasaka & Community Partners (Nyamagabe District)',
    issuedDate: 'June 2026',
    credentialId: 'GSG-UPLIFT-2026-JM',
    credentialUrl: undefined,
    status: 'Verified',
    skillsValidated: ['Community Leadership', 'Computer Skills Training', 'Youth Mentorship', 'Google Drive & Gmail', 'Social Giveback'],
    description: 'Recognized as an outstanding Community Uplifter for personally planning and implementing a community giveback training 50 participants (30 Senior Six and 20 graduates) at GS Gasaka on computer literacy, Google Drive, email etiquette, and higher education opportunities.'
  }
];

export const educationHistory = [
  {
    institution: 'Kepler College Kigali, Through Kepler',
    location: 'Kigali, Rwanda',
    degree: 'Bachelor of Science in Business Analytics',
    period: 'May 2024 – Present',
    current: true,
    highlights: 'Rigorous quantitative curriculum in business data analysis, database querying (SQL), financial modeling, dashboard engineering, and operational performance metrics.'
  },
  {
    institution: 'Collège Saint André, Nyamirambo',
    location: 'Kigali, Rwanda',
    degree: 'Mathematics-Physics-Computer Science / Advanced Certificate (A2)',
    period: '2020 – 2023',
    current: false,
    highlights: 'Solid quantitative and computing foundation in advanced mathematics, physics, and computer science principles.'
  },
  {
    institution: 'Groupe Scolaire Saint Joseph Kabgayi',
    location: 'Muhanga, Rwanda',
    degree: 'O-Level Certificate',
    period: '2017 – 2019',
    current: false,
    highlights: 'Distinguished secondary education with strong foundational performance across sciences and humanities.'
  }
];
