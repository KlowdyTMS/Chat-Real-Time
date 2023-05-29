import { useEffect, useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { useSocket } from "../hooks/socket-io.js";
import { useProfile } from "../queries/me.js";
import { useChat } from "../queries/chat.js";

type FormProps = {
  message: string;
};

const initialState = {
  message: "",
};

export function Home() {
  const [form, setForm] = useState<FormProps>(initialState);
  const socket = useSocket();
  const profile = useProfile();
  const { data } = useChat();
  const [currentMessages, setCurrentMessages] = useState([]);

  useEffect(() => {
    socket.on("chat", (message) => {
      // @ts-ignore
      setCurrentMessages((prev) => [...prev, message]);
    });
  }, []);

  function submit() {
    socket.emit("chat", form);

    setForm((prev) => ({ ...prev, message: "" }));
  }

  return (
    <Grid
      container
      sx={{ minHeight: "90vh", p: 5 }}
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        sx={{ p: 4 }}
        variant="h4"
      >{`User: ${profile.data?.data.name}`}</Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        label={"message"}
        sx={{ margin: "5px" }}
        value={form.message}
        onChange={(event) =>
          setForm((prev) => ({
            ...prev,
            message: event?.target.value,
          }))
        }
      />
      <Button
        sx={{ margin: "15px" }}
        variant={"contained"}
        onClick={() => submit()}
      >
        Enviar mensagem
      </Button>
      {data?.data?.map((value: any, key: any) => {
        return (
          <Grid
            key={key}
            container
            alignItems={"center"}
            sx={{ margin: 2 }}
            flexDirection={"column"}
          >
            <Typography variant={"body2"} color={"black"}>
              {/* @ts-ignore */}
              {value?.user.name}
            </Typography>
            <Typography variant={"h6"} color={"black"}>
              {/* @ts-ignore */}
              {value?.message}
            </Typography>
          </Grid>
        );
      })}
      {currentMessages?.map((value, key) => {
        return (
          <Grid
            key={key}
            container
            alignItems={"center"}
            sx={{ margin: 2 }}
            flexDirection={"column"}
          >
            <Typography variant={"body2"} color={"black"}>
              {/* @ts-ignore */}
              {value?.name}
            </Typography>
            <Typography variant={"h6"} color={"black"}>
              {/* @ts-ignore */}
              {value?.message}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}
