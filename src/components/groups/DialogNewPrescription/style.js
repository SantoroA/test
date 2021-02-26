import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	title: {
		fontWeight: 'bold',
		minWidth: '20rem'
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		padding: '1rem'
	},
	input: {
		padding: '0.5rem'
	},
	divider: {
		marginBottom: '1rem'
	},

	section: {
		padding: '0.5rem'
	},
	selector: {
		marginBottom: '1rem',
		overflowY: 'scroll',
		maxHeight: '13rem'
	},
	emptyState: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '20rem',
		flexDirection: 'column',
		textAlign: 'center'
	},

	radioLabel: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		marginRight: '1rem'
	},
	docName: {
		marginRight: '1rem',
		fontWeight: 'bold'
	},
	documentInput: {
		display: 'none'
	},
	documentInputLabel: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: '0.8rem',
		'&:hover': {
			cursor: 'pointer'
		}
	},
	group: {
		display: 'flex',
		flexDirection: 'row'
	},
	name: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	item: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: '0.5rem'
	},
	titleWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: '1rem',
		justifyContent: 'space-between'
	},
	buttonContainer: {
		padding: '0.5rem',
		display: 'flex',
		flexDirection: 'row'
	},
	backButton: {
		marginRight: '0.5rem'
	},
	previewButton: {
		marginLeft: '0.5rem'
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	medicineCard: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: '0.5rem',
		marginBottom: '0.5rem',
		backgroundColor: '#dadada',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)',
		borderRadius: '10px'
	},
	listTitle: {
		padding: '0.5rem',
		marginBottom: '0.5rem'
	},
	inputIcon: {
		color: '#A0A4A8'
	},
	medInfo: {
		fontWeight: 'bold'
	},
	prescriptionPaper: {
		padding: '1rem',
		margin: '0.5rem'
	},
	patientBox: {
		padding: '1rem',
		backgroundColor: '#F0F9FF',
		margin: '0.5rem',
		borderRadius: '10px'
	},
	bold: {
		fontWeight: 'bold'
	},
	previewDivider: {
		backgroundColor: '#07B597',
		marginTop: '0.5rem',
		marginBottom: '0.5rem'
	},
	img: {
		width: '8rem'
	},
	logoWrapper: {
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		marginBottom: '1rem'
	}
});

export default useStyles;
