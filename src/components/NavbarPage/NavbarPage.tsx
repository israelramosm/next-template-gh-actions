import { DeepPartial } from "@/src/util/types";
import {
  FlowbiteNavbarTheme,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

const customNavbarTheme: DeepPartial<FlowbiteNavbarTheme> = {
  root: {
    base: "p-4 dark:bg-gray-800 md:flex md:items-center md:justify-between",
  },
};

const NavbarPage = () => (
  <Navbar theme={customNavbarTheme} rounded>
    <NavbarBrand as={Link} href="https://flowbite-react.com">
      <Image
        src="images/next.svg"
        className="mr-3 h-6 sm:h-9"
        alt="Flowbite React Logo"
        width={80}
        height={80}
      />
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        w/Flowbite React
      </span>
    </NavbarBrand>
    <NavbarToggle />
    <NavbarCollapse>
      <NavbarLink as={Link} href="/">
        Home
      </NavbarLink>
      <NavbarLink as={Link} href="/sandbox">
        Sandbox
      </NavbarLink>
      <NavbarLink as={Link} href="/about">
        About
      </NavbarLink>
      <NavbarLink as={Link} href="/#services">Services</NavbarLink>
      <NavbarLink as={Link} href="/#pricing">Pricing</NavbarLink>
      <NavbarLink as={Link}  href="/#contact">Contact</NavbarLink>
    </NavbarCollapse>
  </Navbar>
);

export default NavbarPage;
