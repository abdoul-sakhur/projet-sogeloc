export default function SectionHeading({
  subtitle,
  title,
  light = false,
  align = "left",
}: {
  subtitle?: string;
  title?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  if (!subtitle && !title) return null;

  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {subtitle && (
        <p className="font-heading text-sm font-bold uppercase tracking-wide text-primary">
          {subtitle}
        </p>
      )}
      {title && (
        <h2
          className={`mt-2 font-heading text-3xl font-bold md:text-4xl ${light ? "text-white" : "text-dark"}`}
        >
          {title}
        </h2>
      )}
    </div>
  );
}
