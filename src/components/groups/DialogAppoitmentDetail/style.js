import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	layout: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		padding: '2rem'
	},
	container: {
		display: 'flex',
		flexDirection: 'column'
	},
	closeButton: {
		alignSelf: 'flex-end'
	},
	sub: {
		fontWeight: 700,
		marginBottom: '1rem'
	},
	subtitle: {
		fontWeight: 700,
		marginTop: '1rem'
	},
	optionsContainer: {
		paddingTop: '1rem',
		paddingLeft: '1rem',
		paddingRight: '1rem'
	},
	iconsWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	divider: {
		marginBottom: '1rem',
		marginTop: '1rem'
	}
});

export default useStyles;
