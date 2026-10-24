"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, ExternalLink, MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";
import PreviewModal, { EASE, INK, MUTED } from "./PreviewModal";
import GithubMark from "./icons/GithubMark";

/*
 * A look at the GitHub profile before leaving the site: avatar, bio, counts and
 * the most recently updated repositories, read live from GitHub's public API
 * when the popup opens (and kept for the visit). If GitHub can't be reached it
 * falls back to a plain card with the link, so the button never dead-ends.
 */

const LOGIN = "rohit19982026";
const PROFILE_URL = "https://github.com/rohit19982026?tab=repositories";
const CACHE_KEY = "gh-preview";
const CACHE_MS = 30 * 60 * 1000;
const MAX_REPOS = 6;

type User = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
};
type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};
type Data = { user: User; repos: Repo[] };

const LANG_COLOR: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572a5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  Shell: "#89e051",
  "Jupyter Notebook": "#da5b0b",
  SQL: "#e38c00",
};

function ago(iso: string) {
  const d = Math.max(0, Date.now() - new Date(iso).getTime());
  const day = 86400000;
  if (d < day) return "today";
  if (d < 2 * day) return "yesterday";
  if (d < 30 * day) return `${Math.floor(d / day)} days ago`;
  if (d < 365 * day) return `${Math.floor(d / (30 * day))} mo ago`;
  return `${Math.floor(d / (365 * day))} yr ago`;
}

async function load(signal: AbortSignal): Promise<Data> {
  try {
    const c = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? "null");
    if (c && Date.now() - c.t < CACHE_MS) return c.data as Data;
  } catch {}
  const [u, r] = await Promise.all([
    fetch(`https://api.github.com/users/${LOGIN}`, { signal }),
    fetch(`https://api.github.com/users/${LOGIN}/repos?per_page=100&sort=pushed`, { signal }),
  ]);
  if (!u.ok || !r.ok) throw new Error("github");
  const user = (await u.json()) as User;
  const all = (await r.json()) as Repo[];
  const repos = all
    .filter((x) => !x.fork)
    .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at))
    .slice(0, MAX_REPOS);
  const data = { user, repos };
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data }));
  } catch {}
  return data;
}

const rise: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } } };

function Skeleton({ className }: { className: string }) {
  return <span className={`block animate-pulse rounded-lg ${className}`} style={{ background: "#e4e0f2" }} />;
}

export default function GitHubPreview({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  const [state, setState] = useState<{ status: "loading" } | { status: "error" } | { status: "ready"; data: Data }>({ status: "loading" });

  useEffect(() => {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), 8000);
    load(ac.signal)
      .then((data) => setState({ status: "ready", data }))
      .catch(() => setState({ status: "error" }))
      .finally(() => clearTimeout(timer));
    return () => {
      clearTimeout(timer);
      ac.abort();
    };
  }, []);

  const data = state.status === "ready" ? state.data : null;
  const user = data?.user;

  return (
    <PreviewModal
      onClose={onClose}
      title="GitHub"
      subtitle="Preview"
      subtitleDesktopOnly={`@${LOGIN}`}
      maxWidth={720}
      actions={
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center gap-2 rounded-full px-4 font-sans text-[12px] font-bold uppercase tracking-[0.05em] transition-transform motion-safe:hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d36f5]"
          style={{ background: "linear-gradient(180deg, #e3ff66 0%, #d7ff3f 100%)", color: INK, boxShadow: "0 10px 20px -12px rgba(160,210,0,0.9)" }}
        >
          <ExternalLink size={15} />
          Open
        </a>
      }
    >
      <motion.div variants={stagger} initial={reduce ? false : "hidden"} animate="show" className="mx-auto max-w-[620px] px-3 py-5 sm:px-6 sm:py-7">
        {/* profile */}
        <motion.section
          variants={rise}
          className="flex items-start gap-4 rounded-[1.4rem] bg-white p-4 sm:gap-5 sm:p-6"
          style={{ border: "1px solid rgba(40,30,90,0.07)", boxShadow: "0 20px 40px -28px rgba(30,20,90,0.35)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user?.avatar_url ? `${user.avatar_url}&s=200` : `https://github.com/${LOGIN}.png?size=200`}
            alt=""
            width={84}
            height={84}
            className="h-16 w-16 shrink-0 rounded-full sm:h-[84px] sm:w-[84px]"
            style={{ border: "3px solid #fff", boxShadow: "0 8px 20px -10px rgba(30,20,90,0.5), 0 0 0 1px rgba(40,30,90,0.08)", background: "#ece8fa" }}
          />
          <div className="min-w-0 flex-1">
            {user ? (
              <>
                <h3 className="font-sans text-[20px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[24px]" style={{ color: INK }}>
                  {user.name ?? user.login}
                </h3>
                <p className="mt-0.5 font-sans text-[14px]" style={{ color: MUTED }}>
                  @{user.login}
                </p>
                {user.bio && (
                  <p className="mt-2.5 font-sans text-[14.5px] leading-relaxed" style={{ color: "#3c3f52" }}>
                    {user.bio}
                  </p>
                )}
                {user.location && (
                  <p className="mt-2 inline-flex items-center gap-1.5 font-sans text-[13px]" style={{ color: MUTED }}>
                    <MapPin size={14} /> {user.location}
                  </p>
                )}
              </>
            ) : state.status === "loading" ? (
              <div className="space-y-2.5 pt-1">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <>
                <h3 className="font-sans text-[20px] font-extrabold leading-tight tracking-[-0.02em]" style={{ color: INK }}>
                  Rohit Kumar Singh
                </h3>
                <p className="mt-0.5 font-sans text-[14px]" style={{ color: MUTED }}>
                  @{LOGIN}
                </p>
                <p className="mt-2.5 font-sans text-[14.5px] leading-relaxed" style={{ color: MUTED }}>
                  GitHub didn&apos;t respond just now, so the live preview isn&apos;t available. The profile is one tap away.
                </p>
              </>
            )}
          </div>
        </motion.section>

        {user && (
          <motion.ul variants={rise} className="mt-3 grid grid-cols-3 gap-3">
            {[
              ["Repositories", user.public_repos],
              ["Followers", user.followers],
              ["Following", user.following],
            ].map(([label, n]) => (
              <li
                key={label}
                className="rounded-2xl bg-white px-3 py-3 text-center"
                style={{ border: "1px solid rgba(40,30,90,0.07)" }}
              >
                <p className="font-sans text-[20px] font-extrabold tabular-nums leading-none" style={{ color: INK }}>
                  {n}
                </p>
                <p className="mt-1.5 font-sans text-[11.5px] font-medium" style={{ color: MUTED }}>
                  {label}
                </p>
              </li>
            ))}
          </motion.ul>
        )}

        {/* repositories */}
        {state.status !== "error" && (
          <motion.p variants={rise} className="mb-3 mt-7 font-sans text-[11.5px] font-bold uppercase tracking-[0.18em]" style={{ color: MUTED }}>
            Recently updated
          </motion.p>
        )}
        {state.status === "loading" && (
          <div className="grid gap-3 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-white p-4" style={{ border: "1px solid rgba(40,30,90,0.07)" }}>
                <Skeleton className="h-5 w-32" />
                <Skeleton className="mt-3 h-3.5 w-full" />
                <Skeleton className="mt-2 h-3.5 w-2/3" />
              </div>
            ))}
          </div>
        )}
        {data && (
          <motion.ul variants={stagger} className="grid gap-3 sm:grid-cols-2">
            {data.repos.length === 0 && (
              <li className="rounded-2xl bg-white p-4 font-sans text-[14px] sm:col-span-2" style={{ color: MUTED, border: "1px solid rgba(40,30,90,0.07)" }}>
                No public repositories to show yet.
              </li>
            )}
            {data.repos.map((r) => (
              <motion.li key={r.name} variants={rise}>
                <a
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl bg-white p-4 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#c9c0ee] hover:shadow-[0_16px_30px_-20px_rgba(30,20,90,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d36f5]"
                  style={{ border: "1px solid rgba(40,30,90,0.08)" }}
                >
                  <span className="flex items-start justify-between gap-2">
                    <span className="min-w-0 break-words font-sans text-[15px] font-bold" style={{ color: "#3d36f5" }}>
                      {r.name}
                    </span>
                    <ArrowUpRight size={16} className="mt-0.5 shrink-0 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-90" style={{ color: INK }} />
                  </span>
                  <span className="mt-1.5 line-clamp-2 font-sans text-[13.5px] leading-snug" style={{ color: MUTED }}>
                    {r.description ?? "No description."}
                  </span>
                  <span className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-3 font-sans text-[12.5px]" style={{ color: MUTED }}>
                    {r.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: LANG_COLOR[r.language] ?? "#9a96b3" }} />
                        {r.language}
                      </span>
                    )}
                    {r.stargazers_count > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <Star size={13} /> {r.stargazers_count}
                      </span>
                    )}
                    <span>Updated {ago(r.pushed_at)}</span>
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}

        <motion.div variants={rise} className="mt-7 flex justify-center">
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2.5 rounded-full px-6 font-sans text-[13px] font-bold uppercase tracking-[0.05em] transition-transform motion-safe:hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d36f5]"
            style={{ background: INK, color: "#fff", boxShadow: "0 16px 28px -16px rgba(13,13,31,0.7)" }}
          >
            <GithubMark className="h-[18px] w-[18px]" />
            Go to my GitHub profile
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </motion.div>
    </PreviewModal>
  );
}
