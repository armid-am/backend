import fs from 'fs'

const font = fs.readFileSync('public/fonts/NotoSansArmenian-Regular.ttf')
const base64 = font.toString('base64')
fs.writeFileSync(
  'src/components/export-donors-PDF/font.ts',
  `export const armenianFont = "${base64}"`,
)
console.log('Done!')
