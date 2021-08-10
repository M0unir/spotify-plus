import { useState, useEffect } from 'react';
import { getUserProfile } from '../services/spotifyService';
import { toast } from 'react-toastify';
import { StyledHeader } from '../styles/'
import { TopBar } from '../components/'

const Profile = () => {
    const [profile, setProfile] = useState(null);

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

        getUser()

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
                                    <span>
                                        {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </StyledHeader>
                </>
            )}
        </>
    )
}

export default Profile;