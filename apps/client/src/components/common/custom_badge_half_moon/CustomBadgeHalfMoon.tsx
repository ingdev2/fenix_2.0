"use client"
import React from "react"

const CustomBadgeHalfMoon: React.FC<{
    badgeTitle: string,
    badgeContent: string,
}> = ({
          badgeTitle,
          badgeContent
      }) => {
    return (
        <div style={{
            padding: '.5rem',
            backgroundColor: 'rgb(251,154,52)',
            color: 'white',
            borderTopRightRadius: '25px',
            borderBottomRightRadius: '25px',
            width: '50%',
            margin: '0 auto'
        }}>
            {badgeTitle}: {badgeContent}
        </div>
    )
}

export default CustomBadgeHalfMoon