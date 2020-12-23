import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function ProfileIcon(props) {
	return (
		<SvgIcon viewBox="0 0 42 42  " {...props}>
			<path d="M33.7272 22.0264C33.2452 22.0264 32.7699 22.1366 32.3402 22.3481C31.9104 22.5595 31.5383 22.8661 31.2542 23.2431C30.9702 22.8656 30.5981 22.5585 30.1682 22.3467C29.7383 22.1349 29.2627 22.0245 28.7803 22.0244C27.7621 22.0244 26.9325 22.4305 26.3814 23.1988C25.9529 23.7962 25.7168 24.5942 25.7168 25.4449C25.7168 29.1198 30.7202 32.2964 30.9331 32.4301C31.0289 32.4901 31.1406 32.5219 31.2547 32.5218C31.3687 32.5216 31.4803 32.4894 31.5759 32.4291C31.7888 32.2949 36.7908 29.0984 36.7908 25.4447C36.7904 23.7875 35.7171 22.0264 33.7272 22.0264ZM31.2528 31.2548C30.1952 30.5204 26.8971 28.0219 26.8971 25.4447C26.8971 25.0643 26.9879 23.1666 28.7803 23.1666C29.2799 23.1673 29.7587 23.3598 30.1117 23.7018C30.4648 24.0438 30.6633 24.5074 30.6636 24.9909C30.6636 25.1424 30.7258 25.2877 30.8364 25.3948C30.9471 25.5019 31.0972 25.5621 31.2537 25.5621C31.4103 25.5621 31.5604 25.5019 31.671 25.3948C31.7817 25.2877 31.8439 25.1424 31.8439 24.9909C31.8445 24.5077 32.0432 24.0444 32.3963 23.7028C32.7493 23.3612 33.228 23.169 33.7272 23.1686C35.0992 23.1686 35.6105 24.5644 35.6105 25.4442C35.6101 28.0059 32.3102 30.5164 31.2528 31.2548Z" />
			<path d="M31.2534 17.6535C29.3915 17.655 27.5675 18.1622 25.9886 19.1174C24.4098 20.0725 23.1395 21.4372 22.3222 23.0564C22.231 23.0289 22.1428 23.002 22.0594 22.9758L21.3155 21.3547C23.0738 20.0647 23.5566 18.0646 23.6887 17.0945C24.884 16.7815 25.9825 15.4216 26.4225 13.6198C26.6592 12.6462 26.3125 11.7398 25.5594 11.3642C25.3502 11.2592 25.1178 11.2048 24.8821 11.2059C24.9212 10.9225 24.9619 10.5758 25.0042 10.1496C25.1026 9.15577 25.1654 8.15198 25.1654 7.89738C25.1654 6.83328 24.791 5.21845 23.7406 3.87739C21.9922 1.64605 19.233 1.17773 17.2262 1.17773C15.2522 1.17773 12.5091 1.61463 10.651 3.69591C9.18807 5.33449 8.87006 7.33538 9.01313 8.28075C9.01836 8.31494 9.04981 8.47602 9.10005 8.7165C9.10275 8.74814 9.10816 8.7795 9.11624 8.81026C9.11759 8.81516 9.12172 8.82993 9.12846 8.85164C9.25712 9.45835 9.47665 10.4347 9.70352 11.2426C9.49821 11.2599 9.29884 11.3183 9.11801 11.414C8.39516 11.7921 8.06375 12.6788 8.29323 13.6202C8.73391 15.4253 9.83547 16.7863 11.0332 17.0964C11.1743 18.0393 11.6642 19.9943 13.3432 21.2861L12.5497 22.9418C11.9883 23.1115 11.3712 23.278 10.7178 23.4528C6.70784 24.5259 1.2207 25.9954 1.2207 30.8842V34.4094C1.2207 35.604 2.80467 36.8837 3.92612 36.8837H30.8429C30.9791 36.889 31.1158 36.8925 31.2534 36.8925C32.5609 36.8962 33.8564 36.6501 35.0655 36.1683C36.2746 35.6865 37.3736 34.9785 38.2996 34.0849C39.2255 33.1913 39.9602 32.1296 40.4614 30.9607C40.9627 29.7917 41.2207 28.5386 41.2207 27.273C41.2207 26.0073 40.9627 24.7542 40.4614 23.5852C39.9602 22.4163 39.2255 21.3546 38.2996 20.461C37.3736 19.5674 36.2746 18.8594 35.0655 18.3776C33.8564 17.8959 32.5609 17.6498 31.2534 17.6535ZM11.5436 4.4433C12.8011 3.03476 14.7128 2.32058 17.2259 2.32058C19.756 2.32058 21.6314 3.07679 22.8 4.56816C23.217 5.10462 23.5316 5.70889 23.729 6.35248C23.1988 5.796 22.5856 5.31942 21.9097 4.93855C21.8317 4.89617 21.7448 4.87163 21.6555 4.86681C21.5662 4.86199 21.477 4.87702 21.3947 4.91074C21.3123 4.94446 21.239 4.99598 21.1805 5.06136C21.1219 5.12673 21.0795 5.20422 21.0567 5.28789C21.0498 5.31074 20.3232 7.59994 15.7369 9.60744C14.0211 10.3582 12.6384 10.5063 11.6268 10.0469C11.3042 9.89517 11.0166 9.68187 10.7812 9.41982C10.5459 9.15776 10.3678 8.85236 10.2576 8.52196L10.2569 8.51984C10.2204 8.34431 10.1937 8.20371 10.1803 8.1155C9.97069 6.72956 11.0083 5.04292 11.5436 4.4433ZM12.1596 16.5685C12.1525 16.4214 12.0874 16.2825 11.9776 16.1805C11.8678 16.0784 11.7217 16.0211 11.5695 16.0203H11.5459C10.8411 16.0203 9.83176 14.9565 9.44141 13.3576C9.32043 12.8613 9.4796 12.5232 9.67874 12.4192C9.90434 12.3012 10.1445 12.5084 10.2372 12.6031C10.3397 12.7078 10.4793 12.7711 10.628 12.7802C10.7767 12.7894 10.9235 12.7438 11.0389 12.6526C11.1543 12.5613 11.2298 12.4312 11.2502 12.2883C11.2706 12.1454 11.2343 12.0004 11.1488 11.8823C11.0771 11.7538 10.9633 11.3905 10.8386 10.9352C10.9229 10.9828 11.011 11.0282 11.1033 11.0709C11.6743 11.3283 12.2981 11.4576 12.9279 11.4491C13.9024 11.4491 15.0043 11.182 16.2233 10.6484C19.8598 9.05654 21.3221 7.25002 21.8794 6.28197C22.1483 6.47211 22.4027 6.68076 22.6405 6.90631C23.4679 7.69419 23.8888 8.5169 23.8925 9.35178C23.8051 10.3845 23.67 11.6096 23.5497 11.9071C23.4709 12.0287 23.4423 12.1747 23.4696 12.3158C23.4969 12.4569 23.5782 12.5829 23.6971 12.6687C23.8161 12.7545 23.9641 12.7938 24.1117 12.7787C24.2592 12.7636 24.3954 12.6953 24.4933 12.5873C24.6029 12.4665 24.8165 12.2793 25.0188 12.38C25.2371 12.4888 25.3947 12.8599 25.2735 13.3576C24.8808 14.9663 23.8619 16.0321 23.1567 16.0203C23.0012 16.0175 22.8508 16.0743 22.7382 16.1782C22.6256 16.282 22.5599 16.4247 22.5554 16.5752C22.5301 17.0453 22.2996 19.4516 20.2713 20.6652C19.4844 21.1355 18.5041 21.374 17.3575 21.374C16.2149 21.374 15.2371 21.1303 14.451 20.6495C12.4589 19.4322 12.1928 17.0364 12.1596 16.5685ZM13.5114 23.6502L14.3502 21.8999C15.218 22.309 16.2264 22.5164 17.3576 22.5164C18.4591 22.5164 19.4438 22.3245 20.2951 21.9457L21.0869 23.6709C21.1201 23.7432 21.1684 23.808 21.2288 23.8613C21.2892 23.9145 21.3603 23.9551 21.4377 23.9803C21.5721 24.0242 21.7137 24.0688 21.8658 24.1152C21.7713 24.3774 21.6885 24.6445 21.6172 24.9165C20.9757 26.0497 19.4911 27.346 17.3576 27.346C14.5739 27.346 13.1638 25.2305 12.8805 24.0385C12.9745 24.0102 13.0675 23.9814 13.1587 23.953C13.2358 23.9287 13.307 23.8893 13.3677 23.8372C13.4284 23.7851 13.4773 23.7214 13.5114 23.6502ZM3.92612 35.7412C3.36674 35.7412 2.401 34.8948 2.401 34.4094V30.8842C2.401 29.0981 3.27063 27.757 5.1479 26.6636C6.84703 25.6739 9.06819 25.079 11.03 24.5539C11.2745 24.4886 11.5123 24.4244 11.7466 24.3607C12.1888 26.0983 14.0963 28.4885 17.358 28.4885C18.8156 28.4913 20.224 27.9784 21.3182 27.0464C21.3163 27.1217 21.3151 27.1972 21.3151 27.273C21.3163 29.0096 21.8028 30.7135 22.723 32.2043C23.6432 33.6951 24.9628 34.9172 26.5421 35.7412H3.92612ZM31.2534 35.75H31.2393C31.2066 35.7445 31.1734 35.7416 31.1402 35.7414H30.8631C28.562 35.6397 26.3951 34.6637 24.8328 33.0252C23.2705 31.3867 22.4388 29.218 22.5182 26.9897C22.5977 24.7614 23.5818 22.6533 25.257 21.1229C26.9323 19.5925 29.1635 18.7634 31.4664 18.8154C33.7693 18.8674 35.9581 19.7964 37.5578 21.4007C39.1574 23.0051 40.0389 25.1553 40.0108 27.3848C39.9828 29.6143 39.0475 31.7431 37.4079 33.3092C35.7684 34.8754 33.5569 35.7523 31.2534 35.75Z" />
		</SvgIcon>
	);
}
