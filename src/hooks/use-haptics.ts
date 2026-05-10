import { useCallback, useRef } from "react";

export function useHaptics() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  }, []);

  const playSound = useCallback((frequency: number, type: OscillatorType = "sine", duration: number = 0.1, volume: number = 0.1) => {
    initAudio();
    if (!audioCtxRef.current) return;

    const oscillator = audioCtxRef.current.createOscillator();
    const gainNode = audioCtxRef.current.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime);

    gainNode.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtxRef.current.destination);

    oscillator.start();
    oscillator.stop(audioCtxRef.current.currentTime + duration);
  }, [initAudio]);

  const playReward = useCallback((startFreq: number, endFreq: number, duration: number = 0.5) => {
    initAudio();
    if (!audioCtxRef.current) return;

    const oscillator = audioCtxRef.current.createOscillator();
    const gainNode = audioCtxRef.current.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(startFreq, audioCtxRef.current.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(endFreq, audioCtxRef.current.currentTime + duration);

    gainNode.gain.setValueAtTime(0.1, audioCtxRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtxRef.current.destination);

    oscillator.start();
    oscillator.stop(audioCtxRef.current.currentTime + duration);
  }, [initAudio]);

  const hapticClick = () => {
    playSound(200, "sine", 0.05, 0.05);
    if ("vibrate" in navigator) navigator.vibrate(10);
  };

  const hapticRefill = () => {
    playReward(400, 800, 0.6);
    if ("vibrate" in navigator) navigator.vibrate([10, 30, 10]);
  };

  const hapticUpgrade = () => {
    playReward(100, 300, 1.0);
    if ("vibrate" in navigator) navigator.vibrate([20, 50, 20]);
  };

  return { hapticClick, hapticRefill, hapticUpgrade, initAudio };
}
