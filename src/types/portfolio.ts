export interface ProjectImpact {
  metric: string;
  label: string;
  changeType: 'positive' | 'neutral';
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: 'finance' | 'meal' | 'community' | 'education' | 'healthcare';
  categoryLabel: string;
  date: string;
  summary: string;
  problem: string;
  approach: string;
  tools: string[];
  impactMetrics: ProjectImpact[];
  visualType: 'bar' | 'line' | 'funnel' | 'pie';
  chartData: { label: string; value: number; baseline?: number }[];
  keyTakeaways: string[];
  datasetSize?: string;
  featured?: boolean;
  imageUrl?: string;
  imageName?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    level: 'Advanced' | 'Proficient' | 'Familiar';
    experience: string;
    appliedIn: string;
    iconName?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  type: 'Professional' | 'Leadership' | 'Academic';
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issuedDate: string;
  credentialId: string;
  credentialUrl?: string;
  skillsValidated: string[];
  description: string;
  status: 'Verified' | 'Completed' | 'In Progress';
  uploadedFileUrl?: string;
  uploadedFileName?: string;
  uploadedFileType?: string;
}

export interface UserProfile {
  fullName: string;
  headline: string;
  institution: string;
  degree: string;
  status: string;
  email: string;
  phone: string;
  location: string;
  bioIntro: string;
  bioDetailed: string[];
  linkedinUrl: string;
  githubUrl: string;
  customPhotoUrl?: string;
  uploadedResumeUrl?: string;
  uploadedResumeName?: string;
  uploadedResumeType?: string;
  stats: {
    value: string;
    label: string;
    context: string;
  }[];
}
