import { Router, Request, Response } from "express";
import { handleIncomingMessage } from "../controllers/chatController";

export const webhookRouter = Router();

// Verificação do webhook (GET)
webhookRouter.get("/", (req: Request, res: Response) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log("Webhook verificado com sucesso.");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Receber mensagens (POST)
webhookRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    if (
      body.object === "whatsapp_business_account" &&
      body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]
    ) {
      const message = body.entry[0].changes[0].value.messages[0];
      const phoneNumber = message.from;
      const text = message.text?.body?.toLowerCase().trim() || "";

      await handleIncomingMessage(phoneNumber, text);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Erro no webhook:", error);
    res.sendStatus(500);
  }
});
