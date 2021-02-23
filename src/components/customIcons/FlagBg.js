import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function FlagBg(props) {
	return (
		<SvgIcon viewBox="0 0 40 28" {...props}>
			<path
				d="M2.9957 27.1034H37.0043C38.6587 27.1034 40 25.7623 40 24.1077V18.3678H0V24.1077C0 25.7623 1.34117 27.1034 2.9957 27.1034Z"
				fill="#FF4B55"
			/>
			<path
				d="M40 3.89228C40 2.23783 38.6588 0.896576 37.0043 0.896576H2.9957C1.34117 0.896576 0 2.23775 0 3.89228V9.6322H40V3.89228Z"
				fill="#F5F5F5"
			/>
			<path d="M40 9.63202H0V18.3672H40V9.63202Z" fill="#73AF00" />
		</SvgIcon>
	);
}
