import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
	paper: {
		padding: '2rem',
		display: 'flex',
		flexDirection: 'column',
		marginBottom: '2rem',
		marginTop: '1.5rem'
	},
	formContainer: {
		width: '100%',
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center'
	},
	inputs: {
		marginBottom: '1rem'
	},
	submit: {
		width: '100%',
		height: '3rem'
	},

	redes: {
		marginTop: 20,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%'
	},
	divider: {
		marginTop: '1rem',
		marginBottom: '1rem'
	},

	radioGroup: {
		marginTop: '1.5rem',
		backgroundColor: '#D7FEF1',
		paddingLeft: '1rem'
	},
	textButton: {
		textTransform: 'none',
		'&:hover': {
			color: '#00A99D'
		}
	},

	facebookButton: {
		borderRadius: '3px',
		backgroundColor: '#1877f2',
		color: 'white',
		width: '40px',
		height: '40px',
		textTransform: 'none',
		'&:hover': {
			backgroundColor: '#3B5998'
		}
	},
	googleButton: {
		borderRadius: '3px',
		backgroundColor: 'white',
		width: '40px',
		height: '40px'
	},
	appleButton: {
		borderRadius: '3px',
		backgroundColor: 'black',
		color: '#fff',
		width: '40px',
		height: '40px',
		'&:hover': {
			backgroundColor: '#fff',
			color: '#000'
		}
	},
	submitWrapper: {
		paddingLeft: '1rem',
		paddingRight: '1rem'
	}
}));

export default useStyles;
