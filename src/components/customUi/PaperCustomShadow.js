import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const PaperCustomShadow = withStyles({
	root: {
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)',
		borderRadius: '10px'
	}
})(Paper);

export default PaperCustomShadow;
