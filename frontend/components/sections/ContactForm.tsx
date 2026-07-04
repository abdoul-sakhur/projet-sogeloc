"use client";

import { useState, type FormEvent } from "react";
import { submitContactForm } from "@/lib/api";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      await submitContactForm({
        fullName: String(data.get("fullName") || ""),
        email: String(data.get("email") || ""),
        phone: String(data.get("phone") || ""),
        message: String(data.get("message") || ""),
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="fullName"
        required
        placeholder="Nom complet"
        className="w-full border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="E-mail"
        className="w-full border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none"
      />
      <input
        type="text"
        name="phone"
        required
        placeholder="Téléphone"
        className="w-full border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none"
      />
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Message!"
        className="w-full border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-[65px] min-w-[170px] items-center justify-center rounded-[3px] bg-primary px-6 font-sans text-sm font-bold capitalize tracking-wide text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {status === "loading" ? "Envoi..." : "Envoyer"}
      </button>

      {status === "success" && (
        <p className="text-sm text-primary">Votre message a bien été envoyé, merci.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">
          Une erreur est survenue, merci de réessayer ou de nous appeler directement.
        </p>
      )}
    </form>
  );
}
