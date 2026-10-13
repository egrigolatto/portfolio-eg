"use client";

import { useEffect, useActionState } from "react";

import { submitMessage } from "@/app/actions/messages";
import { HONEYPOT_FIELD, MESSAGE_LIMITS } from "@/lib/messages";

import type { Content } from "@/lib/content";
import type { MessageErrorKey, MessageFormState } from "@/lib/messages";

const FIELD_CLASS =
  "peer w-full border-0 border-b border-hairline/30 bg-transparent px-0 py-4 font-body text-body-md text-on-surface transition-colors placeholder:text-transparent focus:border-accent focus:outline-none focus:ring-0";

const LABEL_CLASS =
  "pointer-events-none absolute left-0 top-4 font-label text-label-caps uppercase tracking-widest text-on-surface-variant transition-[top,font-size,color] duration-200 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]";

const ERROR_CLASS = "mt-2 font-body text-[13px] leading-relaxed text-on-surface";

const initialState: MessageFormState = { ok: false };

export function ContactForm({ content }: { content: Content["contact"] }) {
  const [state, formAction, isPending] = useActionState(
    submitMessage,
    initialState,
  );

  const errors = state.errors;

  useEffect(() => {
    if (!errors) return;

    for (const key of ["name", "email", "message"] as const) {
      if (errors[key]) {
        document.getElementById(key)?.focus();
        return;
      }
    }
  }, [errors]);

  // React resets the form when a form action completes, restoring inputs to
  // their defaultValue; on error the action returns the submitted values, so
  // the visitor keeps exactly what they typed. On success values are absent
  // and the form clears.

  function renderError(key: MessageErrorKey) {
    return (
      <p className={ERROR_CLASS} id={`${key}-error`} role="alert">
        {content.errors[key]}
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col space-y-12">
      <div className="relative group">
        <input
          aria-describedby={errors?.name ? "name-error" : undefined}
          aria-invalid={errors?.name ? true : undefined}
          autoComplete="name"
          className={FIELD_CLASS}
          defaultValue={state.values?.name}
          id="name"
          maxLength={MESSAGE_LIMITS.nameMax}
          minLength={MESSAGE_LIMITS.nameMin}
          name="name"
          placeholder={content.name}
          required
          type="text"
        />
        <label className={LABEL_CLASS} htmlFor="name">
          {content.name}
        </label>
        {errors?.name && renderError("name")}
      </div>
      <div className="relative group">
        <input
          aria-describedby={errors?.email ? "email-error" : undefined}
          aria-invalid={errors?.email ? true : undefined}
          autoComplete="email"
          className={FIELD_CLASS}
          defaultValue={state.values?.email}
          id="email"
          maxLength={MESSAGE_LIMITS.emailMax}
          name="email"
          placeholder={content.email}
          required
          spellCheck={false}
          type="email"
        />
        <label className={LABEL_CLASS} htmlFor="email">
          {content.email}
        </label>
        {errors?.email && renderError("email")}
      </div>
      <div className="relative group">
        <textarea
          aria-describedby={errors?.message ? "message-error" : undefined}
          aria-invalid={errors?.message ? true : undefined}
          className={`${FIELD_CLASS} resize-none`}
          defaultValue={state.values?.message}
          id="message"
          maxLength={MESSAGE_LIMITS.messageMax}
          minLength={MESSAGE_LIMITS.messageMin}
          name="message"
          placeholder={content.message}
          required
          rows={4}
        />
        <label className={LABEL_CLASS} htmlFor="message">
          {content.message}
        </label>
        {errors?.message && renderError("message")}
      </div>
      <input
        aria-hidden
        autoComplete="off"
        className="pointer-events-none absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
        name={HONEYPOT_FIELD}
        tabIndex={-1}
      />
      <div aria-live="polite">
        {state.ok && (
          <p className="font-body text-body-md text-accent">{content.sent}</p>
        )}
      </div>
      {errors?.form && (
        <p className="font-body text-body-md text-on-surface" role="alert">
          {content.errors.form}
        </p>
      )}
      <button
        className="mt-8 self-start border border-accent px-8 py-4 font-label text-label-caps uppercase tracking-widest text-accent transition-colors duration-300 hover:bg-accent hover:text-on-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? content.sending : content.submit}
      </button>
    </form>
  );
}
