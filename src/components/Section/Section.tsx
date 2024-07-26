import { ReactNode } from 'react';

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
    <section
      id={id}
      className={`container mx-auto w-full border-2 border-solid px-4 lg:px-0 ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
