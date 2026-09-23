"use client";

import { Bell, BellRing } from "lucide-react";
import { useSneakPeakStore } from "@/lib/store";

export function DropReminderButton({ dropId }: { dropId: string }) {
  const reminders = useSneakPeakStore((state) => state.dropReminders);
  const toggleReminder = useSneakPeakStore((state) => state.toggleDropReminder);
  const isActive = reminders.includes(dropId);

  return (
    <button type="button" onClick={() => toggleReminder(dropId)} aria-pressed={isActive} className={`inline-flex h-11 items-center justify-center gap-2 rounded-md border px-4 text-sm font-bold uppercase transition-colors ${isActive ? "border-brand-red bg-brand-red text-white" : "border-brand-ink bg-transparent text-brand-ink hover:bg-brand-ink hover:text-brand-bone"}`}>
      {isActive ? <BellRing className="h-4 w-4" aria-hidden="true" /> : <Bell className="h-4 w-4" aria-hidden="true" />}
      {isActive ? "Reminder on" : "Remind me"}
    </button>
  );
}
