"use client";
import { useState } from "react";

export default function Chatbot() {

  const [messages,setMessages] = useState<any[]>([]);
  const [input,setInput] = useState("");
  const [loading,setLoading] = useState(false);

  const sendMessage = async () => {

    if(!input) return;

    const userMessage = {role:"user",text:input};

    setMessages(prev=>[...prev,userMessage]);
    setInput("");
    setLoading(true);

    try{

      const response = await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-large",
        {
          method:"POST",
          headers:{
            "Authorization":`Bearer ${process.env.NEXT_PUBLIC_HF_API_KEY}`,
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            inputs:input
          })
        }
      );

      const data = await response.json();

      const botReply =
        data?.[0]?.generated_text ||
        "Sorry I could not answer that.";

      setMessages(prev=>[
        ...prev,
        {role:"bot",text:botReply}
      ]);

    }catch{

      setMessages(prev=>[
        ...prev,
        {role:"bot",text:"Error connecting to AI"}
      ]);

    }

    setLoading(false);
  };

  return(

    <div className="fixed bottom-6 right-6 w-80 bg-white shadow-xl rounded-xl p-4 border">

      <h2 className="font-bold text-blue-600 mb-2">
        SkillNest AI
      </h2>

      <div className="h-60 overflow-y-auto text-sm mb-2 space-y-2">

        {messages.map((m,i)=>(
          <div key={i}
            className={
              m.role==="user"
                ?"text-right"
                :"text-left"
            }
          >
            <p className="bg-gray-100 inline-block px-3 py-2 rounded">
              {m.text}
            </p>
          </div>
        ))}

        {loading && <p className="text-gray-500">AI typing...</p>}

      </div>

      <input
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        placeholder="Ask something..."
        className="border p-2 w-full rounded"
      />

      <button
        onClick={sendMessage}
        className="bg-yellow-400 text-blue-900 w-full mt-2 py-2 rounded font-semibold"
      >
        Send
      </button>

    </div>

  );
}