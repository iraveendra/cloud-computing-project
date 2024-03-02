

import { configureStore } from '@reduxjs/toolkit';

// import uiReducer from './uiSlice';
import widgetReducer from './widgetSlice'

const store = configureStore({
    reducer: {
        widgets: widgetReducer

    }
});

export default store;