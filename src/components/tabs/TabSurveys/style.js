import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column'
	},

	title: {
		fontWeight: 'bold'
	},
	name: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		marginRight: '1rem'
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: '1rem',
		marginBottom: '1rem',
		alignItems: 'center'
	},
	uploadButton: {
		paddingTop: '0.6rem',
		paddingBottom: '0.6rem',
		paddingRight: '1rem',
		paddingLeft: '1rem'
	},
	emptyState: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '20rem',
		flexDirection: 'column',
		textAlign: 'center'
	},
	detail: {
		fontWeight: 'bold',
		marginTop: '1rem'
	},
	icon: {
		fontSize: '5rem',
		marginTop: '1rem'
	},
	paper: {
		marginBottom: '0.5rem'
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
		marginLeft: '0.5rem',
		marginRight: '0.5rem'
	},
	checkIcon: {
		marginLeft: '0.5rem',
		marginRight: '0.5rem'
	}
});
export default useStyles;
