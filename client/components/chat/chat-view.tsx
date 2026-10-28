"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { ChatComposer } from "@/components/chat/chat-composer";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { IndexingState } from "@/components/chat/indexing-state";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useChatMessages,
  useChatSessions,
  useCreateChatSession,
  useStreamChat,
} from "@/hooks/use-chat";
import { useIndexStatus, useRepository } from "@/hooks/use-repos";

export function ChatView({ repoId }: { repoId: string }) {
  const repoQuery = useRepository(repoId);
  const isIndexing = repoQuery.data?.indexStatus === "INDEXING";
  const statusQuery = useIndexStatus(
    repoId,
    isIndexing || repoQuery.data?.indexStatus === "PENDING"
  );

  const indexStatus =
    statusQuery.data?.indexStatus ?? repoQuery.data?.indexStatus;
  const ready = indexStatus === "READY";

  const sessionsQuery = useChatSessions(repoId, ready);
  const createSession = useCreateChatSession(repoId);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );
  const autoCreateRef = useRef(false);

  const sessionId =
    selectedSessionId ?? sessionsQuery.data?.[0]?.id ?? null;

  const messagesQuery = useChatMessages(sessionId);
  const { send, stop, streaming, streamText } = useStreamChat(sessionId);

  useEffect(() => {
    if (!ready || sessionsQuery.isLoading) return;
    if (sessionsQuery.data && sessionsQuery.data.length > 0) return;
    if (
      !sessionsQuery.isSuccess ||
      (sessionsQuery.data?.length ?? 0) > 0 ||
      autoCreateRef.current
    ) {
      return;
    }

    autoCreateRef.current = true;
    createSession.mutate(undefined, {
      onSuccess: (session) => setSelectedSessionId(session.id),
      onError: () => {
        autoCreateRef.current = false;
      },
    });
  }, [
    ready,
    sessionsQuery.isLoading,
    sessionsQuery.isSuccess,
    sessionsQuery.data,
    createSession,
  ]);

  if (repoQuery.isLoading) {
    return (
      <AppShell title="Loading chat…">
        <div className="grid flex-1 gap-4 p-4 md:grid-cols-[18rem_1fr]">
          <Skeleton className="min-h-80 rounded-2xl" />
          <Skeleton className="min-h-80 rounded-2xl" />
        </div>
      </AppShell>
    );
  }

  if (repoQuery.isError || !repoQuery.data) {
    return (
      <AppShell title="Repository unavailable">
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8">
          <p className="text-sm text-muted-foreground">
            {(repoQuery.error as Error)?.message ?? "Repository not found"}
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"> Back to dashboard
          </Link>
        </div>
      </AppShell>
    );
  }

  const repo = repoQuery.data;

  return (
    <AppShell
      title={repo.fullName}
      description={
        ready
          ? "Ask questions grounded in this repository"
          : "Waiting for indexing to finish"
      }
      actions={
        <Link
        href="/dashboard"
        className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Repos
      </Link>
      }
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
        <ChatSidebar
          repo={{
            ...repo,
            indexStatus: indexStatus ?? repo.indexStatus,
            filesProcessed:
              statusQuery.data?.filesProcessed ?? repo.filesProcessed,
            filesTotal: statusQuery.data?.filesTotal ?? repo.filesTotal,
            chunkCount: statusQuery.data?.chunkCount ?? repo.chunkCount,
            errorMessage: statusQuery.data?.errorMessage ?? repo.errorMessage,
          }}
          sessionId={sessionId}
          onSelectSession={setSelectedSessionId}
        />

        <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          {!ready ? (
            <IndexingState repo={repo} status={statusQuery.data} />
          ) : (
            <>
              <ChatMessages
                repo={repo}
                messages={messagesQuery.data ?? []}
                streamText={streamText}
                isLoading={messagesQuery.isLoading}
              />
              <div className="shrink-0 border-t">
                <ChatComposer
                  disabled={!sessionId}
                  streaming={streaming}
                  onSend={send}
                  onStop={stop}
                />
              </div>
            </>
          )}
        </section>
      </div>
    </AppShell>
  );
}