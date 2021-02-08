import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	container: {
		alignItems: 'flex-start',
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
	title: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0.5rem'
	},
	tab: {
		minWidth: '14%'
	},
	input: {
		padding: '0.5rem'
	},
	box: {
		padding: '1rem',
		justifyContent: 'center',
		borderColor: 'rgba(160, 164, 168, 1)',
		width: '100%'
	},
	dateContainer: {
		marginTop: '2rem',
		marginBottom: '3rem'
	},
	subtitle: {
		fontWeight: 600
	}
});

export default useStyles;
