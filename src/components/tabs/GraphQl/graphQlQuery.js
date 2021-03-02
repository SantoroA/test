import { gql } from '@apollo/client';

export const DOCUMENTS_QUERY = gql`
query GetAppointments($idPatient: ID!, $cursor: String, $limit: Int) {
    patientDocuments(idPatient: $idPatient, cursor: $cursor, limit: $limit) {
        edges {
            profileHCPid {
            _id
            firstName
            lastName
        }
        _id
        appointmentTimeStart
        appointmentTimeEnd
        profilePatientid
        accountHCPid {
            profilePicture
        }
        amount
        patientDoc {
            name
            document
        }
        }
        pageInfo {
              endCursor,
              hasNextPage,
            },
        totalCount
        
    }
}
`;

export const MYAPPOINTMENTS_QUERY = gql`
	query GetAppointments($id: ID!) {
		patientAppointmentsForUpload(id: $id) {
			_id
			appointmentTimeStart
			profileHCPid {
				firstName
				lastName
			}
			accountHCPid {
				profilePicture
			}
		}
	}
`;