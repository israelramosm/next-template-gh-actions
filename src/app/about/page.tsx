import PageHeader from "@/src/components/PageHeader/PageHeader";
import Section from "@/src/components/Section/Section";

export default function About() {
  return (
    <Section id="about" className="h-full flex flex-col justify-evenly">
      <PageHeader title="About" />
    </Section>
  );
}
