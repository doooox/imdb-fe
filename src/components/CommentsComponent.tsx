import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { IComment } from "../types/comments.types";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface Props {
  comment: IComment;
}

const CommentsComponent = ({ comment }: Props) => {
  return (
    <>
      <div>
        <Item
          style={{
            textAlign: "initial",
            margin: "1rem",
            padding: "1rem",
          }}
          key={comment._id}
        >
          {comment.body}
        </Item>
      </div>
    </>
  );
};

export default CommentsComponent;
