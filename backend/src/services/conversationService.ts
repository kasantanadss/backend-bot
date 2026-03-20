import { FlowType } from "../utils/intentMapper";

export interface Session {
  step: number;
  flow: FlowType;
  data: Record<string, string>;
}

const sessions: Record<string, Session> = {};

export function getSession(phoneNumber: string): Session | null {
  return sessions[phoneNumber] || null;
}

export function createSession(phoneNumber: string, flow: FlowType): Session {
  sessions[phoneNumber] = {
    step: 0,
    flow,
    data: {},
  };
  return sessions[phoneNumber];
}

export function updateSession(
  phoneNumber: string,
  updates: Partial<Session>
): Session {
  if (!sessions[phoneNumber]) {
    throw new Error("Sessão não encontrada");
  }
  sessions[phoneNumber] = { ...sessions[phoneNumber], ...updates };
  return sessions[phoneNumber];
}

export function advanceStep(phoneNumber: string): Session {
  if (!sessions[phoneNumber]) {
    throw new Error("Sessão não encontrada");
  }
  sessions[phoneNumber].step += 1;
  return sessions[phoneNumber];
}

export function saveAnswer(
  phoneNumber: string,
  key: string,
  value: string
): void {
  if (!sessions[phoneNumber]) {
    throw new Error("Sessão não encontrada");
  }
  sessions[phoneNumber].data[key] = value;
}

export function deleteSession(phoneNumber: string): void {
  delete sessions[phoneNumber];
}
