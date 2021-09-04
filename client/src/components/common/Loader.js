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
        height: 50px;
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
        width: 7px;
        border-radius: 4px;
        margin: 0 4px;
        animation: ${props => animateVertically(props.x)} 0.3s linear infinite;
        animation-delay: ${props => props.time};
`

const Loader = () => {
    return (
        <StyledLoader>
            <div className="Loader__container">
                <StyledStroke x="30" time="0s" />
                <StyledStroke x="30" time="0.15s" />
                <StyledStroke x="30" time="0.25s" />
                <StyledStroke x="30" time="0.33s" />
                <StyledStroke x="30" time="0.25s" />
                <StyledStroke x="30" time="0.15s" />
                <StyledStroke x="30" time="0s" />
            </div>
        </StyledLoader>
    )
}

export default Loader;