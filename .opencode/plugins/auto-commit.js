export const AutoCommit = async ({ directory, $ }) => {
  let commitInFlight = false

  return {
    event: async ({ event }) => {
      if (event.type !== "session.idle") return
      if (commitInFlight) return

      try {
        const status = await $`git -C ${directory} status --porcelain`.quiet()
        const output = status.text().trim()
        if (!output) return

        commitInFlight = true
        await $`git -c core.safecrlf=false -C ${directory} add -A`.quiet()
        await $`git -c core.safecrlf=false -C ${directory} commit -m "chore: auto-commit session changes"`.quiet()
      } catch {
        // git not available or not a repo — silently skip
      } finally {
        commitInFlight = false
      }
    },
  }
}
