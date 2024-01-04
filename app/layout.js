import Theme from "./theme-provider";
import "./globals.css";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard using NextJS",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-800 text-black dark:text-white">
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
