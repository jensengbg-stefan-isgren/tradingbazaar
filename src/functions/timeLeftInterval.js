export default function calcRemainingTime(endDate, callback) {
  let interval = 0
  const end_at = new Date(endDate)
  const current_time = new Date()

  if (end_at > current_time) {
    const timeLeft = Math.floor((end_at - current_time) / 1000)

    let timer = 0
    switch (true) {
      case timeLeft > 86400:
        timer = 3600 * 1000
        break
      case timeLeft > 3600:
        timer = 60000
        break
      default:
        timer = 1000
    }

    interval = setInterval(
      (function x() {
        const end_at = new Date(endDate)
        const current_time = new Date()

        const totalSeconds = Math.floor((end_at - current_time) / 1000)
        const totalMinutes = Math.floor(totalSeconds / 60)
        const totalHours = Math.floor(totalMinutes / 60)
        const totalDays = Math.floor(totalHours / 24)

        const hours = totalHours - totalDays * 24
        const minutes = totalMinutes - totalDays * 24 * 60 - hours * 60
        const seconds =
          totalSeconds -
          totalDays * 24 * 60 * 60 -
          hours * 60 * 60 -
          minutes * 60

        callback({
          days: totalDays,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        })
        if (totalDays + hours + minutes + seconds <= 0) clearInterval(interval)

        return x
      })(),
      timer
    )
  } else {
    clearInterval(interval)
    callback({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
  }
  return interval
}
