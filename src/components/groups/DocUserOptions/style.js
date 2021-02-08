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
		flexDirection: 'column'
	}
});

export default useStyles;
