import { Button, Grid, IconButton, Stack } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { showErrorMessage } from "src/utils/alert";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { MotionContainer } from "./MotionContainer";
import AudioVisualizer from "./AudioVisualizer";
import { sendAudioStandalone } from "src/redux/audio/audioSlice";
import StopIcon from '@mui/icons-material/Stop';

interface Props {
    onAudioConverted: (text: string) => void;
}
const AudioRecorder = ({ onAudioConverted }: Props) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audio, setAudio] = useState<Blob | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [uploading, setUploading] = useState<boolean>(false);
    const audioAbortControllerRef = useRef<AbortController | null>(null);



    const startRecording = async () => {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setStream(mediaStream);

        mediaRecorderRef.current = new MediaRecorder(mediaStream, { mimeType: 'audio/webm;codecs=opus' });

        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mpeg" });
            // 25 MB = 25 * 1024 * 1024 = 26214400 bytes
            if (audioBlob.size > 26214400) {
                showErrorMessage('Audio file is too large.');
                setAudio(null);
            } else {
                setAudio(audioBlob);
                await sendAudio(audioBlob);
            }
            audioChunksRef.current = [];
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
    };

    const stopRecording = async () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }

        setIsRecording(false);
    };

    const handleToggleRecording = () => {
        if (isRecording) stopRecording();
        else startRecording();
    };


    const onClickSend = async () => audio && await sendAudio(audio);

    const sendAudio = async (_audioBlob: Blob) => {
        if (!_audioBlob) return;

        // Abort previous request if still pending
        if (audioAbortControllerRef.current) {
            audioAbortControllerRef.current.abort();
        }

        const result = sendAudioStandalone({
            audioBlob: _audioBlob,
            lang: 'en',
            setUploading,
            setUploadProgress,
            onAudioConverted,
        });

        if (result) {
            audioAbortControllerRef.current = result.controller;
            await result.promise;
        }
    };



    useEffect(() =>
        () => {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
            }
        }
        , []);

    return (
        <Stack rowGap={2}>

            <Grid container alignItems="center">
                <Grid size="auto">
                    <IconButton
                        onClick={handleToggleRecording}
                        color={isRecording ? 'error' : 'primary'}>
                        {isRecording ?
                            <StopIcon /> :
                            <KeyboardVoiceIcon />}
                    </IconButton>
                </Grid>
                <Grid size="grow">
                    {stream ?
                        <AudioVisualizer audioStream={stream} isRecording={isRecording} /> :
                        audio ?
                            <MotionContainer textAlign="right" >
                                <Grid container alignItems="center" justifyContent="flex-end" columnGap={4} >
                                    <Grid size="grow">
                                        <Button
                                            variant="outlined"
                                            onClick={onClickSend}
                                            disabled={uploading || !audio}
                                        >
                                            {uploading ? 'Loading' : 'audioToText'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </MotionContainer> :
                            null}
                </Grid>
            </Grid>
        </Stack >
    );
};

export default AudioRecorder;
