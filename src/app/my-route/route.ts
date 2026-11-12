import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const GET = async () => {
  const config = await configPromise
  await getPayload({
    config,
    cron: undefined,
    importMap: undefined,
  }) // ✅ передаём объект с ключом config

  return Response.json({
    message: 'This is an example of a custom route.',
  })
}
