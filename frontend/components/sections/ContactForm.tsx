"use client";

import { useState, type FormEvent } from "react";
import { submitContactForm } from "@/lib/api";
import Spinner from "@/components/Spinner";

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
      <div>
        <label htmlFor="fullName" className="mb-1 block text-sm font-semibold text-dark">
          Nom complet
        </label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          required
          placeholder="Ex. Kouassi Yao"
          className="w-full border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-semibold text-dark">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          placeholder="vous@exemple.com"
          className="w-full border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-dark">
          Téléphone
        </label>
        <input
          id="phone"
          type="text"
          name="phone"
          required
          placeholder="+225 XX XX XXX XXX"
          className="w-full border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-semibold text-dark">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Décrivez votre projet ou votre demande"
          className="w-full border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-[65px] min-w-[170px] items-center justify-center gap-2 rounded-[3px] bg-primary px-6 font-sans text-sm font-bold capitalize tracking-wide text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {status === "loading" && <Spinner size={18} />}
        {status === "loading" ? "Envoi..." : "Envoyer"}
      </button>

      {status === "success" && (
        <p className="text-sm text-primary-ink">Votre message a bien été envoyé, merci.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">
          Une erreur est survenue, merci de réessayer ou de nous appeler directement.
        </p>
      )}
    </form>
  );
}
