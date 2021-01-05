import { styled } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';

const ToggleButtonCustom = styled(ToggleButton)({
	background: 'rgba(232, 232, 232, 1)',
	border: 0,
	borderRadius: '25px',
	color: 'rgba(82, 87, 92, 1)',
	fontWeight: 'bold',
	textTransform: 'none',
	'&.Mui-selected': {
		background: '#D7FEF1',
		color: 'rgba(7, 181, 151, 1)'
	},
	'&.Mui-disabled': {
		color: 'rgba(82, 87, 92, 0.5)'
	},
	'&:hover': {
		color: 'rgba(7, 181, 151, 1)'
	}
});

export default ToggleButtonCustom;
