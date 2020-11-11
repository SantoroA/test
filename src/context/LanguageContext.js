import createDataContext from './createDataContext';

let navigatorLanguage;

if (navigator.language.includes('bg')) {
	navigatorLanguage = 'bg-BG';
} else {
	navigatorLanguage = 'en-EN';
}

const languageReducer = (state, action) => {
	switch (action.type) {
		case 'set_language':
			return { language: action.payload };
		default:
			return { language: navigatorLanguage };
	}
};

const changeLanguage = (dispatch) => (language) => {
	dispatch({ type: 'set_language', payload: language });
};

export const { Provider, Context } = createDataContext(
	languageReducer,
	{ changeLanguage },
	{ language: navigatorLanguage }
);
