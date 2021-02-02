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

	media: {
		borderRadius: '50%',
		width: '14rem',
		height: '14rem',
		marginTop: '1rem',
		marginBottom: '1rem',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)',
		backgroundColor: 'rgba(232, 232, 232, 1)',
		color: 'rgba(160, 164, 168, 1)'
	},
	image: {
		borderRadius: '50%',
		width: '14rem',
		height: '14rem',
		marginTop: '4rem',
		// marginBottom: '2rem',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)'
		// backgroundColor: 'rgba(232, 232, 232, 1)',
		// color: 'rgba(160, 164, 168, 1)'
	},
	picUpload: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-end'
	},
	addButton: {
		left: '-40px'
	},
	addIcon: {
		fontSize: '2rem'
	}
});

export default useStyles;
