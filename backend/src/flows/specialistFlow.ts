import { FlowStep } from "./proposalFlow";

export const specialistSteps: FlowStep[] = [
  {
    message:
      "Perfeito! Vou entender melhor o momento da sua empresa.\n\nQual é o maior desafio da sua empresa hoje?\n\n1️⃣ Processos manuais\n2️⃣ Falta de organização\n3️⃣ Sistemas não integrados\n4️⃣ Dificuldade de escalar",
    dataKey: "maiorDesafio",
  },
  {
    message: "Você usa algum sistema hoje? Se sim, qual?",
    dataKey: "sistemaAtual",
  },
  {
    message: "Quanto tempo aproximadamente é gasto nesse processo por semana?",
    dataKey: "tempoGasto",
  },
  {
    message: "Qual resultado você mais deseja melhorar?",
    dataKey: "resultadoDesejado",
  },
];

export function getSpecialistSummary(data: Record<string, string>): string {
  return `📋 *Resumo do cliente*

🔹 *Maior desafio:* ${data.maiorDesafio || "Não informado"}
🔹 *Sistema atual:* ${data.sistemaAtual || "Não informado"}
🔹 *Tempo gasto:* ${data.tempoGasto || "Não informado"}
🔹 *Resultado desejado:* ${data.resultadoDesejado || "Não informado"}

💡 Empresas com processos manuais costumam perder tempo, dinheiro e ter retrabalho. A automação e digitalização são passos essenciais para escalar.

Agora vou te encaminhar para um especialista que vai te ajudar com a melhor solução. 🚀`;
}
