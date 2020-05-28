// Module imports
import { createSelector } from 'reselect'
import { withCurrentUserId } from './session'





export const selectUserById = (state, { userId }) => {
  return state.users[userId] || null
}


export const selectAvatarByUserId = (state, props) => {
  const user = selectUserById(state, props)

  if (!user) {
    return null
  }

  return user.attributes.image || `//api.adorable.io/avatars/${user.id}`
}

export const selectNicknames = (state) => {
  return state.nicknames
}

export const selectNicknamesByUserId = createSelector(
  [selectUserById, selectNicknames],
  (user, nicknames) => {
    if (user) {
      return user.relationships.nicknames?.data.map(({ id }) => {
        return nicknames[id]
      })
    }
    return []
  },
)

export const selectCurrentUserScopes = (state) => {
  return withCurrentUserId(selectUserById)(state)?.meta?.permissions ?? []
}


export const selectCurrentUserHasScope = (state, { scope }) => {
  const scopes = selectCurrentUserScopes(state)

  return scopes.includes(scope)
}
