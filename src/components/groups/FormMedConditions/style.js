import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column'
	},
	medConditionSection: {
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
	},
	sub: {
		fontWeight: 700,
		marginBottom: '1rem'
	}
});

export default useStyles;
