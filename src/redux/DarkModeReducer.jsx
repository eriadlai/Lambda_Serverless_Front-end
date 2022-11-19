import { DARK_MODE } from "./DarkModeActions";

const initialState = {
  isDarkMode: false,
};

const darkmode = (state = initialState, action) => {
  switch (action.type) {
    case DARK_MODE:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    default:
      return state;
  }
};

export default darkmode;
