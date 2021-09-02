import styled, { keyframes } from 'styled-components/macro';

const animateVertically = x => keyframes`
{
        50% {
            height: ${`${x}%`};
        }
        100% {
            height: 100%
        }
    }
`

const StyledLoader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 50vh;

    .Loader__container {
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        }
`;

const StyledStroke = styled.span`
        display: block;
        position: relative;
        background: var(--grey);
        height: 100%;
        width: 5px;
        border-radius: 4px;
        margin: 0 4px;
        animation: ${props => animateVertically(props.x)} 0.5s linear infinite;
        animation-delay: ${props => props.time};
`

const Loader = () => {
    return (
        <StyledLoader>
            <div className="Loader__container">
                <StyledStroke x="20" time="0s" />
                <StyledStroke x="20" time="0.2s" />
                <StyledStroke x="20" time="0.3s" />
                <StyledStroke x="20" time="0.5s" />
                <StyledStroke x="20" time="0.3s" />
                <StyledStroke x="20" time="0.2s" />
                <StyledStroke x="20" time="0s" />
            </div>
        </StyledLoader>
    )
}

export default Loader;