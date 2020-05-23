//@flow
type BaseKickFontOptions = {
  baseFontSize: number,
  descenderHeightScale: number,
  capHeight: number,
  gridRowHeight: number
};
type BaseKickOptions = {
  fontSize: number,
  lineHeight: number
};

const defaultBasekickFontOptions = {
  baseFontSize: 1,
  gridRowHeight: 1, // leading multiplier (1*24)
  descenderHeightScale: 0.112, // for Open Sans
  capHeight: 0.714 // for Open Sans
};
const basekick = (
  {
    lineHeight = 24, // to define leading,
    fontSize = 16
  }: BaseKickOptions,
  {
    baseFontSize = 1,
    gridRowHeight = 1, // leading multiplier (1*24)
    descenderHeightScale = 0.112,
    capHeight = 0.714
  }: BaseKickFontOptions = defaultBasekickFontOptions
) => {
  const fontSizeValue = fontSize * baseFontSize;

  const calculateTypeOffset = (lh: number) => {
    const lineHeightScale = lh / fontSizeValue;
    return (lineHeightScale - 1) / 2 + descenderHeightScale;
  };

  const lineHeightValue = lineHeight * gridRowHeight;
  const typeOffset = calculateTypeOffset(lineHeightValue);

  const topSpace = lineHeightValue - capHeight * fontSizeValue;
  const heightCorrection =
    topSpace > gridRowHeight ? topSpace - (topSpace % gridRowHeight) : 0;

  const preventCollapse = 1;

  return {
    base: {
      fontSize: `${fontSizeValue}px`,
      lineHeight: `${lineHeightValue}px`
    },
    baseline: {
      transform: `translateY(${typeOffset}em)`
    },
    cropFirstLine: {
      paddingTop: `${preventCollapse}px`,
      ':before': {
        content: "''",
        marginTop: `-${heightCorrection + preventCollapse}px`,
        display: 'block',
        height: 0
      }
    }
  };
};
export { basekick };
export default basekick;
