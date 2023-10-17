export const delay = (time_ms = 1200) =>
  new Promise((resolve) => setTimeout(resolve, time_ms))
