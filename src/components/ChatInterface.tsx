import React, {
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  memo,
  useState,
} from "react";

interface ChatInterface {
  extraUI?: ReactNode | boolean;
}

function Chat({ extraUI }: ChatInterface) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [composeText, setComposeText] = useState("");

  const fetchAnswer = async () => {
    if (question) {
      try {
      } catch (e) {
        //
      }
    }
  };

  const handleChatInput = (e: ChangeEvent<HTMLInputElement>) =>
    setComposeText(e.target.value);

  const handleSendClicked = () => {
    const text = (composeText || "").trim();
    if (text.length && !loading) {
      fetchAnswer();
      setComposeText("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendClicked();
    }
  };

  const renderComposer = (
    <Box
      sx={{
        zIndex: 999,
        left: "0px",
        right: "0px",
        bottom: "2vh",
        position: "absolute",
      }}
    >
      <
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          position: "relative",
        }}
      >
        {extraUI}
        <InputField
          autoFocus={true}
          value={composeText}
          placeholder={t("tell-me-what-you-need")}
          onChange={handleChatInput}
          inputProps={{
            onKeyDown: handleKeyPress,
          }}
          inputFieldStyles={{
            ".MuiInputBase-root": {
              alignItems: "start",
              padding: "1px",
              overflowY: "auto",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
              },
            },
          }}
        />

        {loading ? (
          <IconButton
            sx={{
              bgcolor: `${"primary.button"}`,
              width: "44px",
              height: "44px",
              padding: "14px",
              borderRadius: "8px",
            }}
            disabled={loading}
          >
            <StopOutlined fontSize="large" />
          </IconButton>
        ) : (
          <IconButton
            sx={{
              bgcolor: `${"primary.button"}`,
              width: "44px",
              height: "44px",
              padding: "14px",
              borderRadius: "8px",
            }}
            disabled={loading}
            onClick={handleSendClicked}
          >
            <Telegram fontSize="large" />
          </IconButton>
        )}
      </>
    </Box>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "inherit",
        position: "relative",
      }}
    >
      <ChatMessageList
        error={error}
        loading={loading}
        handler={fetchAnswer}
        updateError={updateError}
        lastMessage={lastMessage}
        chatMessages={conversations}
        updateLoading={updateLoading}
        fetchUpdater={fetchUpdateConversations}
      />
      {renderComposer}
    </div>
  );
}

export default memo(Chat);
