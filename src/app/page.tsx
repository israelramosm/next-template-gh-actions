import PageHeader from '../components/PageHeader/PageHeader';
import MainSection from '../components/Section/Section';

export default function Home() {
  return (
    <MainSection id="main" className="flex h-full flex-col justify-evenly">
      <PageHeader title="Home" />
    </MainSection>
  );
}
