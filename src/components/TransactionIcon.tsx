import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import { faStore, faBullseye, faUniversity, faCoffee, faLeaf } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type { CSSProperties } from 'react'

const PALETTE = ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#2b2d42', '#8b1a1a']

const ICON_SIZE = 18

export interface TransactionIconProps {
  name: string
  size?: number
}

function paletteIndexForName(name: string): number {
  let sum = 0
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i)
  return sum % PALETTE.length
}

function isPaymentOrJpmorgan(key: string): boolean {
  if (key === 'jpmorgan') return true
  if (key.includes('jpmorgan chase')) return true
  if (key.includes('payment')) return true
  return false
}

export function TransactionIcon({ name, size = 40 }: TransactionIconProps): JSX.Element {
  const key = name.trim().toLowerCase()
  let icon: IconDefinition = faStore
  let style: CSSProperties = {
    width: size,
    height: size,
    borderRadius: 10,
    backgroundColor: PALETTE[paletteIndexForName(name)],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  }
  if (key === 'apple') {
    icon = faApple
    style = { ...style, backgroundColor: '#1c1c1e', borderRadius: 10 }
  } else if (isPaymentOrJpmorgan(key)) {
    icon = faUniversity
    style = {
      ...style,
      backgroundColor: 'transparent',
      backgroundImage: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
      borderRadius: 10,
    }
  } else if (key === 'ikea') {
    icon = faStore
    style = { ...style, backgroundColor: '#0058a3', borderRadius: 10 }
  } else if (key === 'target') {
    icon = faBullseye
    style = { ...style, backgroundColor: '#cc0000', borderRadius: '50%' }
  } else if (key === 'starbucks') {
    icon = faCoffee
    style = { ...style, backgroundColor: '#00704a', borderRadius: '50%' }
  } else if (key === 'whole foods' || key.includes('whole foods')) {
    icon = faLeaf
    style = { ...style, backgroundColor: '#00674b', borderRadius: 10 }
  }
  return (
    <div style={style}>
      <FontAwesomeIcon icon={icon} style={{ color: '#ffffff', fontSize: ICON_SIZE }} />
    </div>
  )
}
