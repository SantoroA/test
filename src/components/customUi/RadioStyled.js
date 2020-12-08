import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

const RadioStyled = withStyles({
	root: {
		color: '#00A99D',
		'&$checked': {
			color: '#00A99D'
		}
	},
	checked: {}
})((props) => <Radio color="default" {...props} />);

export default RadioStyled;
