import React, { useState, useContext } from 'react';
import Loader from 'react-loader-spinner';
import useStyles from './style';
import EmptyDocState from './emptyState';
import ErrorMessage from '../../groups/ErrorMessage';
import Row from './row';
import { useTranslation } from 'react-i18next';
import { Context as AuthContext } from '../../../context/AuthContext';
import { useQuery, gql } from '@apollo/client';
import { DOCUMENTS_QUERY } from '../GraphQl/graphQlQuery';
import DialogUploadDoc from '../../groups/DialogUploadDoc';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
//MATERIAL UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PublishIcon from '@material-ui/icons/Publish';

// no back fazer um if do horario e fazer grater and litle

const TabDocuments = () => {
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);
	const [ dialogOpen, setDialogOpen ] = useState(false);
	const { state: { userId } } = useContext(AuthContext);
	const { loading, error, data, fetchMore, refetch } = useQuery(DOCUMENTS_QUERY, {
		variables: {
			idPatient: userId,
			cursor: null,
			limit: 3
		}
	});

	const documents = [
		{
			profileHCPid: {
				firstName: 'Gabi',
				lastName: 'Fruit'
			},
			appointmentTimeStart: '2021-02-10T09:30:00.000Z',
			appointmentTimeEnd: '2021-02-10T09:30:00.000Z',
			patComments: '',
			docStatus: '',
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/3053844/pexels-photo-3053844.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
			},
			_id: 'sfwefwefadaawef',
			patientDoc: {
				document: 'q',
				name: 'doc2'
			}
		},
		{
			profileHCPid: {
				firstName: 'Aline',
				lastName: 'Fruit'
			},
			appointmentTimeStart: '2021-02-10T08:30:00.000Z',
			appointmentTimeEnd: '2021-02-10T08:30:00.000Z',
			patComments: '',
			docStatus: '',
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/3136340/pexels-photo-3136340.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
			},
			_id: 'sfwefasdaswefawef',
			patientDoc: {
				document: 'q',
				name: 'doc2'
			}
		},
		{
			profileHCPid: {
				firstName: 'Peach',
				lastName: 'Fruit'
			},
			appointmentTimeStart: '2021-02-10T07:00:00.000Z',
			appointmentTimeEnd: '2021-02-10T07:30:00.000Z',
			patComments: '',
			docStatus: '',
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
			},
			_id: 'sfwefweaadfeffawef',
			patientDoc: {
				document: 'q',
				name: 'doc2'
			}
		},
		{
			profileHCPid: {
				firstName: 'Pear',
				lastName: 'Fruit'
			},
			appointmentTimeStart: '2021-02-05T07:00:00.000Z',
			appointmentTimeEnd: '2021-02-05T07:30:00.000Z',
			patComments: '',
			docStatus: '',
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
			},
			_id: 'sfwefwfvfdefawef',
			patientDoc: {
				document: 'q',
				name: 'doc2'
			}
		}
	];

	console.log('data', data);

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const classes = useStyles();
	const { t } = useTranslation();
	return (
		<Grid className={classes.root} container>
			<Grid item className={classes.header}>
				<Typography className={classes.title} variant="h5">
					{t('DOCUMENTS.1')}
				</Typography>
				<ButtonFilled
					className={classes.uploadButton}
					onClick={() => {
						setDialogOpen(true);
					}}
				>
					{t('Upload_new_document.1')} <PublishIcon className={classes.uploadIcon} />
				</ButtonFilled>
			</Grid>
			{loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)}
			{error && <ErrorMessage />}
			{data && (
				<div>
					{data.patientDocuments.edges.length > 0 ? (
						(rowsPerPage > 0
							? data.patientDocuments.edges.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: data.patientDocuments.edges).map((doc) => {
							return <Row value={doc} key={doc._id} />;
						})
					) : (
						<EmptyDocState />
					)}
				</div>
			)}
			<DialogUploadDoc
				isOpen={dialogOpen}
				title="Upload new document"
				updateDoc={refetch}
				close={() => setDialogOpen(false)}
			/>
		</Grid>
	);
};

export default TabDocuments;
