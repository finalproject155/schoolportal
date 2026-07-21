import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/pngaaa.com-995389.png";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="LAUTECH Logo" width={48} height={48} />
            <div>
              <h3 className="font-bold font-lex text-lg">LAUTECH</h3>
              <p className="text-xs text-white/60">
                Ladoke Akintola University Of Technology
              </p>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Empowering students and educators with a single platform for
            lessons, grades, announcements, and academic records.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-bold font-lex text-sm uppercase tracking-wide">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2 text-sm text-white/70">
            <li>
              <Link href="/dashboard" className="hover:text-white">
                School
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white">
                E-Portal
              </Link>
            </li>
            <li>
              <Link href="/Resources" className="hover:text-white">
                Resources
              </Link>
            </li>
            <li>
              <Link href="/About us" className="hover:text-white">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-bold font-lex text-sm uppercase tracking-wide">
            Admissions
          </h4>
          <ul className="flex flex-col gap-2 text-sm text-white/70">
            <li>
              <Link href="/login" className="hover:text-white">
                Apply Now
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white">
                Student Login
              </Link>
            </li>
            <li>
              <Link href="/(lecturer)/lecturer/login" className="hover:text-white">
                Staff Login
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-bold font-lex text-sm uppercase tracking-wide">
            Contact
          </h4>
          <ul className="flex flex-col gap-2 text-sm text-white/70">
            <li>P.M.B. 4000, Ogbomoso, Oyo State, Nigeria</li>
            <li>info@lautech.edu.ng</li>
            <li>+234 800 000 0000</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-4 text-xs text-white/50 text-center">
          © {new Date().getFullYear()} Ladoke Akintola University Of Technology. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
