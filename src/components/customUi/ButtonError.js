import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ButtonError = styled(Button)({
	background: 'grey',
	border: 0,
	borderRadius: '10px',
	color: 'white',
	fontWeight: 'bold',
	textTransform: 'none',

	'&:hover': {
		background: 'grey'
	}
});

export default ButtonError;
