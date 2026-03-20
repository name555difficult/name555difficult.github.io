export const SITE = {
  website: "https://name555difficult.github.io/",
  author: "Wang Zhengbao",
  profile: "https://github.com/name555difficult",
  desc: "A personal GitHub Pages homepage for projects, PDF notes, and technical experiments.",
  title: "Wang Zhengbao",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 12,
  dir: "ltr", // "rtl" | "auto"
  lang: "en",
  timezone: "Asia/Shanghai",
  githubRepo: "https://github.com/name555difficult/name555difficult.github.io",
} as const;

export const PROFILE = {
  name: "Wang Zhengbao",
  title: "Student at Northwestern Polytechnical University",
  location: "Northwestern Polytechnical University",
  tagline:
    "A project homepage for code, experiments, and PDF-first technical notes.",
  summary: [
    "The public GitHub profile describes Wang Zhengbao as a student of Northwestern Polytechnical University. This site extends that profile into a cleaner project homepage with a PDF-first writing workflow.",
    "The homepage combines lightweight project discovery, structured blog metadata, and a wide PDF reader so longer notes can live in their original format instead of being squeezed into a narrow blog column.",
  ],
  interests: [
    "3D scene understanding",
    "SLAM and robotics",
    "Point cloud and vision projects",
    "Developer tooling and scripts",
  ],
  keywords: [
    "GitHub projects",
    "PDF-first publishing",
    "SLAM",
    "3D vision",
    "GitHub Pages",
  ],
  links: [
    {
      label: "GitHub",
      href: "https://github.com/name555difficult",
      external: true,
    },
    {
      label: "CNBlogs",
      href: "https://www.cnblogs.com/name555difficult/",
      external: true,
    },
    { label: "Architecture", href: "/architecture", external: false },
    { label: "Blog", href: "/blog", external: false },
  ],
} as const;
