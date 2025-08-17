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
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem("token");
        },
    }
})

export const {setUser, updateUser, clearUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;