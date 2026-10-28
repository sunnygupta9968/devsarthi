
"use client";

import Link from "next/link";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  AlertCircle,
  Code2,
  Sparkles,
  GitBranch,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Terminal,
} from "lucide-react";

import { GitHubIcon } from "@/components/icons/github-icon";
import { BrandMark } from "@/components/layout/app-shell";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { getGithubLoginUrl } from "@/lib/api";

// If you use an authentication hook, import it here and replace
// the placeholder user/isLoading values in LoginContent.

function LoginLoading() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Code2 className="size-7" />
        </div>
        <Spinner className="size-6" />
        <p className="text-sm text-muted-foreground">
          Preparing your workspace...
        </p>
      </div>
    </div>
  );
}

function LoginContent() {
  const params = useSearchParams();
  const router = useRouter();

  const error = params.get("error");
  const next = params.get("next") || "/dashboard";

  // Replace these placeholders with your real authentication hook.
  const user = null;
  const isLoading = false;

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(
        next.startsWith("/") && !next.startsWith("//")
          ? next
          : "/dashboard"
      );
    }
  }, [user, isLoading, next, router]);

  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-background text-foreground">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 size-[420px] rounded-full bg-violet-500/[0.12] blur-[120px]" />
        <div className="absolute -right-40 top-1/3 size-[420px] rounded-full bg-primary/[0.12] blur-[120px]" />
        <div className="absolute bottom-[-180px] left-1/3 size-[380px] rounded-full bg-indigo-500/[0.10] blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.22)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.22)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex h-16 items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          aria-label="DevSarthi home"
          className="flex items-center gap-3"
        >
          <BrandMark />
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-muted-foreground sm:inline">
            New to DevSarthi?
          </span>
          <a
            href="#sign-in"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Get started <span aria-hidden="true">↗</span>
          </a>
          <ModeToggle />
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_440px] lg:gap-20 lg:py-16">
        {/* Left content */}
        <section className="mx-auto w-full max-w-2xl lg:mx-0">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3.5 py-2 text-sm shadow-sm backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-40" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-muted-foreground">
              Your development workflow, upgraded
            </span>
          </div>

          <h1 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Your codebase.
            <br />
            Your questions.
            <br />
            <span className="bg-gradient-to-r from-primary via-violet-500 to-indigo-400 bg-clip-text text-transparent">
              Clear answers.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            Connect your GitHub account and bring your repositories into a
            workspace designed to help you understand code, trace dependencies,
            and build with confidence.
          </p>

          {/* Feature highlights */}
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card/60 p-4 backdrop-blur-sm">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">AI code insights</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Make unfamiliar code easier to understand.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card/60 p-4 backdrop-blur-sm">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                <GitBranch className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Repository context</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Explore project structure and dependencies.
                </p>
              </div>
            </div>
          </div>

          {/* Code window */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-border/80 bg-card/80 shadow-2xl shadow-primary/[0.06] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-border/80 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-red-400" />
                <span className="size-2.5 rounded-full bg-yellow-400" />
                <span className="size-2.5 rounded-full bg-green-400" />
                <span className="ml-2 text-xs font-medium text-muted-foreground">
                  src/app/page.tsx
                </span>
              </div>
              <span className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                <Sparkles className="size-3" />
                AI workspace
              </span>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
              <div className="min-w-0 space-y-2 overflow-hidden p-4 font-mono text-[11px] leading-6 sm:p-5 sm:text-xs">
                <p className="text-violet-500">
                  <span className="mr-3 text-muted-foreground/60">01</span>
                  function understandCode() {"{"}
                </p>
                <p className="whitespace-nowrap pl-3 text-muted-foreground">
                  <span className="mr-3 text-muted-foreground/60">02</span>
                  const context = project;
                </p>
                <p className="whitespace-nowrap pl-3 text-sky-500">
                  <span className="mr-3 text-muted-foreground/60">03</span>
                  return clarity(context);
                </p>
                <p className="text-violet-500">
                  <span className="mr-3 text-muted-foreground/60">04</span>
                  {"}"}
                </p>
              </div>

              <div className="m-3 flex min-w-0 flex-col justify-center rounded-xl border border-primary/15 bg-primary/[0.04] p-3 sm:m-4 sm:p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Terminal className="size-4" />
                  </div>
                  <span className="text-xs font-semibold">DevSarthi AI</span>
                </div>

                <p className="text-xs leading-5 text-muted-foreground">
                  Ready to explore your codebase and help you find your next
                  step.
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-3.5 shrink-0" />
                  Ready for your next idea
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" />
              GitHub authentication
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="size-4 text-primary" />
              Developer-focused workflow
            </span>
          </div>
        </section>

        {/* Login card */}
        <section id="sign-in" className="mx-auto w-full max-w-md scroll-mt-24">
          <Card className="relative overflow-hidden rounded-3xl border-border/70 bg-card/90 shadow-2xl shadow-foreground/[0.06] backdrop-blur-2xl">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-violet-500 to-indigo-400" />

            <CardHeader className="space-y-5 px-6 pb-4 pt-9 text-center sm:px-8">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-border bg-foreground text-background shadow-lg shadow-foreground/10">
                <GitHubIcon className="size-8" />
              </div>

              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Welcome to DevSarthi
                </CardTitle>
                <CardDescription className="mx-auto max-w-xs text-sm leading-6">
                  Sign in with GitHub to get started with your coding
                  workspace.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 px-6 pb-8 sm:px-8">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="size-4" />
                  <AlertTitle>Sign-in failed</AlertTitle>
                  <AlertDescription>
                    We couldn&apos;t complete your sign-in. Please try again.
                  </AlertDescription>
                </Alert>
              )}

              <a
                href={getGithubLoginUrl()}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 w-full rounded-xl bg-foreground text-background shadow-sm transition-all hover:bg-foreground/90 hover:shadow-md"
                )}
              >
                <GitHubIcon className="mr-2 size-5" />
                Continue with GitHub
                <ArrowRight className="ml-2 size-4" />
              </a>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Secure sign in
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Sign in with confidence
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Authentication is handled through your configured
                      GitHub login flow. Repository access depends on the
                      permissions you authorize.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs leading-5 text-muted-foreground">
                By continuing, you agree to use DevSarthi responsibly and
                authorize the requested GitHub permissions.
              </p>

              <div className="text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Back to home
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Built for developers who love to build.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/60 px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} DevSarthi. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Made for the people who build the future.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
}
