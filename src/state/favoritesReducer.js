// Action types are constants so a typo becomes an error, not a silent no-op.
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

/**
 * State is an array of favorited photo IDs (strings).
 * The reducer is pure: it never mutates state and always returns a new array
 * (or the same array when nothing changes).
 */
export function favoritesReducer(state, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      // Ignore duplicates so one photo can never appear twice.
      if (state.includes(action.payload)) {
        return state
      }
      return [...state, action.payload]

    case REMOVE_FAVORITE:
      return state.filter((id) => id !== action.payload)

    default:
      return state
  }
}