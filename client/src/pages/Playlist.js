import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Section, Tracks } from '../components/';
import { StyledHeader } from '../styles/';
import { getPlaylistInfo } from '../services/spotifyService';

const Playlist = () => {
    const { id: playlist_id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    // const [playlist, setPlaylist]

    useEffect(() => {
        const getTracks = async () => {
            const { data } = await getPlaylistInfo(playlist_id);
            setPlaylist(data);
            console.log(data);
        }
        getTracks();
    }, [playlist_id])

    return (
        <>
            {playlist && playlist.tracks && (
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
                            <Tracks tracks={playlist.tracks}></Tracks>
                        </Section>
                    </main>
                </>
            )}
        </>
    )
}

export default Playlist;