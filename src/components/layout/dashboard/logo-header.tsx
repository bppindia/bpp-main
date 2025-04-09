import { Link } from '@tanstack/react-router'
import bppLogo from '@/assets/logo/bppLogo.svg'

export function LogoHeader() {
  return (
    <div className='flex items-center py-3'>
      <Link to='/dashboard' className='flex items-center gap-2'>
        <div className='flex aspect-square size-8 items-center justify-center rounded-lg text-white'>
          <img src={bppLogo} alt='BPPINDIA' />
        </div>
        <div className='grid flex-1 text-left text-sm leading-tight'>
          <span className='truncate font-bold'>BPPINDIA</span>
          <span className='truncate text-xs text-muted-foreground'>
            Bharatiya Popular Party
          </span>
        </div>
      </Link>
    </div>
  )
}
