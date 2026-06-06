import { NewNote, Note } from "@/types/note";
import axios from "axios";
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${myKey}`;

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  searchQuery: string,
  currentPage: number,
  searchTag?: string,
): Promise<NotesResponse> {
  const { data } = await axios.get<NotesResponse>(`/notes`, {
    params: {
      search: searchQuery,
      page: currentPage,
      tag: searchTag,
    },
  });
  return data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const { data } = await axios.get<Note>(`/notes/${noteId}`);
  return data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const { data } = await axios.post<Note>(`/notes`, newNote);
  return data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await axios.delete<Note>(`/notes/${noteId}`);
  return data;
}
