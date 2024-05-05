import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { soundState } from '../../recoil/state/soundState';
import styles from './Header.module.scss'; // 스타일 시트 임포트

const Header = () => {
    const [isVolumeOn, setVolumeOn] = useState(soundState);

    // 음성 토글 함수
    const toggleVolume = () => {
        setVolumeOn(!isVolumeOn);
    };

    // TTS 처리 함수
    const handleTTS = (text) => {
        if (isVolumeOn) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
    };

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.navContainer}>
                    <div className={styles.topSection}>
                        <Link to="/" className={styles.logo}>
                            <div>
                                <svg
                                    width="102"
                                    height="41"
                                    viewBox="0 0 102 41"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.1172 20.4884V10.7793H21.9215V14.181H27.5585V17.441H21.9215V20.4884H11.1172Z"
                                        fill="#AAF0E5"
                                    />
                                    <path
                                        d="M33.0391 30.3405V20.5605H22.029V23.9871H16.2846V27.2709H22.029V30.3405H33.0391Z"
                                        fill="#AAF0E5"
                                    />
                                    <path d="M5.6545 10.747V15.8825H0V1H11.4306V10.747H5.6545Z" fill="#5CE0E6" />
                                    <path
                                        d="M38.5779 30.5147V25.3792H44V40.2617H33.0391V30.5147H38.5779Z"
                                        fill="#5CE0E6"
                                    />
                                    <path
                                        d="M0.234375 40.1204V20.5605H11.1952V30.2696H5.79309V40.1204H0.234375Z"
                                        fill="#5981B8"
                                    />
                                    <path d="M44 1.00064V20.5605H33.0391V10.8515H38.4413V1.00064H44Z" fill="#5981B8" />
                                    <path
                                        d="M21.7656 10.78V6.03171H16.2852V1H32.4916V10.78H21.7656Z"
                                        fill="#93CFD9"
                                        stroke="#93CFD9"
                                    />
                                    <path
                                        d="M21.7928 30.34V35.1571H27.0879V40.2617H11.4295V30.34H21.7928Z"
                                        fill="#93CFD9"
                                        stroke="#93CFD9"
                                    />
                                    <path
                                        d="M60.7686 8.43323L58.403 10.7714C58.2848 10.4457 58.1231 10.1549 57.9181 9.89894C57.7131 9.63527 57.4805 9.41425 57.2203 9.23588C56.9679 9.05751 56.692 8.9218 56.3923 8.82874C56.0927 8.73568 55.7852 8.68915 55.4698 8.68915C55.0282 8.68915 54.6103 8.77833 54.216 8.9567C53.8297 9.13507 53.4906 9.3871 53.1988 9.71282C52.915 10.0308 52.6902 10.4108 52.5247 10.8528C52.3591 11.2949 52.2763 11.7834 52.2763 12.3185C52.2763 12.7528 52.3591 13.1599 52.5247 13.5399C52.6902 13.9199 52.915 14.2534 53.1988 14.5403C53.4906 14.8273 53.8297 15.0522 54.216 15.215C54.6103 15.3779 55.0282 15.4593 55.4698 15.4593C55.7852 15.4593 56.0887 15.4167 56.3805 15.3314C56.6722 15.2461 56.9443 15.1259 57.1966 14.9708C57.4568 14.8079 57.6855 14.614 57.8826 14.3891C58.0876 14.1565 58.2532 13.9006 58.3794 13.6214L60.7449 15.9595C60.4453 16.3783 60.0983 16.7544 59.7041 17.0879C59.3177 17.4214 58.8959 17.7044 58.4385 17.9371C57.9891 18.1697 57.512 18.3442 57.0074 18.4605C56.5106 18.5846 55.9981 18.6467 55.4698 18.6467C54.5787 18.6467 53.739 18.4838 52.9505 18.1581C52.1698 17.8246 51.4838 17.3709 50.8924 16.7971C50.3089 16.2232 49.8477 15.5524 49.5086 14.7846C49.1695 14.0169 49 13.1948 49 12.3185C49 11.3646 49.1695 10.4728 49.5086 9.64302C49.8477 8.81323 50.3089 8.09201 50.8924 7.47936C51.4838 6.85895 52.1698 6.37038 52.9505 6.01365C53.739 5.65692 54.5787 5.47855 55.4698 5.47855C55.9981 5.47855 56.5145 5.54447 57.0192 5.67631C57.5317 5.80814 58.0167 6.00202 58.474 6.25794C58.9392 6.5061 59.365 6.81242 59.7514 7.17691C60.1457 7.5414 60.4847 7.96017 60.7686 8.43323Z"
                                        fill="#AAF0E5"
                                    />
                                    <path
                                        d="M74.4059 12.0742C74.4059 13.0048 74.2364 13.8734 73.8973 14.6799C73.5583 15.4787 73.097 16.1728 72.5135 16.7622C71.93 17.3438 71.244 17.8052 70.4555 18.1465C69.6749 18.4799 68.8351 18.6467 67.9362 18.6467C67.0452 18.6467 66.2054 18.4799 65.4169 18.1465C64.6362 17.8052 63.9502 17.3438 63.3588 16.7622C62.7753 16.1728 62.3141 15.4787 61.975 14.6799C61.6359 13.8734 61.4664 13.0048 61.4664 12.0742C61.4664 11.1281 61.6359 10.2518 61.975 9.44527C62.3141 8.63874 62.7753 7.94466 63.3588 7.36303C63.9502 6.77365 64.6362 6.31222 65.4169 5.97875C66.2054 5.64528 67.0452 5.47855 67.9362 5.47855C68.8351 5.47855 69.6749 5.63753 70.4555 5.95549C71.244 6.26569 71.93 6.71161 72.5135 7.29324C73.097 7.86711 73.5583 8.56119 73.8973 9.37547C74.2364 10.182 74.4059 11.0816 74.4059 12.0742ZM71.1533 12.0742C71.1533 11.5624 71.0666 11.101 70.8931 10.69C70.7275 10.2712 70.4988 9.91445 70.2071 9.61976C69.9153 9.31731 69.5723 9.08853 69.1781 8.93343C68.7917 8.77058 68.3777 8.68915 67.9362 8.68915C67.4946 8.68915 67.0767 8.77058 66.6824 8.93343C66.2961 9.08853 65.957 9.31731 65.6653 9.61976C65.3814 9.91445 65.1567 10.2712 64.9911 10.69C64.8255 11.101 64.7427 11.5624 64.7427 12.0742C64.7427 12.555 64.8255 13.001 64.9911 13.412C65.1567 13.823 65.3814 14.1797 65.6653 14.4822C65.957 14.7846 66.2961 15.025 66.6824 15.2034C67.0767 15.374 67.4946 15.4593 67.9362 15.4593C68.3777 15.4593 68.7917 15.3779 69.1781 15.215C69.5723 15.0522 69.9153 14.8234 70.2071 14.5287C70.4988 14.234 70.7275 13.8773 70.8931 13.4585C71.0666 13.0397 71.1533 12.5783 71.1533 12.0742Z"
                                        fill="#AAF0E5"
                                    />
                                    <path
                                        d="M88.4336 18.414H87.653L86.3992 16.704C86.0917 16.9754 85.7645 17.2314 85.4175 17.4718C85.0785 17.7044 84.7197 17.9099 84.3412 18.0883C83.9627 18.2589 83.5724 18.3946 83.1703 18.4954C82.776 18.5962 82.3739 18.6467 81.9638 18.6467C81.0728 18.6467 80.2331 18.4838 79.4445 18.1581C78.6639 17.8246 77.9779 17.3671 77.3865 16.7854C76.803 16.1961 76.3417 15.502 76.0027 14.7032C75.6636 13.8967 75.4941 13.0204 75.4941 12.0742C75.4941 11.1359 75.6636 10.2634 76.0027 9.4569C76.3417 8.65037 76.803 7.95242 77.3865 7.36303C77.9779 6.77365 78.6639 6.31222 79.4445 5.97875C80.2331 5.64528 81.0728 5.47855 81.9638 5.47855C82.2477 5.47855 82.5395 5.50182 82.8391 5.54835C83.1466 5.59488 83.4423 5.67243 83.7262 5.781C84.0179 5.88181 84.29 6.01753 84.5423 6.18814C84.7946 6.35875 85.0075 6.56814 85.181 6.8163V1H88.4336V18.414ZM85.181 12.0742C85.181 11.64 85.0942 11.2212 84.9208 10.8179C84.7552 10.4069 84.5265 10.0463 84.2348 9.73608C83.943 9.41813 83.6 9.16609 83.2058 8.97996C82.8194 8.78609 82.4054 8.68915 81.9638 8.68915C81.5223 8.68915 81.1044 8.7667 80.7101 8.9218C80.3237 9.0769 79.9847 9.3018 79.6929 9.59649C79.4091 9.88343 79.1843 10.2363 79.0187 10.6551C78.8532 11.0738 78.7704 11.5469 78.7704 12.0742C78.7704 12.5318 78.8532 12.9661 79.0187 13.3771C79.1843 13.7881 79.4091 14.1487 79.6929 14.4589C79.9847 14.7691 80.3237 15.0134 80.7101 15.1918C81.1044 15.3701 81.5223 15.4593 81.9638 15.4593C82.4054 15.4593 82.8194 15.3663 83.2058 15.1801C83.6 14.9863 83.943 14.7342 84.2348 14.424C84.5265 14.1061 84.7552 13.7455 84.9208 13.3422C85.0942 12.9312 85.181 12.5085 85.181 12.0742Z"
                                        fill="#AAF0E5"
                                    />
                                    <path
                                        d="M95.9442 15.3663C96.0704 15.405 96.1965 15.4322 96.3227 15.4477C96.4489 15.4554 96.575 15.4593 96.7012 15.4593C97.0166 15.4593 97.3202 15.4167 97.6119 15.3314C97.9037 15.2461 98.1757 15.1259 98.428 14.9708C98.6882 14.8079 98.9169 14.614 99.114 14.3891C99.3191 14.1565 99.4846 13.9006 99.6108 13.6214L101.976 15.9595C101.677 16.3783 101.33 16.7544 100.936 17.0879C100.549 17.4214 100.127 17.7044 99.6699 17.9371C99.2205 18.1697 98.7434 18.3442 98.2388 18.4605C97.742 18.5846 97.2295 18.6467 96.7012 18.6467C95.8102 18.6467 94.9704 18.4838 94.1819 18.1581C93.4013 17.8324 92.7152 17.3787 92.1239 16.7971C91.5404 16.2154 91.0791 15.5252 90.74 14.7265C90.401 13.9199 90.2314 13.0359 90.2314 12.0742C90.2314 11.0893 90.401 10.1898 90.74 9.37547C91.0791 8.56119 91.5404 7.86711 92.1239 7.29324C92.7152 6.71936 93.4013 6.27345 94.1819 5.95549C94.9704 5.63753 95.8102 5.47855 96.7012 5.47855C97.2295 5.47855 97.746 5.54059 98.2506 5.66467C98.7553 5.78875 99.2323 5.96712 99.6818 6.19977C100.139 6.43242 100.565 6.71936 100.959 7.06058C101.353 7.39405 101.7 7.77017 102 8.18895L95.9442 15.3663ZM97.6001 8.81711C97.4503 8.76282 97.3005 8.72792 97.1506 8.71241C97.0087 8.6969 96.8589 8.68915 96.7012 8.68915C96.2596 8.68915 95.8417 8.77058 95.4474 8.93343C95.0611 9.08853 94.722 9.31343 94.4303 9.60812C94.1464 9.90282 93.9217 10.2595 93.7561 10.6783C93.5905 11.0893 93.5077 11.5546 93.5077 12.0742C93.5077 12.1906 93.5116 12.3224 93.5195 12.4697C93.5353 12.6171 93.555 12.7683 93.5787 12.9234C93.6102 13.0708 93.6457 13.2142 93.6851 13.3538C93.7245 13.4934 93.7758 13.6175 93.8389 13.7261L97.6001 8.81711Z"
                                        fill="#AAF0E5"
                                    />
                                    <path
                                        d="M54.7364 32.1829C54.8626 32.2217 54.9888 32.2488 55.1149 32.2643C55.2411 32.2721 55.3673 32.276 55.4934 32.276C55.8088 32.276 56.1124 32.2333 56.4042 32.148C56.6959 32.0627 56.9679 31.9425 57.2203 31.7874C57.4805 31.6245 57.7091 31.4307 57.9063 31.2058C58.1113 30.9731 58.2769 30.7172 58.403 30.438L60.7686 32.7762C60.4689 33.1949 60.122 33.5711 59.7277 33.9045C59.3414 34.238 58.9195 34.521 58.4622 34.7537C58.0127 34.9864 57.5357 35.1608 57.031 35.2772C56.5343 35.4012 56.0217 35.4633 55.4934 35.4633C54.6024 35.4633 53.7626 35.3004 52.9741 34.9747C52.1935 34.649 51.5075 34.1953 50.9161 33.6137C50.3326 33.0321 49.8713 32.3419 49.5322 31.5431C49.1932 30.7366 49.0237 29.8525 49.0237 28.8909C49.0237 27.906 49.1932 27.0064 49.5322 26.1921C49.8713 25.3778 50.3326 24.6837 50.9161 24.1099C51.5075 23.536 52.1935 23.0901 52.9741 22.7721C53.7626 22.4542 54.6024 22.2952 55.4934 22.2952C56.0217 22.2952 56.5382 22.3572 57.0428 22.4813C57.5475 22.6054 58.0245 22.7838 58.474 23.0164C58.9313 23.2491 59.3571 23.536 59.7514 23.8772C60.1457 24.2107 60.4926 24.5868 60.7922 25.0056L54.7364 32.1829ZM56.3923 25.6337C56.2425 25.5795 56.0927 25.5446 55.9429 25.529C55.8009 25.5135 55.6511 25.5058 55.4934 25.5058C55.0518 25.5058 54.6339 25.5872 54.2397 25.7501C53.8533 25.9052 53.5142 26.1301 53.2225 26.4248C52.9386 26.7194 52.7139 27.0762 52.5483 27.495C52.3827 27.906 52.2999 28.3713 52.2999 28.8909C52.2999 29.0072 52.3039 29.139 52.3118 29.2864C52.3275 29.4337 52.3472 29.5849 52.3709 29.74C52.4024 29.8874 52.4379 30.0309 52.4773 30.1705C52.5168 30.31 52.568 30.4341 52.6311 30.5427L56.3923 25.6337Z"
                                        fill="#AAF0E5"
                                    />
                                    <path
                                        d="M74.5952 35.2306H73.8146L72.5608 33.5206C72.2533 33.7921 71.9261 34.048 71.5791 34.2884C71.2401 34.521 70.8813 34.7266 70.5028 34.9049C70.1243 35.0755 69.734 35.2112 69.3318 35.3121C68.9376 35.4129 68.5354 35.4633 68.1254 35.4633C67.2344 35.4633 66.3946 35.3159 65.6061 35.0212C64.8255 34.7266 64.1395 34.3 63.5481 33.7417C62.9646 33.1755 62.5033 32.4853 62.1642 31.6711C61.8252 30.8568 61.6557 29.93 61.6557 28.8909C61.6557 27.9215 61.8252 27.0335 62.1642 26.227C62.5033 25.4127 62.9646 24.7148 63.5481 24.1331C64.1395 23.5515 64.8255 23.1017 65.6061 22.7838C66.3946 22.458 67.2344 22.2952 68.1254 22.2952C68.5354 22.2952 68.9415 22.3456 69.3437 22.4464C69.7458 22.5472 70.1361 22.6868 70.5146 22.8652C70.8931 23.0435 71.2519 23.2529 71.5909 23.4933C71.9379 23.7337 72.2612 23.9935 72.5608 24.2727L73.8146 22.7954H74.5952V35.2306ZM71.3426 28.8909C71.3426 28.4566 71.2558 28.0378 71.0823 27.6345C70.9168 27.2235 70.6881 26.8629 70.3963 26.5527C70.1046 26.2348 69.7616 25.9827 69.3673 25.7966C68.981 25.6027 68.567 25.5058 68.1254 25.5058C67.6839 25.5058 67.2659 25.5795 66.8717 25.7268C66.4853 25.8741 66.1462 26.0913 65.8545 26.3782C65.5706 26.6652 65.3459 27.0219 65.1803 27.4484C65.0147 27.8672 64.9319 28.348 64.9319 28.8909C64.9319 29.4337 65.0147 29.9184 65.1803 30.3449C65.3459 30.7637 65.5706 31.1166 65.8545 31.4035C66.1462 31.6904 66.4853 31.9076 66.8717 32.0549C67.2659 32.2023 67.6839 32.276 68.1254 32.276C68.567 32.276 68.981 32.1829 69.3673 31.9968C69.7616 31.8029 70.1046 31.5509 70.3963 31.2407C70.6881 30.9227 70.9168 30.5621 71.0823 30.1588C71.2558 29.7478 71.3426 29.3252 71.3426 28.8909Z"
                                        fill="#AAF0E5"
                                    />
                                    <path
                                        d="M84.0219 35.2306H76.6414V32.0666H84.0219C84.2427 32.0666 84.4319 31.989 84.5896 31.8339C84.7473 31.6788 84.8262 31.4927 84.8262 31.2756C84.8262 31.0507 84.7473 30.9033 84.5896 30.8335C84.4319 30.7637 84.2427 30.7288 84.0219 30.7288H80.6628C80.103 30.7288 79.5786 30.6241 79.0897 30.4147C78.6008 30.2054 78.175 29.9223 77.8123 29.5656C77.4496 29.2011 77.1618 28.7784 76.9489 28.2976C76.7439 27.8168 76.6414 27.3011 76.6414 26.7505C76.6414 26.1999 76.7439 25.6841 76.9489 25.2033C77.1618 24.7225 77.4496 24.3037 77.8123 23.947C78.175 23.5903 78.6008 23.3111 79.0897 23.1095C79.5786 22.9001 80.103 22.7954 80.6628 22.7954H87.2035V25.9595H80.6628C80.442 25.9595 80.2528 26.037 80.0951 26.1921C79.9374 26.3472 79.8585 26.5333 79.8585 26.7505C79.8585 26.9754 79.9374 27.1692 80.0951 27.3321C80.2528 27.4872 80.442 27.5648 80.6628 27.5648H84.0219C84.5738 27.5648 85.0942 27.6578 85.5831 27.8439C86.072 28.0223 86.4978 28.2743 86.8605 28.6001C87.2232 28.9258 87.511 29.3174 87.7239 29.7749C87.9368 30.2325 88.0433 30.7327 88.0433 31.2756C88.0433 31.8262 87.9368 32.3419 87.7239 32.8227C87.511 33.2957 87.2232 33.7145 86.8605 34.079C86.4978 34.4357 86.072 34.7188 85.5831 34.9282C85.0942 35.1298 84.5738 35.2306 84.0219 35.2306Z"
                                        fill="#AAF0E5"
                                    />
                                    <path
                                        d="M92.8217 39.9767V36.7778L94.6195 36.801C94.9349 36.801 95.2385 36.7506 95.5302 36.6498C95.822 36.549 96.0901 36.4094 96.3345 36.231C96.5868 36.0527 96.8076 35.8394 96.9969 35.5912C97.1861 35.3508 97.3399 35.0872 97.4582 34.8002C97.1033 34.9476 96.7406 35.0949 96.37 35.2423C96.0073 35.3896 95.6406 35.4633 95.27 35.4633C94.4894 35.4633 93.7561 35.3276 93.0701 35.0561C92.3841 34.7847 91.7809 34.4008 91.2604 33.9045C90.7479 33.4004 90.3418 32.7917 90.0422 32.0782C89.7504 31.357 89.6046 30.5505 89.6046 29.6586V22.7721H92.8217V29.6586C92.8217 30.1007 92.8848 30.4884 93.0109 30.8219C93.145 31.1476 93.3224 31.4229 93.5432 31.6478C93.764 31.8649 94.0202 32.0278 94.312 32.1364C94.6116 32.2449 94.931 32.2992 95.27 32.2992C95.6012 32.2992 95.9127 32.2255 96.2044 32.0782C96.5041 31.9231 96.7643 31.7215 96.9851 31.4733C97.2058 31.2251 97.3793 30.946 97.5055 30.6358C97.6316 30.3178 97.6947 29.9921 97.6947 29.6586V22.7721H100.947V33.6602C100.939 34.5366 100.766 35.3586 100.427 36.1263C100.088 36.8941 99.6226 37.5649 99.0312 38.1388C98.4477 38.7127 97.7657 39.1663 96.9851 39.4998C96.2044 39.8333 95.3686 40 94.4776 40L92.8217 39.9767Z"
                                        fill="#AAF0E5"
                                    />
                                </svg>
                            </div>
                        </Link>
                        <div className={styles.icons}>
                            <button
                                className={styles.volumeUpIcon}
                                onMouseEnter={() => handleTTS('소리 버튼')}
                                onClick={toggleVolume}
                            >
                                {isVolumeOn ? (
                                    <svg
                                        width="45"
                                        height="40"
                                        viewBox="0 0 45 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M24.3947 8.33366V31.667C24.3947 32.5875 23.5544 33.3337 22.5177 33.3337H21.4103C20.9179 33.3318 20.446 33.1582 20.0964 32.8503L12.9076 26.467C11.8527 25.529 10.4214 25.0015 8.92847 25.0003C7.10401 25.0003 5.625 23.687 5.625 22.067V17.9337C5.625 16.3136 7.10401 15.0003 8.92847 15.0003C10.4214 14.9992 11.8527 14.4716 12.9076 13.5337L20.0964 7.15033C20.446 6.84242 20.9179 6.66883 21.4103 6.66699H22.5177C23.5544 6.66699 24.3947 7.41318 24.3947 8.33366ZM35.6565 11.217C35.476 11.0547 35.2366 10.9544 34.9808 10.9337C34.7203 10.9277 34.4687 11.0183 34.2863 11.1837L32.9537 12.367C32.6199 12.6866 32.6199 13.1807 32.9537 13.5003C36.5585 17.2426 36.5585 22.7581 32.9537 26.5003C32.6199 26.82 32.6199 27.314 32.9537 27.6337L34.2863 28.817C34.4687 28.9823 34.7203 29.0729 34.9808 29.067C35.2375 29.0492 35.478 28.9484 35.6565 28.7837C40.6145 23.7556 40.6145 16.2451 35.6565 11.217ZM29.7253 15.667C29.453 15.6578 29.1884 15.7482 28.9933 15.917L27.6606 17.117C27.3407 17.3945 27.2857 17.8339 27.5292 18.167C28.3543 19.2794 28.3543 20.7212 27.5292 21.8337C27.2857 22.1667 27.3407 22.6062 27.6606 22.8837L28.9933 24.0837C29.1903 24.2481 29.4554 24.3326 29.7253 24.317C29.9963 24.3018 30.248 24.1871 30.4198 24.0003C32.4219 21.63 32.4219 18.3707 30.4198 16.0003C30.2446 15.8147 29.9962 15.6954 29.7253 15.667Z"
                                            fill="#FD841F"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        width="34"
                                        height="40"
                                        viewBox="0 0 34 26"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M25.6606 9.30264C25.8831 9.0974 26.1847 8.98211 26.4991 8.98211C26.8135 8.98211 27.1151 9.0974 27.3376 9.30264L29.6632 11.4508L31.9888 9.30264C32.2137 9.10904 32.5112 9.00364 32.8186 9.00865C33.126 9.01366 33.4193 9.12869 33.6367 9.3295C33.854 9.53031 33.9786 9.80123 33.984 10.0852C33.9894 10.3691 33.8753 10.6439 33.6657 10.8517L31.3417 12.9999L33.6673 15.1481C33.8833 15.3549 34.0028 15.6318 33.9999 15.9192C33.9971 16.2066 33.8722 16.4814 33.6521 16.6845C33.432 16.8876 33.1343 17.0028 32.8232 17.0051C32.5121 17.0075 32.2124 16.8969 31.9888 16.6971L29.6632 14.5489L27.3376 16.6971C27.1127 16.8907 26.8152 16.9961 26.5078 16.9911C26.2004 16.9861 25.9071 16.8711 25.6897 16.6703C25.4723 16.4695 25.3478 16.1986 25.3424 15.9146C25.3369 15.6307 25.451 15.3559 25.6606 15.1481L27.9862 12.9999L25.6606 10.8517C25.4384 10.6462 25.3136 10.3676 25.3136 10.0772C25.3136 9.78672 25.4384 9.50815 25.6606 9.30264ZM18.6475 0.426331C20.4874 -0.694534 22.9395 0.525704 22.9395 2.56138V23.4384C22.9395 25.4755 20.4874 26.6943 18.6475 25.5734L9.15524 19.7938C9.09103 19.7542 9.01569 19.7329 8.9385 19.7324H4.3506C3.19675 19.7324 2.09016 19.309 1.27426 18.5553C0.458365 17.8017 0 16.7795 0 15.7136V10.2861C0 9.2203 0.458365 8.19812 1.27426 7.44446C2.09016 6.6908 3.19675 6.26739 4.3506 6.26739H8.9385C9.01606 6.26763 9.09199 6.24679 9.15682 6.20748L18.6475 0.426331Z"
                                            fill="#FD841F"
                                        />
                                    </svg>
                                )}
                            </button>
                            <button onMouseEnter={() => handleTTS('화면 크게하기')} className={styles.plusIcon}>
                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.12268 4V12.3298"
                                        stroke="white"
                                        className={styles.themeSvg}
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M4 8.16504H12.2446"
                                        stroke="white"
                                        className={styles.themeSvg}
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <circle
                                        cx="8"
                                        cy="8"
                                        r="7"
                                        className={styles.themeSvg2}
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </button>

                            <button onMouseEnter={() => handleTTS('화면 작게하기')} className={styles.minusIcon}>
                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 8.16504H12.2446"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={styles.themeSvg}
                                    />
                                    <circle
                                        cx="8"
                                        cy="8"
                                        r="7"
                                        className={styles.themeSvg2}
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </button>
                            <button onMouseEnter={() => handleTTS('사용자 정보')} className={styles.clientIcon}>
                                <svg
                                    width="35"
                                    height="34"
                                    viewBox="0 0 35 34"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_87_659)">
                                        <path
                                            className={styles.themeSvg}
                                            d="M17.4993 2.83301C9.4452 2.83301 2.91602 9.17564 2.91602 16.9997C2.91602 24.8237 9.4452 31.1663 17.4993 31.1663C25.5535 31.1663 32.0827 24.8237 32.0827 16.9997C32.0827 13.2424 30.5462 9.63909 27.8113 6.98233C25.0764 4.32556 21.3671 2.83301 17.4993 2.83301ZM17.4993 7.08301C19.9156 7.08301 21.8743 8.9858 21.8743 11.333C21.8743 13.6802 19.9156 15.583 17.4993 15.583C15.0831 15.583 13.1243 13.6802 13.1243 11.333C13.1243 8.9858 15.0831 7.08301 17.4993 7.08301ZM25.6952 22.893C23.7694 25.4124 20.7297 26.8976 17.4993 26.8976C14.269 26.8976 11.2293 25.4124 9.30352 22.893C9.0107 22.4726 8.97176 21.9322 9.20143 21.4763L9.50768 20.853C10.2294 19.3669 11.7683 18.4181 13.4598 18.4163H21.5389C23.2067 18.4185 24.7281 19.3415 25.4618 20.7963L25.7973 21.4622C26.0326 21.9219 25.9936 22.4693 25.6952 22.893Z"
                                            fill="white"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_87_659">
                                            <rect width="35" height="34" className={styles.themeSvg} fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className={styles.menu}>
                        <div>
                            <Link to="/" onMouseEnter={() => handleTTS('홈')} className={styles.menuItem}>
                                홈
                            </Link>
                            <Link
                                to="/algorithm"
                                onMouseEnter={() => handleTTS('알고리즘')}
                                className={styles.menuItem}
                            >
                                알고리즘
                            </Link>
                            <Link
                                to="/theme"
                                onMouseEnter={() => handleTTS('테마 선택하기')}
                                className={styles.menuItem}
                            >
                                테마
                            </Link>
                        </div>
                        <div className={styles.userSection}>
                            <p className={styles.greeting}>안녕하세요, 게스트님</p>
                            <Link to="/login" onMouseEnter={() => handleTTS('로그인')} className={styles.loginLink}>
                                로그인
                            </Link>
                            <Link
                                to="/register"
                                onMouseEnter={() => handleTTS('회원가입')}
                                className={styles.registerLink}
                            >
                                회원가입
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
