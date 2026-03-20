import type { Props } from "astro";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconRss from "@/assets/icons/IconRss.svg";
import { SITE } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

export const SOCIALS: Social[] = [
  {
    name: "GitHub",
    href: "https://github.com/name555difficult",
    linkTitle: `${SITE.title} on GitHub`,
    icon: IconGitHub,
  },
  {
    name: "CNBlogs",
    href: "https://www.cnblogs.com/name555difficult/",
    linkTitle: `${SITE.title} on CNBlogs`,
    icon: IconRss,
  },
] as const;
