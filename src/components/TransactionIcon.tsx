import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import { faStore, faBullseye, faUniversity } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

const PALETTE = ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#2b2d42', '#8b1a1a']

export interface TransactionIconProps {
  name: string
  size?: number
}

function paletteIndexForName(name: string): number {
  let sum = 0
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i)
  return sum % PALETTE.length
}

export function TransactionIcon({ name, size = 40 }: TransactionIconProps): JSX.Element {
  const key = name.trim().toLowerCase()
  let icon: IconDefinition = faStore
  let bg = PALETTE[paletteIndexForName(name)]
  if (key === 'apple') {
    icon = faApple
    bg = '#000000'
  } else if (key === 'ikea') {
    icon = faStore
    bg = '#0058A3'
  } else if (key === 'target') {
    icon = faBullseye
    bg = '#CC0000'
  } else if (key.includes('jpmorgan') || key.includes('payment')) {
    icon = faUniversity
    bg = '#0f3460'
  }
  const iconPx = Math.round(size * 0.45)
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        backgroundColor: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FontAwesomeIcon icon={icon} style={{ color: '#fff', fontSize: iconPx }} />
    </div>
  )
}
