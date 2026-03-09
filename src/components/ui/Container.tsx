import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";
type ContainerPadding = "none" | "sm" | "md" | "lg" | "xl";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
  padding?: ContainerPadding;
  as?: "div" | "section" | "main" | "article";
  centered?: boolean;
  withGutter?: boolean;
};

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1400px]",
  full: "max-w-full",
};

const paddingClasses: Record<ContainerPadding, string> = {
  none: "px-0",
  sm: "px-3 sm:px-4 lg:px-6",
  md: "px-4 sm:px-6 lg:px-8",
  lg: "px-6 sm:px-8 lg:px-12",
  xl: "px-8 sm:px-12 lg:px-16",
};

export function Container({
  children,
  className,
  size = "lg",
  padding = "md",
  as: Component = "div",
  centered = true,
  withGutter = true,
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "w-full",
        centered && "mx-auto",
        sizeClasses[size],
        withGutter && paddingClasses[padding],
        className
      )}
    >
      {children}
    </Component>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section Container - For page sections with visual treatments
───────────────────────────────────────────────────────────── */

type SectionContainerProps = ContainerProps & {
  background?: "none" | "light" | "dark" | "gradient" | "pattern";
  spacing?: "sm" | "md" | "lg" | "xl";
  withDivider?: boolean;
  dividerPosition?: "top" | "bottom" | "both";
};

const backgroundClasses: Record<string, string> = {
  none: "",
  light: "bg-neutral-50",
  dark: "bg-neutral-900 text-white",
  gradient: "bg-gradient-to-br from-neutral-50 via-white to-neutral-50",
  pattern: "bg-white",
};

const spacingClasses: Record<string, string> = {
  sm: "py-8 sm:py-12",
  md: "py-12 sm:py-16 lg:py-20",
  lg: "py-16 sm:py-20 lg:py-28",
  xl: "py-20 sm:py-28 lg:py-36",
};

export function SectionContainer({
  children,
  className,
  size = "lg",
  padding = "md",
  as = "section",
  centered = true,
  withGutter = true,
  background = "none",
  spacing = "md",
  withDivider = false,
  dividerPosition = "bottom",
}: SectionContainerProps) {
  return (
    <div className={cn("relative", backgroundClasses[background])}>
      {/* Pattern Background */}
      {background === "pattern" && (
        <div className="absolute inset-0 -z-10 opacity-[0.015]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>
      )}

      {/* Top Divider */}
      {withDivider && (dividerPosition === "top" || dividerPosition === "both") && (
        <div className="absolute inset-x-0 top-0">
          <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
        </div>
      )}

      {/* Content */}
      <Container
        as={as}
        size={size}
        padding={padding}
        centered={centered}
        withGutter={withGutter}
        className={cn(spacingClasses[spacing], className)}
      >
        {children}
      </Container>

      {/* Bottom Divider */}
      {withDivider && (dividerPosition === "bottom" || dividerPosition === "both") && (
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Card Container - For card-like content blocks
───────────────────────────────────────────────────────────── */

type CardContainerProps = {
  children: ReactNode;
  className?: string;
  variant?: "flat" | "elevated" | "outlined" | "glass";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
};

const cardVariantClasses: Record<string, string> = {
  flat: "bg-neutral-50 border border-transparent",
  elevated: "bg-white border border-neutral-200 shadow-sm",
  outlined: "bg-white border-2 border-neutral-200",
  glass: "bg-white/70 backdrop-blur-md border border-white/20 shadow-lg",
};

const cardPaddingClasses: Record<string, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function CardContainer({
  children,
  className,
  variant = "elevated",
  hover = false,
  padding = "md",
}: CardContainerProps) {
  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300",
        cardVariantClasses[variant],
        cardPaddingClasses[padding],
        hover && "hover:border-[#549558]/30 hover:shadow-[0_8px_30px_-12px_rgba(84,149,88,0.2)] hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page Container - For full page layouts
───────────────────────────────────────────────────────────── */

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  withTopSpacing?: boolean;
  withBottomSpacing?: boolean;
};

export function PageContainer({
  children,
  className,
  withTopSpacing = true,
  withBottomSpacing = true,
}: PageContainerProps) {
  return (
    <main
      className={cn(
        "min-h-screen",
        withTopSpacing && "pt-20 lg:pt-24",
        withBottomSpacing && "pb-16 lg:pb-24",
        className
      )}
    >
      {children}
    </main>
  );
}