import { useState, useEffect } from 'react';
import { getUserProfile, getUserPlaylists, getUserTopArtists, getUserTopTracks } from '../services/spotifyService';
import { toast } from 'react-toastify';
import { StyledHeader } from '../styles/'
import { TopBar, Section, Artists, Tracks, PlaylistsGrid, Loader } from '../components/'

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [playlists, setPlaylists] = useState(null);
    const [topArtists, setTopArtists] = useState(null);
    const [topTracks, setTopTracks] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await getUserProfile();
                setProfile(data);
                // toast.success('Logged In');
            } catch (Exception) {
                if (Exception.response && Exception.response.status >= 400 && Exception.response.status < 500)
                    toast.error(<div>Could not get Profile data.<br />Reason: {Exception.response.data.error.message}</div>);
            }
        }

        const getPlaylists = async () => {
            try {
                const { data } = await getUserPlaylists();
                setPlaylists(data)
            } catch (Exception) {
                if (Exception.response && Exception.response.status >= 400 && Exception.response.status < 500)
                    toast.error(<div>Could not get Playlists data.<br />Reason: {Exception.response.data.error.message}</div>)
            }
        }

        const getTopArtists = async () => {
            try {
                const { data } = await getUserTopArtists();
                setTopArtists(data)
            } catch (Exception) {
                if (Exception.response && Exception.response.status >= 400 && Exception.response.status < 500) {
                    const { status, data } = Exception.response;
                    toast.error(<div>Could not get Top Artists data.<br />{data ? `Reason: ${data.error.message}` : `Code: ${status}`}</div>)
                }
            }
        }

        const getTopTracks = async () => {
            try {
                const { data } = await getUserTopTracks();
                setTopTracks(data)
            } catch (Exception) {
                if (Exception.response && Exception.response.status >= 400 && Exception.response.status < 500) {
                    const { status, data } = Exception.response;
                    toast.error(<div>Could not get Top Tracks data.<br />{data ? `Reason: ${data.error.message}` : `Code: ${status}`}</div>)
                }
            }
        }

        getUser()
        getPlaylists()
        getTopArtists()
        getTopTracks()

    }, [])

    return (
        <>
            {profile && (
                <>
                    <TopBar user={profile} />
                    <StyledHeader type="user">
                        <div className="header__inner">
                            {profile.images.length && profile.images[0].url && (
                                <img className="header__img" src={profile.images[0].url} alt="Avatar" />
                            )}
                            <div>
                                <div className="header__overline">Profile</div>
                                <h1 className="header__name">{profile.display_name}</h1>
                                <p className="header__meta">
                                    {playlists && (
                                        <span>{playlists.total} Playlist{(playlists.total !== 1) ? 's' : ''}</span>
                                    )}
                                    <span>{profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}</span>
                                </p>
                            </div>
                        </div>
                    </StyledHeader>
                    {topArtists && topTracks && playlists ? (
                        <main>
                            <Section title="Top artists of All Time" small="Only visible to you" seeAllLink="/top-artists">
                                <Artists artists={topArtists.items.slice(0, 8)} />
                            </Section>
                            <Section title="Top Tracks of All Time" small="Only visible to you" seeAllLink="/top-tracks">
                                <Tracks tracks={topTracks.items.slice(0, 15)} />
                            </Section>
                            <Section title="Top Playlists of All Time" small="Only visible to you" seeAllLink="/playlists">
                                <PlaylistsGrid playlists={playlists.items.slice(0, 10)} />
                            </Section>
                        </main>
                    ) : (
                        <Loader />
                    )}
                </>
            )
            }
        </>
    )
}

export default Profile;