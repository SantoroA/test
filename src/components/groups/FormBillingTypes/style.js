import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	container: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
	paper: {
		width: '100%',
		padding: '1.5rem',
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		alignItems: 'center'
	},
	gridContainer: {
		justifyContent: 'center'
	},
	form: {
		width: '100%',
		justifyContent: 'center'
	},

	title: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0.5rem'
	},
	buttons: {
		marginTop: '1.5rem',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	button: {
		padding: '0.5rem'
	},

	selects: {
		padding: '0.5rem'
	},
	toggleButton: {
		marginRight: '1rem',
		paddingRight: '1rem',
		paddingLeft: '1rem'
	},
	subtitle: {
		padding: '0.5rem'
	}
});

export default useStyles;
