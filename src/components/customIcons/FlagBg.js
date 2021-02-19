import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function FlagBg(props) {
	return (
		<SvgIcon viewBox="0 0 640 480" {...props}>
			<g fill-rule="evenodd" strokeWidth="1pt">
				<path fill="#d62612" d="M0 320h640v160H0z" />
				<path fill="#fff" d="M0 0h640v160H0z" />
				<path fill="#00966e" d="M0 160h640v160H0z" />
			</g>
		</SvgIcon>
	);
}
