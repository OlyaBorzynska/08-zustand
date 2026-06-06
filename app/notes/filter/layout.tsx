import css from "./LayoutNotes.module.css";

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function NoteListLayout({ children, sidebar }: Props) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
}
