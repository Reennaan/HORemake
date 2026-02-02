import * as Ably from "ably";
import { useEffect, useState } from "react";

export default function AblyChat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const ably = new Ably.Realtime({
      token: "eyJ0eXAiOiJKV1QiLCJ2ZXJzaW9uIjoxLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlOWFlZTQ3Yy1jOTc2LTQyZDAtODViMS0yMjQ0ZmM1MDVkZjAiLCJpc3MiOiJhYmx5LmNvbSIsImlhdCI6MTc2OTk5NDEwNywic3ViIjo5MDI3M30.zJdvJXyRrKmKn0yK1iRQOJ6ie6ex1MU9V2lvBUkTo1E",
    });

    const channel = ably.channels.get("hidden-chat");

    channel.subscribe(msg => {
      setMessages(prev => [...prev, msg.data]);
    });

    return () => {
      ably.close();
    };
  }, []);

  const send = async () => {
    const ably = new Ably.Realtime({
      token: "eyJ0eXAiOiJKV1QiLCJ2ZXJzaW9uIjoxLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlOWFlZTQ3Yy1jOTc2LTQyZDAtODViMS0yMjQ0ZmM1MDVkZjAiLCJpc3MiOiJhYmx5LmNvbSIsImlhdCI6MTc2OTk5NDEwNywic3ViIjo5MDI3M30.zJdvJXyRrKmKn0yK1iRQOJ6ie6ex1MU9V2lvBUkTo1E",
    });
    const channel = ably.channels.get("hidden-chat");
    channel.publish("msg", input);
    setInput("");
  };

  return (
    <div>
      {messages.map((m, i) => <div key={i}>{m}</div>)}
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && send()}
      />
    </div>
  );
}
