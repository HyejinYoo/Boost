const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router();

// 회원가입
router.post('/signup', async (req, res) => {

    
  const { username, password, region } = req.body;

  if (!username || !password || !region) {
    return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);


    const [result] = await db.execute(
      'INSERT INTO users (username, password, region) VALUES (?, ?, ?)',
      [username, hashedPassword, region]
    );
    res.status(201).json({ message: '회원가입 성공', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: '회원가입 실패', error });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT id FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: '로그인 실패: 사용자 정보를 확인하세요.' });
    }

    const user = rows[0];

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: '로그인 실패: 비밀번호가 일치하지 않습니다.' });
    }

    res.cookie('userId', user.id, { httpOnly: true });
    res.json({ message: '로그인 성공', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: '로그인 실패', error });
  }
});

// 로그아웃
router.post('/logout', (req, res) => {
  res.clearCookie('userId');
  res.json({ message: '로그아웃 성공' });
});

module.exports = router;