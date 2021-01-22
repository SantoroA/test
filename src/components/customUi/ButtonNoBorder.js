import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ButtonNoBorder = styled(Button)({
	background: 'transparent',
	border: 0,
	borderRadius: '10px',
	color: '#07B597',
	fontWeight: 'bold',
	textTransform: 'none'
});

export default ButtonNoBorder;
