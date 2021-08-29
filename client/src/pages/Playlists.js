import { useState, useEffect } from 'react';
import http from '../services/httpService';
import { Section, PlaylistsGrid } from '../components';
import { getUserPlaylists } from '../services/spotifyService';

const Playlists = () => {

    /**
     * For Performance reasons, Spotify returns
     * a limited set of 20 items 
     */
    const [playlists, setPlaylists] = useState([]); // Actual Playlists Data
    const [playlistsData, setPlaylistsData] = useState(null); // Placeholder for our fetched Playlists

    useEffect(() => {
        const getPlaylists = async () => {
            const { data } = await getUserPlaylists();
            setPlaylistsData(data);
            // console.log('playlists: ', playlists);
        }
        getPlaylists();

    }, [])

    /**
     * This useEffect will run each time PlaylisData is changed.
     * It will fetch for the next 20 playlists if necessary and 
     * merge them with our actual playlists array
     */
    useEffect(() => {

        if (!playlistsData) return

        // Returns a new set of 20 playlist items if necessary
        const getNextPlaylists = async () => {
            if (playlistsData.next) {
                const { data } = await http.get(playlistsData.next)
                // console.log('playlistsNext: ', playlistsData.next, 'Next Data: ', data);
                setPlaylistsData(data)
            }
        }

        /** Merge previous and newly fetched playlists and set our playlists array. */
        const newPlaylists = playlists => [...playlists, ...playlistsData.items];
        setPlaylists(newPlaylists)

        // Fetch for new playlists if available
        getNextPlaylists()

    }, [playlistsData])



    return (
        <main>
            {playlists && (
                <Section title="Top Playlists" breadcrumb="true">
                    <PlaylistsGrid playlists={playlists} />
                </Section>
            )}

        </main>
    )
}

export default Playlists;