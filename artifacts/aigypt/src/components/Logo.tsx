import logoImg from "@/assets/logo-aigypt.png";

interface LogoProps {
  variant?: "full" | "mark-with-text" | "mark-only";
  className?: string;
}

export function Logo({ variant = "full", className = "" }: LogoProps) {
  if (variant === "mark-only") {
    return (
      <div
        className={`overflow-hidden flex-shrink-0 ${className}`}
        style={{ width: 32, height: 32 }}
      >
        <img
          src={logoImg}
          alt="AIGYPT"
          style={{ height: 32, width: "auto", objectFit: "cover", objectPosition: "left center" }}
        />
      </div>
    );
  }

  if (variant === "mark-with-text") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div
          className="overflow-hidden flex-shrink-0"
          style={{ width: 30, height: 30 }}
        >
          <img
            src={logoImg}
            alt=""
            aria-hidden="true"
            style={{ height: 30, width: "auto", objectFit: "cover", objectPosition: "left center" }}
          />
        </div>
        <span
          className="font-bold text-lg leading-none"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span style={{ color: "#FAFAFA" }}>AI</span>
          <span style={{ color: "#A855F7" }}>GYPT</span>
        </span>
      </div>
    );
  }

  return (
    <img
      src={logoImg}
      alt="AIGYPT"
      className={className}
      style={{ height: 36, width: "auto" }}
    />
  );
}
