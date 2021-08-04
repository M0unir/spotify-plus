import styled from 'styled-components/macro'

const StyledLoginContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: white;
  border: 1px solid var(--green);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.2);
  }
`

const Login = () => {
    return (
        <StyledLoginContainer>
            <StyledLoginButton
                className="App-link"
                href="http://localhost:8080/login"
                rel="noopener noreferrer"
            >
                Login to Spotify
            </StyledLoginButton>
        </StyledLoginContainer>
    )
}

export default Login;