import React from 'react'

const TimeLeftParagraph = ({ timeLeft, detailed, ad }) => {
  if (detailed & timeLeft.endPassed) {
    if (ad.highestBid > 0) return <p>Sold</p>
    else return <p>Time expired</p>
  } else if (timeLeft.days > 0)
    return (
      <p>
        {timeLeft.days}d {timeLeft.hours}h
      </p>
    )
  else if (timeLeft.days > -1 && timeLeft.hours > 0)
    return (
      <p>
        {timeLeft.hours}h {timeLeft.minutes}m
      </p>
    )
  else if (timeLeft.days > -1 && (timeLeft.minutes > 0 || timeLeft.seconds > 0))
    return (
      <p>
        {timeLeft.minutes}m {timeLeft.seconds}s
      </p>
    )
  else return <p>Time expired</p>
}

TimeLeftParagraph.defaultProps = {
  timeLeft: new Date(),
  detailed: false,
}

export default TimeLeftParagraph
