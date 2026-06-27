type LogoProps = {
  className?: string;
  variant?: "dark" | "light";
  showSubtitle?: boolean;
};

export default function Logo({ className = "", variant = "dark", showSubtitle = true }: LogoProps) {
  const color = variant === "dark" ? "text-ink" : "text-paper";
  return (
    <div className={`flex flex-col items-center select-none leading-none ${color} ${className}`}>
      <span className="font-display font-black tracking-[-0.04em] text-[1.4em] leading-none">
        UNMADE
      </span>
      {showSubtitle && (
        <span className="mt-[0.15em] text-[0.42em] font-light tracking-[0.55em] uppercase opacity-90">
          Atelier
        </span>
      )}
    </div>
  );
}