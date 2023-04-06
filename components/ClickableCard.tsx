import { useRouter } from 'next/router'

interface ClickableCardProps {
  className?: string
  link: string
  children: React.ReactNode
}

const ClickableCard = ({ children, link, className }: ClickableCardProps) => {
  const router = useRouter()
  return (
    <div
      className={'clickable ' + className}
      onClick={() => {
        router.push(link)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          router.push(link)
        }
      }}
      role="link"
      tabIndex={0}
    >
      {children}
    </div>
  )
}

export default ClickableCard
