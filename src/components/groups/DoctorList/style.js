import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	card: {
		display: 'flex',
		flexDirection: 'row',
		background: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 100%)',
		marginTop: '1rem',
		marginBottom: '1rem',
		borderRadius: '8px',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)',
		justifyContent: 'space-between'
	},
	media: {
		minWidth: '12rem',
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingBottom: '0.5rem'
	},
	rating: {
		paddingLeft: 0
	},
	ratingContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		'& fieldset': {
			padding: 0
		}
	},
	name: {
		fontWeight: 700,
		letterSpacing: '0.5px',
		color: '#52575C'
	},
	hours: {
		paddingTop: '1rem',
		fontWeight: 'bold',
		color: '#52575C'
	},

	reserve: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		minWidth: '8rem'
	},
	priceText: {
		color: 'rgba(82, 87, 92, 1)',
		fontWeight: 'bold'
	},
	content: {
		padding: '0',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	docInfo: {
		display: 'flex',
		flexDirection: 'column',
		padding: '1rem',
		paddingTop: '0.5rem'
	},
	times: {
		display: 'flex',
		flexDirection: 'row',
		paddingTop: '0.5rem',
		paddingBottom: '0.5rem',
		justifyContent: 'space-between'
	},
	viewProfileButton: {
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		textTransform: 'none',
		fontWeight: 'bold',
		borderRadius: '10px'
	},
	viewAvailButton: {
		textTransform: 'none',
		fontWeight: 'bold',
		borderRadius: '10px'
	},
	icon: {
		marginRight: '0.5rem'
	},
	divider: {
		paddingTop: '1rem',
		paddingBottom: '1rem'
	},
	emptyState: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '20rem',
		flexDirection: 'column',
		textAlign: 'center'
	},
	iconBig: {
		fontSize: '5rem',
		marginTop: '1rem'
	},
	detail: {
		fontWeight: 'bold',
		marginTop: '1rem'
	},
	buttonLoadMore: {
		alignSelf: 'center'
	},
	infoContainer: {
		display: 'flex',
		flexDirection: 'column'
	}
});

export default useStyles;
