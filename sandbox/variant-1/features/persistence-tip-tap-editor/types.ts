export type PersistenceType = "localStorage" | "zustand" | "tanstack-store";

export interface SaveStatus {
  hasUnsavedChanges: boolean;
  lastSaved: Date | null;
  isSaving: boolean;
}

export interface PersistenceTipTapEditorProps {
  content?: string;
  onContentChange?: (content: string) => void;
  onSave?: (content: string) => Promise<void>;
  placeholder?: string;
  saveStatus?: SaveStatus;
  storageKey?: string;
  persistenceType?: PersistenceType;
  debounceMs?: number;
  className?: string;
  autoSave?: boolean;
  showToolbar?: boolean;
  editable?: boolean;
}
