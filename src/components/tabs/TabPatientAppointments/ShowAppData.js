import React from 'react';
import CardAppointment from '../../groups/CardAppointment';

const ShowAppData = ({ appointments, setDialogAppDetailOpen, setAppointmentToView }) => {
	return appointments.map((apt) => {
		return (
			<div key={apt._id}>
				<CardAppointment
					onSubmit={() => {
						setDialogAppDetailOpen(true);
						setAppointmentToView(apt);
					}}
					key={apt._id}
					showPrice={true}
					state={{
						appointment: {
							amount: apt.amount,
							end: apt.appointmentTimeEnd,
							id: apt.profilePatientid._id,
							idApt: apt._id,
							start: apt.appointmentTimeStart
						},
						name: `${apt.profileHCPid.firstName} ${apt.profileHCPid.lastName}`,
						pic: apt.accountHCPid.profilePicture,
						buttonText: 'View',
						title: 'Doctor'
					}}
				/>
			</div>
		);
	});
};

export default ShowAppData;
