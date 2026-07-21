import Image from "next/image"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

const music = [
  {
    title: "Luzes da Cidade à Meia-noite",
    artist: "Sonhos de Néon",
    album: "Noites Elétricas",
    duration: "3:45",
  },
  {
    title: "Conversas na Cafeteria",
    artist: "O Café da Manhã",
    album: "Histórias Urbanas",
    duration: "4:05",
  },
  {
    title: "Chuva Digital",
    artist: "Sinfonia Cibernética",
    album: "Batidas Binárias",
    duration: "3:30",
  },
]

export default function ItemImage() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <ItemGroup className="gap-4">
        {music.map((song) => (
          <Item key={song.title} variant="outline" asChild role="listitem">
            <a href="#">
              <ItemMedia variant="image">
                <Image
                  src={`https://avatar.vercel.sh/${song.title}`}
                  alt={song.title}
                  width={32}
                  height={32}
                  className="object-cover grayscale"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="line-clamp-1">
                  {song.title} -{" "}
                  <span className="text-muted-foreground">{song.album}</span>
                </ItemTitle>
                <ItemDescription>{song.artist}</ItemDescription>
              </ItemContent>
              <ItemContent className="flex-none text-center">
                <ItemDescription>{song.duration}</ItemDescription>
              </ItemContent>
            </a>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}
