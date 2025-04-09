import { Link } from '@tanstack/react-router'
import bppLogo from '@/assets/logo/bppLogo.svg'

export function LogoHeader() {
  return (
    <div className="flex items-center py-3">
      <Link to="/dashboard" className="flex gap-2 items-center">
        <div className="flex justify-center items-center text-white rounded-lg aspect-square size-8">
          <img src={bppLogo} alt="BPPINDIA" />
        </div>
        <div className="grid flex-1 text-sm leading-tight text-left">
          <span className="font-bold truncate">
            BPPINDIA
          </span>
          <span className="text-xs truncate text-muted-foreground">
            Bharatiya Popular Party
          </span>
        </div>
      </Link>
    </div>
  )
} 