import type { CollectionAfterChangeHook } from 'payload'
import { sendEmail } from '../utils/send-email'
import { buildEmailHTML } from '../utils/email-template'
import type { Locale } from '../utils/email-template'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://armid.am'
const SUPPORTED_LOCALES: Locale[] = ['hy', 'ru', 'en']

type SupportedCollection = 'updates' | 'reports' | 'videoPosts'

const getLocalized = (value: unknown, locale: Locale): string => {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object') {
    const obj = value as Record<string, string>
    return obj[locale] ?? obj['hy'] ?? obj['en'] ?? Object.values(obj).find(Boolean) ?? ''
  }
  return ''
}

const normalizeDoc = (doc: Record<string, unknown>, slug: string) => {
  if (slug === 'videoPosts') {
    return {
      ...doc,
      url: (doc['url-youtube-vudeo'] as string | undefined) ?? undefined,
      province: doc['address'],
      image: doc['poster'] ?? doc['image'],
    }
  }
  return doc
}

export const notifySubscribers: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
  collection,
}) => {
  const justPublished = doc.published === true && previousDoc?.published !== true
  if (!justPublished) return doc

  try {
    const { docs: subscribers } = await req.payload.find({
      collection: 'email-subscribe',
      limit: 10000,
      depth: 0,
    })

    const { docs: donors } = await req.payload.find({
      collection: 'donors',
      limit: 10000,
      depth: 0,
    })

    // Собираем все записи: email → локаль
    // Если один email встречается в нескольких коллекциях —
    // побеждает первая найденная локаль (subscribers приоритетнее donors)
    const emailToLocale = new Map<string, Locale>()

    for (const s of subscribers) {
      const email = (s.email as string)?.toLowerCase().trim()
      if (!email) continue
      const locale = SUPPORTED_LOCALES.includes(s.locale as Locale) ? (s.locale as Locale) : 'hy'
      // Если email уже есть — не перезаписываем (subscribers приоритет)
      if (!emailToLocale.has(email)) {
        emailToLocale.set(email, locale)
      }
    }

    for (const d of donors) {
      const email = (d.email as string)?.toLowerCase().trim()
      if (!email || !email.includes('@')) continue
      const locale = SUPPORTED_LOCALES.includes(d.locale as Locale) ? (d.locale as Locale) : 'hy'
      // Если email уже есть из subscribers — не перезаписываем
      if (!emailToLocale.has(email)) {
        emailToLocale.set(email, locale)
      }
    }

    if (emailToLocale.size === 0) return doc

    // Группируем уникальные email-адреса по локали
    const emailsByLocale: Record<Locale, string[]> = { hy: [], ru: [], en: [] }
    for (const [email, locale] of emailToLocale.entries()) {
      emailsByLocale[locale].push(email)
    }

    // Отправляем письмо для каждой локали
    for (const locale of SUPPORTED_LOCALES) {
      const emails = emailsByLocale[locale]
      if (emails.length === 0) continue

      const rawDoc = await req.payload.findByID({
        collection: collection.slug as SupportedCollection,
        id: doc.id,
        locale,
        depth: 2,
      })

      const localizedDoc = normalizeDoc(
        rawDoc as unknown as Record<string, unknown>,
        collection.slug,
      )

      let coverImageUrl: string | undefined
      if (
        localizedDoc.image &&
        typeof localizedDoc.image === 'object' &&
        (localizedDoc.image as { url?: string }).url
      ) {
        coverImageUrl = `${SITE_URL}${(localizedDoc.image as { url: string }).url}`
      }

      const posts = ((localizedDoc.posts ?? []) as Record<string, unknown>[]).map((block) => {
        if (block.blockType === 'text') return { ...block, text: getLocalized(block.text, locale) }
        if (block.blockType === 'title')
          return { ...block, title: getLocalized(block.title, locale) }
        if (block.blockType === 'quote')
          return { ...block, quote: getLocalized(block.quote, locale) }
        return block
      })

      const html = buildEmailHTML({
        keyword: (localizedDoc.keyword as string) ?? undefined,
        title: getLocalized(localizedDoc.title, locale),
        date: (localizedDoc.date as string) ?? undefined,
        url: (localizedDoc.url as string) ?? undefined,
        province: getLocalized(localizedDoc.province, locale),
        description: getLocalized(localizedDoc.description, locale),
        siteUrl: SITE_URL,
        collectionSlug: collection.slug,
        locale,
      })

      const subjectFallback: Record<Locale, string> = {
        hy: 'Նոր հրապարակում',
        ru: 'Новая публикация',
        en: 'New publication',
      }

      await sendEmail({
        to: emails,
        subject: getLocalized(localizedDoc.title, locale) || subjectFallback[locale],
        html,
      })

      console.log(`✅ [${collection.slug}] Sent [${locale}] to ${emails.length} unique recipients`)
    }
  } catch (err) {
    console.error('Email notification error:', err)
  }

  return doc
}
