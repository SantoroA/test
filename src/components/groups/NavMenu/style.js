import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	loginName: {
		color: 'rgba(82, 87, 92, 1)',
		marginLeft: '0.2rem',
		marginRight: '0.5rem',
		fontWeight: 700
	},
	menu: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	drawerIconContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		marginRight: '0.5rem'
	}
});

export default useStyles;
