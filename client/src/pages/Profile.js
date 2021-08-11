import { useState, useEffect } from 'react';
import { getUserProfile, getUserPlaylists } from '../services/spotifyService';
import { toast } from 'react-toastify';
import { StyledHeader } from '../styles/'
import { TopBar } from '../components/'

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [playlists, setPlaylists] = useState({});

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await getUserProfile();
                setProfile(data);
                // toast.success('Logged In');
            } catch (Exception) {
                if (Exception.response && Exception.response.status >= 400 && Exception.response.status < 500)
                    toast.error(<div>Couldn't get profile data.<br />Reason: {Exception.response.data.error.message}</div>);
            }
        }

        const getPlaylists = async () => {
            try {
                const { data } = await getUserPlaylists();
                setPlaylists(data)
            } catch (Exception) {
                if (Exception.response && Exception.response.status >= 400 && Exception.response.status < 500)
                    toast.error(<div>Couldn't get Playlists data.<br />Reason: {Exception.response.data.error.message}</div>)
            }
        }

        getUser()
        getPlaylists()

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
                </>
            )
            }
        </>
    )
}

export default Profile;