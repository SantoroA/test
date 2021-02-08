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
	}
});

export default useStyles;
