import Pusher from "pusher-js";
import type { ChatMessage } from "./types/ChatMessage.type";

function parseData(data: any): ChatMessage {
  // Eğer data zaten bir obje ise, içindeki 'data' string'ini parse et
  if (typeof data === "object" && data.data) {
    return JSON.parse(data.data);
  }
  // Eğer data bir string ise direkt parse et
  if (typeof data === "string") {
    return JSON.parse(data);
  }
  // Zaten parse edilmişse olduğu gibi dön
  return data;
}

const pusher = new Pusher("32cbd69e4b950bf97679", {
  cluster: "us2",
  forceTLS: true,
  enabledTransports: ["ws", "wss"],
});

pusher.connection.bind("connected", () => {
  console.log("✅ Pusher connection established.");
});

pusher.connection.bind("error", (err: any) => {
  console.error("❌ Pusher connection error:", err);
});

const channel = pusher.subscribe("chatrooms.25461130.v2");

channel.bind("App\\Events\\ChatMessageEvent", (data: any) => {
  try {
    const parsed: ChatMessage = parseData(data);

    console.log("💬 New Message:");
    console.log("  User:", parsed.sender.username);
    console.log("  Message:", parsed.content);
    console.log("  Time:", parsed.created_at);
    console.log("  Color:", parsed.sender.identity.color);
    console.log("  Badges:", parsed.sender.identity.badges);
   // console.log("  Full data:", parsed);
  } catch (err) {
    console.error("❌ Parse error:", err);
    console.log("💬 Message (raw):", data);
  }
});

// channel.bind_global((eventName: string, data: any) => {
//   console.log("🌐 Event:", eventName, "\nData:", data);
// });
