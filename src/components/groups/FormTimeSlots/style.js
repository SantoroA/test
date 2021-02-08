import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	form: {
		padding: '1rem',
		justifyContent: 'center',
		borderColor: 'rgba(160, 164, 168, 1)',
		marginTop: '1.5rem',
		marginBottom: '1.5rem',
		borderRadius: '10px'
	},

	buttons: {
		marginTop: '1.5rem',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	button: {
		padding: '0.5rem'
	},

	input: {
		padding: '0.5rem'
	},
	checkbox: {
		padding: '0.5rem'
	},
	icons: {
		fontSize: '5rem',
		marginBottom: '1rem'
	},
	iconWrapper: {
		display: 'flex',
		flexDirection: 'column',
		padding: '2rem',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default useStyles;
