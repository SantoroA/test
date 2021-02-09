import React from 'react';

import CardAppointment from '../../groups/CardAppointment';

const ShowAppData = ({ appointments, setDialogAppDetailOpen, setAppointmentToView }) => {
	return appointments.map((apt) => {
		return (
			<CardAppointment
				onSubmit={() => {
					setDialogAppDetailOpen(true);
					setAppointmentToView(apt);
				}}
				key={apt._id}
				showPrice={false}
				state={{
					appointment: {
						amount: apt.amount,
						end: apt.appointmentTimeEnd,
						id: apt.profilePatientid._id,
						idApt: apt._id,
						start: apt.appointmentTimeStart
					},
					name: `${apt.profilePatientid.firstName} ${apt.profilePatientid.lastName}`,
					pic: apt.accountPatientid.profilePicture,
					// apt.accountPatientid.profilePicture
					buttonText: 'View',
					title: 'Patient'
				}}
			/>
		);
	});
};

export default ShowAppData;
