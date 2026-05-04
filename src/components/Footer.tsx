export default function Footer() {
  return (
    <footer className="py-8 border-t border-[#bfdbfe] bg-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#6b7280]">
        <p>© {new Date().getFullYear()} Rohit Kumar Singh. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-[#2563eb] transition-colors">LinkedIn</a>
          <a href="mailto:rohit@example.com" className="hover:text-[#2563eb] transition-colors">Email</a>
          <a href="#" className="hover:text-[#2563eb] transition-colors">Resume</a>
        </div>
      </div>
    </footer>
  );
}
