export type NavItem = {
  key: "home" | "about" | "books" | "products" | "project" | "blog" | "contact";
  href: string;
};

export const mainNav: NavItem[] = [
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "project", href: "/project" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "books", href: "/products?category=book" },
  { key: "products", href: "/products" },
  { key: "project", href: "/project" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

export const legalDocs = ["privacy", "terms", "personal-data"] as const;
export type LegalDoc = (typeof legalDocs)[number];
