import { memo, useEffect, useRef } from "react";
import Stopwatch from "../../shared/stopwatch";
import { useStopwatch } from "@/hooks/useStopWatch";
import { useGameStore } from "@/stores/gameStore";

const StopwatchContainer = memo(() => {
  const timeRef = useRef(0);

  const { time, isRunning, start, pause, reset } = useStopwatch();

  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  useEffect(() => {
    useGameStore.setState({
      getCompletionTime: () => timeRef.current,
      resetTimer: reset,
    });
  }, []);

  return (
    <Stopwatch
      time={time}
      isRunning={isRunning}
      start={start}
      pause={pause}
      reset={reset}
      className="absolute top-22 right-0"
    />
  );
});

export default StopwatchContainer;
