import React from 'react';

import CardAppointment from '../../groups/CardAppointment';

const ShowAppData = ({ appointments, setDialogAppDetailOpen, setAppointmentToView }) => {
	return appointments.map((apt) => {
		return (
			<div>
				<CardAppointment
					onSubmit={() => {
						setDialogAppDetailOpen(true);
						setAppointmentToView(apt);
					}}
					key={apt._id}
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
			</div>
		);
	});
};

export default ShowAppData;
