import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Task Management",
  description: "Task Management Software",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
