import { FC } from "react"

interface FolderIconProps {
  width:number;
}
const FolderIcon:FC<FolderIconProps> = ({width}) => {
  return (
    <svg viewBox="0 0 300 200" style={{width:`${width}rem`}} xmlns="http://www.w3.org/2000/svg">
    <path id="f-1" d="M 20 0 L 200 0 L 225 25 L 280 25 Q 300 25 300 45 L 300 180 Q 300 200 280 200 L 20 200 Q 0 200 0 180 L 0 20 Q 0 0 20 0" fill="yellow" stroke="orange" strokeWidth='2px'/>
    <path id="sh-1" d="M 20 10 L 190 10 L 205 25 L 10 25 L 10 20 Q 10 10 20 10" fill="orange"/>
    </svg>
  )
}

export default FolderIcon;