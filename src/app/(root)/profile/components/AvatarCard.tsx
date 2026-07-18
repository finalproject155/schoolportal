"use client";

import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import SectionCard from "@/components/portal/SectionCard";

export default function AvatarCard({ firstName }: { firstName: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const initials = firstName ? firstName.slice(0, 2).toUpperCase() : "ST";

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <SectionCard bodyClassName="p-5 flex flex-col items-center text-center">
      <div className="relative mb-4">
        <div className="h-24 w-24 rounded-full bg-[#FFD599] flex items-center justify-center overflow-hidden">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Avatar preview" className="h-full w-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-gray-800">{initials}</span>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium transition-colors"
      >
        <Upload size={14} />
        Upload Photo
      </button>
      <p className="text-xs text-emerald-600 mt-3">
        Image size should be under 1MB and image ratio needs to be 1:1
      </p>
    </SectionCard>
  );
}
