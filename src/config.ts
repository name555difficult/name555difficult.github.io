export const SITE = {
  website: "https://name555difficult.github.io/",
  author: "Wang Zhengbao",
  profile: "https://github.com/name555difficult",
  desc: "A personal GitHub Pages homepage for projects, markdown notes, and technical experiments.",
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
    "A project homepage for code, experiments, and long-form technical writing.",
  summary: [
    "The public GitHub profile describes Wang Zhengbao as a student of Northwestern Polytechnical University. This site extends that profile into a cleaner project homepage for project discovery and technical writing.",
    "The homepage combines lightweight navigation, structured blog metadata, and a markdown-native archive so research notes can be written, edited, and published with much less friction.",
  ],
  interests: [
    "3D scene understanding",
    "SLAM and robotics",
    "Point cloud and vision projects",
    "Developer tooling and scripts",
  ],
  keywords: [
    "GitHub projects",
    "Markdown publishing",
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
