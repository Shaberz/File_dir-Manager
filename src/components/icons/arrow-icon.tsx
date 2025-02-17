import { FC } from "react"

interface ArrowIconPorps {
  rotated:boolean;
}

const ArrowIcon:FC<ArrowIconPorps> = ({rotated}) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ transform: rotated ? 'rotate(90deg)':'rotate(0)', transitionDuration:'0.2s'}} xmlns="http://www.w3.org/2000/svg">
    <path d="M14.7695 11.8079L10.3121 8.09346C9.79109 7.65924 9 8.02976 9 8.70803V15.292C9 15.9702 9.79109 16.3408 10.3121 15.9065L14.7695 12.1921C14.8895 12.0921 14.8895 11.9079 14.7695 11.8079Z" fill="#70789c"/>
    </svg>
  )
}

export default ArrowIcon;