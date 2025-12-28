/**
 * Converts a status badge string to a standardized status type
 * @param statusBadge - The status badge string (e.g., "new", "updated", "maintenance")
 * @returns The standardized status type or null if no badge is provided
 */
export function getStatusFromBadge(
  statusBadge?: string,
): "online" | "offline" | "maintenance" | "degraded" | null {
  if (!statusBadge) return null;
  const badgeLower = statusBadge.toLowerCase();
  if (
    badgeLower === "new" ||
    badgeLower === "updated" ||
    badgeLower === "fixed"
  ) {
    return "online";
  }
  if (badgeLower === "maintenance") {
    return "maintenance";
  }
  if (badgeLower === "degraded" || badgeLower === "deprecated") {
    return "degraded";
  }
  if (badgeLower === "offline") {
    return "offline";
  }
  return "online";
}
