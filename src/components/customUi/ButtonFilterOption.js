import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ButtonFilterOption = styled(Button)({
	borderColor: '#A0A4A8',
	color: '#52575C',
	border: '2px solid',
	borderRadius: '25px',
	textTransform: 'none',
	paddingTop: '0.5rem',
	paddingBottom: '0.5rem',
	paddingRight: '1rem',
	paddingLeft: '1rem',
	'&:hover': {
		backgroundColor: '#07B597',
		color: '#fff',
		borderColor: '#fff'
	}
});

export default ButtonFilterOption;
