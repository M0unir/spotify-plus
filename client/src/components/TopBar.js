import styled from 'styled-components/macro';
import Logout from './Logout';

const StyledHeaderBar = styled.header`
    position: fixed;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 60px;
    justify-content: flex-end;
    max-width: calc(100vw - var(--nav-bar-width));
    padding: var(--spacing-md);
    padding-inline-end: var(--spacing-md);
    width: 100%;
    z-index: 3;

    @media (min-width: 1024px){
        padding: var(--spacing-md) var(--spacing-xl);
        padding-inline-end: var(--spacing-xl);
    }

    .topbar__outer-container {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        pointer-events: none;
        white-space: nowrap;
        z-index: -1;
        background-color: rgb(80, 56, 160);
        transition: background-color .25s;
        opacity: 0; // TODO: Change opacity on scroll
    }

    .topbar__inner-container {
        border: 0;
        margin: 0;
        padding: 0;
        vertical-align: baseline;
        background-color: rgba(0,0,0,.6);
        height: 100%;
    }
`;

const StyledProfileButton = styled.button`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: rgba(0,0,0,.7);
    border: 0;
    border-radius: 23px;
    color: var(--white);
    cursor: pointer;
    gap: 8px;
    height: 32px;
    margin-inline-start: var(--spacing-md);
    padding: 2px;
    position: relative;
    pointer-events: auto;
    white-space: nowrap;

    .topbar__button-name {
        display: none;
        line-height: 28px;
        max-width: 110px;
        overflow: hidden;
        pointer-events: none;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .topbar__button-arrow {
        display: none;
    }

    .topbar__button-inner-container {
        width: 28px;
        height: 28px;
    }

    .topbar__button-inner-container img {
        border-radius: 50%;
    }
    
    @media (min-width: 1024px) {
        .topbar__button-name {
            display: block;
        }
        .topbar__button-arrow {
            display: block;
        }
    }
`;

const TopBar = ({ user }) => {
    return (
        <>
            {user && user !== 'undefined' &&
                <StyledHeaderBar aria-label="Top bar and user menu">
                    <div className="topbar__outer-container"><div className="topbar__inner-container"></div></div>
                    <Logout />
                    <StyledProfileButton>
                        <figure title={user.display_name} style={{ margin: 0 }}>
                            <div className="topbar__button-inner-container">
                                <img aria-hidden="false" draggable="false" loading="eager" src={user.images[0].url} alt={user.display_name} />
                            </div>
                        </figure>
                        <span className="topbar__button-name" dir="auto" as="span">{user.display_name}</span>
                        <svg className="topbar__button-arrow" role="img" fill="#ffffff" height="16" width="16" viewBox="0 0 16 16"><path d="M3 6l5 5.794L13 6z"></path></svg>
                    </StyledProfileButton>
                </StyledHeaderBar >
            }
        </>
    )
}

export default TopBar;