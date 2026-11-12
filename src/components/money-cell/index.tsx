'use client'

export function MoneyCell({ cellData }: { cellData: string }) {
  const formatted = Number(cellData).toLocaleString('de-DE')
  return <span>{formatted}</span>
}
