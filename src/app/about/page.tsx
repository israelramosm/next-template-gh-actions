import PageHeader from '@/components/PageHeader/PageHeader';
import Section from '@/components/Section/Section';

export default function About() {
  return (
    <Section id="about" className="flex h-full flex-col justify-evenly">
      <PageHeader title="About" />
    </Section>
  );
}
