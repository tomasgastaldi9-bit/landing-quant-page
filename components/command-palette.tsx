"use client";

import { alphaCandidates } from "@/lib/alpha-lab/candidates";
import {
  getNavigationSearchText,
  getRouteAudience,
  type NavigationGroup,
  type NavigationRoute,
  searchableNavigationRoutes,
} from "@/lib/navigation/routes";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type CommandItem = {
  group: NavigationGroup | "Candidates";
  href: string;
  label: string;
  meta: string;
  audience?: string;
  aliases?: string[];
  keywords?: string[];
  shortcut?: string;
  searchText?: string;
};

function routeToCommand(route: NavigationRoute): CommandItem {
  return {
    group: route.group,
    href: route.href,
    label: route.label,
    meta: route.description,
    audience: getRouteAudience(route),
    aliases: route.aliases,
    keywords: route.keywords,
    shortcut: route.shortcut,
    searchText: getNavigationSearchText(route),
  };
}

const baseCommands: CommandItem[] = searchableNavigationRoutes.map(routeToCommand);

const candidateCommands: CommandItem[] = alphaCandidates.map((candidate) => ({
  group: "Candidates",
  href: `/alpha-lab/${candidate.slug}`,
  label: candidate.name,
  meta: `${candidate.family} / ${candidate.stage}`,
  aliases: [candidate.slug, candidate.name.toLowerCase(), candidate.family.toLowerCase()],
  keywords: ["alpha candidate", "research", "validation", candidate.stage],
}));

const commands = [...baseCommands, ...candidateCommands];
const groupOrder: CommandItem["group"][] = [
  "Client",
  "Operator",
  "Research",
  "Account",
  "Legal",
  "Candidates",
];

function getCommandSearchText(command: CommandItem) {
  return [
    command.label,
    command.meta,
    command.group,
    command.audience,
    command.href,
    command.shortcut,
    ...(command.aliases ?? []),
    ...(command.keywords ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function getCommandScore(command: CommandItem, query: string) {
  const aliases = command.aliases ?? [];
  const normalizedAliases = aliases.map((alias) => alias.toLowerCase());
  const normalizedLabel = command.label.toLowerCase();
  const normalizedHref = command.href.toLowerCase();

  if (normalizedAliases.includes(query)) return 100;
  if (query.startsWith("/") && normalizedAliases.some((alias) => alias.startsWith(query))) {
    return 90;
  }
  if (normalizedLabel === query || normalizedHref === query) return 80;
  if (normalizedLabel.startsWith(query)) return 70;
  if (normalizedAliases.some((alias) => alias.includes(query))) return 65;
  if ((command.searchText ?? getCommandSearchText(command)).includes(query)) return 40;

  return 0;
}

function getCommandId(command: CommandItem) {
  return `${command.group}:${command.href}:${command.label}`;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandRefs = useRef(new Map<string, HTMLButtonElement>());
  const router = useRouter();

  const filteredCommands = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) return commands;

    return commands
      .map((command) => ({
        command,
        score: getCommandScore(command, normalized),
      }))
      .filter((item) => item.score > 0)
      .sort((left, right) => right.score - left.score)
      .map((item) => item.command);
  }, [query]);

  const groupedCommands = useMemo(
    () =>
      groupOrder
        .map((group) => ({
          group,
          items: filteredCommands.filter((command) => command.group === group),
        }))
        .filter((group) => group.items.length > 0),
    [filteredCommands],
  );

  const selectableCommands = useMemo(
    () => groupedCommands.flatMap((group) => group.items),
    [groupedCommands],
  );
  const safeActiveIndex =
    selectableCommands.length === 0
      ? 0
      : Math.min(activeIndex, selectableCommands.length - 1);

  useEffect(() => {
    function openPalette() {
      setActiveIndex(0);
      setQuery("");
      setIsOpen(true);
    }

    function handleKeyDown(event: KeyboardEvent) {
      const isCommandKey = event.metaKey || event.ctrlKey;

      if (isCommandKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((current) => {
          const next = !current;
          if (next) {
            setActiveIndex(0);
            setQuery("");
          }
          return next;
        });
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("quantbot:open-command-palette", openPalette);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("quantbot:open-command-palette", openPalette);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => inputRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || selectableCommands.length === 0) return;

    const activeCommand = selectableCommands[safeActiveIndex];
    if (!activeCommand) return;

    commandRefs.current
      .get(getCommandId(activeCommand))
      ?.scrollIntoView({ block: "nearest" });
  }, [isOpen, safeActiveIndex, selectableCommands]);

  function closePalette() {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
  }

  function navigateTo(command: CommandItem | undefined) {
    if (!command) return;
    closePalette();
    router.push(command.href);
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        selectableCommands.length === 0 ? 0 : (index + 1) % selectableCommands.length,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        selectableCommands.length === 0
          ? 0
          : (index - 1 + selectableCommands.length) % selectableCommands.length,
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();
      navigateTo(selectableCommands[safeActiveIndex]);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        aria-label="Close command palette"
        className="absolute inset-0 cursor-default bg-[rgba(0,0,0,0.78)]"
        onClick={closePalette}
        type="button"
      />
      <div
        aria-label="Command palette"
        aria-modal="true"
        className="absolute left-1/2 top-20 w-[min(94vw,760px)] -translate-x-1/2 overflow-hidden rounded-3xl border border-[#243042] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(14,14,14,0.98),rgba(5,5,5,0.96))] bg-[size:32px_32px,32px_32px,auto] shadow-[0_12px_34px_rgba(0,0,0,0.34)]"
        role="dialog"
      >
        <div className="border-b border-[#243042] p-4">
          <div className="flex items-center gap-3 rounded-2xl border border-[#243042] bg-[#050505]/88 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <span className="font-mono text-[var(--accent-primary)]">/</span>
            <input
              aria-label="Search commands"
              className="min-w-0 flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-[#6f7485]"
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder="Search QuantBot commands, pages, candidates..."
              ref={inputRef}
              value={query}
            />
            <kbd className="hidden rounded-lg border border-[#424655] bg-[#0e0e0e] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8c90a1] sm:inline-flex">
              Esc
            </kbd>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6f7485]">
            <span>Search QuantBot workspace</span>
            <span>Cmd/Ctrl K</span>
          </div>
        </div>

        <div className="max-h-[62vh] overflow-y-auto p-3">
          {groupedCommands.length === 0 ? (
            <div className="rounded-2xl border border-[#243042] bg-[#050505]/76 p-6 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-[#8c90a1]">
              No matching route or command found.
            </div>
          ) : (
            <div className="grid gap-3">
              {groupedCommands.map((group) => (
                <section key={group.group}>
                  <div className="px-2 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-primary)]">
                    {group.group}
                  </div>
                  <div className="grid gap-1">
                    {group.items.map((command) => {
                      const commandId = getCommandId(command);
                      const commandIndex = selectableCommands.findIndex(
                        (item) => getCommandId(item) === commandId,
                      );
                      const isActive = commandIndex === safeActiveIndex;

                      return (
                        <button
                          className={`group grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border px-3 py-3 text-left transition duration-150 ${
                            isActive
                              ? "border-[var(--accent-primary)]/50 bg-[var(--accent-soft)] shadow-[inset_0_1px_0_rgb(var(--accent-primary-rgb)/0.06)]"
                              : "border-transparent bg-[#050505]/46 hover:border-[#243042] hover:bg-[#0e0e0e]/80"
                          }`}
                          key={commandId}
                          onClick={() => navigateTo(command)}
                          onMouseEnter={() => setActiveIndex(commandIndex)}
                          ref={(element) => {
                            if (element) {
                              commandRefs.current.set(commandId, element);
                            } else {
                              commandRefs.current.delete(commandId);
                            }
                          }}
                          type="button"
                        >
                          <span
                            className={`size-2 rounded-full ${
                              isActive
                                ? "bg-[var(--accent-primary)] shadow-[0_0_8px_rgb(var(--accent-primary-rgb)/0.18)]"
                                : "bg-[#424655]"
                            }`}
                          />
                          <span className="min-w-0">
                            <span className="block truncate font-mono text-sm uppercase tracking-[0.08em] text-white">
                              {command.label}
                            </span>
                            <span className="mt-1 block truncate text-sm text-[#8c90a1]">
                              {command.meta}
                            </span>
                          </span>
                          <span className="flex items-center gap-2">
                            {command.shortcut ? (
                              <kbd className="rounded-lg border border-[#243042] bg-[#050505]/88 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8c90a1]">
                                {command.shortcut}
                              </kbd>
                            ) : null}
                            <span className="font-mono text-xs text-[var(--accent-primary)]">
                              -&gt;
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
