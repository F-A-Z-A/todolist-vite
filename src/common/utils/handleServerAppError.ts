import type { BaseResponse } from "@/common/types"
import type { Dispatch } from "@reduxjs/toolkit"
import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice.ts"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({ error: data.messages[0] }))
  } else {
    dispatch(setAppErrorAC({ error: "Some error occurred" }))
  }
  dispatch(setAppStatusAC({ status: "failed" }))
}
