import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const SwitchStyled = withStyles({
	switchBase: {
		color: '#00A99D',
		'&$checked': {
			color: '#00A99D'
		},
		'&$checked + $track': {
			backgroundColor: '#00A99D'
		}
	},
	checked: {},
	track: {}
})(Switch);

export default SwitchStyled;
