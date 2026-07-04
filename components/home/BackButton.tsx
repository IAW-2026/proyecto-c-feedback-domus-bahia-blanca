"use client"

import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const DEFAULT_FALLBACK_URL = 'https://domus-buyer-app.vercel.app/'
const APP_LOADED_KEY = 'domus_app_loaded'
const HISTORY_START_KEY = 'domus_history_start'

function getTrustedOrigins() {
  return [
    process.env.NEXT_PUBLIC_BUYER_APP_BASE_URL,
    'https://domus-buyer-app.vercel.app'
  ].filter(Boolean) as string[]
}

type BackButtonProps = {
  label?: string
  fallbackUrl?: string
  preferBrowserBack?: boolean
}

export function BackButton({
  label = 'Volver',
  fallbackUrl = process.env.NEXT_PUBLIC_BUYER_APP_BASE_URL || DEFAULT_FALLBACK_URL,
  preferBrowserBack = true,
}: BackButtonProps) {
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (!sessionStorage.getItem(APP_LOADED_KEY)) {
      sessionStorage.setItem(APP_LOADED_KEY, 'true')
      sessionStorage.setItem(HISTORY_START_KEY, window.history.length.toString())
    }
  }, [])

  function handleClick() {
    if (typeof window === 'undefined') return

    if (!preferBrowserBack) {
      window.location.href = fallbackUrl
      return
    }

    const referrer = document.referrer
    const historyStart = Number(sessionStorage.getItem(HISTORY_START_KEY) ?? window.history.length)
    const hasInternalHistory = window.history.length > historyStart

    const trustedOrigins = [window.location.origin, ...getTrustedOrigins()]
    const isTrustedReferrer = Boolean(
      referrer && trustedOrigins.some((origin) => referrer.includes(origin))
    )

    const isAuthFlow = Boolean(
      referrer && ['/sign-in', '/sign-up', 'clerk', 'accounts'].some((path) => referrer.includes(path))
    )

    if (isAuthFlow) {
      window.history.go(-2)

      const timeout = setTimeout(() => {
        window.location.href = DEFAULT_FALLBACK_URL
      }, 150)

      window.addEventListener('unload', () => clearTimeout(timeout))
      return
    }

    if (hasInternalHistory || isTrustedReferrer) {
      window.history.back()
      return
    }

    window.location.href = fallbackUrl
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-domus-terracota text-white border border-domus-terracota shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-semibold"
      aria-label="Volver atrás"
    >
      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
      {label}
    </button>
  )
}