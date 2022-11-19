export const DARK_MODE = "DARK_MODE";

export const DarkModeAction = () => {
  return {
    type: DARK_MODE,
  };
};

export const SwitchDarkMode = () => {
  return (dispatch) => {
    dispatch(DarkModeAction());
  };
};

export default SwitchDarkMode;
