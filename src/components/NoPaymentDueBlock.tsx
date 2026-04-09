import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import type { JSX } from 'react'

export function NoPaymentDueBlock(): JSX.Element {
  return (
    <div className="flex-1 flex flex-col bg-white rounded-xl p-3 min-w-0 self-stretch">
      <div className="text-[13px] font-semibold text-black">No Payment Due</div>
      <div className="text-[11px] text-[#8e8e93] mt-1 leading-snug">You&apos;ve paid your September balance.</div>
      <div className="flex-1 min-h-0" />
      <div className="flex justify-end">
        <div className="w-11 h-11 rounded-full bg-[#f2f2f7] flex items-center justify-center text-black text-xl shrink-0">
          <FontAwesomeIcon icon={faCheck} />
        </div>
      </div>
    </div>
  )
}
