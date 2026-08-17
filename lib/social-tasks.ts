// Social task abstraction layer.
//
// There is no live X API integration in this build (no credentials yet), so
// task completion here is SELF-REPORTED: the user opens the real task URL,
// then explicitly confirms they did it. The UI must disclose this (see
// TaskCard) — a click never silently becomes "verified".
//
// `RemoteApiProvider` is the real integration path: point
// NEXT_PUBLIC_VERIFY_TASK_ENDPOINT at a backend that actually checks the X
// API, then swap `activeProvider` below to use it. Nothing else in the app
// needs to change — components only ever call `activeProvider.verify()`.

import { links } from "./content";

export type SocialTaskType = "follow" | "like" | "comment" | "repost";

export type SocialTaskStatus = "locked" | "available" | "verifying" | "completed" | "error";

export interface SocialTaskDefinition {
  id: string;
  type: SocialTaskType;
  label: string;
  description: string;
  actionLabel: string;
  url: string;
  required: boolean;
  enabled: boolean;
}

export interface VerifyResult {
  status: "completed" | "error";
  message?: string;
  selfReported: boolean;
}

export interface SocialTaskProvider {
  name: string;
  verify(task: SocialTaskDefinition): Promise<VerifyResult>;
}

class SelfReportProvider implements SocialTaskProvider {
  name = "self-report";
  async verify(_task: SocialTaskDefinition): Promise<VerifyResult> {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return { status: "completed", selfReported: true };
  }
}

class RemoteApiProvider implements SocialTaskProvider {
  name = "remote-api";
  constructor(private endpoint: string) {}

  async verify(task: SocialTaskDefinition): Promise<VerifyResult> {
    if (!this.endpoint) {
      return {
        status: "error",
        selfReported: false,
        message: "Verification endpoint is not configured yet.",
      };
    }
    try {
      const res = await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId: task.id, taskType: task.type }),
      });
      if (!res.ok) {
        return { status: "error", selfReported: false, message: `Verification failed (${res.status}).` };
      }
      const data = (await res.json()) as { verified?: boolean; message?: string };
      return {
        status: data.verified ? "completed" : "error",
        selfReported: false,
        message: data.message,
      };
    } catch {
      return { status: "error", selfReported: false, message: "Could not reach the verification service." };
    }
  }
}

const verifyEndpoint = process.env.NEXT_PUBLIC_VERIFY_TASK_ENDPOINT ?? "";

// Swap to `remoteProvider` once a real X-API-backed verification service exists.
export const activeProvider: SocialTaskProvider = new SelfReportProvider();
export const remoteProvider: SocialTaskProvider = new RemoteApiProvider(verifyEndpoint);

// Toggle tasks on/off here without touching any component.
export const socialTasks: SocialTaskDefinition[] = [
  {
    id: "follow",
    type: "follow",
    label: "FOLLOW",
    description: "Follow Minihood on X.",
    actionLabel: "FOLLOW",
    url: links.twitter,
    required: true,
    enabled: true,
  },
  {
    id: "like",
    type: "like",
    label: "LIKE",
    description: "Like the pinned Minihood post.",
    actionLabel: "LIKE",
    url: links.twitter,
    required: true,
    enabled: true,
  },
  {
    id: "comment",
    type: "comment",
    label: "COMMENT",
    description: "Comment on the pinned Minihood post.",
    actionLabel: "COMMENT",
    url: links.twitter,
    required: true,
    enabled: true,
  },
  {
    id: "repost",
    type: "repost",
    label: "REPOST",
    description: "Repost the pinned Minihood post.",
    actionLabel: "REPOST",
    url: links.twitter,
    required: false,
    enabled: true,
  },
];
