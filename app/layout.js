import "./globals.css";

export const metadata = {
  title: "3D Portfolio",
  description: "My 3D Artist Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}