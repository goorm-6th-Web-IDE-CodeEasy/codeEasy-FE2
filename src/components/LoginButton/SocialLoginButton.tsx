import React, { MouseEventHandler, CSSProperties } from 'react'

interface SocialLoginButtonProps {
    onClick: MouseEventHandler<HTMLImageElement>
    src: string
    alt: string
    style?: CSSProperties
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ onClick, src, alt, style }) => {
    const defaultStyle: CSSProperties = {
        height: '50px',
        ...style,
    }

    return <img src={src} alt={alt} onClick={onClick} style={defaultStyle} />
}

export default SocialLoginButton
