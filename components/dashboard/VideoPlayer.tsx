'use client'

interface VideoPlayerProps {
  url: string
  title: string
}

export function VideoPlayer({ url, title }: VideoPlayerProps) {
  // Support Vimeo, YouTube, or direct iframe
  const getEmbedUrl = (rawUrl: string) => {
    // Vimeo
    const vimeoMatch = rawUrl.match(/vimeo\.com\/(\d+)/)
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=0&title=0&byline=0&portrait=0`

    // YouTube
    const ytMatch = rawUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`

    return rawUrl
  }

  const embedUrl = getEmbedUrl(url)

  return (
    <iframe
      src={embedUrl}
      title={title}
      className="w-full h-full"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    />
  )
}
