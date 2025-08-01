const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
    name : 'user',
    initialState :  {
        user: null
    },
    
    reducers : {
        setUser: (state, action) => {
            state.user = action.payload
        },
        updateUser: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload }
            }
        },
        clearUser: (state) => {
            state.user = null
        },
    }
})

export const {setUser, updateUser, clearUser} = userSlice.actions;
export default userSlice.reducer;