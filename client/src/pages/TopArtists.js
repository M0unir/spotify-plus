import { useState, useEffect } from 'react';
import { Section, Artists } from '../components/'
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
                    <ul>
                        <li><button onClick={() => setActiveTimeRange('short_term')}>Last month</button></li>
                        <li><button onClick={() => setActiveTimeRange('medium_term')}>Last 6 months</button></li>
                        <li><button onClick={() => setActiveTimeRange('long_term')}>All time</button></li>
                    </ul>
                    <Artists artists={topArtists.items.slice(0, 15)} />
                </Section>
            )
            }
        </main>
    )
}

export default TopArtists;