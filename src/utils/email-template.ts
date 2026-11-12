export type Locale = 'hy' | 'ru' | 'en'

const extractYouTubeId = (url: string): string => {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return match?.[1] ?? ''
}

const i18n: Record<Locale, { readMore: string; watchVideo: string; htmlLang: string }> = {
  hy: {
    readMore: 'Կարդալ ամբողջությամբ →',
    watchVideo: '▶︎ Դիտել տեսանյութը',
    htmlLang: 'hy',
  },
  ru: {
    readMore: 'Читать полностью →',
    watchVideo: '▶︎ Смотреть видео',
    htmlLang: 'ru',
  },
  en: {
    readMore: 'Read more →',
    watchVideo: '▶︎ Watch video',
    htmlLang: 'en',
  },
}

export const buildEmailHTML = ({
  keyword,
  title,
  date,
  url,
  province,
  description,
  siteUrl,
  collectionSlug,
  locale = 'hy',
}: {
  keyword?: string
  title?: string
  date?: string
  url?: string
  province?: string
  description?: string
  coverImageUrl?: string
  siteUrl: string
  collectionSlug: string
  locale?: Locale
}) => {
  const t = i18n[locale]

  const formattedDate = date
    ? new Date(date).toLocaleDateString(
        locale === 'hy' ? 'hy-AM' : locale === 'ru' ? 'ru-RU' : 'en-US',
        { day: '2-digit', month: '2-digit', year: 'numeric' },
      )
    : ''

  const slug = keyword?.replaceAll(' ', '-') ?? ''
  const pathByCollection: Record<string, string> = {
    updates: `/${locale}/foundation/update/${slug}`,
    reports: `/${locale}/foundation/report/${slug}`,
    videoPosts: `/${locale}/gallery/video/${slug}`,
  }

  const readMoreUrl = `${siteUrl || 'armid.am'}${pathByCollection[collectionSlug] ?? `${siteUrl || 'armid.am'}/${locale}/foundation/${collectionSlug}/${slug}`}`

  const RADIUS = '12px'

  // YouTube video preview after meta row
  const youtubeId = url ? extractYouTubeId(url) : ''
  const videoPreviewBlock =
    url && youtubeId
      ? `
<div style="margin-bottom:16px;">
  <a href="${readMoreUrl}" style="display:block;text-decoration:none;color:inherit;">
    <!--[if gte mso 9]>
    <v:rect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${readMoreUrl}" fill="true" stroke="false" style="width:632px;height:400px;">
      <v:fill type="frame" src="https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg" color="#333333" />
      <v:textbox inset="0,0,0,0">
    <![endif]-->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;border-radius:${RADIUS};">
      <tr>
        <td height="400" align="center" valign="middle"
          background="https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg"
          style="height:400px;background-image:linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg');background-color:#333333;background-size:cover;background-position:center;border-radius:${RADIUS};">
          <span style="display:inline-block;background:#781214;color:#ffffff;padding:13px 30px;border-radius:6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;letter-spacing:0.02em;line-height:1;white-space:nowrap;">
            ${t.readMore}
          </span>
        </td>
      </tr>
    </table>
    <!--[if gte mso 9]>
      </v:textbox>
    </v:rect>
    <![endif]-->
  </a>
</div>`
      : ''

  return `<!DOCTYPE html>
<html lang="${t.htmlLang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${title ?? ''}</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#ffffff;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${description ?? title ?? ''}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>

<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td align="center" style="padding:0px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:680px;background:#ffffff;">
        <tr>
          <td style="padding:0px 24px 40px;">

            <h1 style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:28px;line-height:120%;color:rgb(120,18,20);text-align:start;border-bottom:1px solid rgba(120,18,20,0.12);margin:0 0 16px;padding-bottom:12px;">
              ${title ?? ''}
            </h1>

            ${
              formattedDate || province
                ? `
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
              <tr>
                ${
                  formattedDate
                    ? `<td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;color:#999999;">
                        <span style="color:#CC0000;margin-right:4px;">&#128197;</span>${formattedDate}
                      </td>`
                    : '<td></td>'
                }
                ${
                  province
                    ? `<td align="right" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;color:#999999;">
                        <span style="color:#CC0000;margin-right:4px;">&#128205;</span>${province}
                      </td>`
                    : ''
                }
              </tr>
            </table>`
                : ''
            }

            ${videoPreviewBlock}

            ${
              description
                ? `
            <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#333333;line-height:1.75;margin:0 0 20px;">
              ${description}
            </p>`
                : ''
            }

          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

</body>
</html>`
}
