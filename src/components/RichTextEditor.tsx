"use client";

import { useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || "";
    }
  }, [value]);

  const exec = useCallback((command: string) => {
    document.execCommand(command, false);
    if (ref.current) onChange(ref.current.innerHTML);
  }, [onChange]);

  const onInput = useCallback(() => {
    if (ref.current) onChange(ref.current.innerHTML);
  }, [onChange]);

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50">
        <Button type="button" size="sm" variant="outline" onClick={() => exec("bold")}>B</Button>
        <Button type="button" size="sm" variant="outline" onClick={() => exec("italic")}><em>I</em></Button>
        <Button type="button" size="sm" variant="outline" onClick={() => exec("insertUnorderedList")}>• List</Button>
        <Button type="button" size="sm" variant="outline" onClick={() => exec("insertOrderedList")}>1. List</Button>
        <Button type="button" size="sm" variant="outline" onClick={() => exec("formatBlock")}>Par</Button>
      </div>
      <div
        ref={ref}
        className="min-h-[200px] p-3 focus:outline-none prose max-w-none"
        contentEditable
        onInput={onInput}
        data-placeholder={placeholder || "Tulis konten di sini..."}
        suppressContentEditableWarning
      />
      <style jsx>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
}
