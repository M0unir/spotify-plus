import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import { Section, Tracks, Loader } from '../components/';
import { StyledHeader } from '../styles/';
import http from '../services/httpService';
import { getPlaylistInfo, getTracksAudioFeatures } from '../services/spotifyService';

const Playlist = () => {
    const { id: playlist_id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [tracksData, setTracksData] = useState(null);
    const [audioFeatures, setAudioFeatures] = useState([]);

    useEffect(() => {
        const getPlaylistData = async () => {
            const { data } = await getPlaylistInfo(playlist_id);
            setPlaylist(data);
            setTracksData(data.tracks)
        }
        getPlaylistData();

    }, [playlist_id])

    /** 
     * Each time the tracksData Dependency updates
     * Get new tracks if any and merge them to the array
     */
    useEffect(() => {
        if (!tracksData) return;

        /**
         * If other tracks available, fetch them & store them
         */
        const getNextTracks = async () => {
            if (tracksData.next) {
                const { data } = await http.get(tracksData.next);
                setTracksData(data)
            }
        }

        /** Get audio features for each track & merge to array */
        const getAudioFeatures = async () => {
            const ids = tracksData.items.map(({ track }) => track.id).join(',')
            const { data } = await getTracksAudioFeatures(ids);
            setAudioFeatures(audioFeatures => [...audioFeatures, ...data['audio_features']])
        }

        /** Merge previous and new tracks before fetching for new ones */
        setTracks(tracks => [...tracks, ...tracksData.items])

        getNextTracks();
        getAudioFeatures();

    }, [tracksData])

    /**
     * Array of memoiased tracks 
     * to adapt to our tracks template  
    */

    const memoizedTracks = useMemo(() => {
        if (!tracks) return;

        return tracks.map(({ track }) => {
            // const currentTrack = track;

            if (!track['audio_features']) {
                const audioFeaturesObj = audioFeatures.find(item => {
                    if (!item || !track) return null;
                    return item.id === track.id;
                });
                // currentTrack['audio_features'] = audioFeaturesObj
                return { ...track, 'audio_features': audioFeaturesObj }
            }


            // return currentTrack;
        })

    }, [tracks, audioFeatures])

    console.log('memoizedTracks: ', memoizedTracks)
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