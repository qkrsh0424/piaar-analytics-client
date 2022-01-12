import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FirstContainer = styled.div`
    overflow: hidden;
    position:relative;
    background:linear-gradient(70deg, #00B8BA, #31CEAE);
    background: -webkit-linear-gradient(70deg, #00B8BA, #31CEAE);
    height:64px;
`;

const SecondContainer = styled.div`
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(8,1fr);
    /* background: #f5f5f5; */
    border: 1px solid #f1f1f1;

    @media only screen and (max-width:992px){
        display: none;
    }
`;

const LogoEl = styled.div`
    position:absolute;
    left:10px;
    top:50%;
    transform: translate(0,-50%);
    width: 100%;
    color: white;
    font-size: 1.25rem;
    font-weight: 500;

    @media only screen and (max-width:992px){
        font-size: 1rem;
    }
`;


const LogoLink = styled(Link)`
    text-decoration: none;
    color:white;
    &:hover{
        color:#ffffff80;
    }
`;

const LogoLink2 = styled.a`
    text-decoration: none;
    color:white;
    &:hover{
        color:#ffffff80;
    }
`;

const NavEl = styled(Link)`
    padding:8px;
    text-align: center;
    text-decoration: none;
    color: #444;
    font-weight: 500;

    &:hover{
        color:#00B8BA;
    }
`;

export default function NavbarMain() {
    return (
        <>
            <FirstContainer>
                <LogoEl>
                    <LogoLink
                        to={'/'}
                        replace={false}
                    >
                        PIAAR Analytics
                    </LogoLink>
                    <span> X </span>
                    <LogoLink2
                        href={'https://www.piaar.co.kr'}
                    >
                        PIAAR Management
                    </LogoLink2>
                </LogoEl>
            </FirstContainer>
            <SecondContainer>
                <NavEl to='/'>홈</NavEl>
            </SecondContainer>
        </>
    );
}