import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const TextInputRounder = withStyles({
	root: {
		'& fieldset': {
			borderRadius: 25
		},

		'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			borderColor: '#07B597',
			borderWidth: 2
		},
		'& .MuiFilledInput-root': {
			backgroundColor: 'rgba(255, 255, 255, 0)'
		},
		'& .MuiOutlinedInput-input': {
			paddingTop: '0.8rem',
			paddingBottom: '0.8rem'
		}
	}
})(TextField);

export default TextInputRounder;
