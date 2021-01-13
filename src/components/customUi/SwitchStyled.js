import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const SwitchStyled = withStyles({
	switchBase: {
		color: '#07B597',
		'&$checked': {
			color: '#07B597'
		},
		'&$checked + $track': {
			backgroundColor: '#07B597'
		}
	},
	checked: {},
	track: {}
})(Switch);

export default SwitchStyled;
