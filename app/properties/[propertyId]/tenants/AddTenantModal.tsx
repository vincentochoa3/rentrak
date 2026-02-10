"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/Modal";

const inputClass =
  "w-full px-3.5 py-2.5 rounded-lg border border-black/10 dark:border-white/15 bg-white/5 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-colors";

type TenantRow = {
  firstName: string;
  lastName: string;
  rentAmount: string;
  unit?: string;
};

export default function AddTenantModal({ propertyId }: { propertyId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tenants, setTenants] = useState<TenantRow[]>([
    { firstName: "", lastName: "", rentAmount: "", unit: "" },
  ]);

  function handleClose() {
    setOpen(false);
    setError(null);
    setTenants([{ firstName: "", lastName: "", rentAmount: "", unit: "" }]);
  }

  function addRow() {
    setTenants((t) => [
      ...t,
      { firstName: "", lastName: "", rentAmount: "", unit: "" },
    ]);
  }

  function removeRow(index: number) {
    if (tenants.length <= 1) return;
    setTenants((t) => t.filter((_, i) => i !== index));
  }

  function updateRow(index: number, field: keyof TenantRow, value: string) {
    setTenants((t) =>
      t.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    // Send all rows; only omit rows that are completely empty (placeholder rows).
    const payload = tenants.map((t) => ({
      firstName: t.firstName.trim(),
      lastName: t.lastName.trim(),
      rentAmount: t.rentAmount.trim() === "" ? undefined : Number(t.rentAmount),
      unit: t.unit?.trim(),
    }));

    if (payload.length === 0) {
      setError(
        "Add at least one tenant with first name, last name, and a valid rent amount.",
      );
      return;
    }
    // API will validate each entry and return 400 if any are incomplete.
    setLoading(true);
    try {
      const res = await fetch(`/api/properties/${propertyId}/tenants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ tenants: payload }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          (data as { error?: string }).error ?? "Something went wrong",
        );
      }
      handleClose();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
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
        aria-label="Add tenant"
      >
        <span className="inline-flex w-6 h-6 shrink-0 items-center justify-center">
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="text-foreground/70 hover:text-foreground"
            size="xl"
          />
        </span>
      </button>
      <Modal open={open} onClose={handleClose} title="Add tenants">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
            {tenants.map((row, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 p-3 rounded-lg border border-black/10 dark:border-white/15"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground/80">
                    Tenant {index + 1}
                  </span>
                  {tenants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRow(index)}
                      className="text-foreground/50 hover:text-red-600 dark:hover:text-red-400 p-1"
                      aria-label="Remove tenant"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-foreground/90">
                      First name
                    </span>
                    <input
                      type="text"
                      value={row.firstName}
                      onChange={(e) =>
                        updateRow(index, "firstName", e.target.value)
                      }
                      placeholder="First name"
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-foreground/90">
                      Last name
                    </span>
                    <input
                      type="text"
                      value={row.lastName}
                      onChange={(e) =>
                        updateRow(index, "lastName", e.target.value)
                      }
                      placeholder="Last name"
                      className={inputClass}
                    />
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-foreground/90">
                      Rent amount
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={row.rentAmount}
                      onChange={(e) =>
                        updateRow(index, "rentAmount", e.target.value)
                      }
                      placeholder="0.00"
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-foreground/90">
                      Unit (optional)
                    </span>
                    <input
                      type="text"
                      value={row.unit}
                      onChange={(e) => updateRow(index, "unit", e.target.value)}
                      placeholder="e.g. 107A"
                      className={inputClass}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addRow}
            className="text-sm text-foreground/70 hover:text-foreground hover:underline flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faCirclePlus} />
            Add another tenant
          </button>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full py-2.5 bg-primary font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Adding…" : "Add tenants"}
          </button>
        </form>
      </Modal>
    </>
  );
}
