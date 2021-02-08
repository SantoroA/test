import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'row'
	},
	section: {
		marginTop: '2em'
	},
	datePicker: {
		padding: '1rem'
	},
	datePickerMobile: {
		'& .MuiFilledInput-root': {
			backgroundColor: 'rgba(255, 255, 255, 0)'
		},
		'& .MuiInputBase-input': {
			textAlign: 'center',
			fontSize: '1.2rem'
		},
		marginBottom: '1rem'
	},
	sub: {
		fontWeight: 700,
		marginBottom: '1rem'
	},
	emptyState: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '20rem',
		flexDirection: 'column',
		textAlign: 'center'
	},
	icon: {
		fontSize: '5rem',
		marginTop: '1rem'
	},
	detail: {
		fontWeight: 'bold',
		marginTop: '1rem'
	}
});

export default useStyles;
