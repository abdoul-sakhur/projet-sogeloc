export default function SectionHeading({
  subtitle,
  title,
  light = false,
  align = "left",
  size = "default",
}: {
  subtitle?: string;
  title?: string;
  light?: boolean;
  align?: "left" | "center";
  size?: "default" | "large";
}) {
  if (!subtitle && !title) return null;

  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {subtitle && (
        <span
          className={`block font-sans text-[15px] font-bold ${light ? "text-white/95" : "text-primary"}`}
        >
          {subtitle}
        </span>
      )}
      {title && (
        <h2
          className={`mt-[10px] font-heading font-bold ${
            size === "large" ? "text-[28px] md:text-[40px]" : "text-[23px] md:text-[34px]"
          } ${light ? "text-white" : "text-dark"}`}
        >
          {title}
        </h2>
      )}
    </div>
  );
}
