import { APP_NAME } from "../constants"
import debug from "debug"

export default function(key) {
  return debug(`${APP_NAME}:${key}`)
}
