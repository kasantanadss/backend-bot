export interface FlowStep {
  message: string;
  dataKey: string;
}

export const proposalSteps: FlowStep[] = [
  {
    message:
      "Ótimo! Vou fazer algumas perguntas rápidas para entender seu projeto.\n\nQue tipo de solução você precisa?\n\n1️⃣ Sistema web\n2️⃣ Plataforma digital\n3️⃣ Automação de processos\n4️⃣ Site ou aplicação",
    dataKey: "tipoSolucao",
  },
  {
    message: "Qual problema você deseja resolver?",
    dataKey: "problema",
  },
  {
    message: "Hoje esse processo é manual ou já usa algum sistema?",
    dataKey: "processoAtual",
  },
  {
    message: "Qual impacto esse problema gera hoje?",
    dataKey: "impacto",
  },
];

export function getProposalSummary(data: Record<string, string>): string {
  return `📋 *Resumo do cliente*

🔹 *Necessidade principal:* ${data.tipoSolucao || "Não informado"}
🔹 *Problema identificado:* ${data.problema || "Não informado"}
🔹 *Processo atual:* ${data.processoAtual || "Não informado"}
🔹 *Impacto:* ${data.impacto || "Não informado"}

💡 Empresas com processos manuais costumam perder tempo, dinheiro e ter retrabalho. A automação e digitalização são passos essenciais para escalar.

Agora vou te encaminhar para um especialista que vai te ajudar com a melhor solução. 🚀`;
}
