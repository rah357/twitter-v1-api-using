const { twitterAxios } = require("./utils/axios_config");
const express = require("express");
const { PORT } = process.env;

const app = express();
app.use(express.json());

app.get("/userDetail/:userName", async (req, res) => {
    const { userName } = req.params;
    const { data } = await twitterAxios.get(`/by/username/${userName}`);
    res.send(data);
});

app.get("/followers/:userId", async (req, res) => {
    const { userId } = req.params;
    const { data } = await twitterAxios.get(`/${userId}/followers`);
    res.send(data);
});

app.get("/isFollowing", async (req, res) => {
    const { userIdToFollow, userIdIsFollowing } = req.body;
    const {
        data: { data: followers },
    } = await twitterAxios.get(`/${userIdToFollow}/followers`);

    const isFollowing = followers.find((follower) => {
        return follower.id === userIdIsFollowing;
    });

    const descAboutFollowingStatus = `${userIdIsFollowing} is ${
        isFollowing ? "following" : "not following"
    } to ${userIdToFollow}`;
    res.send({
        status: descAboutFollowingStatus,
    });
});

app.get("/", async (req, res) => {
    res.send({
        apiList: [
            {
                getUserDetails: {
                    url: "/userDetail/:userName",
                    description: "Get the user details based on the userName",
                    requestBody: {},
                    status: "active",
                },
                getUserFollowersById: {
                    url: "/followers/:userId",
                    requestBody: {},
                    description: "Get the user followers based on the userId",
                    status: "active",
                },
                followersMatching: {
                    url: "/followersMatching",
                    status: "active",
                    description: "Get the user followers based on the userId",
                    requestBody: {
                        userId1: "",
                        userId2: "",
                    },
                },
            },
        ],
    });
});

app.listen(PORT, () => {
    console.log("Server is started");
});
