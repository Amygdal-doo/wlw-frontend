const clearLocalStorage = (): void => {
  try {
    window.localStorage.clear();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error on local storage clear function - ", error);
  }
};

export default clearLocalStorage;
