import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import { Section, Tracks, Loader } from '../components/';
import { StyledHeader } from '../styles/';
import http from '../services/httpService';
import { getPlaylistInfo } from '../services/spotifyService';

const Playlist = () => {
    const { id: playlist_id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [tracksData, setTracksData] = useState(null);

    useEffect(() => {
        const getPlaylistData = async () => {
            const { data } = await getPlaylistInfo(playlist_id);
            setPlaylist(data);
            setTracksData(data.tracks)
        }
        getPlaylistData();

    }, [playlist_id])

    useEffect(() => {
        if (!tracksData) return;

        const getNextTracks = async () => {
            if (tracksData.next) {
                const { data } = await http.get(tracksData.next);
                setTracksData(data)
            }
        }

        const newTracks = tracks => [...tracks, ...tracksData.items]
        setTracks(newTracks)

        getNextTracks();

    }, [tracksData])

    /**
     * Array of memoiased tracks 
     * to adapt to our tracks template  
    */

    const memoizedTracks = useMemo(() => {
        if (!tracks) return;
        return tracks.map(({ track }) => track)
    }, [tracks])

    return (
        <>
            {!playlist || !playlist.tracks ? (
                <Loader />
            ) : (
                <>
                    <StyledHeader>
                        <div className="header__inner">
                            {playlist.images.length && playlist.images[0].url && (
                                <img className="header__img" src={playlist.images[0].url} alt="Avatar" />
                            )}
                            <div>
                                <div className="header__overline">Profile</div>
                                <h1 className="header__name">{playlist.name}</h1>
                                <p className="header__meta">
                                    <span>{playlist.tracks.total} song{(playlist.tracks.total !== 1) ? 's' : ''}</span>
                                </p>
                            </div>
                        </div>
                    </StyledHeader>
                    <main>
                        <Section title="Playlist" breadcrumb={true}>
                            {memoizedTracks && (
                                <Tracks tracks={memoizedTracks}></Tracks>
                            )}
                        </Section>
                    </main>
                </>
            )}
        </>
    )
}

export default Playlist;