import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

export function useIsLargeScreen(size) {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(size));
}
