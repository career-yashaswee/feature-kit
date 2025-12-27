export interface Session {
  id: string;
  token: string;
  device: string;
  browser: string;
  ipAddress: string;
  location?: string;
  updatedAt: string;
  isCurrent: boolean;
}

export interface ActiveDevicesAdapter {
  sessions: Session[];
  isLoading: boolean;
  deleteSession: (sessionToken: string) => Promise<void>;
  setActiveSession: (sessionToken: string) => Promise<void>;
  onSignOut?: () => Promise<void>;
  onNavigate?: (path: string) => void;
}

export interface ActiveDevicesProps {
  adapter?: ActiveDevicesAdapter;
  sessions?: Session[];
  isLoading?: boolean;
  onDeleteSession?: (sessionToken: string) => Promise<void>;
  onSetActiveSession?: (sessionToken: string) => Promise<void>;
  onSignOut?: () => Promise<void>;
  onNavigate?: (path: string) => void;
  maxSessions?: number;
  className?: string;
  showLocation?: boolean;
  getLocationFromIP?: (ipAddress: string) => Promise<string>;
}
