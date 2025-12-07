import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Github Wrapped Card - Your GitHub Stats Visualized",
  description: "Create beautiful GitHub stats cards and share your coding journey. Visualize your top languages, projects, and coding hours.",
  openGraph: {
    title: "Github Wrapped Card - Your GitHub Stats Visualized",
    description: "Create beautiful GitHub stats cards and share your coding journey. Visualize your top languages, projects, and coding hours.",
    images: [
      {
        url: "/ogimage.png",
        width: 1200,
        height: 630,
        alt: "Github Wrapped Card",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Github Wrapped Card - Your GitHub Stats Visualized",
    description: "Create beautiful GitHub stats cards and share your coding journey.",
    images: ["/ogimage.png"],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
