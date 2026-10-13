-- Contact-form message store. Run ONCE against your Neon database
-- (Neon Console > SQL Editor, or psql with DIRECT_URL).
-- Safe to re-run: everything is IF NOT EXISTS.

create table if not exists messages (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) between 3 and 254),
  message text not null check (char_length(message) between 10 and 4000),
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- The inbox panel lists newest-first; this keeps that cheap.
create index if not exists messages_created_at_idx on messages (created_at desc);
