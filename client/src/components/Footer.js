import { styled } from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 130px;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  a {
    margin-top: 5px;
  }
`;
const Footer = () => {
  return (
    <StyledFooter>
      <FooterContainer>
        <a href="https://github.com/codestates-seb/seb45_main_004">
          Git Repository
        </a>
        <p>Developer for Serviece</p>
        <p>[BE] 송의현, 정동아, 한성희</p>
        <p>[FE] 권용일, 김선미, 이지아</p>
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;
