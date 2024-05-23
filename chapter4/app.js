const express = require('express');
const qs = require('qs');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('query parser', function (str) {
  return qs.parse(str, { /* custom options */ })
})
app.use(express.static('public'));

app.get('/data', function (req, res) {
  // 인증 된 사용자인지 체크
  // 요청 확인
  // DB에서 데이터를 찾고 가져온다
  // 가져온 데이터를 json으로 변환한다.
  res.json({ name: "이재명", age: 50, address: "경기도 군포시" });
});

var champions = [
  "가렌",
  "그브",
  "나서스",
  "볼베"
];

var flowers = [
  {
    name: "무궁화",
    thumbnail: "",
    color: "이쁜색",
    season: "봄",
    lifeCycle: 100,
    country: [
      "대한민국",
      "북한",
      "몰라"
    ]

  },
  {
    name: "진달래",
    thumbnail: "",
    color: "분홍색",
    season: "봄",
    lifeCycle: 100,
    country: [
      "대한민국",
      "북한",
      "미국"
    ]

  },
  {
    name: "개나리",
    thumbnail: "",
    color: "노란색",
    season: "봄",
    lifeCycle: 100,
    country: [
      "대한민국",
      "일본",
      "중국"
    ]

  },
];

app.get('/champions', function (req, res) {
  res.json({ champions: champions });
});

app.get('/champions/:championIndex', (req, res) => {
  res.json({ champion: champions[req.params.championIndex] });
});



app.get('/flowers', (req, res) => {
  console.log(req.query);
  // query에서 color 값이 있을 경우, 가져와서  flowers 목록에서 일치하는 color 를 가지 항목만 반환
  if (req.query.color !== undefined) {
    const filteredFlowers = flowers.filter(
      (flower) => flower.color === req.query.color
    );
    res.json({ flower: filteredFlowers.map((flower) => flower.name) });
  } else {
    // var list = [];
    // for (var i =0; i < flowers.length; i++){
    //   list.push(flowers[i].name);
    // }
    // var list = flowers.map(flower => flower.name);

    res.json({ flowers: flowers.map((flower) => flower.name) });
  }
});

app.get('/flowers/:flowerIndex', (req, res) => {
  res.json({ flowers: flowers[req.params.flowerIndex] });
});


app.get('/example1', (req, res) => {
  res.render('index', { name: '신재윤' })
});

app.get('/example2', (req, res) => {
  res.render('index', { name: '차은우' })
});

app.get('/example3', (req, res) => {
  res.render('index', { name: '박보검' })
});
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/2', (req, res) => {
//     res.send('죽여줘!')
//   })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})