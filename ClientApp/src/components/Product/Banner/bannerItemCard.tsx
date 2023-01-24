import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface BannerItemCardProps {
  item: any;
}
const BannerItemCard: React.FC<BannerItemCardProps> = ({ item }) => {
  return (
    <Card
      elevation={3}
      className="p-2"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {item.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {item.subtitle}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 100 }}
        image={item.imgUrl}
        style={{ borderLeft: "4px double #e5e5e5" }}
        alt="Live from space album cover"
      />
    </Card>
  );
};
export default BannerItemCard;
