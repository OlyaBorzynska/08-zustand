import css from "./SidebarNotes.module.css";

export default function SidebarNotes() {
  const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        {" "}
        <a href={`/notes/filter/all`} className={css.menuLink}>
          All notes{" "}
        </a>{" "}
      </li>
      {tags.map((tag, index) => (
        <li className={css.menuItem} key={index}>
          {" "}
          <a href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}{" "}
          </a>{" "}
        </li>
      ))}
    </ul>
  );
}
