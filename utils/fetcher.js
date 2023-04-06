export async function fetcher(...args) {
  let res = await fetch(...args)
  return res.json()
}
