import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	skipButton: {
		color: 'rgba(160, 164, 168, 1)',
		'&:hover': {
			color: '#07B597'
		}
	},
	buttonWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: '1.5rem',
		marginBottom: '1rem',
		alignItems: 'center'
	},
	optionsWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: '1rem'
	},
	nextButton: {
		paddingTop: '0.7rem',
		paddingBottom: '0.7rem'
	},

	yesNoButtons: {
		justifyContent: 'center'
	},
	buttonOutlined: {
		paddingRight: '1rem',
		paddingLeft: '1rem'
	},
	paper: {
		marginBottom: '2rem',
		padding: '1rem'
	},
	section: {
		marginTop: '2rem'
	},
	sectionReview: {
		marginTop: '2rem',
		textAlign: 'start'
	},
	completedIcon: {
		fontSize: '10rem',
		marginBottom: '2rem'
	},
	confetti: {
		marginLeft: '50%'
	},
	root: {
		display: 'flex',
		flexDirection: 'column'
	},
	symptomSection: {
		marginTop: '1rem',
		padding: '1.5rem'
	},
	column: {
		display: 'flex',
		justifyContent: 'flex-start'
	},
	label: {
		'& .MuiFormControlLabel-label': {
			textAlign: 'start'
		}
	}
});

export default useStyles;
