import { FlowStep } from "./proposalFlow";

export const projectSteps: FlowStep[] = [
  {
    message:
      "Excelente! Vamos entender seu projeto.\n\nQual o tipo de projeto?\n\n1️⃣ Sistema\n2️⃣ Plataforma\n3️⃣ Automação\n4️⃣ Aplicação web",
    dataKey: "tipoProjeto",
  },
  {
    message: "Esse projeto é para uso interno ou para seus clientes?",
    dataKey: "usoDestino",
  },
  {
    message:
      "Qual é o objetivo principal?\n\n1️⃣ Aumentar vendas\n2️⃣ Organizar processos\n3️⃣ Automatizar tarefas\n4️⃣ Escalar o negócio",
    dataKey: "objetivoPrincipal",
  },
];

export function getProjectSummary(data: Record<string, string>): string {
  return `📋 *Resumo do cliente*

🔹 *Tipo de projeto:* ${data.tipoProjeto || "Não informado"}
🔹 *Uso:* ${data.usoDestino || "Não informado"}
🔹 *Objetivo principal:* ${data.objetivoPrincipal || "Não informado"}

💡 Empresas com processos manuais costumam perder tempo, dinheiro e ter retrabalho. A automação e digitalização são passos essenciais para escalar.

Agora vou te encaminhar para um especialista que vai te ajudar com a melhor solução. 🚀`;
}
