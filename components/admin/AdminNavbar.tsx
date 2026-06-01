import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";

interface AdminNavbarProps {
  userId: string | null;
}

export default function AdminNavbar({ userId }: AdminNavbarProps) {
  return (
    <nav className="border-b border-domus-secondary bg-domus-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-domus-secondary hover:bg-domus-secondary transition text-sm font-medium text-domus-text"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-domus-primary tracking-wide">
              DOMUS
            </h1>
            <p className="text-[10px] tracking-[0.25em] text-domus-text-soft">
              PANEL ADMIN
            </p>
          </div>
        </div>

        {userId && (
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 md:w-11 md:h-11 border border-domus-secondary shadow-sm",
              },
            }}
          />
        )}
      </div>
    </nav>
  );
}