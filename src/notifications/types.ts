import type { TSeverity } from "../constants/Cgeneral";

export type TNotification = {
  id: string;
  message: string;
  severity: TSeverity;
  timestamp: number;
};

export type TNotificationState = {
  notifications: TNotification[];
  config: {
    autoHideDuration: number;
    maxNotifications: number;
    spacing: number;
    position: {
      vertical: "top" | "bottom";
      horizontal: "left" | "center" | "right";
    };
  };
};
