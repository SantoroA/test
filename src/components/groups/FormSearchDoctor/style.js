import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column'
	},

	input: {
		padding: '1rem'
	},
	submit: {
		width: '100%',
		height: '100%',
		borderRadius: '25px'
	},
	formContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	timeZone: {
		padding: '0.4rem',
		marginTop: '1.5rem',
		backgroundColor: '#D7FEF1',
		marginBottom: '1.5rem'
	},
	timeZoneForm: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	filter: {
		marginTop: '1.5rem',
		padding: '1rem',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	filterContainer: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '2rem'
	},
	filterInput: {
		padding: '0.3rem'
	},
	content: {
		marginTop: '2rem'
	}
});

export default useStyles;
