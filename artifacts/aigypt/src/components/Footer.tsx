import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-[#1E1E2E] bg-[#0A0A0F] mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="font-display font-bold text-xl text-white mb-2">
              AI<span className="text-[#A855F7]">GYPT</span>
            </div>
            <p className="text-sm text-[#94A3B8] max-w-xs">
              Platform mentoring AI pertama untuk masisir Al-Azhar Kairo.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
            <div>
              <p className="text-xs text-[#94A3B8] uppercase tracking-widest mb-3 font-mono">Platform</p>
              <div className="flex flex-col gap-2">
                <Link href="/kurikulum">
                  <span className="text-sm text-[#94A3B8] hover:text-white transition-colors cursor-pointer">Kurikulum</span>
                </Link>
                <Link href="/login">
                  <span className="text-sm text-[#94A3B8] hover:text-white transition-colors cursor-pointer">Masuk</span>
                </Link>
                <a
                  href="https://wa.me/628xxxxxxxxxx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#94A3B8] hover:text-white transition-colors"
                >
                  Hubungi Kami
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[#1E1E2E]">
          <p className="text-xs text-[#94A3B8]">© 2025 AIGYPT. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
