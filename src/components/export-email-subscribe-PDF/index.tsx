'use client'

import { useState } from 'react'
import { armenianFont } from '../export-donors-PDF/font'

export const ExportEmailSubscribePDFButton = () => {
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/email-subscribe?limit=10000')
      const data = await res.json()
      const docs = data.docs

      const { default: jsPDF } = await import('jspdf')
      const { default: autoTable } = await import('jspdf-autotable')

      const doc = new jsPDF()

      doc.addFileToVFS('NotoSansArmenian.ttf', armenianFont)
      doc.addFont('NotoSansArmenian.ttf', 'NotoSansArmenian', 'normal')
      doc.setFont('NotoSansArmenian')

      doc.setFontSize(16)
      doc.text('Email Subscribers', 14, 15)
      doc.setFontSize(10)
      doc.text(`Total: ${docs.length}`, 14, 22)

      autoTable(doc, {
        startY: 27,
        head: [['#', 'Էլ. փոստ', 'Հեռախոս']],
        body: docs.map((d: any, i: number) => [i + 1, d.email, d.phone]),
        styles: { fontSize: 9, font: 'NotoSansArmenian' },
        headStyles: {
          fillColor: [44, 62, 80],
          textColor: [255, 255, 255],
          font: 'NotoSansArmenian',
          fontStyle: 'normal',
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        didParseCell: (data) => {
          data.cell.styles.font = 'NotoSansArmenian'
          data.cell.styles.fontStyle = 'normal'
        },
      })

      doc.save('email-subscribers.pdf')
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      style={{
        backgroundColor: '#4a4a4a',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 16px',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        opacity: loading ? 0.7 : 1,
      }}
    >
      {loading ? 'Exporting...' : '⬇ Export PDF'}
    </button>
  )
}
