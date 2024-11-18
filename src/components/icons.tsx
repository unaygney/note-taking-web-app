import React from 'react'

import { pacificoFont } from '@/lib/font'
import { cn } from '@/lib/utils'

type Props = React.SVGProps<SVGSVGElement>

export const Logo = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_4365_370)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.3995 2.15804C26.3677 0.192436 22.9741 0.809836 20.0411 1.59524C7.29129 6.29364 2.78049 15.8417 1.19569 21.5299C1.11729 21.6727 1.06969 21.8365 1.06549 22.0115C0.438289 24.4251 0.352889 26.0337 0.351489 26.0869C0.327689 26.6651 0.777089 27.1537 1.35529 27.1775C1.37069 27.1789 1.38609 27.1789 1.40149 27.1789C1.96009 27.1789 2.42489 26.7379 2.45009 26.1737C2.45709 26.0029 2.52149 24.8283 2.91769 23.0727C6.42889 22.9243 9.96389 21.6167 13.4359 19.1751C13.7075 18.9847 13.8727 18.6767 13.8825 18.3463C13.8923 18.0145 13.7439 17.6981 13.4849 17.4937L11.8833 16.2253L17.1389 15.7101C17.3531 15.6891 17.5547 15.6037 17.7185 15.4637C17.8319 15.3685 20.5073 13.0781 23.0525 10.4082C26.9235 6.34824 28.2633 3.80444 27.3995 2.15804Z"
        fill="#335CFF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.1783 25.0798H12.2043C11.6247 25.0798 11.1543 25.5502 11.1543 26.1298C11.1543 26.7094 11.6247 27.1798 12.2043 27.1798H21.1783C21.7579 27.1798 22.2283 26.7094 22.2283 26.1298C22.2283 25.5502 21.7579 25.0798 21.1783 25.0798Z"
        fill="#335CFF"
      />
    </g>
    <defs>
      <clipPath id="clip0_4365_370">
        <rect width="28" height="28" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
export const LogoWithText = (props: Props) => {
  const { className, ...restProps } = props
  return (
    <div className="flex items-center gap-2.5">
      <Logo {...restProps} />
      <p
        className={cn(
          'text-nowrap text-[23px] tracking-[-0.46px] text-[#0E121B] dark:text-white',
          pacificoFont.className,
          className
        )}
      >
        Notes
      </p>
    </div>
  )
}
export const Google = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="19"
    viewBox="0 0 18 19"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_2195_32307)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.3727 10.6535C17.4751 10.1324 17.5262 9.58295 17.5262 9.03348C17.5262 8.66211 17.5016 8.30022 17.4542 7.94685C17.4192 7.68727 17.188 7.49874 16.9265 7.49874H9.53232C9.23864 7.49874 8.9999 7.73748 8.9999 8.03116V10.1211C8.9999 10.4147 9.23864 10.6535 9.53232 10.6535H13.5823C13.7491 10.6535 13.8713 10.824 13.8087 10.9784C12.923 13.1668 10.5972 14.6031 7.99948 14.1227C6.00435 13.7542 4.3692 12.1721 3.94098 10.1893C3.21435 6.82421 5.75709 3.85141 8.9999 3.85141C10.0629 3.85141 11.0481 4.17067 11.8695 4.71731C12.0893 4.8632 12.3763 4.84899 12.562 4.66046L14.1744 3.01867C14.3942 2.79415 14.381 2.42088 14.1308 2.23046C12.7657 1.19215 11.0775 0.5612 9.24148 0.51099C4.62593 0.383095 0.628984 4.13278 0.478353 8.74737C0.320142 13.5865 4.19867 17.5598 8.9999 17.5598C13.1522 17.5598 16.6139 14.5851 17.3727 10.6535Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_2195_32307">
        <rect
          width="18"
          height="18"
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
)