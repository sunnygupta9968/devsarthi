
import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  ArrowRight,
  Code2,
  Sparkles,
  Search,
  GitBranch,
  ShieldCheck,
  Terminal,
  Zap,
  CheckCircle2,
} from "lucide-react";

function GitHubIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.21 3.26.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.62 5.24-5.11 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

const features = [
  {
    icon: Search,
    title: "Understand any codebase",
    description:
      "Explore unfamiliar repositories with AI-powered explanations and contextual code insights.",
  },
  {
    icon: Sparkles,
    title: "AI-powered assistance",
    description:
      "Ask questions about your code and get clear, actionable answers grounded in your project.",
  },
  {
    icon: GitBranch,
    title: "Built for developers",
    description:
      "Navigate files, trace dependencies, and understand how every piece of your application fits together.",
  },
];

const steps = [
  {
    number: "01",
    title: "Connect your repository",
    description: "Start with the code you already have.",
  },
  {
    number: "02",
    title: "Ask questions in plain language",
    description: "Explore architecture, functions, and dependencies.",
  },
  {
    number: "03",
    title: "Move forward with confidence",
    description: "Use the insights to make better development decisions.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Code2 className="size-5" />
            </div>

            <span className="text-xl font-bold tracking-tight">
              DevSarthi<span className="text-primary">.</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a
              href="#features"
              className="transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-foreground"
            >
              How it works
            </a>
            <a
              href="#about"
              className="transition-colors hover:text-foreground"
            >
              About
            </a>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />

            <a
              href="/login"
              className="hidden h-9 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex"
            >
              Get started
              <ArrowRight className="ml-2 size-4" />
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative isolate">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.13),_transparent_60%)]" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-16 lg:py-32">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm shadow-sm">
              <Sparkles className="size-4 text-primary" />
              <span className="text-muted-foreground">
                Your AI-powered coding companion
              </span>
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl">
              Navigate code.
              <br />
              <span className="bg-gradient-to-r from-primary via-violet-500 to-indigo-400 bg-clip-text text-transparent">
                Build with clarity.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Understand complex repositories, explore unfamiliar code, and
              move from confusion to confidence with an AI assistant built for
              developers.
            </p>

            <div
              id="get-started"
              className="mt-9 flex scroll-mt-24 flex-col gap-3 sm:flex-row"
            >
              <a
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <GitHubIcon className="mr-2 size-5" />
                Continue with GitHub
                <ArrowRight className="ml-2 size-4" />
              </a>

              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background px-7 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Explore the platform
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                Developer focused
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                Context-aware answers
              </span>
            </div>
          </div>

          {/* Code Preview */}
          <div className="relative min-w-0">
            <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/20 via-violet-500/10 to-transparent blur-2xl" />

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-red-400" />
                  <span className="size-3 rounded-full bg-yellow-400" />
                  <span className="size-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-sm font-medium">
                    your-project
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  AI workspace
                </span>
              </div>

              <div className="grid min-h-[340px] grid-cols-[110px_minmax(0,1fr)] sm:grid-cols-[150px_minmax(0,1fr)]">
                <aside className="border-r border-border bg-muted/30 p-3 sm:p-4">
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Explorer
                  </p>

                  <div className="space-y-3 font-mono text-xs">
                    <p className="text-primary">▾ src</p>
                    <p className="truncate pl-3 text-muted-foreground">
                      ▾ app
                    </p>
                    <p className="truncate pl-6 text-foreground">
                      page.tsx
                    </p>
                    <p className="truncate pl-3 text-muted-foreground">
                      ▸ components
                    </p>
                    <p className="text-muted-foreground">▸ public</p>
                    <p className="truncate text-muted-foreground">
                      ◇ package.json
                    </p>
                  </div>
                </aside>

                <div className="min-w-0 p-3 sm:p-6">
                  <div className="mb-5 flex items-center gap-2 border-b border-border pb-3 text-xs text-muted-foreground">
                    <Code2 className="size-4 shrink-0" />
                    <span>page.tsx</span>
                    <span className="ml-auto rounded-md bg-primary/10 px-2 py-1 text-primary">
                      AI analyzed
                    </span>
                  </div>

                  <div className="space-y-3 overflow-hidden font-mono text-[10px] leading-6 sm:text-sm">
                    <p className="whitespace-nowrap text-violet-500">
                      <span className="text-muted-foreground">01 </span>
                      export default function App() {"{"}
                    </p>

                    <p className="whitespace-nowrap pl-3 text-muted-foreground sm:pl-5">
                      <span>02 </span>
                      // Your next great idea starts here
                    </p>

                    <p className="whitespace-nowrap pl-3 sm:pl-5">
                      <span className="text-muted-foreground">03 </span>
                      return (
                    </p>

                    <p className="whitespace-nowrap pl-5 text-sky-500 sm:pl-10">
                      <span className="text-muted-foreground">04 </span>
                      <span className="text-emerald-500">
                        {"<"}BuildSomethingGreat{"/>"}
                      </span>
                    </p>

                    <p className="whitespace-nowrap pl-3 text-muted-foreground sm:pl-5">
                      <span>05 </span>
                      );
                    </p>

                    <p className="whitespace-nowrap text-violet-500">
                      <span className="text-muted-foreground">06 </span>
                      {"}"}
                    </p>
                  </div>

                  <div className="mt-6 rounded-xl border border-border bg-primary/[0.04] p-3 sm:p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Sparkles className="size-4 text-primary" />
                      DevSarthi AI
                    </div>

                    <p className="text-sm leading-6 text-muted-foreground">
                      Ready to help you understand this codebase, explain
                      components, and find your next step.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-md border border-border bg-background px-2 py-1 text-xs">
                        Explain code
                      </span>
                      <span className="rounded-md border border-border bg-background px-2 py-1 text-xs">
                        Find dependencies
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-xl sm:flex">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Work smarter</p>
                <p className="text-xs text-muted-foreground">
                  Less searching, more building
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="scroll-mt-20 border-t border-border bg-muted/20"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Meet your new workflow
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              Everything you need to
              <br className="hidden sm:block" /> understand your code
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              Spend less time figuring things out and more time creating
              software that matters.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" />
                  </div>

                  <h3 className="text-xl font-semibold">{feature.title}</h3>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
                    Built for your workflow
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Terminal className="size-6" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              From first look to full understanding.
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              Whether you&apos;re joining a new team or returning to an old
              project, DevSarthi helps you build context without getting lost in
              files.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex gap-4 rounded-xl border border-border bg-card p-5"
              >
                <span className="font-mono text-sm font-semibold text-primary">
                  {step.number}
                </span>

                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="about"
        className="scroll-mt-20 px-5 pb-20 sm:px-8 sm:pb-24"
      >
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_45%)]" />

          <div className="relative">
            <ShieldCheck className="mx-auto size-10 opacity-90" />

            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
              Your code deserves a copilot.
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 opacity-85">
              Bring clarity to your workflow and make your next development
              session your most productive one yet.
            </p>

            <a
              href="/api/auth/github"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-secondary px-7 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              <GitHubIcon className="mr-2 size-5" />
              Get started for free
              <ArrowRight className="ml-2 size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-foreground"
          >
            <Code2 className="size-5 text-primary" />
            DevSarthi
          </Link>

          <p>Built for developers who love to build.</p>

          <p>© {new Date().getFullYear()} DevSarthi</p>
        </div>
      </footer>
    </main>
  );
}
