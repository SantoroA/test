import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

const RadioStyled = withStyles({
	root: {
		'&$checked': {
			color: '#07B597'
		}
	},
	checked: {}
})((props) => <Radio color="default" {...props} />);

export default RadioStyled;
