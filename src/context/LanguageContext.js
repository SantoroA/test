import createDataContext from './createDataContext';

const navigatorLanguage = navigator.language;

const languageReducer = (state, action) => {
	switch (action.type) {
		case 'set_language':
			return { ...state, language: action.payload };
		default:
			return state;
	}
};

const changeLanguage = (dispatch) => ({ language }) => {
	dispatch({ type: 'setLanguage', payload: language });
};

export const { Provider, Context } = createDataContext(
	languageReducer,
	{ changeLanguage },
	{ language: navigatorLanguage }
);
