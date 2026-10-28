
"use client";

import { ChatView } from "@/components/chat/chat-view";
import { RequireAuth } from "@/components/providers/require-auth";

export default function ChatPageClient({
  repoId,
}: {
  repoId: string;
}) {
  return (
    <RequireAuth>
      <ChatView repoId={repoId} />
    </RequireAuth>
  );
}
