export interface UserCardItem {
  logo: string | React.ReactNode;
  label: string;
  value: string;
}

export interface UserCardSocialIcon {
  icon: React.ReactNode;
  url?: string;
}

export interface UserCardExternalLink {
  icon?: React.ReactNode;
  text: string;
  url: string;
}

export interface UserCardData {
  firstName: string;
  lastName: string;
  username?: string;
  avatarUrl: string;
  bannerUrl?: string;
  bannerFallback?: string;
  description: string;
  bio?: string;
  location?: string;
  websiteUrl?: string;
  socialIcons?: UserCardSocialIcon[];
  items?: UserCardItem[];
  externalLink?: UserCardExternalLink;
  verified?: boolean;
  joinedDate?: string;
  following?: number;
  followers?: number;
  tagline?: string;
}

export type UserCardVariant = "linkedin" | "twitter";
export type ThemeVariant = "light" | "dark";

