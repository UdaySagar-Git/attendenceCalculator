import React from 'react'

const CurrentAttendence = (
  { currentAttendence, setCurrentAttendence, requiredAttendence, setRequiredAttendence, MaxAttendenceCanSecure }
) => {
  const Max = +(MaxAttendenceCanSecure)

  const handleButtonClick = (value) => {
    setRequiredAttendence(value)
  }

  return (
    <div className=" flex flex-col md:max-w-[300px] flex-grow">
      <div className="mb-4 flex flex-1 justify-between">
        <label className="text-sm pt-1 sm:text-base font-semibold mr-2 ">Attended Classes</label>
        <div>
          <input type="number" value={currentAttendence.attended} onChange={(e) => setCurrentAttendence({ ...currentAttendence, attended: parseInt(e.target.value) })} className="border border-gray-300 rounded-md px-2 w-[100px] text-center" />
        </div>
      </div>
      <div>

        {
          currentAttendence.attended === null && <p className="text-red-500 text-xs">* please enter attended classes</p>
        }
      </div>
      <div className="mb-4 flex flex-1 justify-between">
        <label className="text-sm pt-1 sm:text-base font-semibold mr-2 ">Total Classes</label>
        <div>
          <input type="number" value={currentAttendence.total} onChange={(e) => setCurrentAttendence({ ...currentAttendence, total: parseInt(e.target.value) })} className="border border-gray-300 rounded-md px-2 w-[100px] text-center" />
        </div>
      </div>
      <div>

        {
          currentAttendence.total === null && <p className="text-red-500 text-xs">* please enter total classes</p>
        }
        {
          currentAttendence.total < currentAttendence.attended && currentAttendence.total != null && <p className="text-red-500 text-xs">*  Total classes should be greater than attended classes</p>
        }
      </div>
      <div className="w-full border-b border-zinc-700 my-3 md:hidden" />
      <div className=' flex flex-1  justify-between' >
        <label className="text-sm pt-1 sm:text-base font-semibold mr-2 ">Required Attendance</label>
        <div>
          <input type="number" value={requiredAttendence} max={Max.toFixed(0)} onChange={(e) => setRequiredAttendence(parseInt(e.target.value))} className="border border-gray-300 rounded-md px-2 w-[100px] text-center" />
        </div>
      </div>
      <div>

        {
          requiredAttendence > Max && <p className="text-red-500 text-xs">* please enter less than {Max.toFixed(0)}%</p>
        }
      </div>
      <div className="flex gap-2 mt-2 flex-wrap flex-grow">
        <button className={requiredAttendence === 70 ? "border border-gray-200 rounded-md px-0 flex-1  text-sm bg-gray-200" : "border border-gray-200 rounded-md px-0 flex-1  text-sm"} onClick={() => handleButtonClick(70)}>70</button>
        <button className={requiredAttendence === 75 ? "border border-gray-200 rounded-md px-0 flex-1  text-sm bg-gray-200" : "border border-gray-200 rounded-md px-0 flex-1  text-sm"} onClick={() => handleButtonClick(75)}>75</button>
        <button className={requiredAttendence === 80 ? "border border-gray-200 rounded-md px-0 flex-1  text-sm bg-gray-200" : "border border-gray-200 rounded-md px-0 flex-1  text-sm"} onClick={() => handleButtonClick(80)}>80</button>
        <button className={requiredAttendence === 85 ? "border border-gray-200 rounded-md px-0 flex-1  text-sm bg-gray-200" : "border border-gray-200 rounded-md px-0 flex-1  text-sm"} onClick={() => handleButtonClick(85)}>85</button>
        <button className={requiredAttendence === 90 ? "border border-gray-200 rounded-md px-0 flex-1  text-sm bg-gray-200" : "border border-gray-200 rounded-md px-0 flex-1  text-sm"} onClick={() => handleButtonClick(90)}>90</button>
        <button className="border border-gray-300 rounded-md px-2 text-sm bg-gray-300" onClick={() => handleButtonClick(requiredAttendence - 1)}>-1</button>
        <button className="border border-gray-300 rounded-md px-2 text-sm bg-gray-300" onClick={() => handleButtonClick(requiredAttendence + 1)}>+1</button>
      </div>
    </div>
  )
}

export default CurrentAttendence