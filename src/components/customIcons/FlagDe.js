import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function FlagDe(props) {
	return (
		<SvgIcon viewBox="0 0 40 28" {...props}>
			<path
				d="M37.0043 0.896576H2.9957C1.34117 0.896576 0 2.23775 0 3.89228V9.6322H40V3.89228C40 2.23775 38.6588 0.896576 37.0043 0.896576Z"
				fill="#464655"
			/>
			<path
				d="M0 24.1078C0 25.7622 1.34117 27.1035 2.9957 27.1035H37.0043C38.6587 27.1035 40 25.7623 40 24.1078V18.3678H0V24.1078Z"
				fill="#FFE15A"
			/>
			<path d="M40 9.63205H0V18.3672H40V9.63205Z" fill="#FF4B55" />
		</SvgIcon>
	);
}
