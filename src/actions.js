/*
 * action types
 */

export const CLICKED = "CLICKED";
export const TOGGLE_FLAGGED = "TOGGLE_FLAGGED";

/*
 * action creators
 */

export function clickSquare(location) {
  console.log("running clickSquare");
  return { type: CLICKED, location: location };
}

export function toggleFlag(location) {
  console.log("running toggleFlag");
  return { type: TOGGLE_FLAGGED, location };
}
