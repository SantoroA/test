import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function FlagDe(props) {
	return (
		<SvgIcon viewBox="0 0 640 480" {...props}>
			<path fill="#ffce00" d="M0 320h640v160H0z" />
			<path d="M0 0h640v160H0z" />
			<path fill="#d00" d="M0 160h640v160H0z" />
		</SvgIcon>
	);
}
