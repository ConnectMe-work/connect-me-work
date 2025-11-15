import { useTheme } from "@mui/material";
import React, { useEffect, useRef } from "react";

interface AudioVisualizerProps {
    audioStream: MediaStream | null;
    isRecording: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioStream, isRecording }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number>();
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const audioContextRef = useRef<AudioContext>();


    const theme = useTheme();

    useEffect(() => {
        if (!audioStream || !isRecording) return;


        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioContextRef.current.createMediaStreamSource(audioStream);

        analyserRef.current = audioContextRef.current.createAnalyser();
        source.connect(analyserRef.current);
        analyserRef.current.fftSize = 2048;

        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);


        const canvas = canvasRef.current;
        if (!canvas) return;
        const canvasCtx = canvas.getContext("2d");
        if (!canvasCtx) return;

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);

            if (!analyserRef.current || !dataArrayRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);

            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArrayRef.current[i] / 255) * canvas.height;
                canvasCtx.fillStyle = theme.palette.primary.main  //`rgb(${barHeight + 100}, 50, 200)`;
                canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        };

        draw();

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            audioContextRef.current?.close();
        };
    }, [audioStream, isRecording, theme.palette.background.paper, theme.palette.primary.main]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: "100%",
                height: "30px",
                overflow: "hidden",
            }}

        />
    );
};

export default AudioVisualizer;
