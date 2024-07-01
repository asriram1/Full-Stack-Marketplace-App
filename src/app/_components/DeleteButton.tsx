"use client";
import { deleteAd } from "@/app/_actions/adActions";
import { faCancel, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  label: string;
  id: string;
};

export default function DeleteButton({ label, id }: Props) {
  const [showConfirm, setShowConfirm] = useState<Boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<Boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (confirmDelete) {
      onDelete();
      router.push("/");
    }
  }, [confirmDelete === true]);

  async function onDelete() {
    await deleteAd(id);
  }

  if (showConfirm) {
    return (
      <div className="fixed bg-black/50 inset-0 flex items-center h-full justify-center">
        <div className=" bg-white p-4 rounded-lg">
          <div className="">Are you sure you want to delete?</div>
          <div className="flex gap-2 mt-3 items-center justify-center">
            <button
              type="button"
              className="bg-gray-400 px-4 py-2 rounded-xl text-white text-xs flex gap-2 items-center"
              onClick={() => setShowConfirm(false)}
            >
              <FontAwesomeIcon className="size-2" icon={faCancel} />
              Cancel{" "}
            </button>
            <button
              onClick={() => {
                setShowConfirm(false);
                setConfirmDelete(true);
              }}
              type="button"
              className="bg-red-400 px-4 py-2 rounded-xl text-white text-xs flex gap-2 items-center"
            >
              <FontAwesomeIcon className="size-2" icon={faTrash} />
              Yes,&nbsp;delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="bg-red-400 px-4 py-2 rounded-xl text-white text-xs flex gap-2 items-center"
      onClick={() => setShowConfirm(true)}
    >
      <FontAwesomeIcon className="size-2" icon={faTrash} />
      <span>{label}</span>
    </button>
  );
}
