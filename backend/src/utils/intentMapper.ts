export type FlowType = "proposta" | "especialista" | "projeto";

export function detectFlow(message: string): FlowType | null {
  const normalized = message.toLowerCase().trim();

  if (normalized.includes("proposta")) return "proposta";
  if (normalized.includes("especialista")) return "especialista";
  if (normalized.includes("projeto")) return "projeto";

  return null;
}
