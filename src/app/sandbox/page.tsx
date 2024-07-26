import PageHeader from '@/src/components/PageHeader/PageHeader';
import Section from '@/src/components/Section/Section';
import { Alert, Avatar, Button, Card } from 'flowbite-react';

export default function Sandbox() {
  return (
    <Section id="about" className="flex h-full flex-col justify-evenly">
      <PageHeader title="Sandbox" />
      <div className="md:p8 flex flex-col items-center justify-evenly p-4 lg:p-12">
        <div>
          <Button>Click me</Button>
        </div>
        <div>
          <Alert color="info">
            <span className="font-medium">Info alert!</span> Change a few things
            up and try submitting again.
          </Alert>
        </div>
        <div>
          <Card href="#" className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </Card>
        </div>
        <div>
          <Avatar img="images/vercel.svg" alt="avatar of Jese" rounded />
        </div>
        <div>
          <Card href="#" className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
}
