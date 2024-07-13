import { ReactNode } from "react";

const Section = ({
  children,
  id,
  className,
}: Readonly<{
  children?: ReactNode;
  id: string;
  className?: string;
}>) => {
  return (
    <section id={id} className={`mx-auto container border-solid border-2 w-full px-4 lg:px-0 ${className}`}>
      {children}
    </section>
  );
};

export default Section;
