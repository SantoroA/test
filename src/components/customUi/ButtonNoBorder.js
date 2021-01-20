import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ButtonNoBorder = styled(Button)({
	background: 'transparent',
	border: 0,
	borderRadius: '10px',
	color: 'linear-gradient(119.45deg, #05B240 0%, #09B8EF 99.75%) !important',
	fontWeight: 'bold',
	textTransform: 'none',
	
});

export default ButtonNoBorder;
