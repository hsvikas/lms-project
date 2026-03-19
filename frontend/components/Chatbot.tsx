"use client";
import { useState } from "react";

export default function Chatbot() {

  const [open,setOpen] = useState(false);

  return(
    <>
    
      {/* CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-20 right-6 w-72 bg-white shadow-xl rounded-xl border z-[9999]">

          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl font-semibold">
            SkillNest AI
          </div>

          <div className="p-4 text-sm text-gray-600">
            Chatbot working ✅
          </div>

        </div>
      )}

      {/* BUTTON */}
      <button
        onClick={()=>setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg text-xl flex items-center justify-center"
      >
        💬
      </button>

    </>
  );
}