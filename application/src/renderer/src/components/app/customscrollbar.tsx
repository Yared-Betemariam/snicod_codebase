import React, { useCallback, useEffect, useRef, useState } from 'react'

const SCROLLBAR_MIN_HEIGHT = 20

type Props = {
  children: React.ReactNode
  className?: string
}

const CustomScrollDiv: React.FC<Props> = ({ children, className }) => {
  const [hovering, setHovering] = useState(false)
  const [scrollbarHeight, setScrollbarHeight] = useState(SCROLLBAR_MIN_HEIGHT)
  const [scrollbarTop, setScrollbarTop] = useState(0)

  const containerRef = useRef<HTMLDivElement | null>(null)

  // Handle mouse enter/leave to toggle scrollbar visibility
  const handleMouseEnter = () => setHovering(true)
  const handleMouseLeave = () => setHovering(false)

  // Handle the scroll event to position the scrollbar
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    const scrollRatio = scrollTop / scrollHeight
    const newScrollbarTop = scrollRatio * clientHeight

    setScrollbarTop(Math.min(newScrollbarTop, clientHeight - scrollbarHeight))
  }, [scrollbarHeight])

  // Adjust the scrollbar height dynamically
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const { scrollHeight, clientHeight } = container
    const scrollbarRatio = clientHeight / scrollHeight
    const newScrollbarHeight = Math.max(scrollbarRatio * clientHeight, SCROLLBAR_MIN_HEIGHT)

    setScrollbarHeight(newScrollbarHeight)
    container.addEventListener('scroll', handleScroll)

    return () => container.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div
      className={`custom-scroll-container ${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={containerRef} className="custom-scroll-content">
        {children}
      </div>
      <div className="custom-scrollbar" style={{ opacity: hovering ? 1 : 0 }}>
        <div
          className="custom-scrollbar-thumb"
          style={{
            height: scrollbarHeight,
            top: scrollbarTop
          }}
        />
      </div>
    </div>
  )
}

export default CustomScrollDiv
