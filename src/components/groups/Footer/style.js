import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	footer: {
		backgroundColor: '#F6F8FB',
		marginTop: 'calc(5%)',
		bottom: '0',
		padding: '2rem'
	},
	img: {
		width: '150px',
		marginBottom: '1rem'
	},

	iconGrid: {
		display: 'flex',
		width: '150px',
		justifyContent: 'space-between'
	},
	icon: {
		color: '#52575C',
		'&:hover': {
			color: '#07B597'
		}
	},

	textFooter: {
		display: 'flex',
		textAlign: 'center',
		marginBottom: '1rem',
		marginTop: '1rem'
	},
	title: {
		fontWeight: 'bold',
		color: '#52575C',
		marginBottom: '1rem'
	},
	link: {
		color: '#52575C',
		fontWeight: 'normal',
		textDecoration: 'none ',
		'&:hover': {
			color: '#07B597',
			textDecoration: 'none'
		}
	},
	services: {
		marginBottom: '1rem'
	},
	email: {
		color: '#52575C',
		fontWeight: 'normal',
		'&>a': {
			color: '#07B597',
			textDecoration: 'none '
		}
	},
	emailLink: {
		paddingLeft: '0.3rem'
	},
	columnOne: {
		flexDirection: 'column',
		justifyContent: 'center',
		paddingBottom: '1rem'
	}
});

export default useStyles;
