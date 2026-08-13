"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
  CloseIcon,
  CopyIcon,
  ExternalLinkIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  PlayIcon,
  QrCodeIcon,
  ShareIcon,
  ShieldIcon,
  TiktokIcon,
  TrophyIcon,
  UsersIcon,
  YoutubeIcon,
  CpuIcon,
  RadioIcon,
  CodeIcon,
} from "@/components/shared/Icons";

export function BioLinkPage() {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeContactModal, setActiveContactModal] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://arocpl.com/links";
    const shareData = {
      title: "AROC POLINEMA — Link in Bio",
      text: "Advance Robosoccer Polinema | Tim Robot Humanoid POLINEMA Malang",
      url,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or share failed, fallback to copy
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const socialLinks = [
    {
      id: "website",
      title: "Our Website",
      subtitle: "Web Resmi AROC POLINEMA",
      url: "/",
      icon: GlobeIcon,
      badge: "Official",
      tone: "cyan",
      isInternal: true,
    },
    {
      id: "instagram",
      title: "Instagram",
      subtitle: "@arocpolinema",
      url: "https://www.instagram.com/arocpolinema?igsh=MXRsanhuemFzZWxpaA==",
      icon: InstagramIcon,
      badge: "Instagram",
      tone: "pink",
      isInternal: false,
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      subtitle: "AROC PL Advance Robot Soccer Polinema",
      url: "https://id.linkedin.com/in/aroc-pl-advance-robot-soccer-polinema-9756b83b5?utm_source=share&utm_medium=member_mweb&utm_campaign=share_via&utm_content=profile",
      icon: LinkedinIcon,
      badge: "Professional",
      tone: "blue",
      isInternal: false,
    },
    {
      id: "tiktok",
      title: "TikTok Official",
      subtitle: "@arocpolinema",
      url: "https://www.tiktok.com/@arocpolinema",
      icon: TiktokIcon,
      badge: "Video Highlights",
      tone: "purple",
      isInternal: false,
    },
    {
      id: "youtube",
      title: "YouTube Channel",
      subtitle: "AROC POLINEMA Official",
      url: "https://youtu.be/ZE8318wfMqY?si=mQyxtvL-DqmnmTDk",
      icon: YoutubeIcon,
      badge: "Channel",
      tone: "red",
      isInternal: false,
    },
  ];

  const quickAccessLinks = [
    {
      id: "robot-3d",
      title: "Robot 3D Showcase",
      subtitle: "Interaktif Simulasi Robot Humanoid",
      url: "/robot-3d",
      icon: CpuIcon,
      badge: "3D View",
      tone: "gold",
    },
    {
      id: "lab",
      title: "AROC Research Lab",
      subtitle: "Divisi & Riset Teknologi Sepak Bola Robot",
      url: "/lab",
      icon: RadioIcon,
      badge: "Riset",
      tone: "cyan",
    },
    {
      id: "press",
      title: "Press Kit & Media Assets",
      subtitle: "Logo, Dokumentasi & Informasi Pers",
      url: "/press",
      icon: CodeIcon,
      badge: "Media",
      tone: "blue",
    },
  ];

  const filteredSocials = socialLinks.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredQuickAccess = quickAccessLinks.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-[var(--navy-black)] text-[var(--cream)] selection:bg-[var(--yellow)] selection:text-[var(--navy-deep)]">
      {/* Background ambient lighting effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 opacity-40">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-[radial-gradient(circle,rgba(42,61,130,0.5)_0%,rgba(3,6,16,0)_70%)] blur-[100px]" />
        <div className="absolute top-[40%] -left-[10%] size-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,228,92,0.15)_0%,rgba(3,6,16,0)_70%)] blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] size-[500px] rounded-full bg-[radial-gradient(circle,rgba(11,23,48,0.8)_0%,rgba(3,6,16,0)_70%)] blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(3,6,16,0.8)_100%)]" />
      </div>

      {/* Grid line background overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Toast Notification */}
      {copied && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-[rgba(255,228,92,0.4)] bg-[rgba(6,9,25,0.95)] px-4 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all animate-bounce">
          <CheckIcon className="size-4.5 text-[var(--yellow)]" />
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--cream)]">
            Link berhasil disalin!
          </span>
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-md px-4 py-6 sm:py-10 flex flex-col items-center">
        {/* Navigation Bar Actions */}
        <header className="w-full flex items-center justify-between mb-8">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-3.5 py-1.5 text-xs font-bold tracking-wider text-[var(--muted)] transition hover:border-[rgba(255,228,92,0.3)] hover:bg-[rgba(255,228,92,0.08)] hover:text-[var(--yellow)]"
          >
            <span>&larr; Web Utama</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQr(true)}
              aria-label="Tampilkan QR Code"
              title="Tampilkan QR Code"
              className="flex size-9 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] text-[var(--muted)] transition hover:border-[rgba(255,228,92,0.3)] hover:bg-[rgba(255,228,92,0.08)] hover:text-[var(--yellow)]"
              type="button"
            >
              <QrCodeIcon className="size-4.5" />
            </button>

            <button
              onClick={handleShare}
              aria-label="Bagikan Link"
              title="Bagikan Link Bio"
              className="flex size-9 items-center justify-center rounded-full border border-[rgba(255,228,92,0.3)] bg-[rgba(255,228,92,0.08)] text-[var(--yellow)] transition hover:scale-105 hover:bg-[var(--yellow)] hover:text-[var(--navy-deep)] shadow-[0_0_15px_rgba(255,228,92,0.15)]"
              type="button"
            >
              {copied ? <CheckIcon className="size-4.5" /> : <ShareIcon className="size-4.5" />}
            </button>
          </div>
        </header>

        {/* Profile Card Header */}
        <section className="w-full text-center flex flex-col items-center mb-8">
          <div className="relative mb-5 group">
            {/* Glowing ring animation */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[var(--yellow)] via-blue-500 to-[var(--yellow-warm)] opacity-70 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />

            <div className="relative size-24 sm:size-28 rounded-full border-2 border-[var(--yellow)] bg-[var(--navy-deep)] overflow-hidden shadow-2xl p-1">
              <Image
                src="/images/logoAROC.jpg"
                alt="AROC POLINEMA Logo"
                width={112}
                height={112}
                className="size-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            
            {/* Verified badge */}
            <div className="absolute bottom-0 right-0 rounded-full bg-[var(--yellow)] text-[var(--navy-black)] p-1.5 shadow-lg border border-[var(--navy-deep)]">
              <ShieldIcon className="size-4" />
            </div>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-wider text-[var(--cream)] mb-1 flex items-center justify-center gap-2">
            AROC POLINEMA
          </h1>

          <p className="font-sans text-xs sm:text-sm font-semibold text-[var(--yellow)] uppercase tracking-widest mb-3">
            Advance Robosoccer Polinema
          </p>

          <p className="font-sans text-xs sm:text-sm text-[var(--muted)] leading-relaxed max-w-xs mb-4">
            Humanoid Robosoccer Team from Politeknik Negeri Malang (POLINEMA)
          </p>

          {/* Achievement Badges */}
          <div className="flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,228,92,0.25)] bg-[rgba(255,228,92,0.06)] px-3 py-1 text-[0.68rem] font-bold tracking-wider text-[var(--yellow)]">
              <TrophyIcon className="size-3.5" /> Juara KRI Humanoid 2024
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(248,247,240,0.12)] bg-[rgba(248,247,240,0.04)] px-3 py-1 text-[0.68rem] font-semibold text-[var(--silver)]">
              <CpuIcon className="size-3.5 text-cyan-400" /> KRSBI-Humanoid
            </span>
          </div>
        </section>

        {/* Quick Search Bar */}
        <div className="w-full mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari link atau info..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(12,23,48,0.6)] px-4 py-2.5 text-xs text-[var(--cream)] placeholder-[var(--muted-dark)] focus:border-[var(--yellow)] focus:bg-[rgba(12,23,48,0.9)] focus:outline-none transition backdrop-blur-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-white"
                type="button"
              >
                <CloseIcon className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* FEATURED: Company Profile Video Card */}
        {(!searchQuery || "company profile video youtube".includes(searchQuery.toLowerCase())) && (
          <section className="w-full mb-6">
            <div className="group relative overflow-hidden rounded-2xl border border-[rgba(255,228,92,0.3)] bg-gradient-to-br from-[rgba(17,29,64,0.9)] via-[rgba(7,16,31,0.95)] to-[rgba(3,6,16,0.95)] p-4 shadow-[0_16px_40px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl transition duration-300 hover:border-[var(--yellow)] hover:shadow-[0_20px_50px_-10px_rgba(255,228,92,0.2)]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-red-600/20 text-red-500 border border-red-500/30">
                    <YoutubeIcon className="size-4" />
                  </span>
                  <span className="text-[0.7rem] font-bold uppercase tracking-widest text-[var(--yellow)]">
                    Featured Profile Video
                  </span>
                </div>
                <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[0.6rem] font-bold text-red-400 border border-red-500/20">
                  YouTube
                </span>
              </div>

              <div className="relative mb-3 aspect-video w-full rounded-xl overflow-hidden bg-black/40 border border-white/10 group-hover:border-[rgba(255,228,92,0.2)] transition">
                <Image
                  src="/images/gallery-1.png"
                  alt="Company Profile AROC"
                  fill
                  className="object-cover opacity-80 group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-black)] via-black/30 to-transparent" />
                
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 group/play"
                  type="button"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-[var(--yellow)] text-[var(--navy-deep)] shadow-lg shadow-yellow-500/30 transition-transform duration-300 group-hover/play:scale-110">
                    <PlayIcon className="size-6 ml-0.5" />
                  </span>
                  <span className="text-[0.7rem] font-bold uppercase tracking-wider text-white drop-shadow">
                    Putar Video Profile
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-base font-bold text-white tracking-wide">
                    Company Profile AROC
                  </h2>
                  <p className="text-[0.7rem] text-[var(--muted)]">
                    YouTube &middot; AROC POLINEMA Official
                  </p>
                </div>
                <a
                  href="https://youtu.be/ZE8318wfMqY?si=mQyxtvL-DqmnmTDk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[0.7rem] font-bold text-[var(--yellow)] hover:underline"
                >
                  Buka App <ExternalLinkIcon className="size-3" />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 1: CONTACT INFORMATION */}
        {(!searchQuery || "contact team leader sponsorship media partner email phone".includes(searchQuery.toLowerCase())) && (
          <section className="w-full mb-6">
            <h2 className="font-display text-xs font-black uppercase tracking-[0.2em] text-[var(--muted)] mb-3 px-1 flex items-center gap-2">
              <UsersIcon className="size-3.5 text-[var(--yellow)]" /> Contact Information
            </h2>

            <div className="grid gap-2.5">
              {/* Team Leader Contact */}
              <div className="group rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(12,23,48,0.7)] p-4 backdrop-blur-md transition duration-300 hover:border-[rgba(255,228,92,0.4)] hover:bg-[rgba(12,23,48,0.95)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[rgba(255,228,92,0.1)] text-[var(--yellow)] border border-[rgba(255,228,92,0.2)]">
                      <UsersIcon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-white tracking-wide">
                        Team Leader
                      </h3>
                      <p className="text-xs text-[var(--muted)]">
                        Contact &middot; General Inquiry
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveContactModal("leader")}
                    className="flex items-center gap-1.5 rounded-xl border border-[rgba(255,228,92,0.3)] bg-[rgba(255,228,92,0.08)] px-3 py-1.5 text-xs font-bold text-[var(--yellow)] transition hover:bg-[var(--yellow)] hover:text-[var(--navy-deep)]"
                    type="button"
                  >
                    Hubungi <PhoneIcon className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* Sponsorship & Media Partner */}
              <div className="group rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(12,23,48,0.7)] p-4 backdrop-blur-md transition duration-300 hover:border-[rgba(255,228,92,0.4)] hover:bg-[rgba(12,23,48,0.95)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <TrophyIcon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-white tracking-wide">
                        Sponsorship & Media Partner
                      </h3>
                      <p className="text-xs text-[var(--muted)]">
                        Contact &middot; Proposal & Kemitraan
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveContactModal("sponsor")}
                    className="flex items-center gap-1.5 rounded-xl border border-[rgba(255,228,92,0.3)] bg-[rgba(255,228,92,0.08)] px-3 py-1.5 text-xs font-bold text-[var(--yellow)] transition hover:bg-[var(--yellow)] hover:text-[var(--navy-deep)]"
                    type="button"
                  >
                    Hubungi <MailIcon className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: SOCIAL MEDIAS & OFFICIAL LINKS */}
        <section className="w-full mb-6">
          <h2 className="font-display text-xs font-black uppercase tracking-[0.2em] text-[var(--muted)] mb-3 px-1 flex items-center gap-2">
            <GlobeIcon className="size-3.5 text-[var(--yellow)]" /> Social Medias & Platforms
          </h2>

          <div className="grid gap-2.5">
            {filteredSocials.map((social) => {
              const IconComponent = social.icon;
              return social.isInternal ? (
                <Link
                  key={social.id}
                  href={social.url}
                  className="group relative flex items-center justify-between rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(12,23,48,0.7)] p-4 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[var(--yellow)] hover:bg-[rgba(17,29,64,0.95)] hover:shadow-[0_10px_25px_-5px_rgba(255,228,92,0.15)]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-[var(--yellow)] text-[var(--navy-deep)] font-bold shadow-md transition group-hover:scale-105">
                      <IconComponent className="size-5.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-sm font-bold text-white tracking-wide group-hover:text-[var(--yellow)] transition-colors">
                          {social.title}
                        </h3>
                        <span className="rounded-full bg-[rgba(255,228,92,0.15)] px-2 py-0.5 text-[0.6rem] font-bold text-[var(--yellow)] border border-[rgba(255,228,92,0.3)]">
                          {social.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--muted)]">{social.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRightIcon className="size-4 text-[var(--muted)] transition-all group-hover:translate-x-1 group-hover:text-[var(--yellow)]" />
                </Link>
              ) : (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(12,23,48,0.7)] p-4 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(255,228,92,0.4)] hover:bg-[rgba(17,29,64,0.95)] hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-[rgba(248,247,240,0.06)] text-[var(--cream)] border border-[rgba(255,255,255,0.1)] transition group-hover:border-[var(--yellow)] group-hover:text-[var(--yellow)] group-hover:scale-105">
                      <IconComponent className="size-5.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-sm font-bold text-white tracking-wide group-hover:text-[var(--yellow)] transition-colors">
                          {social.title}
                        </h3>
                        <span className="rounded-full bg-[rgba(248,247,240,0.06)] px-2 py-0.5 text-[0.6rem] font-semibold text-[var(--muted)] border border-[rgba(255,255,255,0.08)]">
                          {social.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--muted)] truncate max-w-[200px] sm:max-w-[240px]">
                        {social.subtitle}
                      </p>
                    </div>
                  </div>
                  <ExternalLinkIcon className="size-4 text-[var(--muted)] transition-all group-hover:text-[var(--yellow)]" />
                </a>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: QUICK ACCESS & EXPLORE */}
        {filteredQuickAccess.length > 0 && (
          <section className="w-full mb-8">
            <h2 className="font-display text-xs font-black uppercase tracking-[0.2em] text-[var(--muted)] mb-3 px-1 flex items-center gap-2">
              <CpuIcon className="size-3.5 text-[var(--yellow)]" /> Portal & Web Features
            </h2>

            <div className="grid gap-2.5">
              {filteredQuickAccess.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.url}
                    className="group relative flex items-center justify-between rounded-2xl border border-[rgba(255,228,92,0.15)] bg-gradient-to-r from-[rgba(12,23,48,0.8)] to-[rgba(7,16,31,0.8)] p-4 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[var(--yellow)] hover:bg-[rgba(17,29,64,0.95)]"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-[rgba(255,228,92,0.1)] text-[var(--yellow)] border border-[rgba(255,228,92,0.2)] group-hover:scale-105 transition">
                        <IconComponent className="size-5.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-sm font-bold text-white tracking-wide group-hover:text-[var(--yellow)] transition-colors">
                            {item.title}
                          </h3>
                          <span className="rounded-full bg-[rgba(255,228,92,0.12)] px-2 py-0.5 text-[0.6rem] font-bold text-[var(--yellow)] border border-[rgba(255,228,92,0.25)]">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--muted)]">{item.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRightIcon className="size-4 text-[var(--muted)] transition-all group-hover:translate-x-1 group-hover:text-[var(--yellow)]" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Footer info */}
        <footer className="w-full pt-4 border-t border-[rgba(255,255,255,0.08)] text-center">
          <p className="font-display text-xs font-bold uppercase tracking-wider text-[var(--cream)] mb-1">
            Advance Robosoccer Polinema
          </p>
          <p className="text-[0.7rem] text-[var(--muted)] mb-3">
            Politeknik Negeri Malang &middot; Juara KRI Humanoid 2024
          </p>
          
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => copyToClipboard(typeof window !== "undefined" ? window.location.href : "https://arocpl.com/links")}
              className="inline-flex items-center gap-1 text-[0.7rem] font-bold text-[var(--muted)] hover:text-[var(--yellow)] transition"
              type="button"
            >
              <CopyIcon className="size-3" /> Salin Link
            </button>
            <span className="text-[var(--muted)]">&middot;</span>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-[0.7rem] font-bold text-[var(--muted)] hover:text-[var(--yellow)] transition"
            >
              arocpl.com
            </Link>
          </div>
        </footer>
      </div>

      {/* YOUTUBE VIDEO PLAYER MODAL */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl border border-[rgba(255,228,92,0.3)] bg-[var(--navy-deep)] p-4 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-3 border-b border-[rgba(255,255,255,0.1)] pb-3">
              <div className="flex items-center gap-2">
                <YoutubeIcon className="size-5 text-red-500" />
                <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">
                  Company Profile Video &mdash; AROC POLINEMA
                </h3>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-red-500 transition"
                type="button"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>

            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black">
              <iframe
                src="https://www.youtube-nocookie.com/embed/ZE8318wfMqY?autoplay=1"
                title="AROC POLINEMA Company Profile"
                className="size-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-[var(--muted)]">
                Video profil resmi Tim Robot Humanoid Politeknik Negeri Malang
              </p>
              <a
                href="https://youtu.be/ZE8318wfMqY?si=mQyxtvL-DqmnmTDk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[var(--yellow)] hover:underline flex items-center gap-1"
              >
                Buka di YouTube <ExternalLinkIcon className="size-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT DETAILS MODAL */}
      {activeContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-2xl border border-[rgba(255,228,92,0.3)] bg-[var(--navy-deep)] p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-[rgba(255,255,255,0.1)] pb-3">
              <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">
                {activeContactModal === "leader" ? "Contact Team Leader" : "Sponsorship & Media Partner"}
              </h3>
              <button
                onClick={() => setActiveContactModal(null)}
                className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-red-500 transition"
                type="button"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>

            <div className="space-y-3 mb-5">
              <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-3">
                <span className="block text-[0.65rem] font-bold text-[var(--yellow)] uppercase tracking-wider">
                  Email Resmi
                </span>
                <a href="mailto:hello@arocpl.com" className="text-sm font-semibold text-white hover:text-[var(--yellow)]">
                  hello@arocpl.com
                </a>
              </div>

              <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-3">
                <span className="block text-[0.65rem] font-bold text-[var(--yellow)] uppercase tracking-wider">
                  Instagram DM
                </span>
                <a
                  href="https://www.instagram.com/arocpolinema"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-white hover:text-[var(--yellow)]"
                >
                  @arocpolinema
                </a>
              </div>

              <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-3">
                <span className="block text-[0.65rem] font-bold text-[var(--yellow)] uppercase tracking-wider">
                  Lokasi Lab / Markas
                </span>
                <p className="text-xs text-[var(--cream)]">
                  Gedung Teknik Elektro, Politeknik Negeri Malang, Jl. Soekarno Hatta No.9, Malang
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href="mailto:hello@arocpl.com"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[var(--yellow)] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--navy-deep)] shadow-lg hover:bg-yellow-300 transition"
              >
                Kirim Email <MailIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* QR CODE MODAL */}
      {showQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xs rounded-2xl border border-[rgba(255,228,92,0.3)] bg-[var(--navy-deep)] p-6 shadow-2xl text-center">
            <button
              onClick={() => setShowQr(false)}
              className="absolute top-4 right-4 flex size-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-red-500 transition"
              type="button"
            >
              <CloseIcon className="size-4" />
            </button>

            <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-1">
              QR Code Bio Link
            </h3>
            <p className="text-xs text-[var(--muted)] mb-4">
              Pindai QR ini untuk membuka link bio AROC POLINEMA di perangkat mobile
            </p>

            <div className="mx-auto size-48 rounded-xl bg-white p-3 shadow-inner flex items-center justify-center border-4 border-[var(--yellow)] mb-4">
              {/* SVG QR Code representation */}
              <svg viewBox="0 0 100 100" className="size-full">
                <path fill="#07101f" d="M0 0h30v30H0zM40 0h20v10H40zM70 0h30v30H70zM10 10h10v10H10zM80 10h10v10H80zM0 40h10v20H0zM20 40h30v10H20zM60 40h10v30H60zM80 40h20v10H80zM30 60h20v10H30zM0 70h30v30H0zM10 80h10v10H10zM50 70h20v10H50zM80 70h20v30H80zM40 90h30v10H40z" />
              </svg>
            </div>

            <p className="font-mono text-[0.7rem] text-[var(--yellow)] font-bold mb-4">
              arocpl.com/links
            </p>

            <button
              onClick={() => copyToClipboard(typeof window !== "undefined" ? window.location.href : "https://arocpl.com/links")}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-[rgba(255,228,92,0.4)] bg-[rgba(255,228,92,0.1)] py-2 text-xs font-bold uppercase tracking-wider text-[var(--yellow)] hover:bg-[var(--yellow)] hover:text-[var(--navy-deep)] transition"
              type="button"
            >
              <CopyIcon className="size-3.5" /> Salin Link Bio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
