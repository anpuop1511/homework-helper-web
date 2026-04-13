"use client";

import { useState } from "react";
import { joinWaitlist } from "../actions";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Create form data payload to mimic server action expectations
    const formData = new FormData();
    formData.append("email", email);

    try {
      const response = await joinWaitlist(formData);
      
      if (response?.error) {
        setStatus("error");
        setMessage(response.error);
      } else {
        setStatus("success");
        setMessage("Awesome! You've been added to the waitlist.");
        setEmail("");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-dashed" style={{ borderColor: "var(--outline-variant)" }}>
      <h3 className="text-xl font-bold mb-3" style={{ color: "var(--on-surface)" }}>
        Join the Native iOS Waitlist 📧
      </h3>
      <p className="mb-4 text-sm" style={{ color: "var(--on-surface-variant)" }}>
        We'll let you know the second the app drops on the Apple App Store.
      </p>

      {status === "success" ? (
        <div className="p-4 rounded-xl font-medium text-green-700 bg-green-100 flex items-center gap-2">
          <span>✨</span> {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            placeholder="student@school.edu" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className="flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-shadow"
            style={{ 
              borderColor: "var(--outline-variant)", 
              background: "var(--surface)", 
              color: "var(--on-surface)",
               }}
          />
          <button 
            type="submit" 
            disabled={status === "loading" || !email}
            className="m3-button-filled disabled:opacity-50 whitespace-nowrap"
          >
            {status === "loading" ? "Submitting..." : "Join Waitlist"}
          </button>
        </form>
      )}
      
      {status === "error" && (
        <p className="mt-2 text-sm text-red-500 font-medium">{message}</p>
      )}
    </div>
  );
}
