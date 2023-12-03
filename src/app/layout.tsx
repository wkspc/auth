import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Ubuntu } from "next/font/google";
import { authOptions } from "@/config/authOptions";
import { SessionProvider } from "@/components/SessionProvider";
import { UserStorage } from "@/context/AuthContext";
import { Toaster } from "sonner";

const ubuntu = Ubuntu({
  subsets: ["cyrillic"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Estágio - IFCE",
  description: "Página de cadastro de estágio do IFCE",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="pt-BR">
      <body className={ubuntu.className}>
        <SessionProvider session={session}>
          <UserStorage>
            <Toaster position="top-right" richColors />
            {children}
          </UserStorage>
        </SessionProvider>
      </body>
    </html>
  );
}
