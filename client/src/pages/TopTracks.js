import { useState, useEffect } from 'react';
import { Section, Tracks, TimeRange, Loader } from '../components/'
import { getUserTopTracks } from '../services/spotifyService';

const TopTracks = () => {

    const [topTracks, setTopTracks] = useState(null);
    const [activeTimeRange, setActiveTimeRange] = useState('long_term');
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        setShowLoader(true)
        const getTopTracks = async () => {
            const { data } = await getUserTopTracks(activeTimeRange);
            setTopTracks(data)
            setShowLoader(false)
        }
        getTopTracks(activeTimeRange);

    }, [activeTimeRange]);

    return (
        <main>
            {!topTracks || topTracks.length === 0 ? (
                <Loader />
            ) : (
                <Section title="Top Tracks" breadcrumb="true">
                    <TimeRange activeTimeRange={activeTimeRange} setActiveTimeRange={setActiveTimeRange}></TimeRange>
                    {showLoader ? (<Loader />) : <Tracks tracks={topTracks.items.slice(0, 15)} />}
                </Section>
            )
            }
        </main>

    )
}

export default TopTracks;