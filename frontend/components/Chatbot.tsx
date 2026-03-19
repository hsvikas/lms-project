"use client";
import { useState, useEffect } from "react";
import { isLoggedIn } from "@/lib/auth";

export default function Chatbot() {

  const [open,setOpen] = useState(false);
  const [messages,setMessages] = useState<any[]>([]);
  const [input,setInput] = useState("");
  const [loading,setLoading] = useState(false);
  const [show,setShow] = useState(false);

  // 👉 Show chatbot ONLY after login
  useEffect(()=>{
    setShow(isLoggedIn());
  },[]);

  if(!show) return null;

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
            Authorization:`Bearer ${process.env.NEXT_PUBLIC_HF_API_KEY}`,
            "Content-Type":"application/json"
          },
          body:JSON.stringify({inputs:userMessage.text})
        }
      );

      const data = await response.json();

      const botReply =
        data?.[0]?.generated_text || "Try again...";

      setMessages(prev=>[
        ...prev,
        {role:"bot",text:botReply}
      ]);

    }catch{

      setMessages(prev=>[
        ...prev,
        {role:"bot",text:"AI error"}
      ]);

    }

    setLoading(false);

  };

  return(
    <>
    
      {/* CHAT WINDOW */}
      {open && (

        <div className="fixed bottom-20 right-6 w-72 bg-white shadow-xl rounded-xl border z-50">

          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl font-semibold">
            SkillNest AI
          </div>

          <div className="h-52 overflow-y-auto p-3 text-sm space-y-2">

            {messages.map((m,i)=>(
              <div key={i} className={m.role==="user"?"text-right":"text-left"}>
                <span className="bg-gray-100 px-3 py-2 rounded inline-block">
                  {m.text}
                </span>
              </div>
            ))}

            {loading && <p className="text-gray-500">AI typing...</p>}

          </div>

          <div className="p-3 border-t">

            <input
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              placeholder="Ask something..."
              className="border p-2 w-full rounded text-sm"
            />

            <button
              onClick={sendMessage}
              className="bg-yellow-400 text-blue-900 w-full mt-2 py-2 rounded font-semibold"
            >
              Send
            </button>

          </div>

        </div>

      )}

      {/* CHAT BUTTON */}
      <button
        onClick={()=>setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg text-xl flex items-center justify-center hover:bg-blue-700"
      >
        💬
      </button>

    </>
  );
}