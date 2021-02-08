import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	layout: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '2rem',
		textAlign: 'center'
	},
	input: {
		padding: '0.5rem'
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '25ch'
	},
	time: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start'
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
	dialogActions: {
		width: '90%'
	},
	rating: {
		display: 'flex',
		alignItems: 'center'
	},
	star: {
		marginRight: '0.5rem'
	},
	moreFilters: {
		display: 'flex',
		flexDirection: 'column'
	},
	filter: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	rates: {
		alignItems: 'center'
	}
}));

export default useStyles;
