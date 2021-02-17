import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		flexDirection: 'column'
	},
	section: {
		marginTop: '2em'
	},
	title: {
		fontWeight: 'bold',
		marginBottom: '1rem'
	},
	submit: {
		width: '100%',
		height: '2.6rem',
		borderRadius: '1.3rem'
	},
	searchContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	tableContainer: {
		marginTop: '2rem'
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
	name: {
		'&.MuiTableCell-root': {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center'
		}
	},
	avatar: {
		marginRight: '1rem'
	},
	amount: {
		fontWeight: 'bold',
		color: 'rgba(82, 87, 92, 1)'
	},
	tableHeader: {
		fontWeight: 'bold'
	},
	moreButton: {
		textDecoration: 'none',
		paddingRight: '1.2rem',
		paddingLeft: '1.2rem',
		paddingTop: '0.6rem',
		paddingBottom: '0.6rem'
	}
});

export default useStyles;
