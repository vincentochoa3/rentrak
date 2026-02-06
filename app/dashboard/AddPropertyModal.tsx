"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/Modal";

const inputClass =
  "w-full px-3.5 py-2.5 rounded-lg border border-black/10 dark:border-white/15 bg-white/5 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-colors";

export default function AddPropertyModalTrigger() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  function handleClose() {
    setOpen(false);
    setError(null);
    setForm({ name: "", address: "", city: "", state: "", zip: "", country: "" });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }
      handleClose();
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

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
      <Modal open={open} onClose={handleClose} title="Add property">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground/90">Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. 123 Main St"
              required
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground/90">Address</span>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              placeholder="Street address"
              required
              className={inputClass}
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-foreground/90">City</span>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                placeholder="City"
                required
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-foreground/90">State</span>
              <input
                type="text"
                value={form.state}
                onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                placeholder="State"
                required
                className={inputClass}
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-foreground/90">ZIP</span>
              <input
                type="text"
                value={form.zip}
                onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))}
                placeholder="ZIP"
                required
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-foreground/90">Country</span>
              <input
                type="text"
                value={form.country}
                onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                placeholder="Country"
                required
                className={inputClass}
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full py-2.5 bg-primary font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Adding…" : "Add property"}
          </button>
        </form>
      </Modal>
    </>
  );
}
