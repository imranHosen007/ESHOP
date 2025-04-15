import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { format } from "timeago.js";
import socketIo from "socket.io-client";
const ENDPOINT = "https://eshop-socket-py0j.onrender.com/";
const socketId = socketIo(ENDPOINT, { transports: ["websocket"] });
import { ToastContainer } from "react-toastify";
const ShopInbox = () => {
  const { seller } = useSelector((store) => store.seller);
  const axiosPublic = useAxiosPublic();
  const [conversation, setConversation] = useState([]);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [onlineUser, setOnlineUser] = useState();

  useEffect(() => {}, []);
  const handleClick = (id) => {
    navigate(`/dashboard/messages?${id}`);
    setOpen(true);
  };
  useEffect(() => {
    axiosPublic
      .get(`/conversation/seller/${seller?._id}`, { withCredentials: true })
      .then((res) => {
        setConversation(res?.data?.conversations);
      })
      .catch((error) => console.log(error));
  }, [seller, message]);

  // ------Sokcet-Io---------
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  // checkOnlineUser
  useEffect(() => {
    if (seller) {
      const sellerId = seller?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUser", (data) => {
        setOnlineUser(data);
      });
    }
  }, [seller]);

  const onlineCheck = (chat) => {
    const chatMembers = chat?.members?.find((member) => member !== seller?._id);
    const online = onlineUser?.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };
  // handleSendMessage
  const handleSendMessage = (e) => {
    e.preventDefault();

    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat?.members?.find(
      (member) => member != seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });

    if (newMessage !== "") {
      axiosPublic
        .post(`/message`, message, { withCredentials: true })
        .then((res) => {
          setMessage((prev) => [...prev, res.data.message]);
          updateLastMessage();
        })
        .catch((error) => console.log(error));
    }
  };
  // ---update-Last-Message--
  function updateLastMessage() {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });

    axiosPublic
      .put(
        `/conversation/update/${currentChat?._id}`,
        { lastMessage: newMessage, lastMessageId: seller._id },
        { withCredentials: true }
      )
      .then((res) => {
        setNewMessage("");
      })
      .catch((error) => console.log(error));
  }
  // -------get-Message-----
  useEffect(() => {
    axiosPublic
      .get(`/message/${currentChat?._id}`)
      .then((res) => {
        setMessage(res.data.messages);
      })
      .catch((error) => console.log(error));
  }, [currentChat]);

  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      <ToastContainer />
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {conversation &&
            conversation.map((data, index) => {
              return (
                <div
                  onClick={(e) =>
                    setActive(index) ||
                    handleClick(data._id) ||
                    setCurrentChat(data)
                  }
                  className={`w-full flex p-2 px-3  ${
                    active == index ? "bg-[#00000010] " : "bg-transparent"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={data.user?.avatar?.url}
                      alt=""
                      className="rounded-full w-[50px] h-[50px]"
                    />{" "}
                    {onlineCheck(data) ? (
                      <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
                    ) : (
                      <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
                    )}
                  </div>
                  <div className="pl-3">
                    <h1 className="text-[18px] ">{data.user?.name}</h1>

                    <p className="text-[16px] text-[#000c] font-semibold">
                      {data.lastMessageId === seller._id
                        ? "You "
                        : data?.user?.name?.split(" ")[0] + " "}

                      {data.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}
        </>
      )}
      {/* ----Seller-Inbox----- */}
      {open && (
        <>
          {" "}
          <div className="flex flex-col justify-between w-full min-h-full">
            <div className="flex items-center justify-between p-3 bg-slate-200">
              <div className="flex">
                <img
                  src={currentChat?.user?.avatar?.url}
                  className="w-[60px] h-[60px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h1 className="font-semibold text-[18px]">
                    {currentChat?.user?.name}
                  </h1>
                </div>
              </div>
              <AiOutlineArrowRight
                size={20}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            {/* ------All-Message-- */}
            <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
              {message &&
                message.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex w-full my-2 ${
                        item.sender === seller._id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {item.sender !== seller._id && (
                        <img
                          src=""
                          alt=""
                          className="w-[40px] h-[40px] rounded-full mr-3"
                        />
                      )}
                      <div>
                        <div
                          className={`w-max p-2 rounded ${
                            item.sender == seller._id
                              ? "bg-[#000]"
                              : "bg-[#38c776]"
                          }  text-white h-min`}
                        >
                          <p>{item.text}</p>
                        </div>
                        <p className="text-[12px] text-[#000000d3] pt-1">
                          {format(item.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* // -----Message-From----- */}
            <form
              onSubmit={handleSendMessage}
              aria-required={true}
              className="relative flex items-center justify-between w-full p-3"
            >
              <div color="w-[30px]">
                <input type="file" name="" id="image" className="hidden" />
                <label htmlFor="image">
                  <TfiGallery className="cursor-pointer" size={20} />
                </label>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  required
                  placeholder="Enter your message..."
                  className="formInput"
                />
                <input
                  type="submit"
                  value="Send"
                  className="hidden"
                  id="send"
                />
                <label htmlFor="send">
                  <AiOutlineSend
                    size={20}
                    className="absolute cursor-pointer right-4 top-5"
                  />
                </label>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ShopInbox;
