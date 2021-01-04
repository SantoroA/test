import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	layout: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '2rem',
		textAlign: 'center',
		width: '100%'
	},
	paper: {
		padding: '2rem',
		display: 'flex',
		flexDirection: 'column',
		marginBottom: '2rem',
		marginTop: '2rem'
	},
	logo: {
		width: '10rem',
		marginBottom: '2rem'
	},
	divider: {
		marginTop: '1rem',
		marginBottom: '1rem'
	},
	form: {
		width: '100%'
	},
	submit: {
		width: '100%',
		height: '48px'
	},
	passGenerate: {
		textTransform: 'none',
		fontWeight: 600,
		width: '100%',
		height: '48px',
		borderWidth: '2px',
		borderRadius: '10px'
	},
	textInput: {
		marginBottom: '1rem'
	},
	buttons: {
		justifyContent: 'space-around'
	}
});

export default useStyles;
