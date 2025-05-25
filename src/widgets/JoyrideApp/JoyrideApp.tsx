import { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { useNavigate } from "react-router-dom";
import { WelcomeModal } from "../WelcomeModal/WelcomeModal";
import { stepStages } from "./data";

export const JoyrideApp = () => {
  const [tourStage, setTourStage] = useState(0);
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasSeenTour, setHasSeenTour] = useState(false);
  const navigate = useNavigate();

  const allSteps: Step[] = stepStages.flatMap((s) => s.steps);

  // Check if user already saw the tour
  useEffect(() => {
    const seen = localStorage.getItem("hasSeenTour") === "true";
    setHasSeenTour(seen);
    if (!seen) {
      setShowWelcome(true);
    }
  }, []);

  useEffect(() => {
    if (!run || tourStage >= stepStages.length) return;

    const goToStage = async () => {
      const current = stepStages[tourStage];
      navigate(current.path);

      await new Promise((res) => setTimeout(res, 600));

      const offset = stepStages
        .slice(0, tourStage)
        .reduce((sum, s) => sum + s.steps.length, 0);
      setStepIndex(offset);
    };

    goToStage();
  }, [tourStage, run]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { index, type, status } = data;
    localStorage.setItem("hasSeenTour", "true");
    if (type === "step:after") {
      const currentStageSteps = stepStages[tourStage].steps.length;
      const isLastStepInStage =
        index ===
        stepStages
          .slice(0, tourStage)
          .reduce((sum, s) => sum + s.steps.length, 0) +
          currentStageSteps -
          1;

      if (isLastStepInStage) {
        const nextStage = tourStage + 1;

        if (nextStage < stepStages.length) {
          const nextPath = stepStages[nextStage].path;
          navigate(nextPath);
          setTourStage(nextStage);
        } else {
          setRun(false);
          localStorage.setItem("hasSeenTour", "true"); // ✅ mark tour as seen
          setHasSeenTour(true);
        }
      } else {
        setStepIndex(index + 1);
      }
    }

    if (
      type === "tour:end" ||
      status === STATUS.FINISHED ||
      status === STATUS.SKIPPED
    ) {
      setRun(false);
      localStorage.setItem("hasSeenTour", "true"); // ✅ also mark here
      setHasSeenTour(true);
    }
  };

  const onOk = () => {
    setShowWelcome(false);
    if (!hasSeenTour) {
      setTimeout(() => {
        setRun(true);
      }, 500);
    }
  };

  return (
    <>
      <Joyride
        steps={allSteps}
        stepIndex={stepIndex}
        run={run}
        continuous
        scrollToFirstStep
        showProgress
        disableScrolling
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: "#3b82f6",
            zIndex: 10000,
          },
        }}
      />
      {!hasSeenTour && (
        <WelcomeModal
          open={showWelcome}
          onOk={onOk}
        />
      )}
    </>
  );
};
