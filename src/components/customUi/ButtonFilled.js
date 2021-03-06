import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ButtonFilled = styled(Button)({
	background: 'linear-gradient(119.45deg, #05B240 0%, #09B8EF 99.75%)',
	border: 0,
	borderRadius: '10px',
	color: 'white',
	fontWeight: 'bold',
	textTransform: 'none',
	'&:hover': {
		background: '#0BC7E0'
	},
	'&:disabled': {
		background: 'rgba(232, 232, 232, 1)'
	}
});

export default ButtonFilled;
