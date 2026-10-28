
import { Suspense } from "react";
import ChatPageClient from "./chat-page-client";

export default function ChatPage({
  params,
}: {
  params: Promise<{ repoId: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatPageContent params={params} />
    </Suspense>
  );
}

async function ChatPageContent({
  params,
}: {
  params: Promise<{ repoId: string }>;
}) {
  const { repoId } = await params;

  return <ChatPageClient repoId={repoId} />;
}
