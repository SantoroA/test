import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	loginName: {
		color: 'rgba(82, 87, 92, 1)',
		marginLeft: '0.2rem',
		marginRight: '0.5rem',
		fontWeight: 700
	},
	menu: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	drawerIconContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		marginRight: '0.5rem'
	},
	menuList: {
		padding: '1rem 1rem'
	},

	drawer: {
		'& .MuiDrawer-paperAnchorRight': {
			marginTop: '15%',
			width: '65%',
			height: 'fit-content',
			borderTopLeftRadius: '8px',
			borderBottomLeftRadius: '8px'
		}
	},
	listItems: {
		color: '#A0A4A8',
		'&.Mui-selected': {
			color: '#07B597',
			backgroundColor: 'transparent'
		},
		'&.MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover': {
			backgroundColor: 'transparent'
		}
	},
	icons: {
		marginRight: '1.2rem',
		marginLeft: '0.6rem'
	},
	listText: {
		fontWeight: 'bold'
	},
	linkItems: {
		color: '#111111',
		'&.Mui-selected': {
			color: '#07B597',
			backgroundColor: 'transparent'
		},
		'&.MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover': {
			backgroundColor: 'transparent'
		}
	}
});

export default useStyles;
