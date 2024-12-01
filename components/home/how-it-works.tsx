import { cn } from "@/lib/utils";
import {
  CardContainer,
  CardDescription,
  CardHeader,
  CardIcon,
  CardTitle,
} from "../marketing/card";

type Step = { title: string; description: string };

const steps: Step[] = [
  {
    title: "Fill her up",
    description:
      " Bro ipsum dolor sit amet gaper backside single track, manny Bike epic clipless.",
  },
  {
    title: "Fill her up",
    description:
      " Bro ipsum dolor sit amet gaper backside single track, manny Bike epic clipless.",
  },
  {
    title: "Fill her up",
    description:
      " Bro ipsum dolor sit amet gaper backside single track, manny Bike epic clipless.",
  },
];

const HowItWorks = () => {
  return (
    <CardContainer>
      <CardHeader>
        <CardIcon icon="zap" />
        <CardTitle>Let{"'"} launch a rocket into outer space</CardTitle>
        <CardDescription className="max-w-md">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque rem aperiam, eaque ipsa quae.
        </CardDescription>
      </CardHeader>

      <div className="grid gap-8 row-gap-5 md:row-gap-8 lg:grid-cols-3">
        {steps.map((step, index) => (
          <Step
            position={index + 1}
            showMark={index + 1 === steps.length}
            step={step}
            key={`step-${index}`}
          />
        ))}
      </div>
    </CardContainer>
  );
};

const Step = ({
  step,
  position,
  showMark,
}: {
  step: Step;
  position: number;
  showMark: boolean;
}) => {
  return (
    <div
      className={cn(
        "p-5 duration-300 transform border-2 border-dashed rounded shadow-sm hover:-translate-y-2",
        showMark && "relative border-solid"
      )}
    >
      <div className="flex items-center mb-2">
        <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold rounded-full">
          {position}
        </p>
        <p className="font-medium text-foreground">{step.title}</p>
      </div>
      <p className="text-muted-foreground">{step.description}</p>
      {showMark && (
        <p className="absolute top-0 right-0 flex items-center justify-center w-8 h-8 -mt-4 -mr-4 font-bold rounded-full sm:-mt-5 sm:-mr-5 sm:w-10 sm:h-10">
          <svg className="w-7" stroke="currentColor" viewBox="0 0 24 24">
            <polyline
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              points="6,12 10,16 18,8"
            />
          </svg>
        </p>
      )}
    </div>
  );
};

export default HowItWorks;
