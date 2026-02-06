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
        <span className="inline-flex w-6 h-6 shrink-0 items-center justify-center">
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="text-foreground/70 hover:text-foreground"
            size="xl"
          />
        </span>
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Add property">
        <p className="text-foreground/70 text-sm">
          Add your property form or content here.
        </p>
      </Modal>
    </>
  );
}
