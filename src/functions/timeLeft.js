export default function timeLeft(endDate) {
  const end_at = new Date(endDate)
  const current_time = new Date()

  const totalSeconds = Math.floor((end_at - current_time) / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const totalDays = Math.floor(totalHours / 24)

  const hours = totalHours - totalDays * 24
  const minutes = totalMinutes - totalDays * 24 * 60 - hours * 60
  const seconds =
    totalSeconds - totalDays * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60

  return {
    days: totalDays,
    hours,
    minutes,
    seconds,
    endPassed: current_time > end_at,
  }
}
