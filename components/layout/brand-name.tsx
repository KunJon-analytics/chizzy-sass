import Link from "next/link";
import * as React from "react";
import Image from "next/image";

// Hottake: you don't need a features page if you have a changelog page
// Except for SEO

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export function BrandName() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link href="/" className="flex items-center gap-2 font-cal">
          <Image
            src="/icon.png"
            alt="OpenStatus"
            height={30}
            width={30}
            className="rounded-full border border-border bg-transparent"
          />
          OpenStatus
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem asChild>
          <a href="/assets/logos/OpenStatus.svg" download="openstatus.svg">
            Download SVG
          </a>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
