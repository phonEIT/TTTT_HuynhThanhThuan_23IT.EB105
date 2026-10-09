import axios from "axios";
import { getToken } from "./AuthService";

class ChatBotService {
  constructor() {
    this.API_URL = "http://localhost:8080/thietbi247/api";
  }

  // Gửi tin nhắn text
  async sendChatMessage(message) {
    try {
      const token = getToken();
      const res = await axios.post(
        `${this.API_URL}/chat_AI`,
        { message }
      );

      const replyText =
        res.data?.data?.message || res.data?.message || "Bot không phản hồi";
      return { reply: replyText };
    } catch (error) {
      console.error("❌ Lỗi gửi tin nhắn chatbot:", error);
      throw error;
    }
  }

  // Gửi ảnh + tin nhắn
  async sendChatWithImage(formData) {
    try {
      const res = await axios.post(`${this.API_URL}/chat_AI`, formData);

      const replyText =
        res.data?.data?.message || res.data?.message || "Bot không phản hồi";
      return { reply: replyText };
    } catch (error) {
      console.error("❌ Lỗi gửi ảnh chatbot:", error);
      throw error;
    }
  }
}

export default new ChatBotService();
