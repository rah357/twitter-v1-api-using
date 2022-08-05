require("./utils/axios_config")

const express = require('express')
const {PORT} = process.env

const app = express()
app.use(express.json()) 


const {twitterAxios} = require('./utils/axios_config');


app.get('/userDetail/:userName', async (req, res) => {
    const {userName} = req.params;
    const { data } = await twitterAxios.get(`/by/username/${userName}`)
    res.send(data);
})

app.get('/followers/:userId', async (req, res) => {
    const {userId} = req.params;
    const { data } = await twitterAxios.get(`/${userId}/followers`)
    res.send(data);
})


app.get('/followersMatching', async (req, res) => {
    const {userId1, userId2} = req.body;
    const { data } = await twitterAxios.get(`/${1555623173605183488}/follower`)
    res.send(data);
})

app.get('/', async (req, res) => {
    res.send({
        apiList: [{
            getUserDetails: {
                url: '/userDetail/:userName',
                description: 'Get the user details based on the userName',
                requestBody: {},
                status: 'active'
            },
            getUserFollowersById: {
                url: '/followers/:userId',
                requestBody: {},
                description: 'Get the user followers based on the userId',
                status: 'active'
            },
            followersMatching: {
                url: '/followersMatching',
                status: 'in-active',
                description: 'Get the user followers based on the userId',
                requestBody: {
                    userId1: "",
                    userId2: ""
                }
            }
        }]
    });
})


app.listen(PORT, () => {
    console.log("Server is started")
})