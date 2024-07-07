import { Alert, Avatar, Button, Card } from "flowbite-react";
import PageHeader from "../components/PageHeader/PageHeader";

export default function Home() {
  return (
    <section className="h-full">
      <PageHeader title="Home" />
      <div className="h-full flex flex-col items-center justify-evenly p-4 md:p8 lg:p-12">
        <section className="mb-[10rem]" id="services">
          Services
        </section>
        <section className="mb-[10rem]" id="pricing">
          Pricing
        </section>
        <section className="mb-[10rem]" id="contact">
          Contact
        </section>
      </div>
    </section>
  );
}
