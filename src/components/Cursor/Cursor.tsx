import type { CursorState } from '../../types'

interface CursorProps {
  cur: CursorState
}

export function Cursor({ cur }: CursorProps) {
  return (
    <div
      className={`cur${cur.big ? ' big' : ''}${cur.fill ? ' fill' : ''}`}
      style={{ left: cur.x, top: cur.y }}
    />
  )
}
