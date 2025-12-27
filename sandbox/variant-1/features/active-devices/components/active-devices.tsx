"use client";

import React, { useState, useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowsClockwise,
  Monitor,
  SignOut,
  Trash,
  XCircle,
  Prohibit,
  DeviceMobile,
  DeviceTablet,
  Laptop,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ActiveDevicesProps } from "../types";

function getDeviceIcon(device: string) {
  const deviceLower = device.toLowerCase();
  if (deviceLower.includes("mobile") || deviceLower.includes("phone")) {
    return DeviceMobile;
  } else if (deviceLower.includes("tablet")) {
    return DeviceTablet;
  } else if (
    deviceLower.includes("macintosh") ||
    deviceLower.includes("laptop")
  ) {
    return Laptop;
  } else {
    return Monitor;
  }
}

async function defaultGetLocationFromIP(ipAddress: string): Promise<string> {
  if (
    !ipAddress ||
    ipAddress === "Unknown" ||
    ipAddress === "127.0.0.1" ||
    ipAddress === "Local"
  ) {
    return "";
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 3000);

  try {
    const response = await fetch(`https://ipapi.co/${ipAddress}/json/`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status === 429) {
      throw new Error("Rate limited");
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    const parts: string[] = [];
    if (data.city) parts.push(data.city);
    if (data.region) parts.push(data.region);
    if (data.country_name) parts.push(data.country_name);

    return parts.length > 0 ? parts.join(", ") : "";
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sessionInfo: string;
  isCurrentSession: boolean;
}

function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  sessionInfo,
  isCurrentSession,
}: DeleteConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Revoke Session</DialogTitle>
          <DialogDescription>
            Are you sure you want to revoke this session? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">{sessionInfo}</p>
          {isCurrentSession && (
            <p className="text-xs text-muted-foreground mt-2">
              This is your current session. You will be logged out.
            </p>
          )}
        </div>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            <XCircle size={16} className="mr-2" />
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            <Prohibit size={16} className="mr-2" />
            Revoke Session
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ActiveDevices({
  adapter,
  sessions: propSessions,
  isLoading: propIsLoading,
  onDeleteSession,
  onSetActiveSession,
  onSignOut,
  onNavigate,
  maxSessions = 5,
  className,
  showLocation = true,
  getLocationFromIP = defaultGetLocationFromIP,
}: ActiveDevicesProps) {
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSettingActive, setIsSettingActive] = useState(false);

  const sessions = useMemo(
    () => adapter?.sessions || propSessions || [],
    [adapter?.sessions, propSessions]
  );
  const isLoading = adapter?.isLoading ?? propIsLoading ?? false;

  const sessionToDeleteInfo = sessions.find((s) => s.token === sessionToDelete);

  const deleteSession = adapter?.deleteSession || onDeleteSession;
  const setActiveSession = adapter?.setActiveSession || onSetActiveSession;
  const signOut = adapter?.onSignOut || onSignOut;
  const navigate = adapter?.onNavigate || onNavigate;

  const uniqueIPs = useMemo(() => {
    return Array.from(
      new Set(
        sessions
          .map((s) => s.ipAddress)
          .filter(
            (ip) =>
              ip && ip !== "Unknown" && ip !== "127.0.0.1" && ip !== "Local"
          )
      )
    );
  }, [sessions]);

  const locationData = useQuery({
    queryKey: ["ip-locations", uniqueIPs],
    queryFn: async () => {
      const locations: Record<string, string> = {};
      await Promise.all(
        uniqueIPs.map(async (ip: string) => {
          try {
            const location = await getLocationFromIP(ip);
            if (location) {
              locations[ip] = location;
            }
          } catch {
            // Ignore errors
          }
        })
      );
      return locations;
    },
    enabled: uniqueIPs.length > 0 && showLocation,
    staleTime: 1000 * 60 * 60,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message === "Rate limited") {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });

  const getLocationForSession = (ipAddress: string) => {
    return locationData.data?.[ipAddress] || "";
  };

  const handleDeleteSession = async () => {
    if (!sessionToDelete || !deleteSession) return;

    const session = sessions.find((s) => s.token === sessionToDelete);
    const isRevokingCurrent = session?.isCurrent ?? false;

    setIsDeleting(true);
    try {
      await deleteSession(sessionToDelete);
      setSessionToDelete(null);

      if (isRevokingCurrent && signOut) {
        try {
          await signOut();
        } finally {
          if (navigate) {
            navigate("/log-in");
          } else {
            window.location.href = "/log-in";
          }
        }
      }
    } catch (error) {
      console.error("Failed to delete session:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSetActiveSession = async (sessionToken: string) => {
    if (!setActiveSession) return;

    setIsSettingActive(true);
    try {
      await setActiveSession(sessionToken);
    } catch (error) {
      console.error("Failed to set active session:", error);
    } finally {
      setIsSettingActive(false);
    }
  };

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Active Devices</CardTitle>
          </div>
          <CardDescription>
            Manage your active sessions and devices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Active Sessions
                </h3>
              </div>
              {!isLoading && (
                <Badge className="bg-muted text-foreground font-mono text-xs sm:text-sm">
                  {sessions.length} / {maxSessions}
                </Badge>
              )}
            </div>
            <div className="space-y-4">
              {isLoading ? (
                <>
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg"
                    >
                      <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                        <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg shrink-0" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-48" />
                          <Skeleton className="h-3 w-40" />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end sm:justify-start">
                        <Skeleton className="h-8 w-16 sm:h-9 sm:w-20 rounded" />
                        <Skeleton className="h-8 w-8 sm:h-9 sm:w-9 rounded" />
                      </div>
                    </div>
                  ))}
                </>
              ) : sessions.length > 0 ? (
                sessions.map((session) => {
                  const DeviceIcon = getDeviceIcon(session.device);
                  const location = getLocationForSession(session.ipAddress);

                  return (
                    <div
                      key={session.id}
                      className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="p-2 sm:p-3 bg-muted rounded-lg shrink-0">
                          <DeviceIcon className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-medium text-foreground text-sm sm:text-base">
                                {session.device}
                              </p>
                              {session.isCurrent && (
                                <Badge className="bg-green-100 dark:bg-green-950/30 text-green-800 dark:text-green-300 text-xs">
                                  Current Device
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground wrap-break-word">
                            {session.browser} -{" "}
                            {session.ipAddress === "127.0.0.1" ||
                            session.location === "Local"
                              ? "Local"
                              : `${session.ipAddress}${location ? ` - ${location}` : ""}`}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDistanceToNow(new Date(session.updatedAt), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 sm:gap-2 justify-end sm:justify-start">
                        {!session.isCurrent && setActiveSession && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleSetActiveSession(session.token)
                            }
                            disabled={isSettingActive}
                            className="text-xs px-2 sm:px-3 h-8 sm:h-9"
                          >
                            <ArrowsClockwise size={12} className="mr-1" />
                            <span className="hidden sm:inline">Switch</span>
                            <span className="sm:hidden">Switch</span>
                          </Button>
                        )}
                        {deleteSession && (
                          <Button
                            variant={
                              session.isCurrent ? "destructive" : "ghost"
                            }
                            size={session.isCurrent ? "sm" : "icon"}
                            onClick={() => setSessionToDelete(session.token)}
                            disabled={isDeleting}
                            className={
                              session.isCurrent
                                ? "bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white font-semibold h-8 sm:h-9 px-3"
                                : "h-8 w-8 sm:h-9 sm:w-9"
                            }
                          >
                            {session.isCurrent ? (
                              <>
                                <SignOut size={16} className="mr-1" />
                                <span className="text-xs sm:text-sm">
                                  Log Out
                                </span>
                              </>
                            ) : (
                              <Trash
                                size={16}
                                className="text-muted-foreground hover:text-destructive"
                              />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Monitor className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No active sessions</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        isOpen={!!sessionToDelete}
        onClose={() => setSessionToDelete(null)}
        onConfirm={handleDeleteSession}
        sessionInfo={
          sessionToDeleteInfo
            ? `${sessionToDeleteInfo.device} - ${sessionToDeleteInfo.browser}`
            : ""
        }
        isCurrentSession={sessionToDeleteInfo?.isCurrent ?? false}
      />
    </>
  );
}
