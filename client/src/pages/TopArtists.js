import { useState, useEffect } from 'react';
import { Section, Artists, ActiveTimeRange } from '../components/'
import { getUserTopArtists } from '../services/spotifyService'

const TopArtists = () => {

    const [topArtists, setTopArtists] = useState(null);
    const [activeTimeRange, setActiveTimeRange] = useState('long_term');

    useEffect(() => {
        const getTopArtists = async () => {
            const { data } = await getUserTopArtists(activeTimeRange);
            setTopArtists(data)
        }
        getTopArtists();
    }, [activeTimeRange])

    return (
        <main>
            {topArtists && (
                <Section title="Top artists" breadcrumb="true">
                    <ActiveTimeRange activeTimeRange={activeTimeRange} setActiveTimeRange={setActiveTimeRange} />
                    <Artists artists={topArtists.items.slice(0, 15)} />
                </Section>
            )
            }
        </main>
    )
}

export default TopArtists;