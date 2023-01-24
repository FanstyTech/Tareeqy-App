import React from "react";
import * as signalR from "@microsoft/signalr";
const Index: React.FC = () => {
  var token_key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaHVzc2FtQGZpcy5wcyIsImV4cCI6MTY2Nzc1OTEwMCwiaXNzIjoiSXNzdWVyTmFtZSJ9.BPG91E5g0qjFd5TwlkjzeaiyF087zmA9g_fYnfnMgJ8";

  let connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44323/api/chat", {
      accessTokenFactory: () => {
        return token_key;
      },
    })
    .configureLogging(0)
    .build();

  connection.start();

  connection.on("ReceiveMessage", (fromUserName, messageText) => {
    console.log("DATA: 21ewsad ", fromUserName, messageText);
  });

  connection.on("chartStatus2", (data) => {
    console.log(data);
  });
  const fetchData = () => {
    fetch("https://localhost:44323/api/chat/send/graph1", {
      method: "get",
      headers: new Headers({
        authorization: "Bearer " + token_key,
      }),
    });
  };
  return (
    <>
      chat <button onClick={fetchData}>click Here </button>{" "}
    </>
  );
};

export default Index;
