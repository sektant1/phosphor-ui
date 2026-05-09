const pkg = "@sektant1/phosphor-ui";

const example = (imports: string, body: string) => `import { ${imports} } from "${pkg}";

export function Example() {
  return ${body};
}`;

export const basicUsage = {
  AdminShell: `import { AdminShell } from "${pkg}";

const nav = [{ label: "Dashboard", href: "/admin" }];

export function Example() {
  return <AdminShell nav={nav}>Admin content</AdminShell>;
}`,
  AsciiBanner: example("AsciiBanner", `<AsciiBanner text="PHOSPHOR" />`),
  ArticleList: `import { ArticleList } from "${pkg}";

const items = [
  { title: "Daily note", href: "/notes/daily", meta: "updated today" },
  { title: "Project log", href: "/projects/log", description: "Open questions and next steps." },
];

export function Example() {
  return <ArticleList items={items} />;
}`,
  AuthorCard: `import { AuthorCard } from "${pkg}";

export function Example() {
  return (
    <AuthorCard
      name="Ada Signal"
      role="Field operator"
      bio="Writes practical notes from the relay room."
    />
  );
}`,
  Avatar: example("Avatar", `<Avatar name="Ada Signal" />`),
  BootNav: `import { BootNav } from "${pkg}";

const items = [
  { label: "Docs", href: "/docs" },
  { label: "Changelog", href: "/changelog" },
];

export function Example() {
  return <BootNav items={items} />;
}`,
  Breadcrumbs: `import { Breadcrumbs } from "${pkg}";

const items = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Signals" },
];

export function Example() {
  return <Breadcrumbs items={items} />;
}`,
  Button: example("Button", `<Button>Execute</Button>`),
  Callout: `import { Callout } from "${pkg}";

export function Example() {
  return (
    <Callout variant="info" title="Transmission">
      Signal acquired. Decoding payload.
    </Callout>
  );
}`,
  CalloutHeading: example("CalloutHeading", `<CalloutHeading>Signal notes</CalloutHeading>`),
  Checkbox: example("Checkbox", `<Checkbox label="Enable telemetry" />`),
  CodeBlock: `import { CodeBlock } from "${pkg}";

export function Example() {
  return <CodeBlock code={'npm run build'} language="bash" />;
}`,
  ContentEditor: `import { ContentEditor } from "${pkg}";

const fields = [{ kind: "text", key: "title", label: "TITLE" }];

export function Example() {
  return <ContentEditor kindLabel="POST" fields={fields} />;
}`,
  CourseCard: `import { CourseCard } from "${pkg}";

export function Example() {
  return (
    <CourseCard
      title="Cold-Boot Operations"
      description="Bring a dead terminal back online."
      cta={{ label: "Resume", href: "/courses/cold-boot" }}
    />
  );
}`,
  CourseEditor: example("CourseEditor", `<CourseEditor />`),
  CrtShell: example("CrtShell", `<CrtShell>Terminal content</CrtShell>`),
  DropdownMenu: `import { DropdownMenu } from "${pkg}";

const items = [
  { label: "Edit", value: "edit" },
  { label: "Archive", value: "archive" },
];

export function Example() {
  return <DropdownMenu label="Actions" items={items} />;
}`,
  EmptyState: example("EmptyState", `<EmptyState title="No results" action={{ label: "Reset filters" }} />`),
  Exercise: `import { Exercise } from "${pkg}";

const tasks = [{ label: "Decode packet", done: false }];

export function Example() {
  return <Exercise title="Signal drill" tasks={tasks} />;
}`,
  Footer: example("Footer", `<Footer />`),
  FooterStencil: example("FooterStencil", `<FooterStencil />`),
  FormField: `import { FormField, Input } from "${pkg}";

export function Example() {
  return (
    <FormField label="Title">
      <Input placeholder="Post title" />
    </FormField>
  );
}`,
  Glyph: example("Glyph", `<Glyph char="◆" size={24} />`),
  Glyphs: example("Glyphs", `<Glyphs />`),
  Header: `import { Header } from "${pkg}";

const nav = [{ label: "Docs", href: "/docs" }];

export function Example() {
  return <Header title="Phosphor" nav={nav} />;
}`,
  Heading: example("Heading", `<Heading level={2}>Transmission log</Heading>`),
  HeadingLevels: `import { H1, H2, H3 } from "${pkg}";

export function Example() {
  return (
    <>
      <H1>Field notes</H1>
      <H2>Transmission log</H2>
      <H3>Signal lock</H3>
    </>
  );
}`,
  HeroFrame: `import { HeroFrame } from "${pkg}";

export function Example() {
  return <HeroFrame art={"PHOSPHOR"} topHud={<HeroFrame.HudText>ONLINE</HeroFrame.HudText>} />;
}`,
  Hr: example("Hr", `<Hr />`),
  Input: example("Input", `<Input placeholder="callsign" />`),
  Textarea: example("Textarea", `<Textarea rows={4} placeholder="Transmission notes" />`),
  LessonEditor: example("LessonEditor", `<LessonEditor />`),
  LessonRow: `import { LessonRow } from "${pkg}";

export function Example() {
  return <LessonRow title="Decode the signal" href="/lessons/decode" state="current" />;
}`,
  LessonList: `import { LessonList, LessonRow } from "${pkg}";

export function Example() {
  return (
    <LessonList>
      <LessonRow title="Decode the signal" state="current" />
    </LessonList>
  );
}`,
  Link: example("Link", `<Link href="/docs">Read the docs</Link>`),
  LoginForm: example("LoginForm", `<LoginForm onSubmit={() => {}} />`),
  Modal: `import { Modal, Button } from "${pkg}";

export function Example() {
  return (
    <Modal open title="Confirm" onClose={() => {}}>
      <Button>Continue</Button>
    </Modal>
  );
}`,
  Drawer: `import { Drawer } from "${pkg}";

export function Example() {
  return <Drawer open title="Panel" onClose={() => {}}>Drawer content</Drawer>;
}`,
  ModuleAccordion: `import { ModuleAccordion } from "${pkg}";

const lessons = [{ num: "01", title: "Boot sequence", href: "/lessons/boot" }];

export function Example() {
  return <ModuleAccordion num="01" title="Operations" lessons={lessons} />;
}`,
  NerdTree: `import { NerdTree } from "${pkg}";

const tree = [{ kind: "leaf", label: "README.md", href: "/readme" }];

export function Example() {
  return <NerdTree tree={tree} />;
}`,
  NoteEditor: example("NoteEditor", `<NoteEditor />`),
  Page: `import { Page } from "${pkg}";

export function Example() {
  return <Page header={<h1>Field notes</h1>}>Page content</Page>;
}`,
  Pagination: example("Pagination", `<Pagination page={3} totalPages={7} />`),
  PdaWindow: example("PdaWindow", `<PdaWindow title="STATUS">Online</PdaWindow>`),
  Post: `import { Post } from "${pkg}";

export function Example() {
  return <Post title="Field notes">Post body</Post>;
}`,
  PostBody: example("PostBody", `<PostBody>Post body content.</PostBody>`),
  PostFrontmatter: `import { PostFrontmatter } from "${pkg}";

export function Example() {
  return <PostFrontmatter data={{ title: "Field notes", status: "draft" }} />;
}`,
  PostHeader: example("PostHeader", `<PostHeader title="Field notes" />`),
  PostListing: `import { PostListing, PostRow } from "${pkg}";

export function Example() {
  return (
    <PostListing>
      <PostRow title="Field notes" href="/posts/field-notes" date="2026-05-08" />
    </PostListing>
  );
}`,
  PostRow: `import { PostListing, PostRow } from "${pkg}";

export function Example() {
  return (
    <PostListing>
      <PostRow title="Field notes" href="/posts/field-notes" date="2026-05-08" />
    </PostListing>
  );
}`,
  PostMeta: example("PostMeta", `<PostMeta date="2026-05-08" tags={["release"]} />`),
  ProgressBar: example("ProgressBar", `<ProgressBar value={4} total={6} />`),
  ProjectEditor: example("ProjectEditor", `<ProjectEditor />`),
  Prose: example("Prose", `<Prose><p>Readable article content.</p></Prose>`),
  PrereqList: `import { PrereqList } from "${pkg}";

const items = [{ label: "Install Node", status: "done" }];

export function Example() {
  return <PrereqList items={items} />;
}`,
  ReadingRail: example("ReadingRail", `<ReadingRail value={0.35} />`),
  RelatedPosts: `import { RelatedPosts } from "${pkg}";

const posts = [{ title: "Signal basics", href: "/posts/signals" }];

export function Example() {
  return <RelatedPosts posts={posts} />;
}`,
  Search: example("Search", `<Search hits={[{ title: "Field notes", href: "/posts/field-notes" }]} />`),
  SearchResultList: `import { SearchResultList } from "${pkg}";

const hits = [{ title: "Vim quickstart", href: "/posts/vim", snippet: "Configure vim." }];

export function Example() {
  return <SearchResultList hits={hits} />;
}`,
  SearchResult: `import { SearchResult } from "${pkg}";

export function Example() {
  return (
    <SearchResult
      hit={{ title: "Vim quickstart", href: "/posts/vim", snippet: "Configure vim." }}
    />
  );
}`,
  Select: `import { Select } from "${pkg}";

const options = [{ label: "Draft", value: "draft" }];

export function Example() {
  return <Select label="Status" options={options} />;
}`,
  SeriesNav: `import { SeriesNav } from "${pkg}";

const items = [{ title: "Boot sequence", href: "/lessons/boot", current: true }];

export function Example() {
  return <SeriesNav items={items} />;
}`,
  ShareBar: example("ShareBar", `<ShareBar url="https://example.com/posts/field-notes" />`),
  StatPill: example("StatPill", `<StatPill label="Progress" value="4/6" />`),
  Stepper: `import { Stepper } from "${pkg}";

const items = [
  { label: "Home", href: "/", done: true },
  { label: "Lesson", current: true },
];

export function Example() {
  return <Stepper items={items} />;
}`,
  StepperFoot: `import { StepperFoot } from "${pkg}";

export function Example() {
  return (
    <StepperFoot
      prev={{ href: "/one", kind: "lesson", name: "Boot sequence" }}
      next={{ href: "/three", kind: "lesson", name: "Decode the signal" }}
    />
  );
}`,
  Switch: example("Switch", `<Switch label="Enable sync" />`),
  TableOfContents: `import { TableOfContents } from "${pkg}";

const items = [{ id: "intro", label: "Intro", href: "#intro" }];

export function Example() {
  return <TableOfContents items={items} />;
}`,
  Tabs: `import { Tabs } from "${pkg}";

const tabs = [
  { id: "overview", label: "Overview", content: "Overview content" },
  { id: "logs", label: "Logs", content: "Recent logs" },
];

export function Example() {
  return <Tabs tabs={tabs} />;
}`,
  Tag: example("Tag", `<Tag>release</Tag>`),
  TerminalPrompt: example("TerminalPrompt", `<TerminalPrompt command="npm run build" />`),
  Text: example("Text", `<Text variant="body">Readable interface copy.</Text>`),
  Timeline: `import { Timeline } from "${pkg}";

const items = [{ title: "Captured", time: "09:30", status: "complete" }];

export function Example() {
  return <Timeline items={items} />;
}`,
  Toast: example("Toast", `<Toast visible message="Saved" variant="success" />`),
  ContentStatusBadge: example("ContentStatusBadge", `<ContentStatusBadge status="draft" />`),
  Tooltip: `import { Tooltip, Button } from "${pkg}";

export function Example() {
  return (
    <Tooltip content="More detail">
      <Button>Inspect</Button>
    </Tooltip>
  );
}`,
  VideoPlayer: `import { VideoPlayer } from "${pkg}";

export function Example() {
  return <VideoPlayer sources={[{ src: "/demo.mp4", type: "video/mp4" }]} />;
}`,
  Flex: `import { Flex, Button } from "${pkg}";

export function Example() {
  return <Flex gap="sm"><Button>Save</Button><Button variant="ghost">Cancel</Button></Flex>;
}`,
  Grid: `import { Grid, Tag } from "${pkg}";

export function Example() {
  return <Grid minItemWidth="12rem"><Tag>alpha</Tag><Tag>beta</Tag></Grid>;
}`,
  Stack: `import { Stack, Button } from "${pkg}";

export function Example() {
  return <Stack gap="sm"><Button>Save</Button><Button variant="ghost">Cancel</Button></Stack>;
}`,
  Cluster: `import { Cluster, Tag } from "${pkg}";

export function Example() {
  return <Cluster gap="xs"><Tag>notes</Tag><Tag>wiki</Tag><Tag>published</Tag></Cluster>;
}`,
  Container: `import { Container, Prose } from "${pkg}";

export function Example() {
  return <Container width="prose"><Prose><p>Readable page content.</p></Prose></Container>;
}`,
};
