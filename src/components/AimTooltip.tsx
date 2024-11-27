import React, { ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AimTooltipProps {
  children?: string | ReactNode
  content?: string | ReactNode
  placement?: "bottom" | "top" | "right" | "left"
  asChild?: boolean
  className?: string
}

export default React.forwardRef(function AimTooltip(props: AimTooltipProps, ref: React.ForwardedRef<HTMLElement>) {
  return <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger ref={ref} className={props.className} asChild={props.asChild}>{props.children}</TooltipTrigger>
      <TooltipContent side={props.placement || "top"} className="whitespace-pre-line break-words max-w-[360px] text-background bg-foreground/70">
        {props.content}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>;
});