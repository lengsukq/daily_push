import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "青龙面板环境变量管理",
  description: "可视化管理青龙面板的环境变量",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="font-sans antialiased bg-dark-950 text-dark-100 min-h-screen overflow-x-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid opacity-30" />
          
          {/* Ambient Glow Effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[128px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full filter blur-[200px]" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex min-h-screen perspective-1500">
          <Sidebar />
          <main className="flex-1 ml-72 p-8">
            <div className="preserve-3d">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
