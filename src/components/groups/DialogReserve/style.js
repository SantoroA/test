import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	layout: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '2rem',
		textAlign: 'center'
	},
	logo: {
		width: '8rem',
		marginBottom: '2rem'
	},
	divider: {
		marginTop: '1rem',
		marginBottom: '1rem'
	},
	closeButton: {
		alignSelf: 'flex-end'
	},
	appointment: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: '1rem',
		justifyContent: 'space-between'
	},
	price: {
		marginRight: '2rem',
		marginLeft: '2rem'
	},
	navlink: {
		textDecoration: 'none'
	}
});

export default useStyles;
