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
	form: {
		width: '100%',
		justifyContent: 'center'
	},

	gridContainer: {
		justifyContent: 'center'
	},
	title: {
		padding: '0.5rem',
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center'
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
	emailField: {
		width: '100%',
		justifyContent: 'center',
		padding: '0.5rem'
	},

	card: {
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)',
		borderRadius: '10px',
		display: 'flex',
		flexDirection: 'row',
		width: '35rem',
		height: '12rem',
		marginTop: '1rem',
		marginBottom: '1rem'
	},
	media: {
		width: '12rem',
		backgroundColor: 'rgba(232, 232, 232, 1)',
		color: 'rgba(160, 164, 168, 1)'
	},
	addButton: {
		bottom: 0
	}
});

export default useStyles;
