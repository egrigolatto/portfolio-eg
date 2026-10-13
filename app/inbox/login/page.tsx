import { redirect } from "next/navigation";

import { loginAction } from "@/app/actions/panel";
import { Container } from "@/components/Container";
import { isSessionToken, SESSION_COOKIE } from "@/lib/session";

import { cookies } from "next/headers";

const ERRORS: Record<string, string> = {
  invalid: "Contraseña incorrecta.",
  limited: "Demasiados intentos. Probá de nuevo en unos minutos.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const { error, from } = await searchParams;

  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  if (token && (await isSessionToken(token))) {
    redirect(from?.startsWith("/inbox") ? from : "/inbox");
  }

  const errorMessage = error ? ERRORS[error] : undefined;

  return (
    <Container>
      <div className="mx-auto mt-24 max-w-sm border border-white/10 bg-band p-10">
        <h1 className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
          Inbox · Acceso
        </h1>
        <form action={loginAction} className="mt-10 space-y-8">
          <input
            name="from"
            type="hidden"
            value={from?.startsWith("/inbox") && !from.startsWith("//") ? from : "/inbox"}
          />
          <div>
            <label
              className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              autoComplete="current-password"
              className="mt-3 w-full border-0 border-b border-hairline/30 bg-transparent px-0 py-3 font-body text-body-md text-on-surface focus:border-accent focus:outline-none focus:ring-0"
              id="password"
              name="password"
              required
              spellCheck={false}
              type="password"
            />
          </div>
          <div aria-live="polite">
            {errorMessage && (
              <p className="font-body text-body-md text-on-surface" role="alert">
                {errorMessage}
              </p>
            )}
          </div>
          <button
            className="w-full border border-accent px-8 py-3 font-label text-label-caps uppercase tracking-widest text-accent transition-colors duration-300 hover:bg-accent hover:text-on-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    </Container>
  );
}
