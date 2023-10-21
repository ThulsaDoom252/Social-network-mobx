import React from 'react'

// Props interface for PageContainer component
interface PageContainerProps {
  children: React.ReactNode // Content to be rendered inside the container
  height?: string // Optional height customization
  smallScreenMode?: boolean // Optional flag for small screen mode
  centerContent?: boolean
}

// PageContainer component
const PageContainer: React.FC<PageContainerProps> = ({
  height,
  children,
  smallScreenMode,
  centerContent

}) => {
  return (
        <div className={`
            w-full
            bg-white
            rounded
            p-2
            flex
            flex-col          
            items-center
            min-h-pageContainer
            ${height} // Customizable height, e.g., '300px'
            ${smallScreenMode && 'border-t-2 border-gray-400'} // Conditionally add border for small screen mode
            ${centerContent ? 'justify-center' : 'justify-start'}
        `}>
            {children} {/* Render the content provided as children */}
        </div>
  )
}

export default PageContainer
