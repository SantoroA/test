import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column'
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: '1rem'
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
	},

	name: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		fontWeight: 'bold'
	},
	avatar: {
		marginRight: '1rem'
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: '1rem'
	},
	iconsWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	errorIcon: {
		color: '#FF9900',
		marginLeft: '0.5rem'
	},
	checkIcon: {
		marginLeft: '0.5rem'
	},
	paper: {
		marginBottom: '0.5rem'
	}
});
export default useStyles;
