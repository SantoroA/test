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
	priceContainer: {
		background: 'linear-gradient(119.45deg, #DD5E02 0%, #FFC875 99.75%)',
		border: 0,
		borderRadius: '10px',
		color: 'white',
		fontWeight: 'bold',
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		paddingRight: '2rem',
		paddingLeft: '2rem',
		paddingTop: '0.5rem',
		paddingBottom: '0.5rem'
	},
	switchWrapper: {
		marginTop: '0.5rem'
	},
	reviewWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: '1rem'
	},
	errorContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		// height: '20rem',
		flexDirection: 'column',
		textAlign: 'center',
		margin: '0.5rem'
	},
	icon: {
		fontSize: '2rem',
		marginBottom: '0.5rem'
	},
	text: {
		fontWeight: 'bold'
	}
});

export default useStyles;
