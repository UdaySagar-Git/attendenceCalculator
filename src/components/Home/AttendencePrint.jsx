import React from 'react'

const AttendencePrint = (
  {
    currentAttendence,
    MaxAttendenceCanSecure,
    requiredAttendence
  }
) => {
  return (
    <div>
      <h1>Your current Attendence is <span className="text-2xl ">{(currentAttendence.attended * 100 / currentAttendence.total).toFixed(2)} %</span> </h1>
      {MaxAttendenceCanSecure < requiredAttendence && <h1 className="text-red-500">You can't secure {requiredAttendence}% attendence</h1>}
    </div>
  )
}

export default AttendencePrint