import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';

const TabCustom = withStyles({
	root: {
		'&.Mui-selected': {
			color: '#07B597',
			backgroundColor: '#F6F8FB'
		}
	}
})(Tab);

export default TabCustom;
