# Build Personal Blog with `@sektant1/phosphor-ui`

Recipe: simple but scalable. Next.js (App Router) + SQLite/Prisma + NextAuth (single admin) + admin CMS using this lib's `AdminShell` / `ContentEditor`.

## Install

Public package on npm: [`@sektant1/phosphor-ui`](https://www.npmjs.com/package/@sektant1/phosphor-ui).

```bash
npm install @sektant1/phosphor-ui
# or
yarn add @sektant1/phosphor-ui
# or
pnpm add @sektant1/phosphor-ui
```

Peer deps: `react`, `react-dom` (^17 || ^18). Optional: `@mdx-js/react` (for MDX rendering).

Import styles once at app root:

```ts
import "@sektant1/phosphor-ui/tokens.css";
import "@sektant1/phosphor-ui/global.css";
```


Stack reasons:
- **Next.js**: SSR, file routing, API routes, middleware. Migrate DB to Postgres later — code unchanged.
- **Prisma**: typed schema, migrations, swap SQLite → Postgres by changing `provider`.
- **NextAuth Credentials**: one admin (you), zero user-mgmt UI.
- **MDX**: write posts as MDX. Lib already ships `PostBody` + `mdxComponents`.

---

## 1. Init project

```bash
npx create-next-app@latest my-blog --ts --app --eslint --src-dir --import-alias "@/*"
cd my-blog
npm i @sektant1/phosphor-ui @mdx-js/react
npm i prisma @prisma/client
npm i next-auth bcryptjs
npm i -D @types/bcryptjs
npx prisma init --datasource-provider sqlite
```

Add lib styles to `src/app/layout.tsx`:

```tsx
import "@sektant1/phosphor-ui/tokens.css";
import "@sektant1/phosphor-ui/global.css";
```

---

## 2. Schema (`prisma/schema.prisma`)

```prisma
datasource db { provider = "sqlite"; url = env("DATABASE_URL") }
generator client { provider = "prisma-client-js" }

model Post {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  summary     String?
  body        String   // MDX source
  tags        String   // CSV; or use a join table later
  status      String   @default("draft") // draft|published
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model SiteConfig {
  id        Int    @id @default(1) // singleton
  title     String @default("phosphor blog")
  tagline   String @default("")
  navJson   String @default("[]") // serialized nav items
  footerJson String @default("{}")
}
```

```bash
npx prisma migrate dev --name init
```

`src/lib/db.ts`:

```ts
import { PrismaClient } from "@prisma/client";
const g = globalThis as unknown as { prisma?: PrismaClient };
export const db = g.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") g.prisma = db;
```

Scale move: switch `provider` to `postgresql`, change `DATABASE_URL`, redeploy. No app changes.

---

## 3. Auth (single admin)

`.env`:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="<openssl rand -base64 32>"
ADMIN_EMAIL="you@example.com"
ADMIN_PASSWORD_HASH="<bcrypt hash>"
```

Generate hash:

```bash
node -e "console.log(require('bcryptjs').hashSync('your-pw', 10))"
```

`src/lib/auth.ts`:

```ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(c) {
        if (
          c?.email === process.env.ADMIN_EMAIL &&
          bcrypt.compareSync(c.password as string, process.env.ADMIN_PASSWORD_HASH!)
        ) return { id: "admin", email: c.email as string, name: "admin" };
        return null;
      },
    }),
  ],
});
```

`src/app/api/auth/[...nextauth]/route.ts`:

```ts
export { GET, POST } from "@/lib/auth";
```

`src/middleware.ts` — gate `/admin/*`:

```ts
export { auth as middleware } from "@/lib/auth";
export const config = { matcher: ["/admin/:path*"] };
```

---

## 4. Public pages

`src/app/layout.tsx`:

```tsx
import { Header, Footer } from "@sektant1/phosphor-ui";
import { db } from "@/lib/db";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cfg = (await db.siteConfig.findUnique({ where: { id: 1 } })) ?? { title: "blog", tagline: "" };
  const nav = JSON.parse((cfg as any).navJson ?? "[]");
  return (
    <html lang="en">
      <body>
        <Header brand={cfg.title} items={nav} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

`src/app/page.tsx` — listing:

```tsx
import { PostListing, PostRow } from "@sektant1/phosphor-ui";
import { db } from "@/lib/db";

export default async function Home() {
  const posts = await db.post.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
  });
  return (
    <PostListing>
      {posts.map((p) => (
        <PostRow
          key={p.id}
          href={`/posts/${p.slug}`}
          title={p.title}
          excerpt={p.summary ?? ""}
          date={p.publishedAt?.toISOString().slice(0, 10)}
          tags={p.tags.split(",").filter(Boolean)}
        />
      ))}
    </PostListing>
  );
}
```

`src/app/posts/[slug]/page.tsx` — render MDX:

```tsx
import { compileMDX } from "next-mdx-remote/rsc"; // npm i next-mdx-remote
import { mdxComponents, PostBody, PostLayout, PostHeader, TableOfContents } from "@sektant1/phosphor-ui";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await db.post.findUnique({ where: { slug: params.slug } });
  if (!post || post.status !== "published") notFound();

  const { content } = await compileMDX({
    source: post.body,
    components: mdxComponents,
  });

  return (
    <PostLayout
      header={<PostHeader title={post.title} date={post.publishedAt?.toISOString().slice(0,10)} tags={post.tags.split(",").filter(Boolean)} />}
      sidebar={<TableOfContents items={[]} />}
    >
      <PostBody
        frontmatter={{
          title: post.title,
          date: post.publishedAt?.toISOString().slice(0,10) ?? null,
          tags: post.tags.split(",").filter(Boolean),
        }}
      >
        {content}
      </PostBody>
    </PostLayout>
  );
}
```

Scale move: swap DB read for any source — filesystem MDX, Notion, Contentlayer. Components don't care.

---

## 5. Admin login

`src/app/login/page.tsx`:

```tsx
"use client";
import { LoginForm } from "@sektant1/phosphor-ui";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  return (
    <LoginForm
      onSubmit={async ({ email, password }) => {
        const res = await signIn("credentials", { email, password, redirect: false });
        if (res?.ok) router.push("/admin");
      }}
    />
  );
}
```

---

## 6. Admin dashboard

`src/app/admin/layout.tsx`:

```tsx
import { AdminShell } from "@sektant1/phosphor-ui";
import { auth, signOut } from "@/lib/auth";

const NAV = [
  { id: "posts",  label: "posts",  href: "/admin/posts" },
  { id: "config", label: "config", href: "/admin/config" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <AdminShell
      nav={NAV}
      user={{ name: session?.user?.name ?? "admin", email: session?.user?.email ?? "" }}
      onSignOut={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}
    >
      {children}
    </AdminShell>
  );
}
```

`src/app/admin/posts/page.tsx` — list + new:

```tsx
import Link from "next/link";
import { db } from "@/lib/db";
import { Button, ContentStatusBadge } from "@sektant1/phosphor-ui";

export default async function Posts() {
  const posts = await db.post.findMany({ orderBy: { updatedAt: "desc" } });
  return (
    <div>
      <Link href="/admin/posts/new"><Button>new post</Button></Link>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <Link href={`/admin/posts/${p.id}`}>{p.title}</Link>
            <ContentStatusBadge status={p.status as any} />
          </li>
        ))}
      </ul>
    </div>
  );
}
```

`src/app/admin/posts/[id]/page.tsx` — edit:

```tsx
import { ContentEditor } from "@sektant1/phosphor-ui";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function EditPost({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const post = isNew ? null : await db.post.findUnique({ where: { id: params.id } });

  async function save(formData: FormData) {
    "use server";
    const data = {
      title:   String(formData.get("title")),
      slug:    String(formData.get("slug")),
      summary: String(formData.get("summary") ?? ""),
      body:    String(formData.get("body")),
      tags:    String(formData.get("tags") ?? ""),
      status:  String(formData.get("status") ?? "draft"),
      publishedAt: formData.get("status") === "published" ? new Date() : null,
    };
    if (isNew) await db.post.create({ data });
    else await db.post.update({ where: { id: params.id }, data });
    revalidatePath("/");
    redirect("/admin/posts");
  }

  return (
    <form action={save}>
      <ContentEditor
        defaultValues={{
          title: post?.title ?? "",
          slug:  post?.slug ?? "",
          summary: post?.summary ?? "",
          body:  post?.body ?? "",
          tags:  post?.tags ?? "",
          status: (post?.status as any) ?? "draft",
        }}
      />
    </form>
  );
}
```

Note: bind `ContentEditor` field names to your form. Check `ContentEditor.stories.tsx` in this lib for prop shape.

`src/app/admin/config/page.tsx` — site config:

```tsx
import { Input, Textarea, Button } from "@sektant1/phosphor-ui";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function Config() {
  const cfg = (await db.siteConfig.upsert({ where: { id: 1 }, create: { id: 1 }, update: {} }));

  async function save(fd: FormData) {
    "use server";
    await db.siteConfig.update({
      where: { id: 1 },
      data: {
        title:    String(fd.get("title")),
        tagline:  String(fd.get("tagline")),
        navJson:  String(fd.get("navJson")),
        footerJson: String(fd.get("footerJson")),
      },
    });
    revalidatePath("/", "layout");
  }

  return (
    <form action={save}>
      <Input name="title" defaultValue={cfg.title} label="site title" />
      <Input name="tagline" defaultValue={cfg.tagline} label="tagline" />
      <Textarea name="navJson" defaultValue={cfg.navJson} label="nav (JSON)" rows={6} />
      <Textarea name="footerJson" defaultValue={cfg.footerJson} label="footer (JSON)" rows={6} />
      <Button type="submit">save</Button>
    </form>
  );
}
```

---

## 7. Deploy

- **Vercel**: works out of box. Switch `DATABASE_URL` to Vercel Postgres or Neon. Run `prisma migrate deploy` on build.
- **Self-host**: build with `next build`, run `next start` behind nginx. SQLite file persists on disk.

---

## 8. Scale path (when you grow out of this)

| Need | Move |
|------|------|
| More authors | Add `User` model, `Post.authorId`, NextAuth Email/GitHub provider |
| Heavy traffic | SQLite → Postgres, add Redis cache |
| Media uploads | S3 + signed URLs in `ContentEditor` image fields |
| Comments | Add `Comment` model + moderation flag |
| Search | Postgres FTS or Meilisearch |
| Static export | Set `output: "export"` for read-only side; keep admin on separate node |

Foundations don't change. Add layers.

---

## 9. Useful lib bits

- `Header`, `Footer`, `FooterStencil` — chrome
- `PostListing` / `PostRow`, `RelatedPosts`, `Pagination` — index pages
- `PostLayout`, `PostHeader`, `PostBody`, `PostFrontmatter`, `TableOfContents`, `ReadingRail`, `ShareBar`, `Stepper`/`StepperFoot` — post page
- `mdxComponents` — pass to MDX renderer; styles `<h1>`, `<pre>`, `<blockquote>`, etc.
- `CodeBlock`, `Callout`, `Tag`, `Tooltip`, `Modal`, `Drawer`, `Toast` — content widgets
- `AdminShell`, `LoginForm`, `ContentEditor`, `FormField`, `ContentStatusBadge`, `Input`, `Textarea`, `Select`, `Switch` — admin UI

Run `npm run storybook` in this lib repo to browse all components live.
