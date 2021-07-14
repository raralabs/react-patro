import React from 'react'

export default function CrossIcon({className='',style={},onClick,visible=false}) {
    return (visible?
        <div onClick={()=>{
            typeof onClick==='function'&&onClick()
        }} title="Clear" className={`cross-icon hand-cursor ${className}`}>
            &#x2715;
        </div>
        :null
    )
}
