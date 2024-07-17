import { Badge } from "@chakra-ui/react";

interface CriticScoreProps {
  score: number;
}

const CriticScore = ({ score }: CriticScoreProps) => {
  let color = score >= 90 ? "green" : score > 80 ? "yellow" : "";
  return (
    <Badge colorScheme={color} fontSize={"14px"} paddingX={2} borderRadius="4">
      {score}
    </Badge>
  );
};

export default CriticScore;
