import './globals.css';
import Navbar from '@/components/Navbar';
import Chatbot from '@/components/Chatbot';

export const metadata = {
  title: 'SkillNest Learning - Learn Skills Through Video Courses',
  description: 'Master new abilities at your own pace with our comprehensive video-based learning platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen font-sans">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="pt-20">
          {children}
        </main>

        {/* Chatbot (GLOBAL) */}
        <Chatbot />

      </body>
    </html>
  );
}