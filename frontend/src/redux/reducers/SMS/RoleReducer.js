const initialState = {
  authRoles: []
};

export const roleDataReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'StoreRoleData':
      return {
        // ...state,
        // commentData: [...state.commentData,action.payload],
        authRoles: [action.payload],

      };

    default:
      return state;
  }
};


