"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/Modal";

export default function AddPropertyModalTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hover:text-foreground hover:underline"
        aria-label="Add property"
      >
        <FontAwesomeIcon
          icon={faCirclePlus}
          className="w-6 h-6 text-foreground/70 hover:text-foreground"
        />
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Add property">
        <p className="text-foreground/70 text-sm">
          Add your property form or content here.
        </p>
      </Modal>
    </>
  );
}
