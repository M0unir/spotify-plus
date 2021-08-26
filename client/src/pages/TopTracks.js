import { useState, useEffect } from 'react';
import { Section, Tracks, TimeRange } from '../components/'
import { getUserTopTracks } from '../services/spotifyService';

const TopTracks = () => {

    const [topTracks, setTopTracks] = useState(null);
    const [activeTimeRange, setActiveTimeRange] = useState('long_term');

    useEffect(() => {
        const getTopTracks = async () => {
            const { data } = await getUserTopTracks(activeTimeRange);
            setTopTracks(data)
        }
        getTopTracks(activeTimeRange);
    }, [activeTimeRange]);

    return (
        <main>
            {topTracks && (
                <Section title="Top Tracks" breadcrumb="true">
                    <TimeRange activeTimeRange={activeTimeRange} setActiveTimeRange={setActiveTimeRange}></TimeRange>
                    <Tracks tracks={topTracks.items.slice(0, 15)} />
                </Section>
            )
            }
        </main>

    )
}

export default TopTracks;