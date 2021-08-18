import { useState, useEffect } from 'react';
import { Section, Artists } from '../components/'
import { getUserTopArtists } from '../services/spotifyService'

const TopArtists = () => {

    const [topArtists, setTopArtists] = useState(null);

    useEffect(() => {
        const getTopArtists = async () => {
            const { data } = await getUserTopArtists();
            setTopArtists(data)
        }
        getTopArtists();
    }, [])

    return (
        <>
            {topArtists && (
                <main>
                    <Section title="Top artists this month" breadcrumb="true">
                        <Artists artists={topArtists.items.slice(0, 15)} />
                    </Section>
                </main>
            )

            }
        </>
    )
}

export default TopArtists;