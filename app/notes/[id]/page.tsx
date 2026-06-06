import { fetchNoteById } from "@/lib/api";
import NoteDetailClient from "./NoteDetails.client";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);
  return {
    title: `Note: ${note.title}`,
    description: `${note.content}`,
    openGraph: {
      title: `Note: ${note.title}`,
      description: `${note.content}`,
      url: `https://08-zustand-five-rust.vercel.app/notes/${note.id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Note: ${note.title}`,
        },
      ],
    },
  };
}

export default async function NoteDetails({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailClient />
    </HydrationBoundary>
  );
}
