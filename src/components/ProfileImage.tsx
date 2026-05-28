"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  initials: string;
  name: string;
  size?: number;
}

export default function ProfileImage({ initials, name, size = 160 }: Props) {
  const [error, setError] = useState(false);

  return (
    <div
      className="relative rounded-full border-[3px] border-[#e10600] overflow-hidden flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {!error ? (
        <Image
          src="/profile.jpg"
          alt={name}
          fill
          className="object-cover"
          onError={() => setError(true)}
          priority
        />
      ) : (
        <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
          <span
            className="font-black text-[#e10600] select-none"
            style={{
              fontSize: size * 0.38,
              fontFamily: "var(--font-barlow)",
              lineHeight: 1,
            }}
          >
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}
