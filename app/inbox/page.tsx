import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  deleteAction,
  logoutAction,
  toggleReadAction,
} from "@/app/actions/panel";
import { Container } from "@/components/Container";
import { getDb } from "@/lib/db";
import { SESSION_COOKIE, isSessionToken } from "@/lib/session";

const PAGE_SIZE = 20;

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  dateStyle: "medium",
  timeStyle: "short",
});

type MessageRow = {
  created_at: Date;
  email: string;
  id: string;
  message: string;
  name: string;
  read: boolean;
};

export default async function InboxPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  if (!token || !(await isSessionToken(token))) {
    redirect("/inbox/login");
  }

  const { page: rawPage } = await searchParams;
  const page = Math.max(1, Math.floor(Number(rawPage)) || 1);

  const db = getDb();
  const [{ total }] = (await db`select count(*)::int as total from messages`) as [
    { total: number },
  ];
  const [{ unread }] = (await db`
    select count(*)::int as unread from messages where not read
  `) as [{ unread: number }];
  const rows = (await db`
    select id, name, email, message, read, created_at
    from messages
    order by created_at desc
    limit ${PAGE_SIZE}
    offset ${(page - 1) * PAGE_SIZE}
  `) as MessageRow[];

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <Container>
      <header className="flex flex-wrap items-center justify-between gap-stack-md border-b border-hairline/10 pb-6">
        <div className="flex items-center gap-4 font-label text-label-caps uppercase tracking-widest text-on-surface">
          <h1>Inbox</h1>
          <span className="text-on-surface-variant/50">
            {total} mensaje{total === 1 ? "" : "s"}
          </span>
          {unread > 0 && (
            <span className="border border-accent px-2 py-1 text-[10px] text-accent">
              {unread} nuevo{unread === 1 ? "" : "s"}
            </span>
          )}
        </div>
        <form action={logoutAction}>
          <button
            className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            type="submit"
          >
            Cerrar sesión
          </button>
        </form>
      </header>

      {rows.length === 0 ? (
        <p className="mt-24 font-body text-body-lg text-on-surface-variant/80">
          Todavía no hay mensajes.
        </p>
      ) : (
        <ul className="mt-12 space-y-12">
          {rows.map((row) => (
            <li
              className={`border-l-2 pl-6 ${
                row.read ? "border-hairline/30" : "border-accent"
              }`}
              key={row.id}
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <time
                  className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60"
                  dateTime={row.created_at.toISOString()}
                >
                  {dateFormatter.format(row.created_at)}
                </time>
                <span className="font-body text-body-md font-semibold text-on-surface">
                  {row.name}
                </span>
                <a
                  className="break-all font-label text-[10px] uppercase tracking-widest text-on-surface-variant transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  href={`mailto:${row.email}`}
                >
                  {row.email}
                </a>
                {!row.read && (
                  <span className="border border-accent px-2 py-0.5 text-[10px] uppercase tracking-widest text-accent">
                    nuevo
                  </span>
                )}
              </div>
              <p className="mt-3 font-body text-body-md break-words whitespace-pre-wrap text-on-surface-variant/90">
                {row.message}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-stack-md">
                <form action={toggleReadAction}>
                  <input name="id" type="hidden" value={row.id} />
                  <button
                    className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    type="submit"
                  >
                    {row.read ? "Marcar no leído" : "Marcar leído"}
                  </button>
                </form>
                <details className="group relative">
                  <summary
                    className="cursor-pointer list-none font-label text-[10px] uppercase tracking-widest text-on-surface-variant transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    role="button"
                    tabIndex={0}
                  >
                    Eliminar
                  </summary>
                  <form
                    action={deleteAction}
                    className="mt-2 flex items-center gap-3"
                  >
                    <input name="id" type="hidden" value={row.id} />
                    <span className="font-body text-[13px] text-on-surface-variant">
                      ¿Seguro?
                    </span>
                    <button
                      className="border border-accent px-3 py-1 font-label text-[10px] uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-on-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      name="confirm"
                      type="submit"
                      value="si"
                    >
                      Confirmar
                    </button>
                  </form>
                </details>
              </div>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <nav
          aria-label="Paginación"
          className="mt-16 flex items-center justify-between font-label text-[10px] uppercase tracking-widest"
        >
          {hasPrev ? (
            <a
              className="text-on-surface-variant transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              href={`/inbox?page=${page - 1}`}
            >
              ← Anteriores
            </a>
          ) : (
            <span />
          )}
          <span className="text-on-surface-variant/60">
            Página {page} / {totalPages}
          </span>
          {hasNext ? (
            <a
              className="text-on-surface-variant transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              href={`/inbox?page=${page + 1}`}
            >
              Siguientes →
            </a>
          ) : (
            <span />
          )}
        </nav>
      )}
    </Container>
  );
}
