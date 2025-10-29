import Pusher from "pusher-js";

const pusher = new Pusher("32cbd69e4b950bf97679", {
  cluster: "us2", // connection region
  forceTLS: true, // use wss://
  enabledTransports: ["ws", "wss"],
});

pusher.connection.bind("connected", () => {
  console.log("✅ Pusher connection established.");
});

pusher.connection.bind("error", (err: any) => {
  console.error("❌ Pusher connection error:", err);
});

// subscribe to channel (chatroom id coming from: https://kick.com/api/v2/channels/wtcn/chatroom)
// 'wtcn' is streamer username
const channel = pusher.subscribe("chatrooms.1000890.v2");

channel.bind("App\\Events\\ChatMessageEvent", (data: any) => {
  try {
    const parsed = typeof data === "string" ? JSON.parse(data) : data;
    console.log("💬 New Message: ", parsed);
  } catch (err) {
    console.log("💬 Message (raw):", data);
  }
});

channel.bind_global((eventName: string, data: any) => {
  console.log("🌐 Event:", eventName, "\nData:", data);
});
