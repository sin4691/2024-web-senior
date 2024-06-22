const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// EJS를 view engine으로 설정
app.set('view engine', 'ejs');

// 정적 파일 제공 설정 (public 폴더)
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  },
}));


// 예시 상품 데이터
const products = [
    { id: 1, name: '강아지 아우터 1', price: 20000, image: 'not.png', category: 'outer' },
    { id: 2, name: '강아지 상의 1', price: 15000, image: 'not.png', category: 'top' },
    { id: 3, name: '강아지 하의 1', price: 10000, image: 'not.png', category: 'bottom' }
    // 추가 상품 데이터
];

// 장바구니 배열
let cart = [];

// 루트 경로 라우트
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

// 상품 목록 라우트
app.get('/products', (req, res) => {
    res.render('products', { products });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/mypage', (req, res) => {
    res.render('mypage');
});
// 특정 상품 상세 페이지 라우트
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (product) {
        res.render('productDetail', { product });
    } else {
        res.status(404).send('Product not found');
    }
});

// 장바구니에 상품 추가하는 라우트
app.post('/cart/add/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);  // 장바구니에 상품 추가
        res.redirect('/cart');  // 장바구니 페이지로 리다이렉트
    } else {
        res.status(404).send('Product not found');
    }
});

// 장바구니 페이지 라우트
app.get('/cart', (req, res) => {
    res.render('cart', { cart });
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
