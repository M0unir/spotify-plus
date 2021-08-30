import { StyledTracks } from '../styles';
import { convertToDuration } from '../utils';

const Tracks = ({ tracks }) => {
    if (tracks && tracks.length) console.log('here: ', tracks)

    return (
        <>
            {tracks && tracks.length ? (
                <StyledTracks>
                    {tracks.map((track, i) => (
                        <li className="track__item" key={i}>
                            <div className="track__item__num">{i + 1}</div>
                            <div className="track__item__title-group">
                                {track.album.images.length && track.album.images[2] && (
                                    <div className="track__item__img">
                                        <img src={track.album.images[2].url} alt={track.name} />
                                    </div>
                                )}
                                <div className="track__item__name-artist">
                                    <div className="track__item__name overflow-ellipsis">
                                        {track.name}
                                    </div>
                                    <div className="track__item__artist overflow-ellipsis">
                                        {track.artists.map((artist, i) => (
                                            <span key={i}>
                                                {artist.name}{i !== track.artists.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="track__item__album overflow-ellipsis">
                                {track.album.name}
                            </div>
                            <div className="track__item__duration">
                                {convertToDuration(track.duration_ms)}
                            </div>
                        </li>
                    ))}
                </StyledTracks>
            ) : (
                <p className="empty-notice">No tracks available</p>
            )}
        </>
    )
};

export default Tracks;
