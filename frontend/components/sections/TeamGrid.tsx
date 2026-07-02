import Image from "next/image";
import type { TeamGridSection } from "@/lib/types";
import { strapiMediaUrl } from "@/lib/api";
import SectionHeading from "@/components/SectionHeading";

export default function TeamGrid({ section }: { section: TeamGridSection }) {
  const members = [...section.members].sort((a, b) => a.order - b.order);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading subtitle={section.subtitle} title={section.title} align="center" />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <div key={member.id} className="text-center">
              {member.image && (
                <div className="relative mx-auto aspect-square w-full overflow-hidden">
                  <Image
                    src={strapiMediaUrl(member.image.url)}
                    alt={`${member.firstName} ${member.lastName}`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="mt-4 font-heading text-lg font-bold text-dark">
                {member.firstName} {member.lastName}
              </h3>
              <p className="text-sm text-body">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
