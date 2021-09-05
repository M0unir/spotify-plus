import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import { Section, Tracks, Loader } from '../components/';
import { StyledHeader, StyledDropdown } from '../styles/';
import http from '../services/httpService';
import { getPlaylistInfo, getTracksAudioFeatures } from '../services/spotifyService';

const Playlist = () => {
    const { id: playlist_id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [tracksData, setTracksData] = useState(null);
    const [audioFeatures, setAudioFeatures] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [orderBy, setOrderBy] = useState('');
    const sortOptions = ['Acousticness', 'Danceability', 'Energy', 'Instrumentalness', 'Liveness', 'Loudness', 'Speechiness', 'Tempo', 'Valence']

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
        setShowLoader(true)

        /**
         * If other tracks available, fetch them & store them
         */
        const getNextTracks = async () => {
            if (tracksData.next) {
                const { data } = await http.get(tracksData.next);
                setTracksData(data)
            } else {
                setShowLoader(false)
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
     * Array of memoiased tracks to adapt to our tracks template  
     * We merge audio features to our exisiting tracks array.
    */

    const tracksWithAudioFeatures = useMemo(() => {
        if (!tracks) return;

        return tracks.map(({ track }) => {
            if (!track['audio_features']) {
                const audioFeaturesObj = audioFeatures.find(item => {
                    if (!item || !track) return null;
                    return item.id === track.id;
                });
                return { ...track, 'audio_features': audioFeaturesObj }
            } else return null;
        })

    }, [tracks, audioFeatures])
    console.log('tracks: ', tracksWithAudioFeatures)

    /**
     * Sort Tracks by Audio Features each time onChange is called.
     */
    const sortedTracks = useMemo(() => {
        if (!tracksWithAudioFeatures) return null;

        return [...tracksWithAudioFeatures].sort((a, b) => {
            const firstTrack = a['audio_features'];
            const secondTrack = b['audio_features'];

            if (!firstTrack || !secondTrack) {
                return false;
            }
            return secondTrack[orderBy] - firstTrack[orderBy];
        });

        // if (sorted.length === tracksWithAudioFeatures.length) console.log('Done sorting!')
        // return sorted;

    }, [orderBy, tracksWithAudioFeatures]);
    console.log('sorted: ', sortedTracks)

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
                            <>
                                <label htmlFor="sort-tracks-by"></label>
                                <StyledDropdown active={!!orderBy}>
                                    <select
                                        name="tracks-order"
                                        id="sort-tracks-by"
                                        onChange={e => setOrderBy(e.target.value)}
                                    >
                                        <option value="">Sort tracks</option>
                                        {sortOptions.map((sortOption, idx) => (
                                            <option value={sortOption.toLowerCase()} key={idx}>{sortOption}</option>
                                        ))
                                        }
                                    </select>
                                </StyledDropdown>
                            </>
                            {sortedTracks && (
                                showLoader ? <Loader /> : <Tracks tracks={sortedTracks}></Tracks>
                            )}
                        </Section>
                    </main>
                </>
            )}
        </>
    )
}

export default Playlist;