import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ButtonOutlined = styled(Button)({
	borderColor: '#07B597',
	color: '#07B597',
	border: '2px solid',
	borderRadius: '10px',

	fontWeight: 'bold',
	textTransform: 'none',

	'&:hover': {
		border: '2px solid',
		borderColor: '#D6FBF1',
		color: '#0BC7E0',
		backgroundColor: '#D6FBF1'
	},
	'&.MuiButton-root.Mui-disabled' : {
		border: '2px solid',
		borderColor: "#A0A4A8"
	}
});

export default ButtonOutlined;
