import Link from "next/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

interface NavbarProps {
  userId: string | null;
  role?: string;
}

export default function Navbar({ userId, role }: NavbarProps) {
  return (
    <nav className="border-b border-domus-secondary bg-domus-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-domus-primary tracking-wide">
            DOMUS
          </h1>

          <p className="text-[10px] md:text-xs tracking-[0.25em] text-domus-text-soft">
            BAHÍA BLANCA
          </p>
        </div>

       {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">

          {!userId ? (
            <>
              <SignInButton mode="modal" forceRedirectUrl="/">
                <button className="border border-domus-secondary px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl hover:bg-domus-secondary transition cursor-pointer text-sm md:text-base">
                  Ingresar
                </button>
              </SignInButton>

              <SignUpButton mode="modal" forceRedirectUrl="/reviews/availableReviews">
                <button className="bg-domus-primary text-white px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl hover:bg-domus-primary-mid transition shadow-md cursor-pointer text-sm md:text-base">
                  Dejar una reseña
                </button>
              </SignUpButton>
            </>
          ) : (
            <>
              {role === "admin" && (
                <Link href="/admin">
                  <button className="border border-domus-secondary px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl hover:bg-domus-secondary transition cursor-pointer text-sm md:text-base text-domus-text font-medium">
                    Panel Admin
                  </button>
                </Link>
              )}

              <Link href="/reviews/availableReviews">
                <button className="bg-domus-primary text-white px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl hover:bg-domus-primary-mid transition shadow-md cursor-pointer text-sm md:text-base">
                  Dejar una reseña
                </button>
              </Link>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 md:w-11 md:h-11 border border-domus-secondary shadow-sm",
                  },
                }}
              />
            </>
          )}

        </div>
      </div>
    </nav>
  );
}