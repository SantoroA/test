import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const CheckboxStyled = withStyles({
	root: {
		'&.Mui-disabled': {
			'&.Mui-checked': {
				color: '#07B597'
			}
		}
	}
})((props) => <Checkbox color="default" {...props} />);

export default CheckboxStyled;
