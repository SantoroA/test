import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const TextInput = withStyles({
	root: {
		'& fieldset': {
			borderRadius: 25
		},

		'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			borderColor: 'linear-gradient(119.45deg, #05B240 0%, #09B8EF 99.75%)'
		}
	}
})(TextField);

export default TextInput;
