import { Star } from "lucide-react";
import { FC } from "react";

function calculateWidth(val: number): number {
  return Math.round(24 * val);
}

type StarComponentProps = {
  val: number;
};

const StarComponent: FC<StarComponentProps> = ({ val }) => {
  const viewBoxWidth = val < 0 ? 0 : val < 1 ? calculateWidth(val) : 24;

  return (
    <>
      <div className={`relative h-6 w-6`}>
        <Star
          className={`absolute inset-y-0 fill-yellow-400`}
          style={{ width: viewBoxWidth }}
          viewBox={`0 0 ${viewBoxWidth} 24`}
        />
        <Star className="absolute inset-y-0" />
      </div>
    </>
  );
};

export default StarComponent;
