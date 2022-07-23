import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

export default function ContainedBtn({ text, style, handleClick, href }) {
  const classes = useStyles();
  return (
    <Button
      style={style}
      onClick={handleClick}
      className={classes.join_Btn}
      href={href}
    >
      {text}
    </Button>
  );
}

const useStyles = makeStyles({
  join_Btn: {
    outline: "none",
    textTransform: "uppercase",
    textDecoration: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    WebkitBoxAlign: "center",
    alignItems: "center",
    WebkitBoxPack: "center",
    justifyContent: "center",
    width: "max-content",
    borderRadius: "999px",
    height: "46px",
    fontWeight: 600,
    fontSize: "15px",
    padding: "0 40px",
    color: "#fff",
    backgroundColor: "#ff3d00",
    "&:hover": {
      backgroundColor: "#c81767",
      color: "#fff",
    },
  },
});
