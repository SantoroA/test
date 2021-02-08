import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	name: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		marginRight: '1rem'
	},
	amount: {
		fontWeight: 'bold',
		color: 'rgba(82, 87, 92, 1)'
	}
});
export default useStyles;
