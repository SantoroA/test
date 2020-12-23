import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1
	},
	paper: {
		width: '100%',
		padding: '2rem',
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		alignItems: 'center'
	},
	form: {
		width: '100%',
		justifyContent: 'center'
	},
	item: {
		padding: theme.spacing(1, 0)
	},
	submit: {
		width: '100%',
		margin: theme.spacing(3, 0, 2)
	},
	link: {
		borderWidth: 1,
		borderColor: 'black',
		textDecoration: 'none',
		padding: theme.spacing(1),
		borderRadius: 5
	},
	text: {
		marginTop: '0',
		textAlign: 'center'
	},
	socialMedia: {
		borderRadius: 15,
		height: 30,
		width: 30,
		padding: 20,
		minHeight: 0,
		minWidth: 0,
		fontSize: 20
	},
	redes: {
		marginTop: 20,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%'
	},
	gridContainer: {
		justifyContent: 'center'
	}
}));

export default useStyles;
