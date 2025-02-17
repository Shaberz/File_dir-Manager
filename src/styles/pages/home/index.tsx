import styled from "@emotion/styled"
import { CSSProperties } from "react";


const HomeWrapper = styled.div({
    boxSizing: 'border-box',
    width: '100%',
    minWidth:'15rem',
    height: '100vh',
    gap: '0.5rem',
    display:'flex',
    flexDirection:'row',
})

export default HomeWrapper

export const TextAreaWrapper = styled.textarea({
    boxSizing:'border-box',
    theme:'default',
    width:'100%',
    height:'100vh',
    border:'1px solid rgb(173, 172, 172)',
    borderRadius:'1rem',
    fontSize:'20px',
    padding:'1.2rem',
    backgroundColor:'#282a2b',
    color:'white'
});

export const EditorWrapper = styled.div({
    position:'relative',
    boxSizing:'border-box',
    width:'100%',
    height:'100vh',
    display:'flex',
    alignItems:'end',
    justifyContent:'right',
});

export const MenuWrapper =styled.div({
    boxSizing:'border-box',
    width: '30%',
    height: '100vh',
    minWidth:'18rem',
    display:'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '0.5rem',
});

export const HeadersWrapper = styled.div({
    boxSizing: 'border-box',
    width: '100%',
    height: '3rem',
    border: '1px solid rgb(173, 172, 172)',
    borderRadius: '1rem',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems:'center'
});

export const BodyWrapper = styled.div({
    boxSizing: 'border-box',
    width: '100%',
    height: '100vh',
    border: '1px solid rgb(173, 172, 172)',
    borderRadius: '1rem',
    overflow: 'auto',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
});

// interface DirWrapperProps {
//     hidden: boolean
// }

export const DirWrapper = styled.div({
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'max-content',
    minWidth: 'max-content',
    maxWidth: 'max-content',
    height: '1.5rem',
    gap: '0.2rem'

});

export const DirNameWrapper = styled.div({
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'max-content',
    minWidth: 'max-content',
    maxWidth: 'max-content',
    height: '1.5rem',
    gap: '0.2rem',
    '> .title': {
        fontSize: '1rem',
        textOverflow: 'ellipsis',
        width: '6rem',
        minWidth: '6rem',
        maxWidth: '6rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        borderRadius: '1rem',
        padding: '0.25rem'
    },
    '> .icon': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const ModalBackDrop = styled.div({
    width: '100vw',
    height: '100vh',
    backgroundColor: '#d9d9d9',
    opacity: '0.7',
    zIndex: 2,
    position: 'relative',
});

export const ModalWrapper = styled.div({
    width: '40%',
    height: '20%',
    borderRadius: '1.5rem',
    zIndex: 3,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
});

export const StatusButtons = styled.button({
    width: 'fit-content',
    height:'fit-content',
    maxWidth:'1.5rem',
    maxHeight:'1.5rem',
    border:'none',
    backgroundColor:'transparent',
    padding:'0',
    margin:'0',
    cursor:'pointer',
});

export const InputElement = styled.input({
    border:'1px solid rgba(186, 186, 186, 0.7)',
    borderRadius:'2rem',
    outline:'none',
    boxSizing:'border-box',
    padding:'0.25rem',
    paddingLeft:'1rem',
    backgroundColor:'#282a2b',
    color:'white',
    "::placeholder":{color:"rgba(186, 186, 186, 0.7)"}

});
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    style:CSSProperties
}
export const Button = styled.button<ButtonProps>( ({style}) =>{
return {
    position:'absolute',
    ...style
}
});