const axios = require("axios");
require("dotenv").config();

const testName = 'bowstring_hemp';

axios.get(`https://v0.trefle.io/api/plants?q=${testName}&token=${process.env.KEY}`)
    .then((res) => {
        let arr = res.data;

        let id = arr[0].id;
        
        axios.get(`https://trefle.io/api/plants/${id}?token=${process.env.KEY}`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .catch((err) => {
        console.log(err);
    });


