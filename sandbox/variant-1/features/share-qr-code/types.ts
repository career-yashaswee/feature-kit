export interface ShareQRCodeProps {
  url: string;
  username?: string;
  title?: string;
  description?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

