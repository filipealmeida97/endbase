"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  className?: string;
}

export function PasswordInput({className, ...props}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);


  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pr-10", className)}
        {...props}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition cursor-pointer"
        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
      >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  )
}