export default function RichText({ content, className = "" }: { content?: string; className?: string }) {
  if (!content) return null;

  const paragraphs = content.split(/\n{2,}/).filter(Boolean);

  return (
    <div className={className}>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="mb-4 leading-relaxed last:mb-0">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
