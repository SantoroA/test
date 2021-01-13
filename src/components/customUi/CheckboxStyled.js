import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const CheckboxStyled = withStyles({
	root: {
		color: '#00A99D',
		'&$checked': {
			color: '#00A99D'
		}
	}
})((props) => <Checkbox color="default" {...props} />);

export default CheckboxStyled;
