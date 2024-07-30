import { CalendarCheck, Euro, LocateIcon, MountainIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui";
import { Retreat } from "@/types";

const RetreatCard = ({ retreat }: { retreat: Retreat }) => {


  const formattedDate = new Date(retreat.date * 1000).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  return (
    <div>


    <Card>
      <CardHeader>
        <img
          src={retreat.image}
          alt={retreat.title}
          className="w-screen h-48 object-cover rounded-md"
        />
        <CardTitle>{retreat.title}</CardTitle>
        <CardDescription>{retreat.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex-col gap-1">
          <div className="flex gap-1">
            <LocateIcon size={18} />
            <p>{retreat.location}</p>
          </div>
          <div className="flex gap-1">
            <CalendarCheck size={18} />
            <p>{formattedDate}</p>
          </div>
          <div className="flex gap-1">
            <MountainIcon size={18} />
            <p>{retreat.type}</p>
          </div>
          <div className="flex gap-1">
            <Euro size={18} />
            <p>{retreat.price}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to='/payment' state={{ retreat }} className="w-full">
        <Button className="w-full">Explore</Button>
        </Link>
      </CardFooter>
    </Card>
    </div>
  );
};

export default RetreatCard;
