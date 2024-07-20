import {
  Button,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

interface onSlectedGenreProps {
  onSlectGenre: (genre: Genre) => void;
}

const GenreList = ({ onSlectGenre }: onSlectedGenreProps) => {
  const { data, loading, error } = useGenres();

  if (error) {
    return null;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <List>
      {data.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={5}
              src={getCroppedImageUrl(genre.image_background)}
            />
            <Button
              fontSize="l"
              variant="ghost"
              onClick={() => onSlectGenre(genre)}
            >
              {genre.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;
