"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./NotesPage.module.css";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Pagination from "@/components/Pagination/Pagination";

interface NotesClientProps {
  searchTag: string | undefined;
}

export default function NotesClient({ searchTag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data, isLoading, isError, isSuccess, isFetching } = useQuery({
    queryKey: ["notes", searchQuery, currentPage, searchTag],
    queryFn: () => fetchNotes(searchQuery, currentPage, searchTag),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
      setCurrentPage(1);
    },
    300,
  );

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox inputValue={searchQuery} handleChange={handleChange} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>
      {isOpenModal && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {(isLoading || isFetching) && <Loader />}
      {isError && <ErrorMessage />}
    </div>
  );
}
