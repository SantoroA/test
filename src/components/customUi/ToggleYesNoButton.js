import { styled } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';

const ToggleYesNoButton = styled(ToggleButton)({
	borderColor: '#07B597',
	color: '#07B597',
	border: '2px solid',
	borderRadius: '10px',
	fontWeight: 'bold',
	textTransform: 'none',
	width: '100%',
	'&.Mui-selected': {
		background: '#07B597',
		color: 'white'
	},
	'&.Mui-disabled': {
		'&.Mui-selected': {
			background: '#96ccbd',
			borderColor: '#96ccbd',
			color: 'white'
		},
		borderColor: '#A0A4A8'
		// background: '#07B597',
		// color: 'white'
	},

	'&:hover': {
		background: '#D7FEF1',
		color: 'rgba(7, 181, 151, 1)'
	}
});

export default ToggleYesNoButton;
