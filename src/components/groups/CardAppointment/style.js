import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		background: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 100%)',
		marginTop: '1rem',
		marginBottom: '1rem',
		borderRadius: '8px',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)',
		padding: '1rem',
		justifyContent: 'space-between'
	},
	grid: {
		display: 'flex',
		flexDirection: 'row'
	},
	sub: {
		fontWeight: 700,
		marginBottom: '0.5rem',
		color: 'rgba(82, 87, 92, 1)'
	},

	avatarWrapper: {
		padding: '0.5rem',
		display: 'flex',
		alignItems: 'center'
	},
	icon: {
		fontSize: '2rem'
	},
	timeWrapper: {
		padding: '1rem',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'end'
	},
	paymentWrapper: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row'
	},
	paymentContainer: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		textAlign: 'end',
		padding: '1rem'
	},
	docInfo: {
		borderRadius: '8px',
		backgroundColor: 'white',
		padding: '0.5rem'
	},
	button: {
		paddingLeft: '1rem'
	}
});

export default useStyles;
