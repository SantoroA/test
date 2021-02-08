import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		height: '12rem',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)'
	},

	content: {
		display: 'flex',
		flexDirection: 'column'
	},
	cover: {
		width: '12rem'
	},
	docName: {
		fontWeight: '700'
	},
	subtitle: {
		display: 'flex',
		alignItems: 'center',
		marginTop: '1rem'
	},
	icon: {
		marginRight: '0.5rem'
	}
});

export default useStyles;
