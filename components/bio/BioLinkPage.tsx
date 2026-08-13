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
      badge: "Official Web",
      tone: "cyan",
      isInternal: true,
    },
    {
      id: "instagram",
      title: "Instagram Official",
      subtitle: "@arocpolinema",
      url: "https://www.instagram.com/arocpolinema?igsh=MXRsanhuemFzZWxpaA==",
      icon: InstagramIcon,
      badge: "Instagram",
      tone: "pink",
      isInternal: false,
    },
    {
      id: "linkedin",
      title: "LinkedIn Profile",
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
      badge: "Short Videos",
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
      title: "Robot 3D Experience",
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
      badge: "Riset Lab",
      tone: "cyan",
    },
    {
      id: "press",
      title: "Press Kit & Media Assets",
      subtitle: "Logo, Dokumentasi & Informasi Pers",
      url: "/press",
      icon: CodeIcon,
      badge: "Media Kit",
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
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 size-[700px] rounded-full bg-[radial-gradient(circle,rgba(42,61,130,0.5)_0%,rgba(3,6,16,0)_70%)] blur-[120px]" />
        <div className="absolute top-[35%] -left-[10%] size-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,228,92,0.18)_0%,rgba(3,6,16,0)_70%)] blur-[140px]" />
        <div className="absolute -bottom-[10%] -right-[10%] size-[600px] rounded-full bg-[radial-gradient(circle,rgba(11,23,48,0.85)_0%,rgba(3,6,16,0)_70%)] blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(3,6,16,0.85)_100%)]" />
      </div>

      {/* Grid line background overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Toast Notification */}
      {copied && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 rounded-full border border-[rgba(255,228,92,0.4)] bg-[rgba(6,9,25,0.96)] px-5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all animate-bounce">
          <CheckIcon className="size-5 text-[var(--yellow)]" />
          <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--cream)]">
            Link berhasil disalin!
          </span>
        </div>
      )}

      {/* Main Content Container - Maximize mobile screen width with minimal side padding (px-2.5 on mobile) */}
      <div className="relative z-10 mx-auto w-full max-w-xl sm:max-w-2xl lg:max-w-3xl px-2.5 py-6 sm:px-6 sm:py-12 lg:py-16 flex flex-col items-center">
        
        {/* Navigation Bar Actions */}
        <header className="w-full flex items-center justify-between mb-6 sm:mb-12 px-1">
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.06)] px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold tracking-wider text-[var(--cream)] transition-all duration-300 hover:border-[rgba(255,228,92,0.4)] hover:bg-[rgba(255,228,92,0.12)] hover:text-[var(--yellow)] hover:shadow-[0_0_20px_rgba(255,228,92,0.1)]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
            <span>Web Utama</span>
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setShowQr(true)}
              aria-label="Tampilkan QR Code"
              title="Tampilkan QR Code"
              className="flex size-10 sm:size-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.06)] text-[var(--cream)] transition-all duration-300 hover:border-[rgba(255,228,92,0.4)] hover:bg-[rgba(255,228,92,0.12)] hover:text-[var(--yellow)] hover:scale-105"
              type="button"
            >
              <QrCodeIcon className="size-5" />
            </button>

            <button
              onClick={handleShare}
              aria-label="Bagikan Link"
              title="Bagikan Link Bio"
              className="flex size-10 sm:size-11 items-center justify-center rounded-full border border-[rgba(255,228,92,0.4)] bg-[rgba(255,228,92,0.12)] text-[var(--yellow)] transition-all duration-300 hover:scale-105 hover:bg-[var(--yellow)] hover:text-[var(--navy-deep)] shadow-[0_0_20px_rgba(255,228,92,0.2)]"
              type="button"
            >
              {copied ? <CheckIcon className="size-5" /> : <ShareIcon className="size-5" />}
            </button>
          </div>
        </header>

        {/* Profile Card Header (+20% size on mobile) */}
        <section className="w-full text-center flex flex-col items-center mb-7 sm:mb-12">
          <div className="relative mb-5 sm:mb-6 group">
            {/* Glowing ring animation */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[var(--yellow)] via-blue-500 to-[var(--yellow-warm)] opacity-80 blur-lg group-hover:opacity-100 transition duration-500 animate-pulse" />

            <div className="relative size-32 sm:size-36 lg:size-44 rounded-full border-3 sm:border-4 border-[var(--yellow)] bg-[var(--navy-deep)] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-1.5 sm:p-2">
              <Image
                src="/images/logoAROC.jpg"
                alt="AROC POLINEMA Logo"
                width={176}
                height={176}
                className="size-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            
            {/* Verified badge */}
            <div className="absolute bottom-1 right-1 rounded-full bg-[var(--yellow)] text-[var(--navy-black)] p-2 sm:p-2.5 shadow-xl border-2 border-[var(--navy-deep)]">
              <ShieldIcon className="size-5 sm:size-6" />
            </div>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wider text-[var(--cream)] mb-1.5 flex items-center justify-center gap-2">
            AROC POLINEMA
          </h1>

          <p className="font-sans text-xs sm:text-sm lg:text-base font-bold text-[var(--yellow)] uppercase tracking-[0.2em] mb-2.5">
            Advance Robosoccer Polinema
          </p>

          <p className="font-sans text-sm sm:text-base text-[var(--silver)] leading-relaxed max-w-xs sm:max-w-md lg:max-w-lg mb-5">
            Humanoid Robosoccer Team from Politeknik Negeri Malang (POLINEMA)
          </p>

          {/* Achievement Badges */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,228,92,0.35)] bg-[rgba(255,228,92,0.1)] px-4 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-[var(--yellow)] shadow-[0_4px_15px_rgba(255,228,92,0.1)]">
              <CpuIcon className="size-4 text-cyan-400" /> KRSBI-Humanoid League
            </span>
          </div>
        </section>

        {/* Quick Search Bar */}
        <div className="w-full mb-7 sm:mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari link atau informasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-[rgba(255,255,255,0.14)] bg-[rgba(12,23,48,0.8)] px-5 py-3.5 sm:py-4 text-sm sm:text-base text-[var(--cream)] placeholder-[var(--muted)] focus:border-[var(--yellow)] focus:bg-[rgba(12,23,48,0.98)] focus:outline-none focus:ring-2 focus:ring-[rgba(255,228,92,0.35)] transition-all backdrop-blur-md shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-white p-1"
                type="button"
              >
                <CloseIcon className="size-4.5 sm:size-5" />
              </button>
            )}
          </div>
        </div>

        {/* FEATURED: Company Profile Video Card */}
        {(!searchQuery || "company profile video youtube".includes(searchQuery.toLowerCase())) && (
          <section className="w-full mb-7 sm:mb-8">
            <div className="group relative overflow-hidden rounded-3xl border border-[rgba(255,228,92,0.35)] bg-gradient-to-br from-[rgba(17,29,64,0.95)] via-[rgba(7,16,31,0.95)] to-[rgba(3,6,16,0.98)] p-4 sm:p-7 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-300 hover:border-[var(--yellow)] hover:shadow-[0_25px_60px_-10px_rgba(255,228,92,0.22)]">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8.5 sm:size-9 items-center justify-center rounded-xl bg-red-600/20 text-red-500 border border-red-500/30">
                    <YoutubeIcon className="size-5" />
                  </span>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--yellow)]">
                    Featured Profile Video
                  </span>
                </div>
                <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold text-red-400 border border-red-500/30">
                  YouTube
                </span>
              </div>

              <div className="relative mb-4 aspect-video w-full rounded-2xl overflow-hidden bg-black/60 border border-white/10 group-hover:border-[rgba(255,228,92,0.3)] transition-all duration-300">
                <Image
                  src="/images/gallery-1.png"
                  alt="Company Profile AROC"
                  fill
                  className="object-cover opacity-80 group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-black)] via-black/40 to-transparent" />
                
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 group/play"
                  type="button"
                >
                  <span className="flex size-15 sm:size-18 items-center justify-center rounded-full bg-[var(--yellow)] text-[var(--navy-deep)] shadow-[0_0_30px_rgba(255,228,92,0.4)] transition-transform duration-300 group-hover/play:scale-110">
                    <PlayIcon className="size-7 sm:size-9 ml-1" />
                  </span>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white drop-shadow-md">
                    Putar Video Profile AROC
                  </span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-white tracking-wide">
                    Company Profile AROC
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--muted)]">
                    YouTube &middot; AROC POLINEMA Official Channel
                  </p>
                </div>
                <a
                  href="https://youtu.be/ZE8318wfMqY?si=mQyxtvL-DqmnmTDk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--yellow)] hover:underline self-start sm:self-center mt-1 sm:mt-0"
                >
                  Buka di YouTube <ExternalLinkIcon className="size-4" />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 1: CONTACT INFORMATION */}
        {(!searchQuery || "contact team leader sponsorship media partner email phone".includes(searchQuery.toLowerCase())) && (
          <section className="w-full mb-7 sm:mb-8">
            <h2 className="font-display text-xs sm:text-sm font-black uppercase tracking-[0.22em] text-[var(--muted)] mb-3.5 px-1 flex items-center gap-2">
              <UsersIcon className="size-4 text-[var(--yellow)]" /> Contact Information
            </h2>

            <div className="grid gap-3.5">
              {/* Team Leader Contact */}
              <div className="group rounded-2xl sm:rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[rgba(12,23,48,0.75)] p-4.5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-[rgba(255,228,92,0.4)] hover:bg-[rgba(17,29,64,0.95)] hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-[rgba(255,228,92,0.12)] text-[var(--yellow)] border border-[rgba(255,228,92,0.25)] group-hover:scale-105 transition">
                      <UsersIcon className="size-6 sm:size-7" />
                    </div>
                    <div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-[var(--yellow)] transition-colors">
                        Team Leader
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--muted)]">
                        Contact &middot; General Inquiry
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveContactModal("leader")}
                    className="flex shrink-0 items-center gap-2 rounded-xl sm:rounded-2xl border border-[rgba(255,228,92,0.4)] bg-[rgba(255,228,92,0.12)] px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold text-[var(--yellow)] transition hover:bg-[var(--yellow)] hover:text-[var(--navy-deep)] hover:shadow-[0_0_20px_rgba(255,228,92,0.2)]"
                    type="button"
                  >
                    Hubungi <PhoneIcon className="size-4" />
                  </button>
                </div>
              </div>

              {/* Sponsorship & Media Partner */}
              <div className="group rounded-2xl sm:rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[rgba(12,23,48,0.75)] p-4.5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-[rgba(255,228,92,0.4)] hover:bg-[rgba(17,29,64,0.95)] hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 group-hover:scale-105 transition">
                      <TrophyIcon className="size-6 sm:size-7" />
                    </div>
                    <div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-[var(--yellow)] transition-colors">
                        Sponsorship & Media
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--muted)]">
                        Contact &middot; Kemitraan
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveContactModal("sponsor")}
                    className="flex shrink-0 items-center gap-2 rounded-xl sm:rounded-2xl border border-[rgba(255,228,92,0.4)] bg-[rgba(255,228,92,0.12)] px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold text-[var(--yellow)] transition hover:bg-[var(--yellow)] hover:text-[var(--navy-deep)] hover:shadow-[0_0_20px_rgba(255,228,92,0.2)]"
                    type="button"
                  >
                    Hubungi <MailIcon className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: SOCIAL MEDIAS & OFFICIAL LINKS */}
        <section className="w-full mb-7 sm:mb-8">
          <h2 className="font-display text-xs sm:text-sm font-black uppercase tracking-[0.22em] text-[var(--muted)] mb-3.5 px-1 flex items-center gap-2">
            <GlobeIcon className="size-4 text-[var(--yellow)]" /> Social Medias & Platforms
          </h2>

          <div className="grid gap-3.5">
            {filteredSocials.map((social) => {
              const IconComponent = social.icon;
              return social.isInternal ? (
                <Link
                  key={social.id}
                  href={social.url}
                  className="group relative flex items-center justify-between rounded-2xl sm:rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[rgba(12,23,48,0.75)] p-4.5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--yellow)] hover:bg-[rgba(17,29,64,0.95)] hover:shadow-[0_15px_35px_-5px_rgba(255,228,92,0.18)]"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--yellow)] text-[var(--navy-deep)] font-bold shadow-lg transition duration-300 group-hover:scale-110">
                      <IconComponent className="size-6 sm:size-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-[var(--yellow)] transition-colors">
                          {social.title}
                        </h3>
                        <span className="rounded-full bg-[rgba(255,228,92,0.15)] px-2.5 py-0.5 text-xs font-bold text-[var(--yellow)] border border-[rgba(255,228,92,0.3)]">
                          {social.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--muted)]">{social.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRightIcon className="size-5 text-[var(--muted)] transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[var(--yellow)]" />
                </Link>
              ) : (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between rounded-2xl sm:rounded-3xl border border-[rgba(255,255,255,0.12)] bg-[rgba(12,23,48,0.75)] p-4.5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(255,228,92,0.4)] hover:bg-[rgba(17,29,64,0.95)] hover:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-[rgba(248,247,240,0.08)] text-[var(--cream)] border border-[rgba(255,255,255,0.14)] transition duration-300 group-hover:border-[var(--yellow)] group-hover:text-[var(--yellow)] group-hover:scale-110">
                      <IconComponent className="size-6 sm:size-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-[var(--yellow)] transition-colors">
                          {social.title}
                        </h3>
                        <span className="rounded-full bg-[rgba(248,247,240,0.08)] px-2.5 py-0.5 text-xs font-semibold text-[var(--muted)] border border-[rgba(255,255,255,0.12)]">
                          {social.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--muted)] truncate max-w-[190px] sm:max-w-[320px]">
                        {social.subtitle}
                      </p>
                    </div>
                  </div>
                  <ExternalLinkIcon className="size-5 text-[var(--muted)] transition-all duration-300 group-hover:text-[var(--yellow)]" />
                </a>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: QUICK ACCESS & EXPLORE */}
        {filteredQuickAccess.length > 0 && (
          <section className="w-full mb-9 sm:mb-10">
            <h2 className="font-display text-xs sm:text-sm font-black uppercase tracking-[0.22em] text-[var(--muted)] mb-3.5 px-1 flex items-center gap-2">
              <CpuIcon className="size-4 text-[var(--yellow)]" /> Portal & Web Features
            </h2>

            <div className="grid gap-3.5">
              {filteredQuickAccess.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.url}
                    className="group relative flex items-center justify-between rounded-2xl sm:rounded-3xl border border-[rgba(255,228,92,0.22)] bg-gradient-to-r from-[rgba(12,23,48,0.85)] to-[rgba(7,16,31,0.85)] p-4.5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--yellow)] hover:bg-[rgba(17,29,64,0.95)] hover:shadow-[0_15px_35px_-5px_rgba(255,228,92,0.15)]"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-[rgba(255,228,92,0.14)] text-[var(--yellow)] border border-[rgba(255,228,92,0.28)] group-hover:scale-110 transition duration-300">
                        <IconComponent className="size-6 sm:size-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-[var(--yellow)] transition-colors">
                            {item.title}
                          </h3>
                          <span className="rounded-full bg-[rgba(255,228,92,0.15)] px-2.5 py-0.5 text-xs font-bold text-[var(--yellow)] border border-[rgba(255,228,92,0.3)]">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[var(--muted)]">{item.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRightIcon className="size-5 text-[var(--muted)] transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[var(--yellow)]" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Footer info */}
        <footer className="w-full pt-6 border-t border-[rgba(255,255,255,0.1)] text-center">
          <p className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-[var(--cream)] mb-1">
            Advance Robosoccer Polinema
          </p>
          <p className="text-xs sm:text-sm text-[var(--muted)] mb-4">
            Politeknik Negeri Malang
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => copyToClipboard(typeof window !== "undefined" ? window.location.href : "https://arocpl.com/links")}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--muted)] hover:text-[var(--yellow)] transition"
              type="button"
            >
              <CopyIcon className="size-4" /> Salin Link
            </button>
            <span className="text-[var(--muted)]">&middot;</span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--muted)] hover:text-[var(--yellow)] transition"
            >
              arocpl.com
            </Link>
          </div>
        </footer>
      </div>

      {/* YOUTUBE VIDEO PLAYER MODAL */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-lg animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-3xl border border-[rgba(255,228,92,0.35)] bg-[var(--navy-deep)] p-5 sm:p-7 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-4 border-b border-[rgba(255,255,255,0.12)] pb-4">
              <div className="flex items-center gap-3">
                <YoutubeIcon className="size-6 text-red-500" />
                <h3 className="font-display text-base sm:text-xl font-bold text-white uppercase tracking-wider">
                  Company Profile Video &mdash; AROC POLINEMA
                </h3>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-red-500 transition"
                type="button"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner">
              <iframe
                src="https://www.youtube-nocookie.com/embed/ZE8318wfMqY?autoplay=1"
                title="AROC POLINEMA Company Profile"
                className="size-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs sm:text-sm text-[var(--muted)]">
                Video profil resmi Tim Robot Humanoid Politeknik Negeri Malang
              </p>
              <a
                href="https://youtu.be/ZE8318wfMqY?si=mQyxtvL-DqmnmTDk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-bold text-[var(--yellow)] hover:underline flex items-center gap-1.5"
              >
                Buka di YouTube <ExternalLinkIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT DETAILS MODAL */}
      {activeContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-lg animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl border border-[rgba(255,228,92,0.35)] bg-[var(--navy-deep)] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-5 border-b border-[rgba(255,255,255,0.12)] pb-4">
              <h3 className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
                {activeContactModal === "leader" ? "Contact Team Leader" : "Sponsorship & Media Partner"}
              </h3>
              <button
                onClick={() => setActiveContactModal(null)}
                className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-red-500 transition"
                type="button"
              >
                <CloseIcon className="size-4.5" />
              </button>
            </div>

            <div className="space-y-3.5 mb-6">
              <div className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] p-4">
                <span className="block text-xs font-bold text-[var(--yellow)] uppercase tracking-wider mb-1">
                  Email Resmi
                </span>
                <a href="mailto:hello@arocpl.com" className="text-sm sm:text-base font-semibold text-white hover:text-[var(--yellow)]">
                  hello@arocpl.com
                </a>
              </div>

              <div className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] p-4">
                <span className="block text-xs font-bold text-[var(--yellow)] uppercase tracking-wider mb-1">
                  Instagram Direct Message
                </span>
                <a
                  href="https://www.instagram.com/arocpolinema"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-semibold text-white hover:text-[var(--yellow)]"
                >
                  @arocpolinema
                </a>
              </div>

              <div className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] p-4">
                <span className="block text-xs font-bold text-[var(--yellow)] uppercase tracking-wider mb-1">
                  Lokasi Lab / Markas
                </span>
                <p className="text-xs sm:text-sm text-[var(--cream)]">
                  Gedung Teknik Elektro, Politeknik Negeri Malang, Jl. Soekarno Hatta No.9, Malang
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="mailto:hello@arocpl.com"
                className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[var(--yellow)] px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--navy-deep)] shadow-lg hover:bg-yellow-300 transition"
              >
                Kirim Email <MailIcon className="size-4.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* QR CODE MODAL */}
      {showQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-lg animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl border border-[rgba(255,228,92,0.35)] bg-[var(--navy-deep)] p-7 sm:p-8 shadow-2xl text-center">
            <button
              onClick={() => setShowQr(false)}
              className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-red-500 transition"
              type="button"
            >
              <CloseIcon className="size-4.5" />
            </button>

            <h3 className="font-display text-xl font-bold text-white uppercase tracking-wider mb-1">
              QR Code Bio Link
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] mb-5">
              Pindai QR ini untuk membuka link bio AROC POLINEMA di HP
            </p>

            <div className="mx-auto size-56 sm:size-64 rounded-2xl bg-white p-4 shadow-inner flex items-center justify-center border-4 border-[var(--yellow)] mb-5">
              {/* SVG QR Code representation */}
              <svg viewBox="0 0 100 100" className="size-full">
                <path fill="#07101f" d="M0 0h30v30H0zM40 0h20v10H40zM70 0h30v30H70zM10 10h10v10H10zM80 10h10v10H80zM0 40h10v20H0zM20 40h30v10H20zM60 40h10v30H60zM80 40h20v10H80zM30 60h20v10H30zM0 70h30v30H0zM10 80h10v10H10zM50 70h20v10H50zM80 70h20v30H80zM40 90h30v10H40z" />
              </svg>
            </div>

            <p className="font-mono text-xs sm:text-sm text-[var(--yellow)] font-bold mb-5">
              arocpl.com/links
            </p>

            <button
              onClick={() => copyToClipboard(typeof window !== "undefined" ? window.location.href : "https://arocpl.com/links")}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-[rgba(255,228,92,0.4)] bg-[rgba(255,228,92,0.1)] py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--yellow)] hover:bg-[var(--yellow)] hover:text-[var(--navy-deep)] transition"
              type="button"
            >
              <CopyIcon className="size-4" /> Salin Link Bio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
