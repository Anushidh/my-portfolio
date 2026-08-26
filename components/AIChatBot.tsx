"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          // Sits above the back-to-top button (40px tall at bottom 2rem).
          bottom: "calc(2rem + 40px + 0.75rem)",
          right: "2rem",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "var(--color-accent)",
          color: "#fff",
          border: "none",
          boxShadow: "0 8px 32px rgba(15, 118, 110, 0.3)",
          display: isOpen ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 9999,
        }}
        aria-label="Open AI Assistant"
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              width: "min(380px, calc(100vw - 2rem))",
              height: "min(600px, calc(100vh - 4rem))",
              backgroundColor: "var(--color-surface)",
              borderRadius: "16px",
              boxShadow: "0 12px 48px rgba(0,0,0,0.12)",
              border: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              zIndex: 10000,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "rgba(250, 250, 247, 0.5)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-accent)",
                  }}
                >
                  <Bot size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 600, margin: 0, color: "var(--color-text-primary)" }}>
                    Ask Anushidh&apos;s AI
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "2px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-success)" }} />
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-text-muted)",
                  padding: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--color-border)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {messages.length === 0 && (
                <div style={{ textAlign: "center", color: "var(--color-text-muted)", fontSize: "0.85rem", marginTop: "2rem" }}>
                  <MessageSquare size={32} style={{ margin: "0 auto 1rem", opacity: 0.5 }} />
                  <p>Hi! I&apos;m an AI trained on Anushidh&apos;s resume and experience.</p>
                  <p style={{ marginTop: "0.5rem" }}>Ask me anything about his skills or projects!</p>
                </div>
              )}
              
              {messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    flexDirection: m.role === "user" ? "row-reverse" : "row",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: m.role === "user" 
                        ? "var(--color-border)" 
                        : "color-mix(in srgb, var(--color-accent) 15%, transparent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: m.role === "user" ? "var(--color-text-secondary)" : "var(--color-accent)",
                      flexShrink: 0,
                    }}
                  >
                    {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div
                    style={{
                      backgroundColor: m.role === "user" ? "var(--color-border)" : "transparent",
                      padding: m.role === "user" ? "0.75rem 1rem" : "0.25rem 0",
                      borderRadius: "12px",
                      borderTopRightRadius: m.role === "user" ? "2px" : "12px",
                      borderTopLeftRadius: m.role === "user" ? "12px" : "2px",
                      maxWidth: "80%",
                      fontSize: "0.9rem",
                      lineHeight: 1.5,
                      color: "var(--color-text-primary)",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {m.parts
                      .map((part) => (part.type === "text" ? part.text : ""))
                      .join("")}
                  </div>
                </div>
              ))}
              {status === "submitted" && (
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-accent)",
                    }}
                  >
                    <Bot size={14} />
                  </div>
                  <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Thinking...</span>
                </div>
              )}
              {error && (
                <div style={{ fontSize: "0.8rem", color: "var(--color-error, #dc2626)", textAlign: "center" }}>
                  {error.message || "Something went wrong. Please try again."}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              style={{
                padding: "1rem",
                borderTop: "1px solid var(--color-border)",
                backgroundColor: "var(--color-surface)",
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Anushidh..."
                style={{
                  flex: 1,
                  padding: "0.75rem 1rem",
                  borderRadius: "24px",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-background)",
                  fontSize: "0.9rem",
                  outline: "none",
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-body)",
                }}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  backgroundColor: input.trim() ? "var(--color-accent)" : "var(--color-border)",
                  color: input.trim() ? "#fff" : "var(--color-text-muted)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: input.trim() ? "pointer" : "not-allowed",
                  transition: "all 0.2s ease",
                }}
              >
                <Send size={16} style={{ marginLeft: "2px" }} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
