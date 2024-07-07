import { Alert, Avatar, Button, Card } from "flowbite-react";
import { headers } from "next/headers";

export default function Sandbox() {
  return (
    <>
      <h1>Sandbox</h1>
      <Button>Click me</Button>
      <Alert color="info">
        <span className="font-medium">Info alert!</span> Change a few things up
        and try submitting again.
      </Alert>
      <Card href="#" className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </Card>
      <Avatar img="/assets/vercel.svg" alt="avatar of Jese" rounded />
    </>
  );
}
