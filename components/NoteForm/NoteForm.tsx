"use client";

import { useId } from "react";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewNote } from "../../types/note";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleCancel = () => router.push("/notes/filter/all");

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({ ...draft, [event.target.name]: event.target.value });
  };

  const createMutation = useMutation({
    mutationFn: (newNote: NewNote) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      handleCancel();
      clearDraft();
    },
  });

  function handleSubmit(formData: FormData) {
    const values: NewNote = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as
        | "Todo"
        | "Work"
        | "Personal"
        | "Meeting"
        | "Shopping",
    };
    createMutation.mutate(values);
  }

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={handleCancel}
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={createMutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
