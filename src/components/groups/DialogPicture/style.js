import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	layout: {
		display: 'flex',
		flexDirection: 'column',
		justifycontent: 'center',
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
	media: {
		borderRadius: '50%',
		justifycontent: 'center',
		width: '14rem',
		height: '14rem',
		marginTop: '1rem',
		marginBottom: '1rem',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)',
		backgroundColor: 'rgba(232, 232, 232, 1)',
		color: 'rgba(160, 164, 168, 1)'
	},
	imageContainer: {
		display: 'flex',
		justifycontent: 'center'
	}
});

export default useStyles;
