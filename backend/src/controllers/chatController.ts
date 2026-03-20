import {
  getSession,
  createSession,
  advanceStep,
  saveAnswer,
  deleteSession,
} from "../services/conversationService";
import { sendMessage } from "../services/whatsappService";
import { detectFlow, FlowType } from "../utils/intentMapper";
import { proposalSteps, getProposalSummary } from "../flows/proposalFlow";
import { specialistSteps, getSpecialistSummary } from "../flows/specialistFlow";
import { projectSteps, getProjectSummary } from "../flows/projectFlow";
import { FlowStep } from "../flows/proposalFlow";

function getFlowConfig(flow: FlowType): {
  steps: FlowStep[];
  getSummary: (data: Record<string, string>) => string;
} {
  switch (flow) {
    case "proposta":
      return { steps: proposalSteps, getSummary: getProposalSummary };
    case "especialista":
      return { steps: specialistSteps, getSummary: getSpecialistSummary };
    case "projeto":
      return { steps: projectSteps, getSummary: getProjectSummary };
  }
}

export async function handleIncomingMessage(
  phoneNumber: string,
  text: string
): Promise<void> {
  let session = getSession(phoneNumber);

  // Sem sessão ativa — tentar detectar fluxo
  if (!session) {
    const flow = detectFlow(text);

    if (!flow) {
      await sendMessage(
        phoneNumber,
        "Olá! 👋 Como posso te ajudar?\n\nDigite:\n1️⃣ *proposta* — para solicitar uma proposta\n2️⃣ *especialista* — para falar com um especialista\n3️⃣ *projeto* — para iniciar um projeto"
      );
      return;
    }

    session = createSession(phoneNumber, flow);
    const { steps } = getFlowConfig(flow);

    // Enviar primeira pergunta (step 0)
    await sendMessage(phoneNumber, steps[0].message);
    advanceStep(phoneNumber);
    return;
  }

  // Sessão ativa — processar resposta
  const { steps, getSummary } = getFlowConfig(session.flow);
  const currentStepIndex = session.step - 1;

  // Salvar resposta do step anterior
  if (currentStepIndex >= 0 && currentStepIndex < steps.length) {
    saveAnswer(phoneNumber, steps[currentStepIndex].dataKey, text);
  }

  // Verificar se há próxima pergunta
  if (session.step < steps.length) {
    await sendMessage(phoneNumber, steps[session.step].message);
    advanceStep(phoneNumber);
    return;
  }

  // Fluxo finalizado — enviar resumo
  const updatedSession = getSession(phoneNumber);
  if (updatedSession) {
    const summary = getSummary(updatedSession.data);
    await sendMessage(phoneNumber, summary);
    deleteSession(phoneNumber);
  }
}
