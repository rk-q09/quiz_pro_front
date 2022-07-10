export const postAllSync = async (
  requests: (() => Promise<void>)[],
) => {
  for (const request of requests) {
    await request()
  }
}
