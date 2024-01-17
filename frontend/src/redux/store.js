import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userReducer';
import gallerySlice from './reducers/galleryReducer';
import teamSlice from './reducers/teamReducer';
import eventSlice from './reducers/eventReducer';
import mailSlice from './reducers/mailReducer';

const store = configureStore({
    reducer: {
        user : userSlice,
        gallery : gallerySlice,
        team : teamSlice,
        event : eventSlice,
        mail : mailSlice,
    },
  });
  
  export default store;
  
  export const server = "/api/v1";

  //BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna