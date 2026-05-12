import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const smoothScrollTo = (href: string) => {
  if (!href.startsWith("#")) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }

  const element = document.querySelector(href);
  element?.scrollIntoView({ behavior: "smooth", block: "start" });
};
