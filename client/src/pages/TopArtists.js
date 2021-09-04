import { useState, useEffect } from 'react';
import { Section, Artists, TimeRange, Loader } from '../components/';
import { getUserTopArtists } from '../services/spotifyService';

const TopArtists = () => {

    const [topArtists, setTopArtists] = useState(null);
    const [activeTimeRange, setActiveTimeRange] = useState('long_term');
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        setShowLoader(true)
        const getTopArtists = async () => {
            const { data } = await getUserTopArtists(activeTimeRange);
            setTopArtists(data)
            setShowLoader(false)
        }
        getTopArtists();
    }, [activeTimeRange])

    return (
        <main>
            {!topArtists ? (
                <Loader />
            ) : (
                <Section title="Top artists" breadcrumb="true">
                    <TimeRange activeTimeRange={activeTimeRange} setActiveTimeRange={setActiveTimeRange} />
                    {showLoader ? <Loader /> : <Artists artists={topArtists.items.slice(0, 15)} />}
                </Section>
            )
            }
        </main>
    )
}

export default TopArtists;