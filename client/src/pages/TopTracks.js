import { useState, useEffect } from 'react';
import { Section, Tracks } from '../components/'
import { getUserTopTracks } from '../services/spotifyService';

const TopTracks = () => {

    const [topTracks, setTopTracks] = useState(null);

    useEffect(() => {
        const getTopTracks = async () => {
            const { data } = await getUserTopTracks();
            setTopTracks(data)
        }
        getTopTracks();
    }, []);

    return (
        <main>
            {topTracks && (
                <Section title="Top Tracks" breadcrumb="true">
                    <Tracks tracks={topTracks.items.slice(0, 15)} />
                </Section>
            )
            }
        </main>

    )
}

export default TopTracks;