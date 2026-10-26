import { useState } from 'react';

// Day 122
// Audio Track List

// Track structure
interface Track {
    id: number;
    title: string;
    artist: string;
    duration: string;
}

// Props interface
interface TrackRowProps {
    track: Track;
    isPlaying: boolean;
    onPlay: (id: number) => void;
}

// Parent component
function Day122() {
    const tracks: Track[] = [
        { id: 1, title: 'Starboy', artist: 'The Weeknd', duration: '3:50' },
        { id: 2, title: 'Numb', artist: 'Linkin Park', duration: '3:07' },
        { id: 3, title: 'Mockingbird', artist: 'Eminem', duration: '4:10' },
    ];

    const [currentTrackId, setCurrentTrackId] = useState<number | null>(null);

    const handlePlay = (id: number) => {
        setCurrentTrackId(
            currentTrackId === id ? null : id
        )
    }

    return (
        <div>
            <h2>Playlist 🎧</h2>
            <p>{currentTrackId === null ? 'Playback stopped ⏹' : `Now playing track ${currentTrackId}`}</p>
            {tracks.map(track => (
                <TrackRow
                    key={track.id}
                    track={track}
                    isPlaying={currentTrackId === track.id}
                    onPlay={handlePlay}
                />
            ))}
        </div>
    );
}

// Child component
function TrackRow({ track, isPlaying, onPlay }: TrackRowProps) {
    return (
        <div>
            <span>{track.title} - {track.artist}</span>
            <small>({track.duration})</small>
            <button onClick={() => onPlay(track.id)}>{isPlaying ? '⏸ Pause' : '▶ Play'}</button>
        </div>
    )
}

export default Day122;