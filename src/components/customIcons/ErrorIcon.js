import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function ErrorIcon(props) {
	return (
		<SvgIcon viewBox="0 0 80 81" {...props}>
			<path
				d="M55.5978 80.913H24.4023C23.7806 80.913 23.1845 80.6661 22.7452 80.2264L0.686563 58.168C0.246875 57.7284 0 57.1323 0 56.5108V25.3152C0 24.6936 0.246875 24.0975 0.686563 23.658L22.745 1.59953C23.1845 1.15984 23.7806 0.912964 24.4023 0.912964H55.5978C56.2195 0.912964 56.8156 1.16 57.255 1.59953L79.3134 23.658C79.753 24.0975 80 24.6936 80 25.3152V56.5106C80 57.1322 79.7531 57.7283 79.3134 58.1678L57.2552 80.2264C56.8156 80.6659 56.2195 80.913 55.5978 80.913Z"
				fill="url(#paint0_linear)"
			/>
			<path
				d="M40 47.9442C36.123 47.9442 32.9688 44.79 32.9688 40.913V22.163C32.9688 18.2859 36.123 15.1317 40 15.1317C43.877 15.1317 47.0312 18.2859 47.0312 22.163V40.913C47.0312 44.79 43.877 47.9442 40 47.9442Z"
				fill="url(#paint1_linear)"
			/>
			<path
				d="M40 66.6942C36.123 66.6942 32.9688 63.54 32.9688 59.663C32.9688 55.7859 36.123 52.6317 40 52.6317C43.877 52.6317 47.0312 55.7859 47.0312 59.663C47.0312 63.54 43.877 66.6942 40 66.6942Z"
				fill="url(#paint2_linear)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear"
					x1="40"
					y1="80.913"
					x2="40"
					y2="0.912964"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#FD3A84" />
					<stop offset="1" stopColor="#FFA68D" />
				</linearGradient>
				<linearGradient
					id="paint1_linear"
					x1="40"
					y1="47.9442"
					x2="40"
					y2="15.1317"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#FFC2CC" />
					<stop offset="1" stopColor="#FFF2F4" />
				</linearGradient>
				<linearGradient
					id="paint2_linear"
					x1="40"
					y1="66.6942"
					x2="40"
					y2="52.6317"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#FFC2CC" />
					<stop offset="1" stopColor="#FFF2F4" />
				</linearGradient>
			</defs>
		</SvgIcon>
	);
}
