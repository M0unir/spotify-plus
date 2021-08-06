import { useState, useEffect } from 'react';
import { getUserProfile } from '../services/spotifyService';
import { toast } from 'react-toastify';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await getUserProfile();
                setProfile(data);
                toast.success('Logged In');
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
                    {profile.images.length && profile.images[0].url && (
                        <img src={profile.images[0].url} alt="User Profile" />
                    )}
                    <p>Hello {profile.display_name}, email: {profile.email}</p>
                </>

            )}
        </>
    )
}

export default Profile;