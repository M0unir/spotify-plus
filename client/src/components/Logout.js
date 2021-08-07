import { logout } from '../services/spotifyService';
import styled from 'styled-components/macro'

const StyledLogoutComponent = styled.button`
    background-color: rgba(0,0,0,.7);
    border: 1px solid rgba(255,255,255,.7);
    pointer-events: auto;
    white-space: nowrap;
    border-radius: var(--border-radius-pill);
    color: var(--white);
    cursor: pointer;
    display: inline-block;
    font-size: var(--font-size-xxs);
    font-weight: 700;
    letter-spacing: 1.76px;
    line-height: 18px;
    padding: 8px 34px;
    text-align: center;
    text-transform: uppercase;
    -webkit-transition: all 33ms cubic-bezier(.3,0,0,1);
    transition: all 33ms cubic-bezier(.3,0,0,1);
    white-space: nowrap;
    will-change: transform;
`

const Logout = () => {
    return (
        <StyledLogoutComponent onClick={logout}>Logout</StyledLogoutComponent>
    )
}

export default Logout;