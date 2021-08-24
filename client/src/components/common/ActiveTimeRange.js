import { StyledActiveTimeRange } from "../../styles";

const ActiveTimeRange = ({ activeTimeRange, setActiveTimeRange }) => {

    return (
        <StyledActiveTimeRange>
            <li><button
                className={activeTimeRange === 'short_term' ? 'active' : ''}
                onClick={() => setActiveTimeRange('short_term')}>Last month</button></li>
            <li><button
                className={activeTimeRange === 'medium_term' ? 'active' : ''}
                onClick={() => setActiveTimeRange('medium_term')}>Last 6 months</button></li>
            <li><button
                className={activeTimeRange === 'long_term' ? 'active' : ''}
                onClick={() => setActiveTimeRange('long_term')}>All time</button></li>
        </StyledActiveTimeRange>
    )
}

export default ActiveTimeRange;