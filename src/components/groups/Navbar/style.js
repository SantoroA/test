import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	navbar: {
		flexGrow: 1,
		backgroundColor: '#EFF8FF',
		color: 'black',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)'
	},
	toolbar: {
		justifyContent: 'space-between'
	},

	title: {
		flexGrow: 1
	},
	img: {
		height: '2em',
		paddingInlineStart: '1em'
	},

	currencySelect: {
		width: '3rem',
		marginRight: '1rem'
	},
	countrySelect: {
		width: '3rem',
		marginRight: '1rem',
		alignItems: 'center'
	},
	section: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}
});

export default useStyles;
