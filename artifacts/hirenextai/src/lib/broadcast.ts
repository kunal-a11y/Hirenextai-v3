export type BroadcastAudience = "all" | "job_seeker" | "recruiter";

export interface InAppBroadcast {
  id: string;
  title: string;
  message: string;
  audience: BroadcastAudience;
  durationMs: number;
  dismissible: boolean;
  createdAt: string;
}

const KEY = "hirenext_in_app_broadcast";

export function publishBroadcast(payload: Omit<InAppBroadcast, "id" | "createdAt">) {
  const item: InAppBroadcast = {
    ...payload,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(KEY, JSON.stringify(item));
  window.dispatchEvent(new CustomEvent("hirenext:broadcast", { detail: item }));
}

export function readLatestBroadcast(): InAppBroadcast | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as InAppBroadcast;
  } catch {
    return null;
  }
}

export function canUserSeeBroadcast(audience: BroadcastAudience, role?: string | null) {
  if (audience === "all") return true;
  if (audience === "recruiter") return role === "recruiter";
  return role === "job_seeker" || role === "user";
}
