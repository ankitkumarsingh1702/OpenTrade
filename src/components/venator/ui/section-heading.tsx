import type { ReactNode } from "react";

export function SectionHeading({ children, level = 2 }: { children: ReactNode; level?: 2 | 3 }) {
  const Heading = level === 2 ? "h2" : "h3";

  return (
    <Heading className="section-heading">
      <span>{children}</span>
      <span aria-hidden="true" className="section-heading__line">
        <i />
      </span>
    </Heading>
  );
}
