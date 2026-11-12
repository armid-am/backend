import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

const FRONTEND_URL =
  process.env.FRONTEND_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'https://armid.am'
const SECRET = process.env.REVALIDATE_SECRET ?? ''

type PathSpec = { path: string; type?: 'page' | 'layout' }
type Profile = 'max' | 'instant'

export type RevalidateConfig = {
  tags?: string[]
  paths?: PathSpec[]
  profile?: Profile
}

type DynamicFn = (doc: Record<string, unknown>) => Partial<RevalidateConfig>

async function ping(config: RevalidateConfig, source: string) {
  if (!SECRET) {
    console.warn(`[revalidate:${source}] REVALIDATE_SECRET is not set, skipping`)
    return
  }

  const tags = config.tags ?? []
  const paths = config.paths ?? []
  if (!tags.length && !paths.length) return

  const url = `${FRONTEND_URL}/api/revalidate`
  const pathList = paths.map((p) => `${p.path}${p.type ? ':' + p.type : ''}`).join(',')
  console.log(`[revalidate:${source}] -> ${url} tags=[${tags.join(',')}] paths=[${pathList}]`)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-revalidate-secret': SECRET,
      },
      body: JSON.stringify({ tags, paths, profile: config.profile ?? 'instant' }),
    })
    const text = await res.text()
    const logFn = res.ok ? console.log : console.error
    logFn(`[revalidate:${source}] ${res.ok ? 'ok' : 'failed'} ${res.status}: ${text}`)
  } catch (err) {
    console.error(`[revalidate:${source}] network error`, err)
  }
}

// `dynamic` позволяет добавить теги/пути на основе изменённого документа
// (например `report-${doc.id}` для точечной ревалидации).
function buildConfig(
  config: RevalidateConfig,
  doc: Record<string, unknown>,
  dynamic?: DynamicFn,
): RevalidateConfig {
  if (!dynamic) return config
  const extra = dynamic(doc)
  return {
    profile: config.profile,
    tags: [...(config.tags ?? []), ...(extra.tags ?? [])],
    paths: [...(config.paths ?? []), ...(extra.paths ?? [])],
  }
}

async function runCollectionHook(
  action: 'change' | 'delete',
  config: RevalidateConfig,
  dynamic: DynamicFn | undefined,
  doc: Record<string, unknown>,
  collectionSlug: string,
) {
  await ping(buildConfig(config, doc, dynamic), `collection:${collectionSlug}:${action}`)
  return doc
}

export const revalidateAfterChange =
  (config: RevalidateConfig, dynamic?: DynamicFn): CollectionAfterChangeHook =>
  ({ doc, collection }) =>
    runCollectionHook('change', config, dynamic, doc, collection.slug)

export const revalidateAfterDelete =
  (config: RevalidateConfig, dynamic?: DynamicFn): CollectionAfterDeleteHook =>
  ({ doc, collection }) =>
    runCollectionHook('delete', config, dynamic, doc, collection.slug)

export const revalidateGlobalAfterChange =
  (config: RevalidateConfig): GlobalAfterChangeHook =>
  async ({ doc, global }) => {
    await ping(config, `global:${global.slug}`)
    return doc
  }
