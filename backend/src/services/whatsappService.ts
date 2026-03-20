import axios from "axios";

const API_URL = process.env.WHATSAPP_API_URL || "https://graph.facebook.com/v18.0";
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || "";
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || "";

export async function sendMessage(to: string, text: string): Promise<void> {
  try {
    await axios.post(
      `${API_URL}/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: text },
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`Mensagem enviada para ${to}`);
  } catch (error: any) {
    console.error("Erro ao enviar mensagem:", error.response?.data || error.message);
  }
}
