import "./globals.css";

// <html> и <body> рендерятся в app/[locale]/layout.tsx, чтобы проставить lang
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
