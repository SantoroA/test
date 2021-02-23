import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',

		height: '12rem',
		justifyContent: 'center',
		alignItems: 'center',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)'
	},
	button: {
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'column',
		marginRight: '1rem',
		marginLeft: '1rem'
	},
	switchWrapper: {
		marginTop: '1rem'
	},
	reviewWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: '1rem'
	}
});

export default useStyles;
