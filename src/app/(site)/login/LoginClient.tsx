"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Info } from "lucide-react";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — no auth logic
  };

  return (
    <main className="min-h-screen bg-ras-sand flex items-center justify-center px-4 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* ── Card ── */}
        <div className="bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden">
          {/* ── Header / Logo ── */}
          <div className="flex flex-col items-center pt-10 pb-6 px-6">
            <Link href="/" aria-label="Home">
              <Image
                src="/assets/Logos/RAS-Logo-Main.png"
                alt="Ras Al Assad Logo"
                width={160}
                height={60}
                className="object-contain"
                priority
              />
            </Link>

            <h1 className="font-display mt-6 text-2xl font-semibold text-ras-charcoal tracking-tight text-center">
              Sign In to Your Account
            </h1>
            <p className="mt-2 text-sm text-ras-grey text-center">
              Enter your credentials to continue
            </p>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="px-6 sm:px-8 pb-8 space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-ras-charcoal"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-ras-grey">
                  <Mail size={18} />
                </span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border border-black/10 bg-ras-sand/40 py-2.5 pl-10 pr-4 text-sm text-ras-charcoal placeholder:text-ras-grey/60 focus:border-ras-gold focus:ring-2 focus:ring-ras-gold/30 outline-none transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-ras-charcoal"
              >
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-ras-grey">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-black/10 bg-ras-sand/40 py-2.5 pl-10 pr-10 text-sm text-ras-charcoal placeholder:text-ras-grey/60 focus:border-ras-gold focus:ring-2 focus:ring-ras-gold/30 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-ras-grey hover:text-ras-charcoal transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs font-medium text-ras-gold hover:text-ras-goldDark transition"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full rounded-lg bg-ras-gold py-3 text-sm font-semibold text-ras-charcoal shadow-md hover:bg-ras-goldDark transition-colors duration-200"
            >
              Sign In
            </motion.button>

            {/* Contact link */}
            <p className="text-center text-sm text-ras-grey">
              Don&apos;t have an account?{" "}
              <Link
                href="/contact"
                className="font-medium text-ras-gold hover:text-ras-goldDark transition"
              >
                Contact Us
              </Link>
            </p>
          </form>
        </div>

        {/* ── Bottom Notice ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 flex items-start gap-2.5 rounded-xl bg-white/60 border border-ras-gold/20 px-4 py-3"
        >
          <Info size={18} className="mt-0.5 shrink-0 text-ras-gold" />
          <p className="text-xs leading-relaxed text-ras-grey">
            Login credentials will be provided by the company for clients to check current project status and progress. If you need assistance, please{" "}
            <Link
              href="/contact"
              className="font-medium text-ras-gold hover:text-ras-goldDark transition"
            >
              contact us
            </Link>
            .
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
