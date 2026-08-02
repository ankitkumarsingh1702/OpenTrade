"use client";

import { FormEvent, useId, useState } from "react";

import { isValidEmail } from "@/lib/validation";

export function CampusInterestForm() {
  const inputId = useId();
  const messageId = useId();
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState<boolean | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("studentEmail") ?? "");

    if (!isValidEmail(email)) {
      setValid(false);
      setMessage("Enter a valid student email address.");
      return;
    }

    setValid(true);
    setMessage("Campus interest saved in this local preview.");
  }

  return (
    <section className="campus-panel clip-notch-tr" aria-labelledby="campus-heading">
      <h2 id="campus-heading">
        <span aria-hidden="true" className="material-symbols-outlined">
          campaign
        </span>
        Bring OpenTrade to your campus
      </h2>
      <form className="campus-form" noValidate onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor={inputId}>
          Student email
        </label>
        <input
          aria-describedby={message ? messageId : undefined}
          aria-invalid={valid === false}
          id={inputId}
          name="studentEmail"
          placeholder="Student email"
          type="email"
        />
        <button className="tactical-button tactical-button--primary" type="submit">
          Update
        </button>
      </form>
      {message ? (
        <p className={`form-message${valid ? " form-message--success" : " form-message--error"}`} id={messageId} role="status">
          {message}
        </p>
      ) : null}
    </section>
  );
}
