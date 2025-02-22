import React from "react";

interface YoutubeEmbedProps {
  embedId: string;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ embedId }) => (
    <iframe
    className="aspect-video w-full"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  
);

export default YoutubeEmbed;
