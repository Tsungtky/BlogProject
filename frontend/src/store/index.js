import { configureStore } from"@reduxjs/toolkit";
import userStoreReducer from "./modules/UserStore";

const store = configureStore({
  reducer:{
    user: userStoreReducer
  }
})

export default store
