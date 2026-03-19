"use client";
import { useState, useEffect } from "react";
import { isLoggedIn } from "@/lib/auth";

export default function Chatbot() {

  const [open,setOpen] = useState(false);
  const [messages,setMessages] = useState<any[]>([]);
  const [input,setInput] = useState("");
  const [loading,setLoading] = useState(false);
  const [ready,setReady] = useState(false);

  // Fix hydration issue
  useEffect(()=>{
    setReady(true);
  },[]);

  if(!ready) return null;

  // Show only after login
  if(!isLoggedIn()) return null;

  const sendMessage = async () => {

    if(!input) return;

    const userMsg = {role:"user",content:input};

    setMessages(prev=>[...prev,userMsg]);
    setInput("");
    setLoading(true);

    try{

      const res = await fetch("/api/chat",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          message:input,
          history:messages
        })
      });

      const data = await res.json();

      setMessages(prev=>[
        ...prev,
        {role:"assistant",content:data.reply}
      ]);

    }catch{

      setMessages(prev=>[
        ...prev,
        {role:"assistant",content:"Error"}
      ]);

    }

    setLoading(false);
  };

  return(
    <>
    
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-xl border z-[9999]">

          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl font-semibold">
            SkillNest AI
          </div>

          <div className="h-64 overflow-y-auto p-3 space-y-2 text-sm">

            {messages.map((m,i)=>(
              <div key={i} className={m.role==="user"?"text-right":"text-left"}>
                <span className="bg-gray-100 px-3 py-2 rounded inline-block">
                  {m.content}
                </span>
              </div>
            ))}

            {loading && <p className="text-gray-500">AI typing...</p>}

          </div>

          <div className="p-3 border-t">

            <input
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              placeholder="Ask anything..."
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

      <button
        onClick={()=>setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-blue-700"
      >
        💬
      </button>

    </>
  );
}