import styled from 'styled-components';

const Logo = styled.span`
  background-image: url(${({ imageUrl }) => imageUrl});
  width: ${({ theme: { logoSize } }) => logoSize};
  height: ${({ theme: { logoSize } }) => logoSize};
  vertical-align: bottom;
  margin-right: 0.25rem;
  display: inline-block;

  ${({ hideLogoOnMobile, theme: { mobileBreakpoint } }) =>
    hideLogoOnMobile &&
    `${mobileBreakpoint} {
        display: none;
      }`}
`;

export default Logo;
